import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { IAuth } from '../Interfaces/Auth.interface';
import { IMember } from '../Interfaces/IMember.interface';
import { AccountService } from '../_services/account.service';
@Component({
  selector: 'app-photo-uploade',
  templateUrl: './photo-uploade.component.html',
  styleUrls: ['./photo-uploade.component.css'],
})
export class PhotoUploadeComponent {
  @Input() member: IMember;
  photoMessage = '';
  public files: NgxFileDropEntry[] = [];
  user: IAuth;

  constructor(private http: HttpClient, private account: AccountService) {
    this.account.AuthBufferSub$.subscribe((u) => {
      this.user = u;
    });
  }
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          const formData = new FormData();
          formData.append('file', file, droppedFile.relativePath);
          const headers = new HttpHeaders({
            Authorization: `Bearer ${this.user.token}`,
          });

          this.http
            .post('https://localhost:7068/api/Users/add-photo', formData, {
              headers: headers,
            })
            .subscribe((data) => {
              this.photoMessage = 'photo is Added';
              this.files = [];
            });

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

       
          **/
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
  makeMain(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.user.token}`,
    });

    this.http
      .get<IMember>(`https://localhost:7068/api/Users/setMain/${id}`, {
        headers: headers,
      })
      .subscribe((user) => {
        console.log('main is done');
      });
  }
  DeletePhoto(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.user.token}`,
    });

    this.http
      .get<IMember>(`https://localhost:7068/api/Users/DeletePhoto/${id}`, {
        headers: headers,
      })
      .subscribe((user) => {
        console.log('main is done');
      });
  }
}
