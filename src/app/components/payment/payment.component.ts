import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CartItem } from 'src/app/models/cart-item';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { RentalPost } from 'src/app/models/rentalPost';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount: number;
  months:number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  years:number[] = [];
  constructor(private carDetailService: CarService,
    private router: Router, private toastrService: ToastrService, private paymentService: PaymentService,
    private rentalService: RentalService
  ) { }
  rental: Rental;
  cars: Car[] = [];
  payment: Payment;
  calculatedRentPrice:number;
  ngOnInit(): void {
    this.getCart();
    console.log(this.cartItems);
    this.getCarDetail(this.cartItems[0].rental.carId);
    this.createYearsArray();

  }

  createYearsArray(){
    let currentYear:number = new Date().getFullYear();
    for(let i = currentYear; i <= currentYear+15;i++){
      this.years.push(i);
    }
  }

  getCarDetail(id: number) {
    this.carDetailService.getCarByIdDetail(id).subscribe(response => {
      this.cars = response.data;
      console.log(this.cars);

      if (this.cartItems[0].rental.returnDate != null) {
        var rentDate = new Date(this.cartItems[0].rental.rentDate);
        var returnDate = new Date(this.cartItems[0].rental.returnDate);
        var difference = returnDate.getTime() - rentDate.getTime();
        var calculatedDays = Math.ceil(difference / (1000 * 3600 * 24));
      } else {
        var calculatedDays = 0;
      }
      this.calculatedRentPrice = calculatedDays * this.cars[0].dailyPrice;

    })
  }

  getCart() {
    this.cartItems = this.paymentService.listCart();
  }

  postRent(cartItem: CartItem) {

    let rental: RentalPost = {
      carId: cartItem.rental.carId,
      customerId: cartItem.rental.customerId,
      rentDate: cartItem.rental.rentDate,
      returnDate: cartItem.rental.returnDate ? cartItem.rental.returnDate : null,

    }
    console.log(rental);

    this.rentalService.postRentAdd(rental).subscribe(response => {
      if (response.success) {
        this.toastrService.success("Kiralama i??lemi ba??ar??yla ger??ekle??ti.");
        this.router.navigate(['/cars']);
        this.toastrService.info("Ara?? kiralama ba??ar??yla tamamland?? ana sayfaya d??n??yorsunuz.");
      } else {
        this.toastrService.error("Kiralama i??lemi ger??ekle??emedi.");

      }
    })
  }

  postPayment(cartItem: CartItem) {
    if (cartItem.rental.returnDate != null) {
      var rentDate = new Date(cartItem.rental.rentDate);
      var returnDate = new Date(cartItem.rental.returnDate);
      var difference = returnDate.getTime() - rentDate.getTime();
      var calculatedDays = Math.ceil(difference / (1000 * 3600 * 24));
    } else {
      var calculatedDays = 0;
    }


    let payment: Payment = {
      carId: this.cartItems[0].rental.carId,
      userId: this.cartItems[0].rental.customerId,
      totalAmount: this.cars[0].dailyPrice * calculatedDays
    }
    console.log(payment);

    this.paymentService.addPayment(payment).subscribe(response =>{
      if (response.success == true) {
        this.toastrService.success("??deme i??lemi ger??ekle??ti.");
        this.postRent(cartItem);
      }else{
        this.toastrService.success("??deme esnas??nda bir problem olu??tu.");
      }
    });
  }

}
