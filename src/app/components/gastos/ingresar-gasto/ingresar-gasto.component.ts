import { Component, OnInit } from '@angular/core';
import { Gasto } from 'src/app/gasto.model';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent implements OnInit {
  nombreGasto: string;
  cantidad: number;
  frmIncorrecto: boolean;
  textoIncorrecto: string;

  constructor(private _pservicio: PresupuestoService) {
    this.nombreGasto = '';
    this.cantidad = 0;
    this.frmIncorrecto = false;
    this.textoIncorrecto = '';
  }

  ngOnInit(): void {
  }

  agregarGasto(): void {
    if(this.cantidad > this._pservicio.restante) {
      this.textoIncorrecto = 'Cantidad ingresada es mayor al presupuesto restante';
      this.frmIncorrecto = true;
      return;
    } 
    
    if(this.nombreGasto === '' || this.cantidad <= 0 ) {
      this.textoIncorrecto = 'Nombre del gasto o cantidad incorrecta';  
      this.frmIncorrecto = true;
    } else {
      // creamos objeto
      const GASTO:Gasto = new Gasto();
      GASTO.descripcion = this.nombreGasto;
      GASTO.cantidad = this.cantidad;
      //Enviamos el objeto a los suscriptores via subject
      this._pservicio.agregarGasto(GASTO);

      //Reseteo de formulario
      this.frmIncorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
    } 
  }

}
