
import { CommentService } from './../../Bai-Dang/_Services/comment.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'kt-comment-child-edit',
  templateUrl: './comment-child-edit.component.html',
  styleUrls: ['./comment-child-edit.component.scss']
})
export class CommentChildEditComponent implements OnInit {
  comment: any = {};
	viewLoading:boolean=false;
  constructor(
    public dialogRef: MatDialogRef<CommentChildEditComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
    private _service_cmt:CommentService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  closeDia(data = undefined)
{
    this.dialogRef.close(data);
}
onSubmit() {
 
  this._service_cmt.update_comment_child(this.comment).subscribe(res => {
    if (res && res.status == 1) {
      this.closeDia(res.data);
    }
  });
}

  ngOnInit() {
    this.comment = this.data;
    this.changeDetectorRefs.detectChanges();
    
  }

}
