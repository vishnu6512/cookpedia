import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecipesModel } from '../model/recipeModel';

@Component({
  selector: 'app-manage-recipe',
  standalone: false,
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {
  cuisineArray:any=[]
  mealTypeArray:any=[]
  recipeDetails:RecipesModel={}
  ingredientArray:any=[]
  instructionsArray:any=[]



  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllRecipes()
  }
  
  getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
        res.forEach((item:any) => {
        !this.cuisineArray.includes(item.cuisine) &&  this.cuisineArray.push(item.cuisine) 
      })
      console.log(this.cuisineArray);
      const dummyMeal=res.map((item:any)=>item.mealType)
      const flatDummyMealArray=dummyMeal.flat(Infinity)
      flatDummyMealArray.forEach((item:any) => {
        !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item)
      })
      console.log(this.mealTypeArray);
    })
  }

  //add ingredients
  addIngredient(ingredients:any){
    if(ingredients.value){
      this.ingredientArray.push(ingredients.value)
      ingredients.value=""
      console.log(this.ingredientArray);
    }
  }

  //remove ingredient
  removeIngredient(value:string){
    this.ingredientArray=this.ingredientArray.filter((item:string)=>item!=value)
    console.log(this.ingredientArray);
  }

  //add instructions
  addInstruction(instructions:any){
    if(instructions.value){
      this.instructionsArray.push(instructions.value)
      instructions.value=""
      console.log(this.instructionsArray);
    }
  }

  //remove instruction
  removeInstruction(value:string){
    this.instructionsArray=this.instructionsArray.filter((item:string)=>item!=value)
    console.log(this.instructionsArray);
  }

  
  //add recipe
  addRecipe(){
   console.log(this.recipeDetails);
    
  }

}
