import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Show files and content';

  selectedFolder: string = '/workspaces/DotNetServer';
  selectedFile: string = '/workspaces/DotNetServer/ShowFiles.sln';

  selectedFolderTrigger(selection: string): void {
    console.log('selectedFolderTrigger --> ' + selection)
    this.selectedFolder = selection;
  }

  selectedFileTrigger(selection: string): void {
    console.log('selectedFileTrigger --> ' + selection)
    this.selectedFile = selection;
  }
}
