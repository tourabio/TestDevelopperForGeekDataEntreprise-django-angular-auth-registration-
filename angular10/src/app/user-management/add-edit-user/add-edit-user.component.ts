import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  @Input() user:any;
  password:string;
  email:string;
  id:string
  constructor(private auth: AuthService,
    private serviceCrud : CrudService) { }

  ngOnInit(): void {
    this.password = this.user.password;
    this.email = this.user.email;
    this.id = this.user.id;
  }
  addUser(){

    var val = {
      password : this.password,
      email : this.email
    };
    this.auth.register(val).subscribe(
      (res: any) => {
        console.log('HTTP response', res);
        if (res.response)
          alert('User Added successfully');
        else
          alert('account with this email already exists .');
      },
      (err: any) => {
        console.log('HTTP Error', err)
        alert('User failed to register  : ' + err);
      },
      () => console.log('HTTP request completed.')
    )

  }

  editUser(){
    var val = {
      password : this.password,
      email : this.email,
      id : this.id
    };
    this.serviceCrud.updateUser(val).subscribe(res=>{
      alert(res.toString());
    })
    // update User has some issue (inserting instead of updating user) fixed it by deleting the old one
    this.serviceCrud.deleteUser(this.id).subscribe(res=>{
    });

  }

}
