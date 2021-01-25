import { GroupService } from './../../Bai-Dang/_Services/group.service';
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { TypePostComponent } from './../../type-post/type-post.component';
import { LayoutUtilsService, MessageType } from './../../../../../core/_base/crud/utils/layout-utils.service';
import { SharedService } from './../../../../../core/auth/_services/sharedata.service';
import { AuthService } from './../../../../../core/auth/_services/auth.service';

import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef } from '@angular/material';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { BaiDangModel } from '../../Bai-Dang/Model/Bai-dang.model';
import { BaiDangService } from '../../Bai-Dang/_Services/bai-dang.service';
import moment from 'moment';
import { trim } from 'lodash';
import { ThongBaoModel } from '../../Bai-Dang/Model/ThongBao.model';
import { ThongbaoService } from '../../Bai-Dang/_Services/thongbao.service';
@Component({
  selector: 'kt-chao-don-thanh-vien-moi',
  templateUrl: './chao-don-thanh-vien-moi.component.html',
  styleUrls: ['./chao-don-thanh-vien-moi.component.scss']
})
export class ChaoDonThanhVienMoiComponent implements OnInit {
  tam:string
  removable = true;
  selectedTab: number = 0;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;
  congkhai='Công Khai';
  selectable = true;
  data_user:any;
  item_user=[];
  user_tam: any[] = [];
  listUser:Observable<any[]>;
  userCtrl=new FormControl();

  
id_group = new FormControl('');

public groupFilterCtrl: FormControl = new FormControl();


   item:any[]=[];
  lastUpdated: string;
  Time:Date;
  id_loai_bai_dang:string;
  htmlContent:string='';
  id:number;
  id_user:number;
  tieude:string="";

  noidung:string='';
  // title_user = new FormControl('');
  title_user:string;
  title:string;
  list_group:any[]=[];
  selectedd:number;
  
  // editor = ClassicEditor;

	
  @ViewChild('userInput', {static: false}) userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  constructor(
    private dialogRef:MatDialogRef<ChaoDonThanhVienMoiComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
    private _authservice:AuthService,
    private _dbservices:BaiDangService,
    private  sharedService: SharedService,
    private layoutUtilsService: LayoutUtilsService,
    private dialogRef_all:MatDialogRef<TypePostComponent>,
    private tokenStore:TokenStorage,
    private _service_gr:GroupService,
    private _service_thongbao:ThongbaoService

  ) { }


  Item_thongbao(): ThongBaoModel {
    const item = new ThongBaoModel();
    // for(let i=0;i<this.user_tam.length;i++){
         
    //       debugger
    //   this.tieude=this.tieude+" "+this.user_tam[i].hoten+",";
  
    //     this.title=trim(this.tieude,",");
      


    // }

      
         item.title="Chào mừng thành viên:"+this.title;
        item.create_tb_by=this.id_user;
    
    this.changeDetectorRefs.detectChanges();
    return item;
  }
  
  
  // test(){
  // 	this.datainput.push({ data:""});
  // 	console.log('Data',this.datainput)
  // }
  
  // Bắt đầu phần comment
  
  AddThongbao(item:ThongBaoModel,withBack:boolean){
  
      this._service_thongbao.InsertThongBao(this.id_user,item).subscribe(res=>{
        if (res && res.status === 1) {
         
         
          // this.dialogRef.close();
         
          
             }
             else {
               this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
             }
      })
  }
  
        ThongBaotInsert()
        {
  
          let it_cmt=this.Item_thongbao();
           this.AddThongbao(it_cmt,false);
        
          
        }
  
private _normalizeValue(value: string): string {
  return value.toLowerCase().replace(/\s/g, '');
}

private _filterStates(value: string): any[] {
  //debugger
  //	const filterValue = value.toLowerCase();
  const filterValue = this._normalizeValue(value);
  return this.data_user.filter(state => this._normalizeValue(state.hoten).includes(filterValue));
}

add(event: MatChipInputEvent): void {
  // Add fruit only when MatAutocomplete is not open
  // To make sure this does not conflict with OptionSelected Event
  if (!this.matAutocomplete.isOpen) {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.user_tam.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.userCtrl.setValue(null);
  }
}
// xóa dữ liệu trong mảng user_tam
remove(user: string): void {
  const index = this.user_tam.indexOf(user);

  if (index >= 0) {
    this.user_tam.splice(index, 1);
  }
}



selected(event: MatAutocompleteSelectedEvent): void {
             // debugger
    let obj = this.user_tam.find(x => x.hoten == event.option.viewValue);
    if(obj)
    {
        alert('Vui lòng chọn nhân viên khác !')
    }
    else{

    
  this.user_tam.push(
    {
      // ID_NV:this.id_nv.value,
				hoten:event.option.viewValue,
    })

    console.log('user_tam:',this.user_tam);

  this.userInput.nativeElement.value = '';
  this.userCtrl.setValue(null);
 
 
  
  }
}


ItemBaiDang(): BaiDangModel {
  //  debugger


  //const controls = this.itemForm.controls;
  
  const item = new BaiDangModel();
  
    // Users: Array<BaiDangUser> = [];	// user.ID_User = this.item.ID_User;

    // var plainText = this.dulieu.value.replace(/<[^>]*>/g," ");
      // let myDate=new Date(this.lastUpdated);
      // let dateString =this.lastUpdated;
      //   let myDate=new Date('');
         
        this.id=Number(this.id_loai_bai_dang );
        item.id_loaibaidang=this.id;
        for(let i=0;i<this.user_tam.length;i++){
         
          
          this.tieude=this.tieude+" "+this.user_tam[i].hoten+",";
      
            this.title=trim(this.tieude,",");
          


        }
        item.title=this.title;
        item.NoiDung=this.noidung;
        item.typepost='';
        // item.CreatedDate=myDate;
        item.CreatedBy=this.id_user;
        item.Id_Group=this.id_group.value;
        item.UpdateDate=null;
        item.UpdateBy=null
      
  this.changeDetectorRefs.detectChanges();
  return item;
}

AddBaiDang(item: BaiDangModel, withBack: boolean) {
  // this.loadingAfterSubmit = true;
  // debuggere
  if(this.id_group.value=="Công Khai"||this.id_group.value==0)
  {

  this._dbservices.InsertBaiDang(item).subscribe(res => {
    if (res && res.status === 1) {
     this.dialogRef.close();
    //  this.dataSource.loadListBaiDang();
   
      
    }
    else {
      this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
    }
  });
}
else

{
  this._dbservices.InsertBaiDang_Group(item).subscribe(res => {
    if (res && res.status === 1) {
     this.dialogRef.close();
    //  this.dataSource.loadListBaiDang();
   
      
    }
    else {
      this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
    }
  });
}
}




submit()
{
  // debugger
  let ItemBd=this.ItemBaiDang();
  this.AddBaiDang(ItemBd,false);
  this.ThongBaotInsert();
  // this.reload.loadDataList();
  // this._BaiDangViewComponent.change();
  this.dialogRef_all.close();
  this.changeDetectorRefs.detectChanges();

}

 getCurrentTime(){
  return moment().format('DD/MM/YYYY HH:mm:ss'); 
}


getData(){
  // debugger
  this.sharedService.ID.subscribe(sharedata => this.id_loai_bai_dang = sharedata)

 
}

// getDataArray(){
//   this.tieude=this.user_tam[0].hoten;

// }
LoadData_current_user() {
  // debugger
  this.tokenStore.getUserData().subscribe(res =>{
    this.item= res;
    this.id_user=res[0].ID_user;
  });
}
LoadListGroup(){
  this._service_gr.getlistgroup(this.id_user).subscribe(res =>{
        this.list_group=res.Data;
  })
}

getDataShare(){
 this.sharedService.id_group.subscribe(sharedata => this.tam = sharedata)

 this.selectedd=Number(this.tam);

}
 

  ngOnInit() {
    this.getDataShare();
    this.groupFilterCtrl.setValue('');
    // this.getDataArray();
    this.LoadData_current_user();
    this.getData();
    this.LoadListGroup();
  
    this._authservice.getAllNhanvien().subscribe((res=>{
    //  debugger
      this.data_user=res.Data;
   
      this.listUser= this.userCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.data_user.slice())
      
      );
    this.changeDetectorRefs.detectChanges();
   

  
      }))

  }

  closeDilog()
  {
    this.dialogRef.close();
  }
}
