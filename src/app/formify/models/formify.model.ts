import {AbstractControl, AbstractControlOptions, FormArray, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {FieldModel} from './field.model';
import {GroupModel} from './group.model';
import {ArrayModel} from './array.model';
import {SubmitModel} from './submit.model';
import {BehaviorSubject} from 'rxjs';

export interface FormifyState {
  controls: (FieldModel | GroupModel | ArrayModel)[];
  submit?: SubmitModel;
  options?: OptionsType;
}

export enum ControlTypes {
  formField = '[FORMFIELD] formField direction',
  formGroup = '[FORMGROUP] formGroup direction',
  formArray = '[FORMARRAY] formArray direction',
}

export type ControlsType = (FieldModel | GroupModel | ArrayModel)[];

export type  OptionsType = ValidatorFn | ValidatorFn[] | AbstractControlOptions;

export  class FormifyModel{
  public formGroup: FormGroup;
  public controls: ControlsType;
  public submit: SubmitModel;
  public options?: OptionsType;
  constructor( config: FormifyState ) {
    this.submit = new SubmitModel();
    this.controls = config.controls;
    if (config.hasOwnProperty('submit')){ this.submit = {...this.submit, ...config.submit}; }
    if (config.hasOwnProperty('options')) { this.options = config.options; }
    this.formGroup = new FormGroup( this.generateFormControls(this.controls) , this.options );
    this.formGroup.statusChanges.subscribe(status => {
      this.checkDisabledSubmit();
    });
  }

  private generateFormControls(controls: ControlsType): { [controlId: string]: AbstractControl; } {
    const formControls: { [controlId: string]: AbstractControl; } = {};
    for (const control of controls) {
      if (control instanceof FieldModel) {
        Object.assign(formControls , { [control.controlName]: this.generateFormControl(control) });
      } else if (control instanceof GroupModel) {
        Object.assign(formControls , { [control.controlName]: this.generateFormGroup(control) });
      } else if (control instanceof ArrayModel) {
        Object.assign(formControls , { [control.controlName]: this.generateFormArray(control) });
      }
    }
    return formControls;
  }

  private generateFormControl(control: FieldModel ): FormControl {
    const formControl = new FormControl(
      control.defaultValue , control.validators.map(validator => validator.validator )
      .filter(validator => validator)
    );
    control.formControl = formControl;
    control.submit = this.submit;
    return  formControl;
  }

  private generateFormGroup(control: GroupModel ): FormGroup {
    const formGroup = new FormGroup( this.generateFormControls(control.controls) ); // recursion
    control.formGroup = formGroup;
    control.change.subscribe(change => {
      if (change) {
        console.log('group_change');
        console.log(change);
        this.formGroup.patchValue(change);
      }
    });
    return  formGroup;
  }
  private generateFormArray(control: ArrayModel): FormArray {
    const formArray = new FormArray( Object.entries( this.generateFormControls(control.controls)) // recursion
      .map( ([name, value]) => ({name, value}))
      .map( item => item.value)
    );
    control.formArray = formArray;
    control.change.subscribe(change => {
      if (change){
        console.log('array_change');
        this.formGroup.patchValue(change);
        }
    });
    return  formArray;
  }
  public addControl(control: FieldModel): void{
    this.controls.push(control);
    this.formGroup.addControl(control.controlName, this.generateFormControl(control));
  }
  public get(path: string): FieldModel | null{
    const controls =  this.iterateFindControl(this.controls, path);
    for (const control of controls){
      if (control instanceof FieldModel){
        return  control;
      }
    }
    return null;
  }
  public getArray(path: string): ArrayModel | null{
    for (const control of this.controls){
      if (control instanceof ArrayModel){
        return  control;
      }
    }
    return null;
  }
  public getGroup(path: string): GroupModel | null{
    for (const control of this.controls){
      if (control instanceof GroupModel){
        return  control;
      }
    }
    return null;
  }
  private iterateFindControl(controls: ControlsType, controlName: string): ControlsType{
    return controls.filter(control => {
      if (control instanceof FieldModel){
        if (controlName === control.controlName){
          return control;
        }
        return null;
      }
      else if ( control instanceof GroupModel){
        return this.iterateFindControl(control.controls, controlName);
      }
      else if (control instanceof ArrayModel){
        return this.iterateFindControl(control.controls, controlName);
      }
      return null;
    });
  }

  public checkDisabledSubmit(): void {
    this.submit.disabled = ( this.formGroup.invalid && this.submit.status.value || this.submit.loading );
  }

  public loading(loading: boolean): void{
    this.submit.loading = loading;
    this.checkDisabledSubmit();
  }
}
