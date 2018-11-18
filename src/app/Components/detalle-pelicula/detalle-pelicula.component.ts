import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from 'src/app/Services/movie-service.service';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { Router, NavigationStart,ActivatedRoute } from '@angular/router';
import { Pelicula } from 'src/app/Clases/pelicula';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent implements OnInit {
    check:boolean=false;
    valoracion:number=0;
    valor:number=0;

  constructor(private _service:MovieServiceService,
    private _serviceU:UserServiceService,
    private _route:Router,
    private _activated:ActivatedRoute) {

      this._activated.url.subscribe(response=>
        {
            this.calcularValor();

        }
      )

     }
  
  calcularValor()
  {
    this.valoracion=this._service.selectPelicula.valoracion/this._service.selectPelicula.cantidadAlquileres;
  }

  ngOnInit() {
  }

  valorar()
  {
    this._service.selectPelicula.valoracion+=this.valor;
    this.calcularValor();
    this._service.updatePelicula(this._service.selectPelicula).subscribe(
      response=>{
        alert("La pelicula a sido alquilada con exito");
        this._route.navigate(["/ListaPeliculas"])
      }
    )
  }

  alquilar(movie:Pelicula)
  {
    if(this.check){
      movie.alquilada=this.check;
      movie.cantidadAlquileres++;
      this._service.updatePelicula(movie).subscribe(
        response=>{
          alert("La pelicula a sido alquilada con exito");
          this._route.navigate(["/ListaPeliculas"])
        }
      )
    }
    else
    alert("Debes aceptar el alquiler para confirmar.");
  }
}
