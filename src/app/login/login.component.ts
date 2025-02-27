import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,private api:ApiService,private router:Router) {
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern("[a-zA-Z0-9 ]*")]]
    })
  }
  login(){
    if(this.loginForm.valid){
      const email=this.loginForm.value.email
      const password=this.loginForm.value.password
      this.api.loginAPI({email,password}).subscribe({
        next:(res:any)=>{
          sessionStorage.setItem('user',JSON.stringify(res.user))
          sessionStorage.setItem('token',res.token)
          this.loginForm.reset()
          if(res.user.role=='user'){
            this.router.navigateByUrl('/')
          }else{
            this.router.navigateByUrl('/admin')
          }
        },
        error:(err:any)=>{
          alert(err.error.message)
        }
      })
    } else{
      alert("Invalid form")
    }
  }
  }
 
  

