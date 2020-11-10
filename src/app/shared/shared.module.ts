import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorsComponent } from './control-errors/control-errors.component';



@NgModule({
  declarations: [ControlErrorsComponent],
  imports: [
    CommonModule
  ],
  exports: [ControlErrorsComponent]
})
export class SharedModule { }
