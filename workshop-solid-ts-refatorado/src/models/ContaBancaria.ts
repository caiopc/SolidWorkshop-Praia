// LSP CORRIGIDO: Contrato claro via validarSaque().
// Nenhuma subclasse lança exceção — todas retornam boolean.
export class ContaBancaria {
  protected saldo: number;

  constructor(public titular: string, saldoInicial: number) {
    this.saldo = saldoInicial;
  }

  depositar(valor: number): void {
    this.saldo += valor;
    console.log(`Depósito de R$ ${valor.toFixed(2)} realizado. Saldo: R$ ${this.saldo.toFixed(2)}`);
  }

  sacar(valor: number): boolean {
    if (!this.validarSaque(valor)) return false;
    this.saldo -= valor;
    console.log(`Saque de R$ ${valor.toFixed(2)} realizado. Saldo: R$ ${this.saldo.toFixed(2)}`);
    return true;
  }

  protected validarSaque(valor: number): boolean {
    if (valor > this.saldo) { console.log("Saldo insuficiente."); return false; }
    return true;
  }
}

export class ContaPoupanca extends ContaBancaria {
  private static readonly SALDO_MINIMO = 100.0;

  protected override validarSaque(valor: number): boolean {
    if (!super.validarSaque(valor)) return false;
    if (this.saldo - valor < ContaPoupanca.SALDO_MINIMO) {
      console.log(
        `Conta poupança exige saldo mínimo de R$ ${ContaPoupanca.SALDO_MINIMO.toFixed(2)}. ` +
          `Saldo: R$ ${this.saldo.toFixed(2)}, Saque: R$ ${valor.toFixed(2)}. Operação recusada.`
      );
      return false;
    }
    return true;
  }
}
