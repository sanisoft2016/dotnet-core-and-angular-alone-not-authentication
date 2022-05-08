import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styles: [
  ]
})
export class PaymentDetailsFormComponent implements OnInit {

  constructor(public service:PaymentDetailService, 
        private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(this.service.formData.paymentDetailId ==0){
        this.insertRecord(form);
    }else
    this.updateRecord(form);
  }

  insertRecord(form:NgForm){
    this.service.postPaymentDetail()//Avoid .subscribe   
    .pipe(map((data) => data))
    .toPromise()
    .then((response) => {
      var formData = new PaymentDetail();      
      formData['cardOwnerName'] = form.form.controls['cardOwnerName'].value;
      formData['cardNumber'] = form.form.controls['cardNumber'].value;
      formData['expiryDate'] = form.form.controls['expiryDate'].value;
      formData['securityCode'] = form.form.controls['securityCode'].value;
      this.service.list.push(formData);
      console.log(this.service.list);
      this.resetForm(form);
      this.toastr.success("Record added successfully", "Response Status!");
    })
    .catch((error: HttpErrorResponse) => {
        // Handle error
    });
  }
  updateRecord(form:NgForm){
    this.service.putPaymentDetail()
    .pipe(map((data) => data))
    .toPromise()
    .then((response) => {
        var itemList = this.service.list     
      //Remove the actual updated record 
      var requiredElement = itemList.filter(x => x.paymentDetailId !== this.service.formData.paymentDetailId);

        var formData = new PaymentDetail();      
        formData['cardOwnerName'] = this.service.formData.cardOwnerName;
        formData['cardNumber'] = this.service.formData.cardNumber;
        formData['expiryDate'] = this.service.formData.expiryDate;
        formData['securityCode'] = this.service.formData.securityCode;
        formData['paymentDetailId'] = this.service.formData.paymentDetailId;

        //Add the updated record with new changes
        requiredElement.push(formData);
        this.service.list = requiredElement;
        this.resetForm(form);
        //this.service.refreshPaymentList();
        this.toastr.info("Record updated successfully", "Response Status!");
      })
      .catch((error: HttpErrorResponse) => {
          // Handle error
      });
  }
  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }
}
