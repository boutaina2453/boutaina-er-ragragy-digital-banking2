import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomerModel} from '../model/customer.model';
import {CustomerService} from '../services/customer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-customer',
  standalone: false,

  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})

export class NewCustomerComponent implements OnInit{
  newCustomerFormGroup! : FormGroup;
  constructor(private fb : FormBuilder, private customerService: CustomerService, private router:Router) {
  }
  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      email : this.fb.control(null, [Validators.required, Validators.email])
    });
  }

  handleSaveCustomer() {
    let customer: CustomerModel = this.newCustomerFormGroup.value;
    this.customerService.saveCustomers(customer).subscribe({
      next : data => {
        alert("Your customer has been saved successfully");
        //this.newCustomerFormGroup.reset();
        this.router.navigateByUrl("/customers");
      },error : err => {
        console.log(err);
      }
    });
  }

  protected readonly FormGroup = FormGroup;
}
