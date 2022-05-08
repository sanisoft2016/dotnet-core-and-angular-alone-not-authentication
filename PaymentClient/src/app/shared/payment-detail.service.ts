import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor(private http: HttpClient) { }


  readonly baseURL = 'http://localhost:41302/api/PaymentDetails/PostPaymentDetails';
  readonly baseURLAndGetList = 'http://localhost:41302/api/PaymentDetails/GetPaymentList';
  readonly baseURLAndPaymentDetailGet = 'http://localhost:41302/api/PaymentDetails/GetPaymentDetails';
  readonly baseURLAndUpdatePut = 'http://localhost:41302/api/PaymentDetails/PutPaymentDetails';
  readonly baseURLAndDelete = 'http://localhost:41302/api/PaymentDetails/DeletePaymentDetails';


  list: PaymentDetail[];
  list2$ !: Observable<PaymentDetail[]>;
  formData: PaymentDetail = new PaymentDetail();//

  postPaymentDetail() {
    return this.http.post(this.baseURL, this.formData);
  }

  putPaymentDetail() {
    return this.http.put(this.baseURLAndUpdatePut, this.formData);
  }

  getPaymentDetailById(id: number) {
    return this.http.get(`${this.baseURLAndPaymentDetailGet}/${id}`);
  }

  deletePaymentDetailById(id: number) {
    return this.http.delete(`${this.baseURLAndDelete}/${id}`);
  }

  refreshPaymentList() {
    this.http.get(this.baseURLAndGetList)
      .toPromise()
      .then(res => this.list = res as PaymentDetail[]);
  }

  refreshPaymentList2() {
    this.list2$ = this.http.get(this.baseURLAndGetList)
    .pipe(map((data) => data as PaymentDetail[]));
  }

}
