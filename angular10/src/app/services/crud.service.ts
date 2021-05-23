import { Injectable } from '@angular/core';
import{ HttpClient }from '@angular/common/http'
import { Observable }from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  readonly APIUrl = "http://127.0.0.1:8000";

  constructor(private http:HttpClient) { }

  getUserList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/accounts/api/user/');
  }

  updateUser(val:any){
    return this.http.put(this.APIUrl + '/accounts/api/user/', val);
  }

  deleteUser(val:any){
    return this.http.delete(this.APIUrl + '/accounts/api/user/'+ val);
  }

  //AddUser is Already in auth service

}
