import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file-convert',
  templateUrl: './file-convert.component.html',
  styleUrls: ['./file-convert.component.scss']
})
export class FileConvertComponent implements OnInit {

  constructor(private toaster:ToastrService) { }

  ngOnInit() {
  }
  @Input() colSize:string = 'col-sm-8';
  @Input() fieldId:string;
  @Input() isRequired:boolean=false;
  @Input() viewFile:Boolean=true;
  @Input() previewFile:string = '';
  @Input() getWithFileType:boolean = false;
  @Output() selectedFile = new EventEmitter<any>();
  @Input() maxSize:number = 3145728;

  selectedFileType:string;
  onFileChange(files: FileList) {
    if (files.length == 0) { return null; }
    if(files.item(0).size>this.maxSize){
      this.toaster.error('File Size can\'t be more than 3MB');
      return;
    }
    //Show File
    var readerForShow = new FileReader();
    readerForShow.onload = (event: any) => {
      this.previewFile = event.target.result;
    }
    this.selectedFileType = files[0].name.split('.')[1]
    readerForShow.readAsDataURL(files.item(0));
    //Convert File
    var readerForConvert = new FileReader();
    readerForConvert.onload = this._handleReaderLoaded.bind(this);
    readerForConvert.readAsBinaryString(files[0])
    document.getElementById(this.fieldId).innerText = files[0].name;
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.previewFile=btoa(binaryString);  // Converting file to binary string data.
    if(this.getWithFileType){  // Converting file to binary string data.
      this.selectedFile.emit({data:btoa(binaryString), type:this.selectedFileType});
    }else{
      this.selectedFile.emit(btoa(binaryString));
    }
  }
  clearFile() {
    this.previewFile=null;
    this.selectedFile.emit(null);
    document.getElementById(this.fieldId).innerText = 'Choose file...'
  }
}
