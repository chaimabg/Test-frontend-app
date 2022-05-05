import { Component, OnInit } from '@angular/core';
import {FileService} from "../services/file.service";
import {formatDate} from "@angular/common";
export interface IFile{
  file:string;
  fileName: string;
  date : string;
}
@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  fileName: any;
  headers = ['File Name','Date'];
  files : IFile[] =[];
  file : File | undefined;
  constructor(private fileService:FileService) {
  }

  ngOnInit(): void {
    this.fileService.getFiles().subscribe(files =>{
      this.files=files;
      console.log(this.files)
    })

  }


  onUpload($event: Event) {
    // @ts-ignore
    this.file= $event.target.files[0];

    if (this.file) {
      this.fileName=this.file.name

    }
  }

  upload() {
    if(this.file){
      this.fileService.addFile(this.file,this.fileName);
    }
  }
}
