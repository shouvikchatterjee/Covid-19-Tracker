import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService {
  globalDataUrl = 'https://api.covid19api.com/summary';
  subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  getGlobalDatas() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    this.http.get(this.globalDataUrl, { headers }).subscribe(datas => {
      this.subject.next(datas);
    }, error => {
      console.log('error:', error);
    });
  }

  getDatas():Observable<any>{
    return this.subject.asObservable();
  }

}
