import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  userList : any[];
  ModalTitle:String;
  ActivateAddEditUserComp:boolean=false;
  user:any;

  constructor(private service : CrudService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.refreshUserList();
  }

  refreshUserList(){
    this.service.getUserList().subscribe(data=>{
     this.userList = data;
    })
  }

  addClick(){
    this.user = {
      id:0,
      email:"",
      password:""
    }
    this.ModalTitle = "Add User";
    this.ActivateAddEditUserComp=true;

   }


   
 editClick(item){
  this.user = item;
  this.ModalTitle = "Edit User";
  this.ActivateAddEditUserComp=true;
 }

 closeClick(){
  this.ActivateAddEditUserComp = false;
  this.refreshUserList();
 }
 deleteClick(item){
  if(confirm('Are you sure ??')){
    this.service.deleteUser(item.id).subscribe(res=>{
      alert(res.toString());
      this.refreshUserList();
    });
    
  }

}
logout(){
  this.auth.logout();
  this.router.navigate([''])
}
}
