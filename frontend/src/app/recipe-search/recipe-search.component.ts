import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeFromServer } from '../interfaces/RecipeDataPostParse';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
    this.http
      .get<RecipeFromServer[]>(
        environment.baseUrl + 'Recipes?search=ALL&page=1&pageSize=20'
      )
      .subscribe({
        next: (result) => {
          this.recipes = new MatTableDataSource<RecipeFromServer>(result);
          this.recipes.paginator = this.paginator;
        },
        error: (e) => console.error(e),
      });
  }
}
