import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../shared/services/auth/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    loginForm!: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService) {
        this.createLoginForm();
    }

    login(ev: Event): void {
        ev.preventDefault();

        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();

            return;
        }

        //call do api po logowanie

        this.authService.login();
    }

    private createLoginForm(): void {
        this.loginForm = this.fb.group({
            login: ["", [Validators.required, Validators.maxLength(64), Validators.minLength(3)]],
            password: ["", [Validators.required, Validators.maxLength(64), Validators.minLength(3)]],
        });
    }
}
