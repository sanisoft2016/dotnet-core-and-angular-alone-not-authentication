import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup} from '@angular/forms'
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  //formValue !: FormGroup
  
  constructor(public service: PaymentDetailService, private toastr:ToastrService) { }
  
 /*  ngOnInit(): void {
    this.formValue= this.formBuilder.group({
      firstName:[''],
      lastName: [''],
      email:[''],
      mobile:[''],
      salary:0
    })
  } */
  ngOnInit(): void {
    this.service.refreshPaymentList();
  }

  populateForm (selectedRecord: PaymentDetail){
      this.service.formData = Object.assign({},selectedRecord);
  }
  onDelete(id:number){
    if(confirm("Are you sure you want to detele this record?")){
      this.service.deletePaymentDetailById(id)
      .pipe(map((data) => data))
      .toPromise()
      .then((response) => {
            this.service.refreshPaymentList();
            this.toastr.error("Record Deleted Successfully", "Response Status!");
          })
          .catch((error: HttpErrorResponse) => {
            // Handle error
        });
    }
  }

  onDelete2(id:number)
  {
    if(confirm("Are you sure you want to detele this record?"))
    {
      this.service.deletePaymentDetailById(id)
      .pipe(map((data) => data))
      .toPromise()
      .then((response) => {
        this.service.refreshPaymentList2();
        this.toastr.error("Record Deleted Successfully", "Response Status!");
      })
      .catch((error: HttpErrorResponse) => {
        
        this.toastr.error(error.status.toString(), "Response Status!");
      });
    }
}
/* mapToAddress(): Observable<Address[]> {
  this.getClients.pipe(
    map((clients: Client[]) => clients.map(client => client.address))
  )
} */
}