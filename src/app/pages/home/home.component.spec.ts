import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {RouterTestingModule} from '@angular/router/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Hero } from 'src/app/model/dto';
import { HeroService } from 'src/app/services/hero.service';
import { HttpClient, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockApiService } from 'src/app/services/mockapi.service';
import {By} from "@angular/platform-browser";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dataSource:MatTableDataSource<Hero> = new MatTableDataSource([Hero.getInstance()]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatInputModule, MatTableModule,
        MatPaginatorModule, BrowserAnimationsModule],
      declarations: [ HomeComponent ],
      providers:[HttpClient,HttpHandler,
        { provide: HeroService,
        useClass: MockApiService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.dataSource = dataSource;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load heroes', () => {
    spyOn(component, 'onHeroes');
    component.ngOnInit();
    expect(component.onHeroes).toHaveBeenCalled();
  });

  it('Heroe list should come from the service', () => {
    component.ngOnInit();
    expect(component.heroes.length).toBe(10);
    expect(component.heroes[5].name).toBe('RubberMan');
  });

  it('List filter should trigger applyfilter', () => {
    component.ngOnInit();
    spyOn(component, 'applyFilter');
    fixture.detectChanges();
    const filter = fixture.debugElement.query(By.css('#filter'));
    filter.nativeElement.value = "Nar"
    filter.triggerEventHandler('keyup', {value:'Nar'});
    fixture.detectChanges();
    component.onRowClicked(1, {target:{id:1}});
    expect(component.applyFilter).toHaveBeenCalled();
  });

 
});
