import {NgModule} from "@angular/core";

import {LoginRoutingModule} from "./login-routing.module";
import {LoginComponent} from "./login.component";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {InputComponent} from "../../shared/components/input/input.component";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [LoginComponent],
  imports: [LoginRoutingModule, ReactiveFormsModule, MatInputModule, InputComponent, MatButtonModule],
  providers: [],
})
export class LoginModule {
}
