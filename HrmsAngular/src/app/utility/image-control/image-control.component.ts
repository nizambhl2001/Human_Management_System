import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-control',
  templateUrl: './image-control.component.html',
  styleUrls: ['./image-control.component.scss']
})
export class ImageControlComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() colSize:string = 'col-sm-8';
  @Input() fieldId:string;
  @Input() isRequired:boolean=false;
  @Input() previewImg:string = '';
  @Output() selectedFile = new EventEmitter<any>();


  onImageChange(files: FileList) {
    if (files.length == 0) { return null; }
    //Show image
    var readerForShow = new FileReader();
    readerForShow.onload = (event: any) => {
      this.previewImg = event.target.result;
    }
    readerForShow.readAsDataURL(files.item(0));
    //Convert image
    var readerForConvert = new FileReader();
    readerForConvert.onload = this._handleReaderLoaded.bind(this);
    readerForConvert.readAsBinaryString(files[0])
    document.getElementById(this.fieldId).innerText = files[0].name;
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.previewImg=btoa(binaryString);  // Converting file to binary string data.
    this.selectedFile.emit(btoa(binaryString));  // Converting file to binary string data.
  }

  clearPicture() {
    this.previewImg=null;
    this.selectedFile.emit(null);
    document.getElementById(this.fieldId).innerText = 'Choose file...'
  }

}
