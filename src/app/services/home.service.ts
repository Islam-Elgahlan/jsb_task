import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _HttpClient:HttpClient) { }

  getUsers():Observable<any>{
    return this._HttpClient.get("https://reqres.in/api/users?page=1");
  }
  send(sendValues:any):Observable<any>{
    return this._HttpClient.post("http://upskilling-egypt.com:3000/contact", sendValues)
  }
}
