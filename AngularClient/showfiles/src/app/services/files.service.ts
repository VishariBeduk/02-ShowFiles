import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

  getHomeFolder(): Observable<string> {
    return this.http
      .get(environment.API_URL + 'HomeFolder', {responseType: "text"} )
      .pipe(map(response => {
        return response as string;
      }));
  }

  getFolders(currentDir: string): Observable<string[]> {
    var encoded: string = encodeURIComponent(currentDir);
    return this.http
      .get(environment.API_URL + 'Folders?currentDir=' + encoded)
      .pipe(map(response => this.deserializeStringArray(response)));
  }

  getFiles(currentDir: string): Observable<string[]> {
    var encoded: string = encodeURIComponent(currentDir);
    return this.http
      .get(environment.API_URL + 'Files?currentDir=' + encoded)
      .pipe(map(response => this.deserializeStringArray(response)));
  }

  getAllText(filePath: string): Observable<string> {
    var encoded: string = encodeURIComponent(filePath);
    return this.http
      .get(environment.API_URL + 'AllText?filePath=' + encoded, {responseType: "text"} )
      .pipe(map(response => {
        return response as string;
      }));
  }

  private deserializeStringArray(json: any): string[] {
    if (json instanceof Array) {
      const entries: string[] = [];
      for (let i: number = 0; i < json.length; i++) {
        entries[i] = json[i];
      }

      return entries;
    } else {
      return [];
    }
  }
}
