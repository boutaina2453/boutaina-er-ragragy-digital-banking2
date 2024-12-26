import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerModel} from '../model/customer.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root' //dispo dans la racine du prj on peur l;injecter directement
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  public getCustomers(): Observable<Array<CustomerModel>>{
    return this.http.get<Array<CustomerModel>>(environment.backendHost +"/customers")
  }

  public searchCustomers(keyword : string): Observable<Array<CustomerModel>>{
    return this.http.get<Array<CustomerModel>>(environment.backendHost +"/customers/search?keyword=" +keyword)
  }

  public saveCustomers(customer : CustomerModel): Observable<CustomerModel>{
    return this.http.post<CustomerModel>(environment.backendHost +"/customers", customer)
  }

  public deleteCustomers(id : number){
    return this.http.delete<CustomerModel>(environment.backendHost +"/customers/"+id)
  }
}
