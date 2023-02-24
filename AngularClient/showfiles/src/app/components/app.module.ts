import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatGridListModule } from '@angular/material/grid-list';

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
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
