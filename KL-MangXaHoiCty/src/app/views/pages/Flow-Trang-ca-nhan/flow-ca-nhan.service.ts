import { HttpUtilsService } from './../../../core/_base/crud/utils/http-utils.service';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const API= environment.Apiroot
@Injectable(
 
)
export class FlowCaNhanService {

 
  constructor(private http: HttpClient,
    private httpUtils: HttpUtilsService) { }
   
    
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
    getBaiDangFlowTrangCaNhan(id_crr:number,id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/getDSBaiDangFlowTrangCaNhan?id_curent=${id_crr}&id_user=${id_}`, { headers: httpHeaders });
    }

    getGioiThieu(id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/getGioiThieu?id_user=${id_}`, { headers: httpHeaders });
    }
    getRanDomAnh(id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/getRanDoomAnh?id_user=${id_}`, { headers: httpHeaders });
    }
  
   
    ChiaSeBaiDang(id_user:number,id_bd:number): Observable<boolean> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.post<any>(API+`/ShareBaiDang?id_user=${id_user}&id_baidang=${id_bd}`,{ headers: httpHeaders });
      
  }

  DeleteBaiDangCaNhan(id_:number,): Observable<boolean> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.delete<any>(API+`/deleteBaiDangChiaSe?id_baidangcanhan=${id_}`,{ headers: httpHeaders });
}

// UpdateTieuSu(item:TrangCaNhanModel): Observable<any> {
//   const httpHeaders = this.httpUtils.getHTTPHeaders();
//   return this.http.post<any>(API + '/UpdateTrangCaNhan', item, { headers: httpHeaders });
// }
}
