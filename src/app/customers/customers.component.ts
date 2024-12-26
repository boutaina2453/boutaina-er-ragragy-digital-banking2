import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CustomerService} from '../services/customer.service';
import {catchError, map, Observable, throwError} from 'rxjs';
import {CustomerModel} from '../model/customer.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {keyframes} from '@angular/animations';

@Component({
  selector: 'app-customers',
  standalone: false,

  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{
  customers! : Observable<Array<CustomerModel>>;
  errorMsg! : String;
  searchFormGroup : FormGroup | undefined;
  constructor(private customerService : CustomerService, private fb : FormBuilder) {
  }
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleSearchCustomer();
  }
  handleSearchCustomer() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMsg = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteCustomer(c: CustomerModel) {
    let conf = confirm("Are you sure you want to delete this customer?");
    if (!conf) return;
    this.customerService.deleteCustomers(c.id).subscribe({
      next : (res)=> {
        this.customers = this.customers.pipe(
          map(data => {
            let index = data.indexOf(c);
            data.slice(index, 1)
            return data;
          })
        );
      }, error: err => {
        console.log(err);
      }
    });
  }
}
