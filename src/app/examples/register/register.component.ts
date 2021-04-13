import { Component, OnInit } from '@angular/core';
import {FieldModel, FieldTypes, FormifyModel, ValidatorModel} from '../../formify/models';
import {EmailFieldControl, LanguageFieldControl, NameFieldControl, PasswordFieldControl, ToggleFieldControl} from '../../formify/fields';
import {MatchConfirmPassword} from '../../formify/models/error-mathers.config';
import {Validators} from '@angular/forms';
import {Highlights} from '../highlights/highlights.component';
@Component({
  selector: 'formify-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public collapse: boolean = true;
  public Highlights = Highlights;
  public formify = new FormifyModel({
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
  });
  constructor() { }
  ngOnInit(): void {}
  onSubmit(): void{
    this.formify.loading(true);
    setTimeout(() => {
      this.formify.loading(false);
    }, 1000);
  }
}
