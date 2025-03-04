import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ProfileComponent } from './profile/profile.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';
import { ViewRecipesComponent } from './view-recipes/view-recipes.component';
import { PnfComponent } from './pnf/pnf.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DownloadListComponent } from './admin/download-list/download-list.component';
import { RecipeListComponent } from './admin/recipe-list/recipe-list.component';
import { ManageRecipeComponent } from './admin/manage-recipe/manage-recipe.component';

export const routes: Routes = [
   //lazy loading
   {path:"admin",loadChildren:()=>import("./admin/admin.module").then(m=>m.AdminModule)},
   
   //


   // http://localhost:4200/

   {path:"",component:HomeComponent, title:"Home"},
   {path:"about",component:AboutComponent, title:"About"},
   {path:"contact",component:ContactComponent, title:"Contact"},
   {path:"login",component:LoginComponent, title:"Login"},
   {path:"register",component:RegisterComponent, title:"Register"},
   {path:"all-recipes",component:RecipesComponent, title:"All Recipes"},
   {path:"profile",component:ProfileComponent, title:"Profile"},
   {path:"save-recipe",component:SavedRecipesComponent, title:"Saved Recipes"},
   {path:"recipe/:id/view",component:ViewRecipesComponent, title:"View Recipe"},
   {path:"**",component:PnfComponent, title:"Page not found"},




];
