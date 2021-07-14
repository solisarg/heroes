import { Component, OnInit } from '@angular/core';
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
export class EditComponent implements OnInit {
  public heroe:Hero = Hero.getInstance();
  public nameError = false;
  public strengthError = false;
  dialogRef:MatDialogRef<any>;
  
  constructor(private route:ActivatedRoute,
    private _router:Router,
    private heroService:HeroService,
    private dialog:MatDialog) {
    this.route.params.subscribe(params =>{
      let id = params['id'];
      if(!isNaN(id) && id>0){
        this.heroService.getHero(id)
          .subscribe(result => this.heroe = result)
      }
    })
  }

  ngOnInit(): void {
  }

  addHero(){
    this.nameError = this.heroe.name == '';
    this.strengthError = this.heroe.strength =='';
    if(!this.nameError && !this.strengthError)
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
    this.dialogRef = this.dialog.open(CreateDialog);
    this.dialogRef.afterClosed().subscribe(result => {
      this._router.navigate(['/heroes'])
    });
  }

  updateHero(){
    this.heroService.save(this.heroe)
      .subscribe(result => this.updated(result), (error) => this.onError('No se ha podido actualizar el héroe'))
  }

  updated(result){
    this.dialogRef = this.dialog.open(UpdateDialog);
    this.dialogRef.afterClosed().subscribe(result => {
      this._router.navigate(['/heroes'])
    });
  }

  deleteHero(){
    this.dialogRef = this.dialog.open(DeleteDialog);
    this.dialogRef.afterClosed().subscribe(result => {
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
