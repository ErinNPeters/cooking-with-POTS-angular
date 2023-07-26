import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RecipeFromServer,
  mapRecipeFromServer,
} from './interfaces/RecipeDataPostParse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getData(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    searchText: string
  ): Observable<SearchGridResult<RecipeFromServer>> {
    var url = environment.baseUrl + 'Recipes/SearchGridResult';
    var params = new HttpParams()
      .set('search', searchText ? searchText : 'ALL')
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('sortColumn', sortColumn)
      .set('sortOrder', sortOrder);

    return this.http.get<SearchGridResult<RecipeFromServer>>(url, { params });
  }
}

export interface SearchGridResult<T> {
  data: T[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  sortColumn: string;
  sortOrder: string;
  filterColumn: string;
  filterQuery: string;
}
