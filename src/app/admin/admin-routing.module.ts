import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';
import { RequestListComponent } from './request-list/request-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  //admin
  {path:"",component:DashboardComponent, title:"Admin"},
  //download-list
  {path:"download-list",component:DownloadListComponent, title:"Download List"},
  //recipe-lisst
  {path:"recipe-list",component:RecipeListComponent, title:"Recipe List"},
  //add-recipe
  {path:"recipe/add",component:ManageRecipeComponent, title:"add recipe"},
  //edit recipe
  {path:"recipe/:id/edit",component:ManageRecipeComponent, title:"edit recipe"},
  //request-list
  {path:"request-list",component:RequestListComponent, title:"Request List"},
  //sidebar
  {path:"sidebar",component:SidebarComponent, title:"Sidebar"},
  //user-list
  {path:"user-list",component:UsersListComponent, title:"User List"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { 
  
}
