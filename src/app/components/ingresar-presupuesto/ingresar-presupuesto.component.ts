import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-presupuesto',
  templateUrl: './ingresar-presupuesto.component.html',
  styleUrls: ['./ingresar-presupuesto.component.css']
})
export class IngresarPresupuestoComponent implements OnInit {
  cantidad: number;
  cantidadIncorrecta: boolean;

  constructor(private _pService:PresupuestoService, private router: Router) {
    this.cantidad = 0;
    this.cantidadIncorrecta = false;
  }

  ngOnInit(): void {
  }

  agregar(): void {
    if(this.cantidad > 0 ) {
      this.cantidadIncorrecta = false;
      this._pService.presupuesto = this.cantidad;
      this._pService.restante = this.cantidad;
      this.router.navigate(['/gastos']);
    } else {
      this.cantidadIncorrecta = true;
    }
  }

}
