import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/app/model/dto';
import { HeroService } from 'src/app/services/hero.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { UpdateDialog, CreateDialog, DeleteDialog, ErrorDialog} from '../../components/modals/modals';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  public heroe:Hero = Hero.getInstance();
  public nameError = false;
  public strengthError = false;
  dialogRef:MatDialogRef<any>;
  
  constructor(private route:ActivatedRoute,
    private _router:Router,
    private heroService:HeroService,
    private dialog:MatDialog) {
    //subscribe to id, this way we can change manually the url and 
    //get different heros
    this.route.params.subscribe(params =>{
      let id = params['id'];
      if(!isNaN(id) && id>0){
        this.heroService.getHero(id)
          .subscribe(result => this.heroe = result)
      }
    })
  }

  //Add a Hero
  addHero(){
    if(this.validate())
      this.heroService.save(this.heroe)
        .subscribe(result => this.added(result), (error) => this.onError('No se ha podido crear el heroe, verifique que el nombre no exista'))
  }

  //validate a Hero
  validate():boolean{
    this.nameError = (this.heroe.name == '');
    this.strengthError = (this.heroe.strength =='');
    return (!this.nameError && !this.strengthError)
  }

  //Show errors
  onError(error){
    this.dialog.open(ErrorDialog, {
      data: {
        msg: error
      }
    });
  };

  //show the confirmation dialog
  added(result){
    this.dialogRef = this.dialog.open(CreateDialog);
    this.dialogRef.afterClosed().subscribe(result => {
      this._router.navigate(['/heroes'])
    });
  }

  //update the hero
  updateHero(){
    if(this.validate())
    this.heroService.save(this.heroe)
      .subscribe(result => this.updated(result), (error) => this.onError('No se ha podido actualizar el héroe'))
  }

  //Show update confirmation
  updated(result){
    this.dialogRef = this.dialog.open(UpdateDialog);
    this.dialogRef.afterClosed().subscribe(result => {
      this._router.navigate(['/heroes'])
    });
  }

  //delete a Hero asking for confirmation in the dialog
  deleteHero(){
    this.dialogRef = this.dialog.open(DeleteDialog);
    this.dialogRef.afterClosed().subscribe(result => {
      if(result=='delete'){
        this.heroService.delete(this.heroe)
          .subscribe(result => this.onDelete(result), (error) => this.onError('No se ha podido borrar el héroe'))
      }
    });
  }

  //Redirect to list after deletion
  onDelete(result){
    this._router.navigate(['/heroes']);
  }
}
