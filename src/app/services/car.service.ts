import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { CarStandart } from '../models/car-standart';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient:HttpClient) { }

  getCars() : Observable<ListResponseModel<Car>>{
    let newPath = environment.apiUrl + "cars/getAllDetail";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number) : Observable<ListResponseModel<Car>>{
    let newPath = environment.apiUrl + "cars/getByBrandId?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number) : Observable<ListResponseModel<Car>>{
    let newPath = environment.apiUrl + "cars/getByColorId?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarByIdDetail(carId: number) : Observable<ListResponseModel<Car>>{
    let newPath = environment.apiUrl + "cars/getByDetaiCarId?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(carId: number) : Observable<SingleResponseModel<CarStandart>>{
    let newPath = environment.apiUrl + "cars/getByCarId?carId="+carId;
    return this.httpClient.get<SingleResponseModel<CarStandart>>(newPath);
  }

  getCarsByColorAndBrand(colorId:number, brandId:number) : Observable<ListResponseModel<Car>>{
    let newPath = environment.apiUrl + "cars/getByColorIdAndBrandId?colorId="+colorId+"&brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  addCar(car: CarStandart) : Observable<ResponseModel>{
    let newPath = environment.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  updateCar(car: CarStandart) : Observable<ResponseModel>{
    let newPath = environment.apiUrl + "cars/update";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
}
