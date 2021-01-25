import { ThongBaoModel } from './../../../views/pages/home/Bai-Dang/Model/ThongBao.model';
import { LoggedInUser } from './../../../views/pages/home/loggedin.user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../_models/user.model';
import { Permission } from '../_models/permission.model';
import { Role } from '../_models/role.model';
import { catchError, map } from 'rxjs/operators';
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { TokenStorage } from './token-storage.service';


const API_USERS_URL =environment.Apiroot ;//  đường dẫn api
const API_PERMISSION_URL = 'api/permissions';
const API_ROLES_URL = 'api/roles';

@Injectable()
export class AuthService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    isRemberMeChecked: boolean=true;

    constructor(private http: HttpClient, private httpUtils: HttpUtilsService,
        private tokenStorage: TokenStorage,
        
        ) {

        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));// chú ý lỗi Unexpected token u in JSON at position 0
        this.currentUser = this.currentUserSubject.asObservable();


        
    }
    // Authentication/Authorization hàm login để gọi bên login.ts
   

    get currentUserValue(): any {
        return this.currentUserSubject.value;
    }
    //headers: httpHeaders 
    login(email: string, password: string) {
       // debugger
        const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http
            .post<any>(
                API_USERS_URL + `/postDSUser?Email=${email}&Pass=${password}`,// chứ ý đường dẫn bên web API vd Email và Pass
                { }
            )
            .pipe(
                map((user: any) => {
                    if (user && user.status !== 1 ) { return }
                    
                    else {
                      //  debugger
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.currentUserSubject.next(user);
                      // chú ý ms thêm phần này
                        return user;
                    }
                })
            );
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem("currentUser");
        this.currentUserSubject.next(null);
    }

    public getUserData(): Observable<any> {

        const user: any = localStorage.getItem('currentUser');
        try {
            return of(JSON.parse(user));
        } catch (e) { }
    }




    getUserByToken(): Observable<User> {
        const userToken = localStorage.getItem(environment.authTokenKey);
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Authorization', 'Bearer ' + userToken);
        return this.http.get<User>(API_USERS_URL, { headers: httpHeaders });
    }

    register(user: User): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<User>(API_USERS_URL, user, { headers: httpHeaders })
            .pipe(
                map((res: User) => {
                    return res;
                }),
                catchError(err => {
                    return null;
                })
            );
    }

    /*
     * Submit forgot password request
     *
     * @param {string} email
     * @returns {Observable<any>}
     */
    public requestPassword(email: string): Observable<any> {
        return this.http.get(API_USERS_URL + '/forgot?=' + email)
            .pipe(catchError(this.handleError('forgot-password', []))
            );
    }
    getPhanLoaiBaiDang(id_user:number):any {
        return this.http.get<any>(API_USERS_URL+`/PhanQuyenLoaiBaiDang?id_user=${id_user}`);
    }



    getProFileUsers_change(id_s:number):any {
       
        return this.http.get<any>(API_USERS_URL+`/GetDSUser_profile_change?id_user=${id_s}`);
    }


    getIdUser(email: string, password: string):any {
        return this.http.get<any>(API_USERS_URL+`/GetIDUser?email=${email}&pass=${password}`);
    }

    getAllUsers():any {
        const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.get<any>(API_USERS_URL+'/GetDSUser',{ headers: httpHeaders});
    }

    getProFileUsers(id_s:number):any {
        const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.get<any>(API_USERS_URL+`/GetUserProfile?id_user=${id_s}`,{ headers: httpHeaders});
    }

   
    getAllChooseUsser(filter: any): Observable<any> {
        const httpHeaders = this.httpUtils.getHTTPHeaders();
		let params = this.httpUtils.parseFilter(filter);
		return this.http.get<any>(API_USERS_URL + '/GetDSUser', { headers: httpHeaders, params: params });
    }

    // getAllUsers_In_Group(id_g:number):any {
    //     const httpHeaders = this.httpUtils.getHTTPHeaders();
    //     return this.http.get<any>(API+`/GetDSUser_In_Group?id_group=${id_g}`,{ headers: httpHeaders });
    // }
  
      
    getAllUsser_filter_Group(id_gr:number,filter: any): Observable<any> {
        const httpHeaders = this.httpUtils.getHTTPHeaders();
    let params = this.httpUtils.parseFilter(filter);
    return this.http.get<any>(API_USERS_URL + `/GetDSUser_filter_InGroup?id_gr=${id_gr}`, { headers: httpHeaders, params: params });
    }
     
  

    getAllChooseUsser_In_Group(id_g:number,filter: any): Observable<any> {
        const httpHeaders = this.httpUtils.getHTTPHeaders();
		let params = this.httpUtils.parseFilter(filter);
		return this.http.get<any>(API_USERS_URL + `/GetDSUser_In_Group?id_group=${id_g}`, { headers: httpHeaders, params: params });
    }
    getUserByUserName(username: string): Observable<User> {
        return this.http.get<User>(API_USERS_URL + `/${username}`);
    }

    getAllNhanvien():any {
        return this.http.get<any>(API_USERS_URL+'/GetDSNhanVien');
    }
    // getUserByUsername(username:string): Observable<User> {
    //     return this.http.get<User>(API_USERS_URL +'/GetDSUser' + `/${username}`);
    // }

    // getUserById(userId: number): Observable<User> {
    //     return this.http.get<User>(API_USERS_URL + `/${userId}`);
    // }
    
isUserAuthenticated(): boolean {
    const user = localStorage.getItem('currentUser');;
    if (user != null) {
      return true;
    }
    else {
      return false;
    }
  }

getLoggedInUser(): LoggedInUser {
   // debugger
    let user: LoggedInUser;
    if (this.isUserAuthenticated()) {
      var userData = JSON.parse(localStorage.getItem('currentUser'));
      user = new LoggedInUser(userData[0].ID_user,
        userData[0].Username,
        userData[0].fullName,
        userData[0].Email,
        userData[0].Avatar
        );
    }
    else {
      user = null;
    }
    return user;
  }
  getAllThongBao(id_:number):any {
    const httpHeaders = new HttpHeaders()
    return this.http.get<any>(API_USERS_URL+`/GetDSThongBao?id_user=${id_}`, { headers: httpHeaders });
}

// getAllThongBao(page): Observable<ThongBaoModel[]>{
//         const httpHeaders = new HttpHeaders()
//         return this.http.get<any>(API_USERS_URL+'/GetDSThongBao', { headers: httpHeaders });
//     }
 public getAccessToken(): Observable<string> {
        return this.tokenStorage.getAccessToken();
    }

    // DELETE => delete the user from the server
    deleteUser(userId: number) {
        const url = `${API_USERS_URL}/${userId}`;
        return this.http.delete(url);
    }
    GetRandomUser() {
        const httpHeaders = new HttpHeaders() 
   return this.http.get<any>(API_USERS_URL+'/GetrandomDSUser', { headers: httpHeaders });
    }



    // UPDATE => PUT: update the user on the server
    updateTrangThaiUser(user:User): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post(API_USERS_URL+'/UpdateUserName', user, { headers: httpHeaders });
    }

    // CREATE =>  POST: add a new user to the server
    createUser(user: User): Observable<User> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<User>(API_USERS_URL, user, { headers: httpHeaders });
    }

    // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
    // items => filtered/sorted result
    findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<QueryResultsModel>(API_USERS_URL + '/findUsers', queryParams, { headers: httpHeaders });
    }

    // Permission
    getAllPermissions(): Observable<Permission[]> {
        return this.http.get<Permission[]>(API_PERMISSION_URL);
    }

    getRolePermissions(roleId: number): Observable<Permission[]> {
        return this.http.get<Permission[]>(API_PERMISSION_URL + '/getRolePermission?=' + roleId);
    }

    // Roles
    getAllRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(API_ROLES_URL);
    }

    getRoleById(roleId: number): Observable<Role> {
        return this.http.get<Role>(API_ROLES_URL + `/${roleId}`);
    }

    // CREATE =>  POST: add a new role to the server
    createRole(role: Role): Observable<Role> {
        // Note: Add headers if needed (tokens/bearer)
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<Role>(API_ROLES_URL, role, { headers: httpHeaders });
    }

    // UPDATE => PUT: update the role on the server
    updateRole(role: Role): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.put(API_ROLES_URL, role, { headers: httpHeaders });
    }

    // DELETE => delete the role from the server
    deleteRole(roleId: number): Observable<Role> {
        const url = `${API_ROLES_URL}/${roleId}`;
        return this.http.delete<Role>(url);
    }

    // Check Role Before deletion
    isRoleAssignedToUsers(roleId: number): Observable<boolean> {
        return this.http.get<boolean>(API_ROLES_URL + '/checkIsRollAssignedToUser?roleId=' + roleId);
    }

    findRoles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
        // This code imitates server calls
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<QueryResultsModel>(API_ROLES_URL + '/findRoles', queryParams, { headers: httpHeaders });
    }

    /*
     * Handle Http operation that failed.
     * Let the app continue.
   *
   * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: any) {
        return (error: any): Observable<any> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result);
        };
    }



}
