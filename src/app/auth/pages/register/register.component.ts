import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  register() {
    console.log(this.myForm.value);
    const {name, email, password} = this.myForm.value;
    this.authService.register(name, email, password)
      .subscribe(valid => {
        if (valid === true) {
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', valid, 'error');
        }
      });
  }

}
