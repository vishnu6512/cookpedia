import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url="http://localhost:3000"
  constructor(private http: HttpClient){ }

  getAllRecipeAPI(){
    return this.http.get(`${this.server_url}/all-recipes`)
  }

  addTestimonyAPI(reqBody:any){
    return this.http.post(`${this.server_url}/add-testimony`,reqBody)
  }

  //register user
  registerAPI(reqBody:any){
    return this.http.post(`${this.server_url}/register`,reqBody)
  }

  //login user
  loginAPI(reqBody:any){
    return this.http.post(`${this.server_url}/login`,reqBody)
  }

  //appendToken in req header
  appendToken(){
    let headers = new HttpHeaders()
    const token =sessionStorage.getItem('token')
      if(token){
        headers=headers.append('authorization',`Bearer ${token}`)
      }
      return {headers}
  }

  //view a single recipe by id
  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`,this.appendToken())
  }

  //related recipes
  relatedRecipeAPI(cuisine:string){
    return this.http.get(`${this.server_url}/related-recipe?cuisine=${cuisine}`,this.appendToken())
  }

  //dowload recipe
  downloadRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/download`,reqBody,this.appendToken())
  }

  //save recipe
  saveRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/save`,reqBody,this.appendToken())
  }

  //get user saved recipe
  getUserSavedRecipeAPI(){
    return this.http.get(`${this.server_url}/get-save-recipe`,this.appendToken())
  }

  //delete saved recipe
  deleteSavedRecipeAPI(id:string){
    return this.http.delete(`${this.server_url}/save-recipe/${id}/remove`,this.appendToken())
  }

  //get download recipe list
  getUserDownloadRecipeAPI(){
    return this.http.get(`${this.server_url}/user-download`,this.appendToken())
  }

  //user-edit
  editUserAPI(reqBody:any){
    return this.http.post(`${this.server_url}/user/edit`,reqBody,this.appendToken())
  }

  //all user list
  allUsersAPI(){
    return this.http.get(`${this.server_url}/user-list`,this.appendToken())
  }

  //get downalod list
  allDownloadListAPI(){
    return this.http.get(`${this.server_url}/download-list`,this.appendToken())
  }

  //get all tesimonials
  allTestimonialsAPI(){
    return this.http.get(`${this.server_url}/testimonial-list`,this.appendToken())
  }

  //update status feedback
  updateFeedbackStatusAPI(feedbackId:string,status:string){
    return this.http.get(`${this.server_url}/testimonial/${feedbackId}/update?status=${status}`,this.appendToken())
  }

  //get all arprroved testimonials
  allApprovedTestimonialsAPI(){
    return this.http.get(`${this.server_url}/approved-testimonials`)
  }

  //add recipes
  addRecipeAPI(reqBody:any){
    return this.http.post(`${this.server_url}/recipe/add`,reqBody,this.appendToken())
  }

  //edit recipe
  editRecipeAPI(reqBody:any){
    return this.http.put(`${this.server_url}/recipe/${reqBody._id}/edit`,reqBody,this.appendToken())
  }

  //delete recipe
  deleteRecipeAPI(recipeId:string){
    return this.http.delete(`${this.server_url}/recipe/${recipeId}/delete`,this.appendToken())
  }

}
