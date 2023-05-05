import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Searchrequest } from './searchrequest';
import { Searchresponse } from './searchresponse';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  private baseUrl='http://localhost:8080';
   constructor(private httpClient : HttpClient) {
   }

   getPlanNames() : Observable<any>{
    return this.httpClient.get<string[]>(`${this.baseUrl}/planname`);
   }

   getPlanStatus(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/planstatus`);
   }

   search(request : Searchrequest) : Observable<Searchresponse[]>{
     return this.httpClient.post<Searchresponse[]>(`${this.baseUrl}/search`,request);
   }
  //  getEmployeeList(SearchReport:SearchReport):Observable<CitizenPlan[]>{
  //   return this.httpClient.post<CitizenPlan[]>(`${this.baseUrl}/search`,SearchReport,{responseType:"json"});
  // }
   getExcel() {
     return this.httpClient.get<any>(`http://localhost:8080/excel`, {responseType : 'arraybuffer' as 'json'});
   }

   getPdf() {
    return this.httpClient.get<any>(`http://localhost:8080/pdf`, {responseType : 'arraybuffer' as 'json'});
  }
}