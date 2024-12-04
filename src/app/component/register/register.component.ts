import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
        userName: ['', Validators.required],
        emailId: ['', [Validators.required, Validators.email]],
        gender: ['', Validators.required],
        mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$'
            )
          ]
        ],
        confirmPassword: ['', Validators.required],
        terms: [false, Validators.requiredTrue]
      },
      {
        validator: this.matchPasswords('password', 'confirmPassword')
      }
    );
  }

  // Validator to match passwords
  matchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  errorMessage = ''; // Define this variable in your component

onSubmit() {
  this.submitted = true;

  if (this.registerForm.invalid) {
    return;
  }

  const user = new User(this.registerForm.value);

  this.userService.registerUser(user).subscribe(
    response => {
      this.errorMessage = ''; // Clear any previous error messages
      alert(response.message); // Success message
      this.router.navigate(['/login']);
    },
    error => {
      if (typeof error === 'string') {
        // this.errorMessage = error; // Show the backend error message
        alert(error);
      } else {
        this.errorMessage = 'An unexpected error occurred. Please try again later.';
      }
      console.error('Error:', error);
    }
  );
}


  // Getter for form controls
  get f() {
    return this.registerForm.controls;
  }
}
