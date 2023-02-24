import { Component } from '@angular/core';

import { FilesService } from '../../services/files.service';

@Component({
  selector: 'app-file-content',
  templateUrl: './file-content.component.html',
  styleUrls: ['./file-content.component.css']
})
export class FileContentComponent {
  fileContent: string = '<empty>';

  constructor(private fileService: FilesService) {}

  retrieveFileContent(): void {
    var filePath: string = '/workspaces/DotNetServer/ShowFiles.sln';
    this.fileService.getAllText(filePath)
      .subscribe((content: string) => { this.fileContent = content; });
  }
}
