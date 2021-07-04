import { ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from 'src/app/services/hero.service';
import { MockApiService } from 'src/app/services/mockapi.service';
import { from } from 'rxjs';
import { EditComponent } from './edit.component';
import {RouterTestingModule} from '@angular/router/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { Hero } from 'src/app/model/dto';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormField, MatLabel } from '@angular/material/form-field';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule,FormsModule,BrowserAnimationsModule],
      declarations: [ EditComponent ],
      providers: [{provide:HeroService, useClass:MockApiService},
        {provide:ActivatedRoute,useValue: {params: from([{id: 11}])}},
        MatDialog, Overlay
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be Hero in the path', () => {
    expect(component.heroe.id).toBe(11);
    expect(component.heroe.name).toBe('Mr. Nice');
  });

  it('Add a Hero should open the confirm', (done:DoneFn) => {
    let hero:Hero = new Hero(100, 'Jorge', 'Angular')
    component.heroe = hero;
    spyOn(component, 'added')
    component.addHero()
    expect(component.heroe.id).toBe(100);
    expect(component.heroe.name).toBe('Jorge');
    expect(component.added).toHaveBeenCalled();
    done();
  });

  it('Edit a Hero should open the confirm', (done:DoneFn) => {
    component.heroe.name = 'Mr Smuggles';
    spyOn(component, 'updateHero')
    component.updateHero()
    expect(component.heroe.name).toBe('Mr Smuggles');
    expect(component.updateHero).toHaveBeenCalled();
    done();
  });

});
