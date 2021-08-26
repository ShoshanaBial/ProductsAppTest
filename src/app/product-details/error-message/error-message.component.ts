import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ERROR_MESSAGE_MAP } from 'src/app/config/product.config';


@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  @Input() customControl!: AbstractControl;
  private readonly errorMessagesMap = ERROR_MESSAGE_MAP;
  constructor() { }

  ngOnInit(): void {
  }
  shouldShowErrors(): boolean {
    let shouldShowErrors = this.customControl && this.customControl.errors && this.customControl.touched;
    if (shouldShowErrors)
      return true;
    return false;
   

  }

  listOfErrors(): string[] {
    return Object.keys(this.customControl.errors || {}).map(
      err => (this.errorMessagesMap as any )[err](this.customControl.getError(err))
    );
  }
}
