import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeFromServer } from '../interfaces/RecipeDataPostParse';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { RecipeService } from '../recipe.service';

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

  filterTextChanged: Subject<string> = new Subject<string>();

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadData();
  }

  onFilterTextChanged(filterText: string) {
    if (!this.filterTextChanged.observed) {
      this.filterTextChanged
        .pipe(debounceTime(250), distinctUntilChanged())
        .subscribe((query) => {
          this.loadData(query);
        });
    }
    this.filterTextChanged.next(filterText);
  }

  loadData(query?: string) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    this.filterQuery = query;
    this.getData(pageEvent);
  }

  getData(event: PageEvent) {
    var sortColumn = this.sort ? this.sort.active : this.defaultSortColumn;
    var sortOrder = this.sort ? this.sort.direction : this.defaultSortOrder;
    var searchText = this.filterQuery ? this.filterQuery : 'ALL';

    this.recipeService
      .getSearchGridData(
        event.pageIndex,
        event.pageSize,
        sortColumn,
        sortOrder,
        searchText
      )
      .subscribe({
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
