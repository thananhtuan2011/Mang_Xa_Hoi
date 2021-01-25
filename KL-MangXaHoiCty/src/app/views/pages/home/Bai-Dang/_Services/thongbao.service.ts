import { environment } from './../../../../../../environments/environment';
import { ThongBaoModel } from './../Model/ThongBao.model';
import { HttpUtilsService } from './../../../../../core/_base/crud/utils/http-utils.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = environment.Apiroot ;
@Injectable(

)

export class ThongbaoService {

  constructor(private http: HttpClient,
    private httpUtils: HttpUtilsService) { }
    



	UpdateThongBao(id_thongbao:number): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API + `/UpdateTinhTrangTrueThongBao?id_thongbao=${id_thongbao}`, { headers: httpHeaders });
	}
	
	getCountTB(id_:number):any {
		//getDSBaiDang?id_user=6
		return this.http.get<any>(API+`/Count_ThongBao?iduser=${id_}`);
		
		
	  }
InsertThongBao(id_u:number,item:ThongBaoModel): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.post<any>(API + `/addThongBao?id_user=${id_u}`, item, { headers: httpHeaders });
}

InsertThongBao_like(id_u:number,id_cmt:number,id_baidang:number,item:ThongBaoModel): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.post<any>(API + `/addthongbao_like/?id_user=${id_u}&id_cmt=${id_cmt}&id_baidang=${id_baidang}`, item, { headers: httpHeaders });
}

    
DeleteThongBao(id_tb:number): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.delete<any>(API + `/deleteThongBao?id_thongbao=${id_tb}`, { headers: httpHeaders });
}

ThongBaoApp()
{
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.get<any>(API + '/BanThongBao', { headers: httpHeaders });
}

DeleteAllThongBao(id_user:number): Observable<any> 
{

	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.post<any>(API + `/UpdateTinhTrangTrueAllThongBao?id_user=${id_user}`, { headers: httpHeaders });
}

}

