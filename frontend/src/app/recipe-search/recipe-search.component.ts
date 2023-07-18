import { Component, OnInit } from '@angular/core';
import { RecipeFromServer } from '../interfaces/RecipeDataPostParse';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss'],
})
export class RecipeSearchComponent implements OnInit {
  public recipes!: RecipeFromServer[];
  public displayedColumns: string[] = ['title'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<RecipeFromServer[]>(
        environment.baseUrl + 'Recipes?search=ALL&page=1&pageSize=20'
      )
      .subscribe({
        next: (result) => {
          this.recipes = result;
        },
        error: (e) => console.error(e),
      });
  }
}
