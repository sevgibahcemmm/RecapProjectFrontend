import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(environment.apiUrl + "colors/getAll");
  }

  getColorById(colorId: number): Observable<SingleResponseModel<Color>> {
    return this.httpClient.get<SingleResponseModel<Color>>(environment.apiUrl + "colors/getByColorId?colorId="+colorId);
  }

  addColor(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "colors/add", color);
  }

  updateColor(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "colors/update", color);
  }
}
