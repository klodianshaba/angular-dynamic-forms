import { Component, OnInit } from '@angular/core';
import {FormifyModel} from '../../formify/models';
import {EmailFieldControl, PasswordFieldControl} from '../../formify/fields';
import { Highlights } from '../highlights/highlights.component';
@Component({
  selector: 'formify-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  public collapse: boolean = true;
  public Highlights = Highlights;
  public formify = new FormifyModel({
    controls: [
      new EmailFieldControl(), // extends FieldModel
      new PasswordFieldControl(), // extends FieldModel
    ],
    submit: {text: 'Login'}, // submit button
  });
  constructor() {}
  ngOnInit(): void {
  }
  onSubmit(): void{
    this.formify.loading(true);
    setTimeout(() => {
      this.formify.loading(false);
    }, 1000);
  }
}
