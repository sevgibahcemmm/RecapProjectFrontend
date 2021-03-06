import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/cart-item';
import { CartItems } from '../models/cart-items';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { RentalPost } from '../models/rentalPost';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient : HttpClient) { }

  addPayment(payment:Payment) : Observable<ResponseModel>{
    let newPath = environment.apiUrl + "Payments/add"
    return this.httpClient.post<ResponseModel>(newPath, payment);
  }

  addToCart(rental:RentalPost){
    //let item = CartItems.find(r => r.rental.carId === rental.carId);
    let cartItem = new CartItem();
    cartItem.rental = rental;
    CartItems.push(cartItem);
  }

  listCart(): CartItem[]{
    return CartItems;
  }
}
