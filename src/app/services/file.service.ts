import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {IFile} from "../file-uploader/file-uploader.component";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  fileUrl='http://localhost:5000/files'
  constructor(private http: HttpClient) { }
  getFiles():Observable<IFile[]>{
    return this.http.get<IFile[]>(this.fileUrl);
  }
  addFile(file:any,fileName:any){
    const formData = new FormData();

    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("date", formatDate(new Date(), 'dd/MM/yyyy', 'en'));
    console.log(formData.get('fileName'));
    console.log(formData.get('date'));

    return this.http.post(this.fileUrl, formData);

  }
}
