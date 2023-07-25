import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeFromServer } from '../interfaces/RecipeDataPostParse';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss'],
})
export class RecipeSearchComponent implements OnInit {
  public displayedColumns: string[] = ['title'];
  public recipes!: MatTableDataSource<RecipeFromServer>;

  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = '';
  public defaultSortOrder: 'asc' | 'desc' = 'asc';

  filterQuery?: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(query?: string) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    this.filterQuery = query;
    this.getData(pageEvent);
  }

  getData(event: PageEvent) {
    var url = environment.baseUrl + 'Recipes/SearchGridResult';
    var params = new HttpParams()
      .set('search', this.filterQuery ? this.filterQuery : 'ALL')
      .set('pageIndex', event.pageIndex.toString())
      .set('pageSize', event.pageSize.toString())
      .set('sortColumn', this.sort ? this.sort.active : this.defaultSortColumn)
      .set(
        'sortOrder',
        this.sort ? this.sort.direction : this.defaultSortOrder
      );

    this.http.get<any>(url, { params }).subscribe({
      next: (result) => {
        console.log(result);
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;

        this.recipes = new MatTableDataSource<RecipeFromServer>(result.data);
      },
      error: (e) => console.error(e),
    });
  }
}
