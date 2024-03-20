import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  amount: number = 0;
  billeteCount: number[] = [0, 0, 0, 0]; // Array to store bill counts

  setAmount(event: any): void {
    this.amount = event.target.value;
  }

  insertNumber(number: number): void {
    if (this.amount === 0) {
      this.amount = number;
    } else {
      this.amount = this.amount * 10 + number;
    }
  }

  clearTextBox(): void {
    this.amount = 0;
  }

  deleteOne(): void {
    this.amount = Math.floor(this.amount / 10);
  }

  ATM(): void {
    if (isNaN(this.amount) || this.amount > 1000000) {
      alert('Por favor ingrese una cantidad válida.');
      return;
    }

    if (this.amount % 10000 !== 0) {
      alert('La cantidad debe ser múltiplo de $10.000');
      return;
    }

    alert('Retirando $' + this.amount);
    this.cantidadBilletes(this.amount);
  }

  cantidadBilletes(amount: number): void {
    const billetes = [10000, 20000, 50000, 100000];

    this.billeteCount = [0, 0, 0, 0]; // Reset bill count array

    while (amount > 10000 && amount <= 1000000) {
      for (let i = 0; i < billetes.length; i++) {
        if (amount < billetes[i]) {
          continue;
        }

        const remainder = amount % billetes[i];
        if (remainder === 0) {
          this.billeteCount[i] = amount / billetes[i];
          amount = 0;
          break;
        } else {
          this.billeteCount[i] = Math.floor(amount / billetes[i]);
          amount = remainder;
        }
      }
    }

    // Update display elements using template binding
  }
}