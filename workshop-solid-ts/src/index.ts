import { Funcionario } from "./models/Funcionario.js";
import { NotaFiscal } from "./models/NotaFiscal.js";
import { CalculadoraDesconto } from "./services/CalculadoraDesconto.js";
import { GeradorRelatorio } from "./services/GeradorRelatorio.js";
import { ContaBancaria, ContaPoupanca } from "./models/ContaBancaria.js";
import { Ave, Papagaio, Pinguim } from "./models/Ave.js";
import {
  type ITrabalhador,
  FuncionarioCLT,
  Estagiario,
  Terceirizado,
} from "./interfaces/ITrabalhador.js";
import {
  type IImpressora,
  ImpressoraMultifuncional,
  ImpressoraSimples,
} from "./interfaces/IImpressora.js";
import { PedidoService } from "./services/PedidoService.js";
import { NotificacaoService } from "./services/NotificacaoService.js";

console.log("╔══════════════════════════════════════════════════╗");
console.log("║     WORKSHOP SOLID (TypeScript) - VIOLAÇÕES      ║");
console.log("╚══════════════════════════════════════════════════╝");

// ===== SRP =====
console.log("\n┌──────────────────────────────────────────────────┐");
console.log("│  S - Single Responsibility Principle (Violações) │");
console.log("└──────────────────────────────────────────────────┘");

console.log("\n>> SRP Violação #1: Classe Funcionario");
const func = new Funcionario("Maria Silva", "Desenvolvedora", 5500, "maria@empresa.com");
console.log(func.gerarRelatorio());
func.salvarNoBanco();

console.log("\n>> SRP Violação #2: Classe NotaFiscal");
const nf = new NotaFiscal(1001, "João Santos", "joao@cliente.com", 1500);
if (nf.validar()) {
  nf.calcularImpostos();
  nf.enviarPorEmail();
}

// ===== OCP =====
console.log("\n\n┌──────────────────────────────────────────────────┐");
console.log("│  O - Open/Closed Principle (Violações)            │");
console.log("└──────────────────────────────────────────────────┘");

console.log("\n>> OCP Violação #1: CalculadoraDesconto com switch");
const calc = new CalculadoraDesconto();
calc.calcularDesconto("regular", 200);
calc.calcularDesconto("premium", 200);
calc.calcularDesconto("vip", 200);
calc.calcularDesconto("funcionario", 200);

console.log("\n>> OCP Violação #2: GeradorRelatorio com if/else");
const gerador = new GeradorRelatorio();
gerador.gerar("pdf", "Conteúdo do relatório mensal");
gerador.gerar("excel", "Dados da planilha");

// ===== LSP =====
console.log("\n\n┌──────────────────────────────────────────────────┐");
console.log("│  L - Liskov Substitution Principle (Violações)    │");
console.log("└──────────────────────────────────────────────────┘");

console.log("\n>> LSP Violação #1: ContaPoupanca quebra sacar()");
const contaCorrente: ContaBancaria = new ContaBancaria("Carlos", 500);
contaCorrente.sacar(400);

const contaPoupanca: ContaBancaria = new ContaPoupanca("Ana", 500);
try {
  contaPoupanca.sacar(450);
} catch (e: any) {
  console.log(`ERRO INESPERADO: ${e.message}`);
}

console.log("\n>> LSP Violação #2: Pinguim não pode voar()");
const aves: Ave[] = [new Papagaio(), new Pinguim()];
for (const ave of aves) {
  ave.comer();
  try {
    ave.voar();
  } catch (e: any) {
    console.log(`ERRO INESPERADO: ${e.message}`);
  }
}

// ===== ISP =====
console.log("\n\n┌──────────────────────────────────────────────────┐");
console.log("│  I - Interface Segregation Principle (Violações)  │");
console.log("└──────────────────────────────────────────────────┘");

console.log("\n>> ISP Violação #1: ITrabalhador (interface gorda)");
const trabalhadores: ITrabalhador[] = [
  new FuncionarioCLT("Roberto"),
  new Estagiario("Lucas"),
  new Terceirizado("Fernando"),
];
for (const t of trabalhadores) {
  t.trabalhar();
  try { t.registrarPonto(); } catch (e: any) { console.log(`  ERRO: ${e.message}`); }
  try { t.gerarRelatorioGerencial(); } catch (e: any) { console.log(`  ERRO: ${e.message}`); }
}

console.log("\n>> ISP Violação #2: IImpressora (interface gorda)");
const multi: IImpressora = new ImpressoraMultifuncional();
multi.imprimir("Relatório.pdf");
multi.escanear("Contrato.pdf");

const simples: IImpressora = new ImpressoraSimples();
simples.imprimir("Recibo.pdf");
try { simples.escanear("Documento.pdf"); } catch (e: any) { console.log(`  ERRO: ${e.message}`); }

// ===== DIP =====
console.log("\n\n┌──────────────────────────────────────────────────┐");
console.log("│  D - Dependency Inversion Principle (Violações)   │");
console.log("└──────────────────────────────────────────────────┘");

console.log("\n>> DIP Violação #1: PedidoService com 'new' concreto");
const pedidoService = new PedidoService();
pedidoService.criarPedido("Maria", "Notebook Dell", 4500);
pedidoService.cancelarPedido(42, "Maria");

console.log("\n>> DIP Violação #2: NotificacaoService com 'new' concreto");
const notificacao = new NotificacaoService();
notificacao.notificar("sms", "(11) 99999-0000", "Seu pedido foi enviado!");
notificacao.notificar("push", "device-abc-123", "Promoção relâmpago!");
notificacao.notificar("email", "cliente@email.com", "Bem-vindo à nossa loja!");

console.log("\n══════════════════════════════════════════════════");
console.log("Demonstração finalizada. Vamos refatorar?");
console.log("══════════════════════════════════════════════════");
