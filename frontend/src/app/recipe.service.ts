import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RecipeFromServer,
  mapRecipeFromServer,
} from './interfaces/RecipeDataPostParse';
import { environment } from 'src/environments/environment';
import { RecipeDataPreParse } from './interfaces/RecipeDataPreParse';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getSearchGridData(
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

  get(id: string): Observable<RecipeDataPreParse> {
    var url = environment.baseUrl + 'Recipes/ForEdit/' + id;
    return this.http.get<RecipeDataPreParse>(url);
  }

  put(item: RecipeDataPreParse): Observable<RecipeDataPreParse> {
    var url = environment.baseUrl + 'Recipes/Update';
    return this.http.put<RecipeDataPreParse>(url, item);
  }

  post(item: RecipeDataPreParse): Observable<RecipeDataPreParse> {
    var url = environment.baseUrl + 'Recipes/AddIntResponse';
    return this.http.post<RecipeDataPreParse>(url, item);
  }

  isDuplicateRecipe(item: RecipeDataPreParse): Observable<boolean> {
    var url = environment.baseUrl + 'Recipes/IsDuplicateRecipe';
    return this.http.post<boolean>(url, item);
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
