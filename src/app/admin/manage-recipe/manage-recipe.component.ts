import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecipesModel } from '../model/recipeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipe',
  standalone: false,
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {

  @Input() id !:string
  cuisineArray:any=[]
  mealTypeArray:any=[]
  recipeDetails:RecipesModel={}
  ingredientArray:any=[]
  instructionsArray:any=[]
  mealArray:any=[]



  constructor(private api:ApiService,private router:Router){}

  ngOnInit(){
    this.getAllRecipes()
  }
  
  getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{

      if(this.id){
        this.recipeDetails=res.find((item:any)=>item._id==this.id)
        this.ingredientArray=this.recipeDetails.ingredients
        this.instructionsArray=this.recipeDetails.instructions
        this.mealArray=this.recipeDetails.mealType
      }

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
  addRecipe() {
    // add ingredients
    this.recipeDetails.ingredients = this.ingredientArray;
    this.recipeDetails.instructions = this.instructionsArray;
    this.recipeDetails.mealType = this.mealArray;

    // check all fields have value in recipe details
    const { name,image,cuisine,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,caloriesPerServing,mealType } = this.recipeDetails;
    
    if (!name || !image || !cuisine || !ingredients || !instructions || !prepTimeMinutes || !cookTimeMinutes || !servings || !difficulty || !caloriesPerServing || !mealType) {
        alert("Fill all fields in the form");
    }

    // if all values present then API call
    this.api.addRecipeAPI(this.recipeDetails).subscribe({
      next:(res:any)=>{
        alert("Recipe Added Successfully");
        this.recipeDetails={}
        this.ingredientArray=[]
        this.instructionsArray=[]
        this.mealArray=[]
        this.router.navigateByUrl("/admin/recipe-list")
      },
      error:(reason:any)=>{
        alert(reason.error);
        this.recipeDetails.name=""
      }
    }
    );
}

//update recipe
editRecipe() {
  // add ingredients
  this.recipeDetails.ingredients = this.ingredientArray;
  this.recipeDetails.instructions = this.instructionsArray;
  this.recipeDetails.mealType = this.mealArray;

  // check all fields have value in recipe details
  const { name,image,cuisine,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,caloriesPerServing,mealType } = this.recipeDetails;
  
  if (!name || !image || !cuisine || !ingredients || !instructions || !prepTimeMinutes || !cookTimeMinutes || !servings || !difficulty || !caloriesPerServing || !mealType) {
      alert("Fill all fields in the form");
  }

  // if all values present then API call
  this.api.editRecipeAPI(this.recipeDetails).subscribe({
    next:(res:any)=>{
      alert("Recipe Added Successfully");
      this.recipeDetails={}
      this.ingredientArray=[]
      this.instructionsArray=[]
      this.mealArray=[]
      
      this.router.navigateByUrl("/admin/recipe-list")
    },
    error:(reason:any)=>{
      alert(reason.error);
      this.recipeDetails.name=""
    }
  }
  );
}

  //meal type select
  mealTypeSelect(event:any){
    if(event.target.checked){
      this.mealArray.includes(event.target.name) || this.mealArray.push(event.target.name)

    }
    else{
      this.mealArray=this.mealArray.filter((item:string)=>item!=event.target.name)
    }
    console.log(this.mealArray);
    
  }

  //removeMealType
  removeMealType(meal:string){
    this.mealArray=this.mealArray.filter((item:string)=>item!=meal)
    console.log(this.mealArray);
  }

  uncheckMealType(mealType: string) {
    const checkbox = document.getElementById(mealType) as HTMLInputElement;
    if (checkbox) {
        checkbox.checked = false;
    }
}

}
