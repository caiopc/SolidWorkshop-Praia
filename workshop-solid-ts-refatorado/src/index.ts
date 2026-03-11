import { Funcionario } from "./models/Funcionario.js";
import { CalculadoraSalario } from "./services/CalculadoraSalario.js";
import { RelatorioFuncionario } from "./services/RelatorioFuncionario.js";
import { FuncionarioRepository } from "./services/FuncionarioRepository.js";
import { NotaFiscal } from "./models/NotaFiscal.js";
import { ValidadorNotaFiscal } from "./services/ValidadorNotaFiscal.js";
import { CalculadoraImpostos } from "./services/CalculadoraImpostos.js";
import { NotaFiscalEmailService } from "./services/NotaFiscalEmailService.js";
import {
  DescontoRegular, DescontoPremium, DescontoVip, DescontoFuncionario,
} from "./interfaces/IDescontoStrategy.js";
import { CalculadoraDesconto } from "./services/CalculadoraDesconto.js";
import { RelatorioPdf, RelatorioExcel, RelatorioCsv } from "./interfaces/IFormatoRelatorio.js";
import { GeradorRelatorio } from "./services/GeradorRelatorio.js";
import { ContaBancaria, ContaPoupanca } from "./models/ContaBancaria.js";
import { Ave, Papagaio, Pinguim, isVoavel } from "./models/Ave.js";
import {
  FuncionarioCLT, Estagiario, Terceirizado,
  type ITrabalhador, type IRegistraPonto,
} from "./interfaces/ITrabalhador.js";
import { ImpressoraMultifuncional, ImpressoraSimples } from "./interfaces/IImpressora.js";
import {
  SqlRepository, MongoRepository, EmailService,
  SmsNotificador, PushNotificador, EmailNotificador,
} from "./services/Infraestrutura.js";
import { PedidoService } from "./services/PedidoService.js";
import { NotificacaoService } from "./services/NotificacaoService.js";

console.log("╔══════════════════════════════════════════════════╗");
console.log("║   WORKSHOP SOLID (TypeScript) - REFATORADO       ║");
console.log("╚══════════════════════════════════════════════════╝");

// ===== SRP =====
console.log("\n┌──────────────────────────────────────────────────┐");
console.log("│  S - Single Responsibility Principle (Corrigido) │");
console.log("└──────────────────────────────────────────────────┘");

console.log("\n>> SRP Corrigido #1: Funcionario separado em classes");
const func = new Funcionario("Maria Silva", "Desenvolvedora", 5500, "maria@empresa.com");
const calculadoraSalario = new CalculadoraSalario();
const relatorio = new RelatorioFuncionario(calculadoraSalario);
const repository = new FuncionarioRepository();
console.log(relatorio.gerar(func));
repository.salvar(func);

console.log("\n>> SRP Corrigido #2: NotaFiscal com serviços separados");
const nf = new NotaFiscal(1001, "João Santos", "joao@cliente.com", 1500);
const validador = new ValidadorNotaFiscal();
const calcImpostos = new CalculadoraImpostos();
const emailNf = new NotaFiscalEmailService();
if (validador.validar(nf)) { calcImpostos.calcular(nf); emailNf.enviar(nf); }

// ===== OCP =====
console.log("\n\n┌──────────────────────────────────────────────────┐");
console.log("│  O - Open/Closed Principle (Corrigido)            │");
console.log("└──────────────────────────────────────────────────┘");

console.log("\n>> OCP Corrigido #1: CalculadoraDesconto com Strategy");
const calcDesconto = new CalculadoraDesconto([
  new DescontoRegular(), new DescontoPremium(), new DescontoVip(), new DescontoFuncionario(),
]);
calcDesconto.calcularDesconto("regular", 200);
calcDesconto.calcularDesconto("premium", 200);
calcDesconto.calcularDesconto("vip", 200);
calcDesconto.calcularDesconto("funcionário", 200);

console.log("\n>> OCP Corrigido #2: GeradorRelatorio com Strategy");
const gerador = new GeradorRelatorio([new RelatorioPdf(), new RelatorioExcel(), new RelatorioCsv()]);
gerador.gerar("pdf", "Conteúdo do relatório mensal");
gerador.gerar("excel", "Dados da planilha");

// ===== LSP =====
console.log("\n\n┌──────────────────────────────────────────────────┐");
console.log("│  L - Liskov Substitution Principle (Corrigido)    │");
console.log("└──────────────────────────────────────────────────┘");

console.log("\n>> LSP Corrigido #1: ContaPoupanca respeita contrato");
const contaCorrente: ContaBancaria = new ContaBancaria("Carlos", 500);
contaCorrente.sacar(400);
const contaPoupanca: ContaBancaria = new ContaPoupanca("Ana", 500);
contaPoupanca.sacar(450); // Retorna false, sem exceção

console.log("\n>> LSP Corrigido #2: Pinguim não implementa IVoavel");
const aves: Ave[] = [new Papagaio(), new Pinguim()];
for (const ave of aves) {
  ave.comer();
  if (isVoavel(ave)) ave.voar();
  if (ave instanceof Pinguim) ave.nadar();
}

// ===== ISP =====
console.log("\n\n┌──────────────────────────────────────────────────┐");
console.log("│  I - Interface Segregation Principle (Corrigido)  │");
console.log("└──────────────────────────────────────────────────┘");

console.log("\n>> ISP Corrigido #1: Interfaces segregadas para trabalhadores");
const clt = new FuncionarioCLT("Roberto");
const estagiario = new Estagiario("Lucas");
const terceirizado = new Terceirizado("Fernando");

const todos: ITrabalhador[] = [clt, estagiario, terceirizado];
for (const t of todos) t.trabalhar();

console.log();
const registramPonto: IRegistraPonto[] = [clt, estagiario];
for (const t of registramPonto) t.registrarPonto();

console.log();
clt.gerarRelatorioGerencial();

console.log("\n>> ISP Corrigido #2: Interfaces segregadas para impressoras");
const multi = new ImpressoraMultifuncional();
multi.imprimir("Relatório.pdf");
multi.escanear("Contrato.pdf");
const simples = new ImpressoraSimples();
simples.imprimir("Recibo.pdf");
console.log("[Simples] Scanner? Não tenho essa interface. Tudo certo!");

// ===== DIP =====
console.log("\n\n┌──────────────────────────────────────────────────┐");
console.log("│  D - Dependency Inversion Principle (Corrigido)   │");
console.log("└──────────────────────────────────────────────────┘");

console.log("\n>> DIP Corrigido #1: PedidoService com injeção de dependência");
const sqlRepo = new SqlRepository();
const emailService = new EmailService();
const pedidoSql = new PedidoService(sqlRepo, emailService);
pedidoSql.criarPedido("Maria", "Notebook Dell", 4500);

console.log("\n   (Trocando para MongoDB sem alterar PedidoService!)");
const mongoRepo = new MongoRepository();
const pedidoMongo = new PedidoService(mongoRepo, emailService);
pedidoMongo.criarPedido("João", "Mouse Logitech", 250);

console.log("\n>> DIP Corrigido #2: NotificacaoService com injeção de dependência");
const notificacao = new NotificacaoService([
  new SmsNotificador(), new PushNotificador(), new EmailNotificador(),
]);
notificacao.notificar("sms", "(11) 99999-0000", "Seu pedido foi enviado!");
notificacao.notificar("push", "device-abc-123", "Promoção relâmpago!");
notificacao.notificar("email", "cliente@email.com", "Bem-vindo à nossa loja!");

console.log("\n══════════════════════════════════════════════════");
console.log("Versão refatorada finalizada. Código limpo!");
console.log("══════════════════════════════════════════════════");
