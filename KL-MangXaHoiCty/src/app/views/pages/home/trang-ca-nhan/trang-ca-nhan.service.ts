import { HttpUtilsService } from './../../../../core/_base/crud/utils/http-utils.service';
import { environment } from './../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageModel } from '../Bai-Dang/Model/Img.model';
import { Observable } from 'rxjs';
import { TrangCaNhanModel } from './TrangCaNhan.model';
const API = environment.Apiroot;
@Injectable(
  
)
export class TrangCaNhanService {


  constructor(private http: HttpClient,
    private httpUtils: HttpUtilsService) { }


    CheckFlow(id_cr:number,id_canhan:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/CheckFlow?id_cr=${id_cr}&id_canhan=${id_canhan}`, { headers: httpHeaders });
    }


    InsertFlow(id_canhan:number,id_cr:number): Observable<any> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.post<any>(API + `/addFlow?id_canhan=${id_canhan}&id_cr=${id_cr}`, { headers: httpHeaders });
    }

    
    DeleteFlow(id_canhan:number,id_cr:number): Observable<any> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.delete<any>(API + `/DeleteFlow?id_canhan=${id_canhan}&id_cr=${id_cr}`, { headers: httpHeaders });
    }
    
    getFlow(id_canhan:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/getFlow?id_canhan=${id_canhan}`, { headers: httpHeaders });
    }
   
    getdataEdit(id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/GetDataEDit?id_baidang=${id_}`, { headers: httpHeaders });
    }
    gettrangCaNhan(id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/getTrangCaNhan?id_user=${id_}`, { headers: httpHeaders });
    }
    getBaiDangTrangCaNhan(id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/getDSBaiDangTrangCaNhan?id_user=${id_}`, { headers: httpHeaders });
    }

    getGioiThieu(id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/getGioiThieu?id_user=${id_}`, { headers: httpHeaders });
    }
    getRanDomAnh(id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/getRanDoomAnh?id_user=${id_}`, { headers: httpHeaders });
    }
  
      ChangeAnhBia(id_:number,_item: ImageModel): Observable<boolean> {
        const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.post<any>(API+`/UpdateAnhBia?id_canhan=${id_}`, _item,{ headers: httpHeaders });
    }

    ChiaSeBaiDang(id_user:number,id_bd:number): Observable<boolean> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.post<any>(API+`/ShareBaiDang?id_user=${id_user}&id_baidang=${id_bd}`,{ headers: httpHeaders });
      
  }

  DeleteBaiDangCaNhan(id_:number,): Observable<boolean> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.delete<any>(API+`/deleteBaiDangChiaSe?id_baidangcanhan=${id_}`,{ headers: httpHeaders });
}

UpdateTieuSu(item:TrangCaNhanModel): Observable<any> {
  const httpHeaders = this.httpUtils.getHTTPHeaders();
  return this.http.post<any>(API + '/UpdateTrangCaNhan', item, { headers: httpHeaders });
}
}
