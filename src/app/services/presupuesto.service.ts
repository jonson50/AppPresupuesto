import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Gasto } from '../gasto.model';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  presupuesto: number;
  restante: number;
  listaGastos:Gasto[];
  private gastos$ = new Subject<any>();
  
  constructor() {
    this.presupuesto = 0;
    this.restante = 0;
    this.listaGastos = [];
  }

  agregarGasto(gasto: any) {
     this.restante -= gasto.cantidad;
     this.listaGastos.push(gasto);
     this.gastos$.next(this.listaGastos);
  }

  getGastos(): Observable<any> {
    return this.gastos$.asObservable();
  }

  eliminarGasto(index: number): void {
    this.restante += this.listaGastos[index].cantidad;
    this.listaGastos.splice(index, 1);
    this.gastos$.next(this.listaGastos);
  }
}
