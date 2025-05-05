import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { MetaFile, UserFile, UserFileBackend } from '@app/interfaces/files.model';
import { Parameters, PaginatorModel, Filters } from '@app/interfaces/paginator.model';
import { MapperTransformData } from '@app/shared/utils/transformData';
import { environment } from '@environment';
import { finalize, map, Observable, share, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private readonly apiDasboardUrl = `${environment.baseApiUrl}`;

  constructor(private readonly http: HttpClient) { }

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

  updateFiles(id_file: number, note: any) {
    const isLoading = signal(true);
    const body = { id_file, note };

    const response$ = this.http.post<any>(`${this.apiDasboardUrl}/${environment.endpoints.files}/notas`, body).pipe(
      tap(() => isLoading.set(true)),
      finalize(() => isLoading.set(false)),
    );

    const data$ = response$.pipe(map(res => res || ''));
    return {
      data$: data$,
      isLoading: isLoading
    };
  }

  dowloadFile(id_file: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiDasboardUrl}/${environment.endpoints.files}/${environment.endpoints.download}?id_file=${id_file}`
    );
  }


  downloadCsvFile(id_file: number, name_user_id: any) {
    this.http.get(`${this.apiDasboardUrl}/${environment.endpoints.files}/${environment.endpoints.download}?id_file=${id_file}`, { responseType: 'blob' })
      .subscribe((blob:any) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name_user_id+'.pdf'; // Nombre que quieres darle
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Error descargando archivo', error);
      });
  }
  
  

}
