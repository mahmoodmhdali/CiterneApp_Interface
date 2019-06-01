import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-template-profile-settings',
  templateUrl: './template-profile-settings.component.html',
  styleUrls: ['./template-profile-settings.component.css']
})
export class TemplateProfileSettingsComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: 'upload_url'});
  public hasBaseDropZoneOver = false;

  constructor() {
  }

  ngOnInit() {
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

}
