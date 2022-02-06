import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gasto } from 'src/app/gasto.model';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-listar-gasto',
  templateUrl: './listar-gasto.component.html',
  styleUrls: ['./listar-gasto.component.css']
})
export class ListarGastoComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  presupuesto: number;
  restante: number;
  listaGastos: Gasto[] = [];

  constructor(private _pservice: PresupuestoService) {
    this.presupuesto = 0;
    this.restante = 0;
    this.subscription = this._pservice.getGastos().subscribe(data => {
      this.restante = this._pservice.restante;
      this.listaGastos = data;
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.presupuesto = this._pservice.presupuesto;
    this.restante = this._pservice.restante;
  }

  aplicarColorRestante() {
    if(this.presupuesto/4 > this.restante) {
      return 'alert-danger';
    } else if (this.presupuesto/2 > this.restante) {
      return 'alert-warning';
    } else {
      return 'alert-secondary';
    }
  }

  eliminarGasto(index: number): void {
    this._pservice.eliminarGasto(index);
  }

}
