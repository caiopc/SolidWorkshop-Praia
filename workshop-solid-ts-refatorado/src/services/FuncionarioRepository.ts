import { Funcionario } from "../models/Funcionario.js";

// SRP CORRIGIDO: Responsabilidade única — persistência.
export class FuncionarioRepository {
  salvar(funcionario: Funcionario): void {
    console.log(
      `[SQL] INSERT INTO Funcionarios (Nome, Cargo, Salario, Email) ` +
        `VALUES ('${funcionario.nome}', '${funcionario.cargo}', ${funcionario.salarioBase}, '${funcionario.email}')`
    );
    console.log(`Funcionário ${funcionario.nome} salvo no banco de dados com sucesso!`);
  }
}
