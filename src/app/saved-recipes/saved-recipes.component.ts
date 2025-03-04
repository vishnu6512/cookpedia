import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';
ApiService
@Component({
  selector: 'app-saved-recipes',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.css'
})
export class SavedRecipesComponent {
  //create a property to store array of saved recipe
  allRecipes:any=[]
  //api servicve dependcy injection
  constructor(private api:ApiService){}
  //call the function inside ngOnInit()
  ngOnInit(){
    this.getAllSavedRecipe()
  }
  //define function to call api
  getAllSavedRecipe(){
    this.api.getUserSavedRecipeAPI().subscribe((res:any)=>{
      this.allRecipes = res
      console.log(this.allRecipes);
      
    })
  }

  //remove from save recipe
  removeSaveRecipe(id:string){
    this.api.deleteSavedRecipeAPI(id).subscribe((res:any)=>{
      console.log(res);
      this.getAllSavedRecipe()
    })
  }

}
