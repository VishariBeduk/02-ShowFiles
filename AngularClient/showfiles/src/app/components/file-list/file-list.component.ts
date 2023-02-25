import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { FilesService } from '../../services/files.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent {
  @Input() selectedFolder: string = '';
  @Output() selectedFile: EventEmitter<string>;
  filePaths: string[] = [];

  displayedColumns = ['name'];

  constructor(private fileService: FilesService) {
    this.selectedFile = new EventEmitter();
  }

  retrieveFileList(): void {
    this.fileService.getFiles(this.selectedFolder)
      .subscribe((r: string[]) => { this.filePaths = r; });
  }

  getRecord(row: string) {
    console.log(row);
    this.selectedFile.emit(row);
  }
}

// https://material.angular.io/components/table/examples