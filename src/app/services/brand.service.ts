import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
 
  constructor(private httpClient : HttpClient) { }

  getBrands() : Observable<ListResponseModel<Brand>>{
    let newPath = environment.apiUrl + "brands/getAll";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getBrandById(brandId: number): Observable<SingleResponseModel<Brand>>{
    return this.httpClient.get<SingleResponseModel<Brand>>(environment.apiUrl + "brands/getByBrandId?brandId=" + brandId);
  }

  addBrand(brand: Brand) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "brands/add", brand);
  }

  updateBrand(brand: Brand) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "brands/update", brand);
  }
}
