import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalPost } from '../models/rentalPost';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {


  constructor(private httpClient: HttpClient) { }

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = environment.apiUrl + "rentals/getAllDetail";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalByCarId(carId:number) : Observable<SingleResponseModel<Rental>>{
    let newPath = environment.apiUrl + "rentals/getByCarId?carId="+carId;
    return this.httpClient.get<SingleResponseModel<Rental>>(newPath);
  }

  postRentAdd(rentalPost: RentalPost) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "rentals/add", rentalPost);
  }
}
