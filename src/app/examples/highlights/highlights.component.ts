import { Component, OnInit, Input } from '@angular/core';
export enum Highlights {
  membership = 'membership',
  register = 'register',
  login = 'login'
}
export type HighlightType = Highlights.membership | Highlights.register | Highlights.login;
export class HighlightState {
  type: HighlightType;
  items: {
    label: string;
    language: string;
    code: string;
  }[];
}
@Component({
  selector: 'formify-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss']
})
export class HighlightsComponent implements OnInit {
  @Input('highlightType') set onHighlight(highlightType: HighlightType){
    this.highlightType = highlightType;
    this.initCurrentHighlight();
  }
  @Input() collapse: boolean = true;
  @Input() json: object = {};
  public highlight: HighlightState;
  public highlightType: HighlightType =  Highlights.membership;
  public highlights: HighlightState[] = [
    {
      type: Highlights.membership,
      items: [
        {
        label: 'HTML',
        language: 'html',
        code: `<form class="formify" [formGroup]="formify.formGroup" #form="ngForm" (ngSubmit)="onSubmit()">
  <formify-input formControlName="firstName" [fieldModel]="formify.field('firstName')"></formify-input>
  <formify-input formControlName="lastName" [fieldModel]="formify.field('lastName')"></formify-input>
  <formify-select formControlName="languages" [fieldModel]="formify.field('languages')"></formify-select>
  <formify-textarea formControlName="biography" [fieldModel]="formify.field('biography')"></formify-textarea>
  <formify-toggle formControlName="toggleColor" [fieldModel]="formify.field('toggleColor')"></formify-toggle>
  <formify-radio formControlName="color" [fieldModel]="formify.field('color')"></formify-radio>
  <formify-exercises [groupModel]="formify.group('exercises')"></formify-exercises>
  <formify-radio formControlName="appearance" [fieldModel]="formify.field('appearance')"></formify-radio>
  <formify-address [arrayModel]="formify.array('address')"></formify-address>
  <formify-toggle formControlName="toggleContact" [fieldModel]="formify.field('toggleContact')"></formify-toggle>
  <formify-contact [groupModel]="formify.group('contact')"></formify-contact>
  <formify-submit [submit]="formify.submit"></formify-submit>
</form>`
        },
        {
          label: 'TS',
          language: 'ts',
          code: `export class MembershipComponent implements OnInit, OnDestroy {
  public formify: FormifyModel = new FormifyModel({
    controls: [
      new NameFieldControl({}), // extends FieldModel
      new FieldModel({controlName: 'lastName', label: 'Enter last name', placeholder: 'last name'}),
      new LanguageFieldControl({}), // extends FieldModel
      new BiographyFieldControl({}), // extends FieldModel
      new ColorFieldControl({}), // extends FieldModel
      new AppearanceFieldControl(),
      new ToggleFieldControl({controlName: 'toggleColor', label: 'Show/Hidden choose color radios'}), // extends FieldModel
      new ArrayModel({controlName: 'address', label: 'Address:', controls: [
          new AddressGroupControl(), // extends GroupModel
        ]}),
      new ExercisesGroupControl(), // extends GroupModel
      new ToggleFieldControl({controlName: 'toggleContact', label: 'Add/Remove fill contact group'}), // extends FieldModel
      new ContactGroupControl(),
    ],
    submit: {text: 'Save Membership'},
  });
  constructor() {
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
    });
  }
  ngOnDestroy(): void {
    this.formify.unSubscribe();
  }
}`
        },
      ]
    },
    {
      type: Highlights.register,
      items: [{
        label: 'HTML',
        language: 'html',
        code: ` <formify [formify]="formify" (submit)="onSubmit()"></formify>`
      },
        {
          label: 'TS',
          language: 'ts',
          code: `public formify = new FormifyModel({
    controls: [
      new NameFieldControl({ controlName: 'fullName' , label: 'Enter your full name'}), // extends FieldModel and overwrite
      new EmailFieldControl(),
      new ToggleFieldControl({ // extends FieldModel, overwrite by given optional FieldState
        fieldType: FieldTypes.radio, label: 'Account Type', defaultValue: 'visitor',
        controlName: 'accountType', options: [ {text: 'Business', value: 'business'},  {text: 'Visitor', value: 'visitor'}]
      }),
      new LanguageFieldControl(), // extends FieldModel
      new PasswordFieldControl(), // extends FieldModel
      new FieldModel({ // FieldModel
        controlName: 'confirmPassword', icon: 'check', type: 'password', label: 'Confirm password', placeholder: 'password',
        validators: [
          new ValidatorModel( {validator: Validators.required , errorCode: 'required', description: 'Confirm password is required'} ),
          new ValidatorModel( {validator: Validators.minLength(8), errorCode: 'minlength', description: 'Confirm password must have 8 characters'}),
          {validator: null, errorCode: 'notMatch', description: 'Confirm password not match'},
        ]
      }),
    ],
    submit: {text: 'Register' , color: 'warn'}, // submit button
    options: MatchConfirmPassword  // options: ValidatorFn | ValidatorFn[] | AbstractControlOptions
 });`
        }
      ]
    },
    {
      type: Highlights.login,
      items: [
        {
          label: 'HTML',
          language: 'html',
          code: ` <formify [formify]="formify" (submit)="onSubmit()"></formify>`
        },
        {
          label: 'TS',
          language: 'ts',
          code: `public formify = new FormifyModel({
    controls: [
      new EmailFieldControl(), // extends FieldModel
      new PasswordFieldControl(), // extends FieldModel
    ],
    submit: {text: 'Login'}
});`
        }
      ]
    }
  ];
  public initCurrentHighlight(): void{
    this.highlight = this.highlights.find(highlight => highlight.type === this.highlightType);
  }
  constructor() {}
  ngOnInit(): void {
    this.initCurrentHighlight();
  }
}
