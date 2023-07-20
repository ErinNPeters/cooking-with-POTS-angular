import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RecipeDataPreParse } from '../interfaces/RecipeDataPreParse';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  title?: string;

  form!: FormGroup;

  recipe?: RecipeDataPreParse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(''),
      ingredients: new FormControl(''),
      steps: new FormControl(''),
      crockPot: new FormControl(''),
    });
    this.loadData();
  }

  loadData() {
    var idParam = this.activatedRoute.snapshot.paramMap.get('id');
    var id = idParam ? +idParam : 0;

    var url = environment.baseUrl + 'Recipes/ForEdit/' + id;
    this.http.get<RecipeDataPreParse>(url).subscribe({
      next: (result) => {
        this.recipe = result;
        this.title = 'Edit - ' + this.recipe.title;
        this.form.patchValue(this.recipe);
      },
      error: (e) => console.error(e),
    });
  }

  onSubmit() {
    var recipe = this.recipe;
    if (recipe) {
      recipe.title = this.form.controls['title'].value;
      recipe.ingredients = this.form.controls['ingredients'].value;
      recipe.steps = this.form.controls['steps'].value;
      recipe.crockPot = this.form.controls['crockPot'].value;

      var url = environment.baseUrl + 'Recipes/Update';
      this.http.put<RecipeDataPreParse>(url, recipe).subscribe({
        next: (result) => {
          console.log(
            'Recipe nubmer' + recipe!.recipeId + ' has been updated.'
          );
          this.router.navigate(['/recipes']);
        },
        error: (e) => console.error(e),
      });
    }
  }
}
