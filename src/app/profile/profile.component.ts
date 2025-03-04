import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  allUserDownloadList:any[]=[]
  profileImage:string="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUNMRwuyL-vzN0JKepyeGSPVs3EPvagC_hRw&s"
  constructor(private api:ApiService){}

  ngOnInit(){
    this.getUserDownloads()
    const user = JSON.parse(sessionStorage.getItem("user")||"")
    if(user && user.profilePic) {
        this.profileImage = user.profilePic
    }
}

  getUserDownloads(){
    this.api.getUserDownloadRecipeAPI().subscribe((res:any)=>{
      this.allUserDownloadList=res
      console.log(this.allUserDownloadList);
      
    })
  }

  getfile(event:any){
    let uploadFile = event.target.files[0]
    console.log(uploadFile);
    //convert file to turl
    let fr =new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload=(event:any)=>{
      console.log(event.target.result);
      this.profileImage=event.target.result
      
    }
    console.log(this.profileImage);
    
  }

  updateProfile(){
    this.api.editUserAPI({profilePic:this.profileImage}).subscribe((res:any)=>{
    sessionStorage.setItem("user",JSON.stringify(res))
    this.profileImage=res.profilePic   
    console.log(res);
     
    })
  }

  
    
}
