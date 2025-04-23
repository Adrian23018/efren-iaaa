import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MetaFile, UserFile, UserFileBackend } from '@app/interfaces/files.model';
import { Parameters, Filters, PaginatorModel } from '@app/interfaces/paginator.model';
import { MapperTransformData } from '@app/shared/utils/transformData';
import { environment } from '@environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private readonly apiDasboardUrl = `${environment.baseApiUrl}`;

  constructor(private readonly http: HttpClient) {}

  getFiles(page: number, limit: number, filters: Filters): Observable<PaginatorModel<UserFile[], MetaFile>> {
    const body = <Parameters<Filters>>{
      page,
      limit,
      filters
    };

    return this.http.post<PaginatorModel<UserFileBackend[], MetaFile>>(
      `${this.apiDasboardUrl}/${environment.endpoints.files}`,
      body
    ).pipe(
      map(response => ({
        ...response,
        data: response.data.map(MapperTransformData.transformUserFile)
      }))
    );
  }
}
