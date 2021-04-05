import {FormArray} from '@angular/forms';
import {ControlsType, ControlTypes} from './formify.model';

export class ArrayModel {
  formArray: FormArray;
  controlName: string;
  controls: ControlsType;
  readonly controlType?: ControlTypes;
  constructor( controlName: string , controls: ControlsType ) {
    this.formArray = null;
    this.controlName = controlName;
    this.controlType = ControlTypes.formArray;
    this.controls = controls;
  }
}
