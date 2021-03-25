import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarImage } from '../models/car-image';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  constructor(private httpClient : HttpClient) { }

  getCarImages() : Observable<ListResponseModel<CarImage>>{
    let newPath = environment.apiUrl + "carimages/getAll";
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarImagesById(carId: number) : Observable<ListResponseModel<CarImage>>{
    let newPath = environment.apiUrl + "carimages/getImagesByCarId?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  } 
}
