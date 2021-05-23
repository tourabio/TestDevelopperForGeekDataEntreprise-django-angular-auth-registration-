import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';// This is where I import map operator
import { Subject } from 'rxjs';

const httpOptions :any = {
  headers : new Headers({
    'Content-Type':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSubject = new Subject<boolean>();

  readonly api_url = "http://127.0.0.1:8000/"
  constructor(private http:HttpClient) { }


  login(username:string, password:string){
    return this.http.post<any>(this.api_url + 'accounts/api/auth/',
    {username, password},httpOptions).pipe(
      map((user:any)=>{
        if(user && user.token){
          localStorage.setItem("currentUser",JSON.stringify(user));
        }
        return user;
      })
    );
  }
  register(val:any){
    return this.http.post(this.api_url + 'accounts/api/register/', val);
  }
  logout(){
    localStorage.removeItem('currentUser');
  }


}
