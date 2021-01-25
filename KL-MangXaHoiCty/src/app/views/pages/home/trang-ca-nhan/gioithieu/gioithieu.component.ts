import { TrangCaNhanService } from './../trang-ca-nhan.service';
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-gioithieu',
  templateUrl: './gioithieu.component.html',
  styleUrls: ['./gioithieu.component.scss']
})
export class GioithieuComponent implements OnInit {
  id_user_current:number;
  item:any[]=[];
  list_randomanh:any[]=[];
  listGioiThieu:any[]=[];
  list_Flow:any[]=[];
  listTrangCaNhan:any[]=[];
  id_canhan:number;
  constructor(
    private tokenStore:TokenStorage,
    private _service:TrangCaNhanService,
    private changeDetectorRefs: ChangeDetectorRef,

  ) { }

  getCurrentUser() 
	{
	  this.tokenStore.getUserData().subscribe(res =>{
	   
		  this.item= res;
		  this.id_user_current=res[0].ID_user;
	 
  
	  });
  }

  LoadGioiThieu()
  {
        this._service.getGioiThieu(this.id_user_current).subscribe(res =>{
          this.listGioiThieu=res.Data;
          this.changeDetectorRefs.detectChanges();
        })
  }

  LoadOneImage()

  {
	this._service.getRanDomAnh(this.id_user_current).subscribe(res=>{
	this.list_randomanh=res.Data;
	this.changeDetectorRefs.detectChanges();
	})

  }
  LoadTrangCaNhan()
  {
      this._service.gettrangCaNhan(this.id_user_current).subscribe(res=>{
        debugger
		this.listTrangCaNhan=res.Data;
    this.id_canhan=this.listTrangCaNhan[0].id_canhan;
    console.log('id-canhan',this.id_canhan)
        this.changeDetectorRefs.detectChanges();
      })
  }
 
  LoadFlow()

  {
 
        this._service.getFlow(this.id_canhan).subscribe(res=>{
          this.list_Flow=res.Data;
              this.changeDetectorRefs.detectChanges();
        })
  }
  ngOnInit() {
    this.getCurrentUser();

    this.LoadGioiThieu();
    this.LoadOneImage();
    this.LoadTrangCaNhan();
    setTimeout(() => {
      this.LoadFlow();
    }, 1000);
    
  }

}
