import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { RecipeSearchComponent } from './recipe-search.component';
import { RecipeService, SearchGridResult } from '../recipe.service';
import { AngularMaterialModule } from '../angular-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import {
  RecipeFromServer,
  recipeTestDataPostParse,
} from '../interfaces/RecipeDataPostParse';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RecipeSearchComponent', () => {
  let component: RecipeSearchComponent;
  let fixture: ComponentFixture<RecipeSearchComponent>;

  beforeEach(async () => {
    let recipeService = jasmine.createSpyObj<RecipeService>('RecipeService', [
      'getSearchGridData',
    ]);

    recipeService.getSearchGridData.and.returnValue(
      of<SearchGridResult<RecipeFromServer>>(<
        SearchGridResult<RecipeFromServer>
      >{
        data: recipeTestDataPostParse,
        totalCount: 1,
        pageIndex: 0,
        pageSize: 10,
      })
    );

    await TestBed.configureTestingModule({
      declarations: [RecipeSearchComponent],
      imports: [
        AngularMaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: RecipeService, useValue: recipeService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSearchComponent);
    component = fixture.componentInstance;
    component.paginator = jasmine.createSpyObj('MatPaginator', [
      'length',
      'pageIndex',
      'pageSize',
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a "Recipes" title', () => {
    let title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toEqual('Recipes');
  });

  it('should contain a table with a list of one or more recipes', () => {
    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    console.log(tableRows);
    expect(tableRows.length).toBeGreaterThan(0);
  });

  it('recipe Id should be 1', () => {
    fixture.detectChanges();
    let data = fixture.componentInstance.recipes.data;
    expect(data[0].recipeId).toEqual(1);
  });
});
