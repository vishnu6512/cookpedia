import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-view-recipes',
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './view-recipes.component.html',
  styleUrl: './view-recipes.component.css'
})
export class ViewRecipesComponent {
  recipeId:string='';
  recipe:any={};
  allRelatedRecipe:any=[];

  constructor( private router:ActivatedRoute, private api:ApiService){ }

  ngOnInit(){
    this.router.params.subscribe((res:any)=>{
      this.recipeId = res.id
      console.log(this.recipeId);
      this.getRecipeDetails(this.recipeId)
      
    })
  }

  getRecipeDetails(recipeId:string){
    this.api.viewRecipeAPI(recipeId).subscribe((res:any)=>{
      this.recipe = res;
      console.log(this.recipe);
      this.getAllRelatedRecipes(res.cuisine)
    })
  }
  
  getAllRelatedRecipes(cuisine:string){
    this.api.relatedRecipeAPI(cuisine).subscribe((res:any)=>{
      if(res.length>1)
        {this.allRelatedRecipe = res.filter((item:any)=>item.name!=this.recipe.name);
      console.log(this.allRelatedRecipe);}
      else{
        this.allRelatedRecipe=[]
      }
    })
  }
}
