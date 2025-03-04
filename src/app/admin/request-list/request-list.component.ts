import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent {

  requests: any[] = [];
  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllTestimonials()
  }
  getAllTestimonials(){
    this.api.allTestimonialsAPI().subscribe((res:any)=>{
      this.requests=res
      console.log(this.requests);

    })
  }

   //update status
   updateFeedbackStatus(id:any,status:any){
  
    this.api.updateFeedbackStatusAPI(id,status).subscribe((res:any)=>{
      this.getAllTestimonials()
    })
  }

}
