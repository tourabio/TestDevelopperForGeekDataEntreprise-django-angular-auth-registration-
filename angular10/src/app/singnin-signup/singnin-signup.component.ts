import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-singnin-signup',
  templateUrl: './singnin-signup.component.html',
  styleUrls: ['./singnin-signup.component.css']
})
export class SingninSignupComponent implements OnInit {

  constructor(private auth: AuthService) { }
  myForm: FormGroup;
  login: boolean = true;
  myFormRegister: FormGroup;
  passwordMissMatch: boolean = false;
  logged: boolean = false;
  is_admin:boolean;
  ngOnInit(): void {
    //loginForm
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl('', Validators.required),
    })
    //registerForm
    this.myFormRegister = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
    })
  }
  //loginForm
  get f() {
    return this.myForm.controls;
  }
  //registerForm
  get fRegister() {
    return this.myFormRegister.controls;
  }
  //submitting loginForm
  onSubmit() {
    if (this.myForm.valid) {
      this.auth.login(this.f.email.value, this.f.password.value).pipe(first()).subscribe(
        (res: any) => {
          console.log('HTTP response', res);
          alert('User Succesfully loggedIn with token : ' + res.token);
          this.logged = true;
          //check whether the user is admin or not
          res.is_admin == true ? this.is_admin = true : this.is_admin = false ;
        },
        (err: any) => {
          console.log('HTTP Error', err)
          alert('User failed to logIn  : ' + err.error.non_field_errors[0]);
        },
        () => console.log('HTTP request completed.')
      )
    }
  }

  //logout to free the localStorage 
  logout(){
    this.auth.logout();
    this.logged = false;
  }
    //submitting RegisterForm
  onSubmitRegister() {
    if (this.fRegister.password.value !== this.fRegister.password2.value) {
      this.passwordMissMatch = true;
    }
    else {
      this.passwordMissMatch = false;
      var val = {
        password: this.fRegister.password.value,
        email: this.fRegister.email.value,
      };

      this.auth.register(val).subscribe(
        (res: any) => {
          console.log('HTTP response', res);
          if (res.response)
            alert('User Added successfully');
          else
            alert('account with this email already exists .');
        },
        (err: any) => {
          console.log('HTTP Error', err)
          alert('User failed to register  : ' + err);
        },
        () => console.log('HTTP request completed.')
      )

    }
  }




  switchToSignIn() {
    this.login = true;
  }
  switchToSignUp() {
    this.login = false;
  }

}
