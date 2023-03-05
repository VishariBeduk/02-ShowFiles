import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FolderTreeComponent } from './folder-tree/folder-tree.component';
import { FileListComponent } from './file-list/file-list.component';
import { FileContentComponent } from './file-content/file-content.component';

@NgModule({
  declarations: [
    AppComponent,
    FolderTreeComponent,
    FileListComponent,
    FileContentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatGridListModule,
    MatProgressBarModule,
    MatTableModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
