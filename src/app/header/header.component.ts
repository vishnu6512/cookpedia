import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router:Router){}

  isLoggedIn:boolean=false
  loginUser:string=''
  ngOnInit() {
    if(sessionStorage.getItem('token') && sessionStorage.getItem('user')){
      this.isLoggedIn=true
      this.loginUser=JSON.parse(sessionStorage.getItem('user')|| "").username
    } else{
      this.isLoggedIn=false
      this.loginUser=""
    }
  }
  logout(){
    sessionStorage.clear()
    this.isLoggedIn=false
    this.loginUser=""
    this.router.navigateByUrl('/')
  }
}
