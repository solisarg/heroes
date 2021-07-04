import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Hero } from 'src/app/model/dto';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public heroes:Hero[] = [];
  public totalHeroes:number = 0;
  public pageSize:number = 5;
  public dataSource:MatTableDataSource<Hero>;
  public displayedColumns = ["position", "name", "strength", "edit"];
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private service:HeroService, private _router:Router) { }

  ngOnInit(): void {
    this.service.getHeroes()
      .subscribe(result => this.onHeroes(result))
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onHeroes(result){
    this.heroes = result;
    this.totalHeroes = this.heroes.length;
    this.dataSource = new MatTableDataSource(this.heroes);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row, event) 
  {
    if(event.target.id)
      this._router.navigate(['heroes/'+event.target.id])
  }
}
