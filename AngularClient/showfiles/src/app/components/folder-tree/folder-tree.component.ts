import { Component } from '@angular/core';

import { FilesService } from '../../services/files.service';

@Component({
  selector: 'app-folder-tree',
  templateUrl: './folder-tree.component.html',
  styleUrls: ['./folder-tree.component.css']
})
export class FolderTreeComponent {
  homeFolder: string = '<unknown>';
  folderPaths: string[] = [];

  constructor(private fileService: FilesService) {}

  retrieveHomeFolder(): void {
    this.fileService.getHomeFolder()
      .subscribe((root: string) => { this.homeFolder = root; });
  }

  retrieveFolderList(): void {
    this.fileService.getFiles(this.homeFolder)
      .subscribe((r: string[]) => { this.folderPaths = r; });
  }
}
