import { QueryResultsModel } from './../../../../core/_base/crud/models/query-models/query-results.model';
import { QueryParamsModelNew } from './../../../../core/_base/crud/models/query-models/query-params.model';
import { PhongbanService } from './../phongban.service';
import { BaseDataSource } from './../../../../core/_base/crud/models/_base.datasource';
import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';


export class PhongBanDataSource extends BaseDataSource {
	constructor(private _service: PhongbanService) {
		super();
	}

	
	
	 loadList(id:number) {
	// 	// this._service.lastFilter$.next(queryParams);
	
	// 	// this.loadingSubject.next(true);
		
	// 	// this._service.getList(id)
	// 	// 	.pipe(
	// 	// 		tap((resultFromServer:any) => {
	// 	// 			this.entitySubject.next(resultFromServer.Data);
	// 	// 			// var totalCount = resultFromServer.page.TotalCount || (resultFromServer.page.AllPage * resultFromServer.page.Size);
	// 	// 			// this.paginatorTotalSubject.next(totalCount);
	// 	// 		}),
	// 	// 		// catchError(err => of(new QueryResultsModel([], err))),
	// 	// 		finalize(() => this.loadingSubject.next(false))
	// 	// 	).subscribe(res => {
	// 	// 	});
			
 }

	loadList_NV(id:number,queryParams: QueryParamsModelNew) {
		this._service.lastFilter$.next(queryParams);
		this.loadingSubject.next(true);
		
		this._service.getList(id,queryParams)
			.pipe(
				tap(resultFromServer => {
					this.entitySubject.next(resultFromServer.data);
					var totalCount = resultFromServer.page.TotalCount || (resultFromServer.page.AllPage * resultFromServer.page.Size);
					this.paginatorTotalSubject.next(totalCount);
				}),
				catchError(err => of(new QueryResultsModel([], err))),
				finalize(() => this.loadingSubject.next(false))
			).subscribe(res => {
			});
	}
}
