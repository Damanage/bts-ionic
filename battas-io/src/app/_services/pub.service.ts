import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';





@Injectable({
  providedIn: 'root'
})
export class PubService {

  constructor(private http: HttpClient) { }

  getAllPubs(){
    const httpXOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Allow-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };
    let pubs = this.http.get(`api/pub`)
    console.log("message from service");
    return pubs;
  }
}
