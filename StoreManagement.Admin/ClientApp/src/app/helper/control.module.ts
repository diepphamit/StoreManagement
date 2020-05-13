import { NgModule } from '@angular/core';
import { ControlMessagesComponent } from './control-messages.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ControlMessagesComponent
  ],
  exports: [
    ControlMessagesComponent
  ]
})
export class ControlModule { }
