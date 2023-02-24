import { Component } from '@angular/core';

import { FilesService } from '../../services/files.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent {
  filePaths: string[] = [];

  constructor(private fileService: FilesService) {}

  retrieveFileList(): void {
    var filePath: string = '/workspaces/DotNetServer';
    this.fileService.getFiles(filePath)
      .subscribe((r: string[]) => { this.filePaths = r; });
  }
}
