import { BaiDangModel } from '../Model/Bai-dang.model';
import { environment } from '../../../../../../environments/environment';
import { QueryResultsModel } from '../../../../../core/_base/crud/models/query-models/query-results.model';
import { HttpClient } from '@angular/common/http';
import { HttpUtilsService } from '../../../../../core/_base/crud/utils/http-utils.service';
import { QueryParamsModel } from '../../../../../core/_base/crud/models/query-models/query-params.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

const API_baidang = environment.Apiroot;


@Injectable(
	
  
)
export class BaiDangService {


  lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));
	data: any[] = [];
	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

		subject = new Subject<any>()
		sendClickEvent(){
			this.subject.next();
		  }
		  getClickEvent():Observable<any>{
			return this.subject.asObservable();
		 }

	getlistBaiDang(id__:number):any {
		//getDSBaiDang?id_user=6
		return this.http.get<any>(API_baidang+`/getDSBaiDang?id_user=${id__}`);
		
		
	}
	
	getDetailBaiDang(id__user:number,id_baidang:number):any {
	
		return this.http.get<any>(API_baidang+`/getDSBaiDangViewDetail?id_user=${id__user}&id_baidang=${id_baidang}`);
		
		
	}


		
	getDetailComment(id__user:number,id_cmt:number):any {
	
		return this.http.get<any>(API_baidang+`/getDSComentViewDetail?id_user=${id__user}&id_cmt=${id_cmt}`);
		
		
	}

	getBaiDang_Group(id__user:number,id_group:number):any {
	
		return this.http.get<any>(API_baidang+`/getDSBaiDang_In_Group?id_user=${id__user}&id_group=${id_group}`);
		
		
	}

	GetDSKhenThuong_Top2():any {
		return this.http.get<any>(API_baidang+'/GetRanDomTop2KhenThuong');

	}
	
	GetDSKhenThuong():any {
		return this.http.get<any>(API_baidang+'/GetDSKhenThuong');

	}
	// return this.http.get<any>(API_USERS_URL+`/GetIDUser?email=${email}&pass=${password}`);
	DeleteBaidang(id_bd:number):any{
		const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.delete<any>(API_baidang + `/deleteBaiDang?id_baidang=${id_bd}`, 
	{ headers: httpHeaders });
	}

InsertBaiDang(item:BaiDangModel): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.post<any>(API_baidang + '/addBaiDang', item, { headers: httpHeaders });
}

InsertBaiDang_KT(item:BaiDangModel): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.post<any>(API_baidang + '/addBaiDang_KT', item, { headers: httpHeaders });
}


InsertBaiDang_KT_Group(item:BaiDangModel): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.post<any>(API_baidang + '/addBaiDang_KT_Group', item, { headers: httpHeaders });
}


InsertBaiDang_Group(item:BaiDangModel): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.post<any>(API_baidang + '/addBaiDang_Group', item, { headers: httpHeaders });
}




	UpdateBaiDang_CKeditor(item:BaiDangModel): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API_baidang + '/UpdateBaiDang', item, { headers: httpHeaders });
	}
	
	UpdateBaiDang(item): Observable<any> {
			const httpHeaders = this.httpUtils.getHTTPHeaders();
			return this.http.post<any>(API_baidang + '/UpdateBaiDang', item, { headers: httpHeaders });
		}
	

		UpdateBaiDang_2(item:BaiDangModel): Observable<any> {
			const httpHeaders = this.httpUtils.getHTTPHeaders();
			return this.http.post<any>(API_baidang + '/UpdateBaiDang', item, { headers: httpHeaders });
		}


		UpdateBaiDang_KT(item:BaiDangModel): Observable<any> {
			const httpHeaders = this.httpUtils.getHTTPHeaders();
			return this.http.post<any>(API_baidang + '/UpdateBaiDang_KT', item, { headers: httpHeaders });
		}

	getlist_like():any {
		return this.http.get<any>(API_baidang+'/getDSLike');
		
		
	}
	getListKhenThuong():any
	
	{const httpHeaders = this.httpUtils.getHTTPHeaders();
		 return this.http.get<any>(API_baidang+'/GetDSKhenThuongUser');headers: httpHeaders
		
		
		}

	Delete_cmt_Baidang(id_bd:number):any{
		const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.delete<any>(API_baidang + `/deleteComment_inBaiDang?id_baidang=${id_bd}`, 
	{ headers: httpHeaders });
	}

	
	Delete_like_Baidang(id_bd:number):any{
		const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.delete<any>(API_baidang + `/deleteBaiDang_like?id_baidang=${id_bd}`, 
	{ headers: httpHeaders });
	}
	// getlist_KT():any {
	// 	return this.http.get<any>(API_baidang+'/GetDSKhenThuong');
		
		
	// }
	

like(id:number, type:number,id_user:number): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	//const url = API_baidang + '/like?id=' + id + '&type=' + type;
	const url = API_baidang + `/Baidang_like?id=${id}&type=${type}&id_user=${id_user}`;

	return this.http.get<any>(url, { headers: httpHeaders });
}

}