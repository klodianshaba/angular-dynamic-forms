import {ChangeDetectorRef, Component, OnInit , OnDestroy} from '@angular/core';
import {ArrayModel, FieldModel, FormifyModel} from '../../formify/models';
import {AppearanceFieldControl, BiographyFieldControl, ColorFieldControl, LanguageFieldControl, NameFieldControl, ToggleFieldControl} from '../../formify/fields';
import {AddressGroupControl, ContactGroupControl, ExercisesGroupControl} from '../../formify/groups';
@Component({
  selector: 'formify-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit , OnDestroy {
  public collapse: boolean = true;
  public formify: FormifyModel = new FormifyModel({
    controls: [
      new NameFieldControl({}), // extends FieldModel
      new FieldModel({controlName: 'lastName', label: 'Enter last name', placeholder: 'last name'}),
      new LanguageFieldControl({}), // extends FieldModel
      new BiographyFieldControl({}), // extends FieldModel
      new ColorFieldControl({}), // extends FieldModel
      new AppearanceFieldControl({}),
      new ToggleFieldControl({controlName: 'toggleColor', label: 'Show/Hidden choose color radios'}), // extends FieldModel
      new ArrayModel({controlName: 'address', label: 'Address:', controls: [ // extends ArrayModel
          new AddressGroupControl({}), // extends GroupModel
        ]}),
      new ExercisesGroupControl({}), // extends GroupModel
      new ToggleFieldControl({controlName: 'toggleContact', label: 'Add/Remove fill contact group'}), // extends FieldModel
      new ContactGroupControl({}),
    ],
    submit: {text: 'Save Membership'},
  });
  constructor(private cd: ChangeDetectorRef) {
    this.formify.formGroup.get('color').valueChanges.subscribe(color => { // handle color change
      this.formify.updateFields({color});
      this.formify.updateSubmit({color});
    });
    this.formify.formGroup.get('appearance').valueChanges.subscribe(appearance => { // handle appearance change
      this.formify.updateFields({appearance});
    });
    this.formify.formGroup.get('toggleColor').valueChanges.subscribe(toggle => { // handle show/hide color radios
      if (toggle){
        this.formify.field('color').update({hidden: false });
      }else{
        this.formify.field('color').update({hidden: true });
      }
    });
    this.formify.formGroup.get('toggleContact').valueChanges.subscribe(contact => { // handle add/remove contact group
      if (contact){
        this.formify.addControl( new ContactGroupControl());
      }else{
        this.formify.removeControl('contact');
      }
      this.cd.detectChanges();
    });
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.formify.unSubscribe();
  }
  onSubmit(): void{
    this.formify.loading(true);
    setTimeout(() => {
      this.formify.loading(false);
    }, 1000);
  }
}
