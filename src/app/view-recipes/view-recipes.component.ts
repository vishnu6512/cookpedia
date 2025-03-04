import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
@Component({
  selector: 'app-view-recipes',
  imports: [HeaderComponent,FooterComponent,RouterLink ],
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


  downloadRecipe(){
    const recipeData = {
      recipeName: this.recipe.name,
      recipeCuisine: this.recipe.cuisine,
      recipeImage: this.recipe.image
    };
    
    this.api.downloadRecipeAPI(this.recipeId, recipeData).subscribe({
      next: (res:any) => {
        console.log(res);      
        this.generatePDF();
      },
      error: (err:any) => {
        console.error('Download error:', err);
        alert('Failed to record download');
        // Still generate the PDF even if recording the download fails
        this.generatePDF();
      }
    });
  }

  //generatePDF
  // generatePDF(){
  //   let pdf = new jsPDF()
  //   pdf.setFont('helvetica','bold')
  //   pdf.setFontSize(20)
  //   pdf.text(`Recipe Name: ${this.recipe.name}`,10,10)
  //   pdf.setFontSize(10)
  //   pdf.text(`Cuisine: ${this.recipe.cuisine}`,10,20)
  //   pdf.text(`Serving: ${this.recipe.servings}`,10,30)
  //   pdf.text(`preparation time: ${this.recipe.prepTimeMinutes}`,10,40)
  //   pdf.text(`cooking time: ${this.recipe.cookTimeMinutes}`,10,50)
  //   pdf.text(`Calories per serving: ${this.recipe.caloriesPerServing}`,10,60)
    
  //   let head= [[`Ingredients`, `Cooking Instructions`]]
  //   let body= []
  //   body.push([this.recipe.ingredients, this.recipe.instructions])   
  //   autoTable(pdf, {head, body,startY:70})
  //   pdf.output('dataurlnewwindow')
  //   pdf.save('recipe.pdf')
  // }
  generatePDF() {
    let pdf = new jsPDF();
  
    // Set title font
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(22);
    pdf.text(`Recipe Name: ${this.recipe.name}`, 10, 15);
  
    // Set regular font for details
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    let details = [
      `Cuisine: ${this.recipe.cuisine}`,
      `Servings: ${this.recipe.servings}`,
      `Preparation Time: ${this.recipe.prepTimeMinutes} mins`,
      `Cooking Time: ${this.recipe.cookTimeMinutes} mins`,
      `Calories per Serving: ${this.recipe.caloriesPerServing}`
    ];
  
    // Print details with spacing
    let y = 25;
    details.forEach(detail => {
      pdf.text(detail, 10, y);
      y += 8; // Add spacing between lines
    });
  
    // Add table with improved layout
    let head = [["Ingredients", "Cooking Instructions"]];
    let body = [[this.recipe.ingredients.join(", "), this.recipe.instructions]];
  
    autoTable(pdf, {
      head,
      body,
      startY: y + 5,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: { fillColor: [22, 160, 133], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [240, 240, 240] }
    });
  
    // Save and display PDF
    pdf.save(`${this.recipe.name}.pdf`);
  }

  //save recipe
  saveRecipe(){
    this.api.saveRecipeAPI(this.recipeId,this.recipe).subscribe({
      next:(res)=>{
       alert("successfully added to saved recipes") 
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    }
    )
  }
  
}
