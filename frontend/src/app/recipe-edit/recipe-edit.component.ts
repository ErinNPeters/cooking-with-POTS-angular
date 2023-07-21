import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RecipeDataPreParse } from '../interfaces/RecipeDataPreParse';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  title?: string;
  form!: FormGroup;
  recipe?: RecipeDataPreParse;
  id?: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        title: new FormControl('', Validators.required),
        ingredients: new FormControl('', Validators.required),
        steps: new FormControl('', Validators.required),
        crockPot: new FormControl(''),
      },
      null,
      this.isDuplicateRecipe()
    );
    this.loadData();
  }

  loadData() {
    var idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;

    if (this.id) {
      var url = environment.baseUrl + 'Recipes/ForEdit/' + this.id;
      this.http.get<RecipeDataPreParse>(url).subscribe({
        next: (result) => {
          this.recipe = result;
          this.title = 'Edit - ' + this.recipe.title;
          this.form.patchValue(this.recipe);
        },
        error: (e) => console.error(e),
      });
    } else {
      this.title = 'Create a new Recipe';
    }
  }

  onSubmit() {
    var recipe = this.id ? this.recipe : <RecipeDataPreParse>{};

    if (recipe) {
      recipe.title = this.form.controls['title'].value;
      recipe.ingredients = this.form.controls['ingredients'].value;
      recipe.steps = this.form.controls['steps'].value;
      recipe.crockPot = this.form.controls['crockPot'].value
        ? this.form.controls['crockPot'].value
        : false;

      if (this.id) {
        var url = environment.baseUrl + 'Recipes/Update';
        this.http.put<RecipeDataPreParse>(url, recipe).subscribe({
          next: (result) => {
            console.log(
              'Recipe number ' + recipe!.recipeId + ' has been updated.'
            );
            this.router.navigate(['/recipes']);
          },
          error: (e) => console.error(e),
        });
      } else {
        var url = environment.baseUrl + 'Recipes/AddIntResponse';
        this.http.post<RecipeDataPreParse>(url, recipe).subscribe({
          next: (result) => {
            console.log('Recipe number ' + result + ' has been created.');
            this.router.navigate(['/recipes']);
          },
          error: (e) => console.error(e),
        });
      }
    }
  }

  isDuplicateRecipe(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      var recipe = <RecipeDataPreParse>{};
      recipe.recipeId = this.id ? this.id : 0;
      recipe.title = this.form.controls['title'].value;
      recipe.ingredients = this.form.controls['ingredients'].value;
      recipe.steps = this.form.controls['steps'].value;

      var url = environment.baseUrl + 'Recipes/IsDuplicateRecipe';
      return this.http.post<boolean>(url, recipe).pipe(
        map((result) => {
          return result ? { isDuplicateRecipe: true } : null;
        })
      );
    };
  }
}
