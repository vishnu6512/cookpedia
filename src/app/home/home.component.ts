import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  allRecipes:any=[]
  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllRecipes()
    this.getAllTestimonials()
  }
  
  getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      this.allRecipes = res.slice(0,6)
      console.log(this.allRecipes);
    })
  }

  //all approved tesimonials
  allTestimonials:any=[]
  getAllTestimonials(){
    this.api.allTestimonialsAPI().subscribe((res:any)=>{
      this.allTestimonials=res
      console.log(this.allTestimonials);
    })
  }


}
