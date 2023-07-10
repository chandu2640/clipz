import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFireDatabase } from '@angular/fire/compat/database'
// import { AngularFirestore } from '@angular/fire/compat/firestore'



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase
    ){

  }

  inSubmission = false;

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])

  email= new FormControl('',[
    Validators.required,
    Validators.email
  ])

  age= new FormControl('',[
    Validators.required,
    Validators.min(12),
    Validators.max(50)
  ])

  password= new FormControl('',[
    Validators.required,
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  ])

  confirmPassword= new FormControl('',[
    Validators.required
  ])

  phoneNumber= new FormControl('',[
    Validators.required,
    Validators.maxLength(10),
    Validators.minLength(10)
  ])

  showAlert: boolean = false;
  alertMsg: string = "Please Wait! Your Account is being Created";
  alertColor = "blue"

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber
  })
  

  onSubmit(){
    console.log(this.registerForm.valid)
    console.log(this.registerForm.value)
  }

  async register(){
    this.showAlert = true
    this.alertMsg = "Please Wait! Your Account is being Created"
    this.alertColor = 'blue'
    this.inSubmission = true;

    const { email, password } = this.registerForm.value;
    try {
      const userCred = await this.auth.createUserWithEmailAndPassword(email as string, password as string)
    } catch (e) {
      console.log(e)
      this.alertMsg = "An unexpected error occures. Please try again later"
      this.alertColor = 'red'
      this.inSubmission = false;
      return
    }

    this.alertMsg ='Success ! Your account has been created.';
    this.alertColor = 'green'
  }

}
