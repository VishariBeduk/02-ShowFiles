import { Component, Input } from '@angular/core';

import { FilesService } from '../../services/files.service';

@Component({
  selector: 'app-file-content',
  templateUrl: './file-content.component.html',
  styleUrls: ['./file-content.component.css']
})
export class FileContentComponent {
  @Input() selectedFile: string = '';
  fileContent: string = '<empty>';

  constructor(private fileService: FilesService) {}

  retrieveFileContent(): void {
    this.fileService.getAllText(this.selectedFile)
      .subscribe((content: string) => { this.fileContent = content; });
  }
}
