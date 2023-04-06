import {AfterViewInit, Component, forwardRef, Input} from "@angular/core";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";

export type InputType = 'text' | 'password';

@Component({
  selector: "app-input",
  template: `
    <mat-form-field class="example-full-width">
      <mat-label>{{title}}</mat-label>
      <input [type]="type" matInput [formControl]="formField" [placeholder]="title">
      <mat-error *ngIf="formField?.hasError('maxlength')">
        Maksymalna długosc to {{formField?.errors['maxlength']?.requiredLength}}
      </mat-error>
      <mat-error *ngIf="formField?.hasError('minlength')">
        Minimalna dlugosc to {{formField?.errors['minlength']?.requiredLength}}
      </mat-error>
      <mat-error *ngIf="formField?.hasError('required')">
        To pole jest wymagane
      </mat-error>
    </mat-form-field>
  `,
  styles: [],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, AfterViewInit {
  @Input() formField: any;
  @Input() type: InputType = "text";
  @Input() title = ''

  ngAfterViewInit() {
    this.verifyInputs()
  }

  verifyInputs(): void {
    if (!this.formField) {
      throw new Error('Fill formfield')
    }

    if (!this.title) {
      throw new Error('Fill title')
    }
  }

  writeValue(obj: any) {
  }

  registerOnChange(fn: any) {
  }

  registerOnTouched(fn: any) {
  }

  setDisabledState(isDisabled: boolean) {
  }
}
