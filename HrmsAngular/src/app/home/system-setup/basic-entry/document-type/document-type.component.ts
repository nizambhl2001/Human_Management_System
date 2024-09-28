import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-type',
  template:`<app-basic-entry  [title]="'Document Type Setup'" [tableName]="'UploadDocumentsType'"></app-basic-entry>`,
  styleUrls: ['./document-type.component.scss']
})
export class DocumentTypeComponent implements OnInit {
  title = 'Document Type'
  constructor() { }

  ngOnInit() {
  }

}
