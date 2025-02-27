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
    const headers = this.appendToken();
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`,headers)
  }

  //related recipes
  relatedRecipeAPI(cuisine:string){
    const headers = this.appendToken();
    return this.http.get(`${this.server_url}/related-recipe?cuisine=${cuisine}`,headers)
  }

}
