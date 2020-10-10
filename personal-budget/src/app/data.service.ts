import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  x = undefined;
  public dataImport():Observable<any> {
    if (this.x == undefined){
      // console.log(this.x +"i am here" );
      this.x = this.http.get('http://localhost:3000/budget');
    }
    return this.x;
  }
}
