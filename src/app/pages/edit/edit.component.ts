import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/app/model/dto';
import { HeroService } from 'src/app/services/hero.service';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateDialog, CreateDialog, DeleteDialog, ErrorDialog} from '../../components/modals/modals';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public heroe:Hero = Hero.getInstance();
  public strength:string = '';
  public name:string = '';
  public nameError = false;
  public strengthError = false;
  public isAddMode = false;
  private id:number;
  public profileForm: FormGroup;
  submitted = false;

  constructor(private route:ActivatedRoute,
    private formBuilder: FormBuilder,
    private _router:Router,
    private heroService:HeroService,
    private dialog:MatDialog) {
    
    this.id = this.route.snapshot.params['id'];
    console.log('Id ', this.id)
    this.isAddMode = (this.id==0);

    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      strength: ['', Validators.required],
  });

    
  }

  ngOnInit(): void {
    if (!this.isAddMode) {
      this.heroService.getHero(this.id)
        .subscribe(result => this.onHero(result))
    }
  }

  onHero(result){
    this.heroe = result;
    this.name = this.heroe.name;
    this.strength = this.heroe.strength;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileForm.invalid) {
        return;
    } 
    //copy properties
    this.heroe.name = this.name
    this.heroe.strength = this.strength
    //call appropiate method
    if(this.id==0) this.addHero()
    else this.updateHero();
}

  addHero(){
      this.heroService.save(this.heroe)
        .subscribe(result => this.added(result), (error) => this.onError('No se ha podido crear el heroe, verifique que el nombre no exista'))
  }

  onError(error){
    this.dialog.open(ErrorDialog, {
      data: {
        msg: error
      }
    });
  };

  added(result){
    const dialogRef = this.dialog.open(CreateDialog);
    dialogRef.afterClosed().subscribe(result => {
      this._router.navigate(['/heroes'])
    });
  }

  updateHero(){
    this.heroService.save(this.heroe)
      .subscribe(result => this.updated(result), (error) => this.onError('No se ha podido actualizar el héroe'))
  }

  updated(result){
    const dialogRef = this.dialog.open(UpdateDialog);
    dialogRef.afterClosed().subscribe(result => {
      this._router.navigate(['/heroes'])
    });
  }

  deleteHero(){
    const dialogRef = this.dialog.open(DeleteDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result=='delete'){
        this.heroService.delete(this.heroe)
          .subscribe(result => this.onDelete(result), (error) => this.onError('No se ha podido borrar el héroe'))
      }
    });
  }

  onDelete(result){
    this._router.navigate(['/heroes']);
  }
}
