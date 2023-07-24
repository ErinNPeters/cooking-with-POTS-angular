import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeFromServer } from '../interfaces/RecipeDataPostParse';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss'],
})
export class RecipeSearchComponent implements OnInit {
  public displayedColumns: string[] = ['title'];
  public recipes!: MatTableDataSource<RecipeFromServer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = 0;
    pageEvent.pageSize = 10;
    this.getData(pageEvent);
  }

  getData(event: PageEvent) {
    var url = environment.baseUrl + 'Recipes/api';
    var params = new HttpParams()
      .set('search', 'ALL')
      .set('pageIndex', event.pageIndex.toString())
      .set('pageSize', event.pageSize.toString());

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
