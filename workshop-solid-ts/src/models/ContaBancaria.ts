// =============================================================
// VIOLAÇÃO LSP #1: ContaPoupanca herda de ContaBancaria mas
// QUEBRA o contrato do método sacar(). A classe base apenas
// recusa o saque, mas ContaPoupanca lança exceção.
// =============================================================
export class ContaBancaria {
  protected saldo: number;

  constructor(public titular: string, saldoInicial: number) {
    this.saldo = saldoInicial;
  }

  depositar(valor: number): void {
    this.saldo += valor;
    console.log(`Depósito de R$ ${valor.toFixed(2)} realizado. Saldo: R$ ${this.saldo.toFixed(2)}`);
  }

  sacar(valor: number): void {
    if (valor > this.saldo) {
      console.log("Saldo insuficiente.");
      return;
    }
    this.saldo -= valor;
    console.log(`Saque de R$ ${valor.toFixed(2)} realizado. Saldo: R$ ${this.saldo.toFixed(2)}`);
  }

  consultarSaldo(): number {
    return this.saldo;
  }
}

export class ContaPoupanca extends ContaBancaria {
  private static readonly SALDO_MINIMO = 100.0;

  // Quebra o contrato: lança EXCEÇÃO inesperada
  override sacar(valor: number): void {
    if (this.saldo - valor < ContaPoupanca.SALDO_MINIMO) {
      throw new Error(
        `Conta poupança exige saldo mínimo de R$ ${ContaPoupanca.SALDO_MINIMO.toFixed(2)}. ` +
          `Saldo atual: R$ ${this.saldo.toFixed(2)}, Saque solicitado: R$ ${valor.toFixed(2)}`
      );
    }
    this.saldo -= valor;
    console.log(
      `Saque de R$ ${valor.toFixed(2)} realizado na poupança. Saldo: R$ ${this.saldo.toFixed(2)}`
    );
  }
}
