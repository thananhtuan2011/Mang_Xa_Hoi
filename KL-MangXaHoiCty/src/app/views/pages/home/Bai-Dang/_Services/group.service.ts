import { QueryResultsModel } from './../../../../../core/_base/crud/models/query-models/query-results.model';
import { QueryParamsModel, QueryParamsModelNew } from './../../../../../core/_base/crud/models/query-models/query-params.model';
import { environment } from './../../../../../../environments/environment';
import { HttpUtilsService } from './../../../../../core/_base/crud/utils/http-utils.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GroupModel } from '../Model/group.model';
import { UserGroupModel } from '../../Group/group_user.model';


const API = environment.Apiroot ;
@Injectable(

)
export class GroupService {

  
  lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));
	ReadOnlyControl: boolean;
  constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

    subject = new Subject<any>()

    sendClickEvent(){
			this.subject.next();
		  }
		  getClickEvent():Observable<any>{
			return this.subject.asObservable();
		 }
    getlistgroup(id_:number):any {
      //getDSBaiDang?id_user=6
      return this.http.get<any>(API+`/getDSGroup?id_user=${id_}`);
      
      
    }
    
    getlist_Usergroup(id_:number,id_user:number):any {
      //getDSBaiDang?id_user=6
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API+`/getDSUser_Group?id_group=${id_}&id_user=${id_user}`,{ headers: httpHeaders });
      
      
    }
    UpdateGroup(item:GroupModel): Observable<any> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.post<any>(API + '/UpdateGroup', item, { headers: httpHeaders });
    }

  

    InsertGroup(item:GroupModel): Observable<any> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.post<any>(API + '/addGroup', item, { headers: httpHeaders });
    }
    DeleteGroup(id_group:number):Observable<any>{
      const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.delete<any>(API + `/deleteGroup?id_group=${id_group}`,
    { headers: httpHeaders });
    }


    InsertUserGroup(id_group:number,id_user:number,item:UserGroupModel): Observable<any> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.post<any>(API + `/addUserGroup?id_group=${id_group}&id_user=${id_user}`, item, { headers: httpHeaders });
    }

    getList_User(id:number,queryParams: QueryParamsModelNew): Observable<QueryResultsModel>{
      debugger
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
          const url = API+`/DataSource_Group?id_group=${id}`;
          return this.http.get<any>(url, { headers: httpHeaders,
            params: httpParams });
        }
  

    Update_quyen_Memmber(id_user:number,item:UserGroupModel): Observable<any> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.post<any>(API + `/Update_quyen_Memmber?id_user=${id_user}`, item, { headers: httpHeaders });
    }

    Delete_User_Group(id_gr:number,id_u:number): Observable<any> {
			const httpHeaders = this.httpUtils.getHTTPHeaders();
			return this.http.delete<any>(API + `/Delete_User?id_group=${id_gr}&id_user=${id_u}`, { headers: httpHeaders });
		}
	

  
    DeleteBaidang(id_bd:number):any{
      const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.delete<any>(API + `/deleteBaiDang?id_baidang=${id_bd}`, 
    { headers: httpHeaders });
    }
  
    findData_BaiDangGroup(id_group:number,queryParams: QueryParamsModelNew): Observable<QueryResultsModel> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
      const url = API + `/BaidangGroup_Datasource?id_group=${id_group}`;
      return this.http.get<QueryResultsModel>(url, {
        headers: httpHeaders,
        params: httpParams
      });
    }

  
}
