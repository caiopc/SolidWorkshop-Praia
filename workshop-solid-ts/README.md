# Workshop SOLID - TypeScript (Violacoes)

Projeto didatico que demonstra **violacoes intencionais** dos principios SOLID em TypeScript. Cada principio possui 2 cenarios com codigo que compila e roda, mas que apresenta problemas de design evidentes.

> **Versao refatorada:** [workshop-solid-ts-refatorado](../workshop-solid-ts-refatorado)

## Pre-requisitos

- Node.js 18+
- npm

## Como rodar

```bash
npm install
npm start
```

## Estrutura do projeto

```
src/
├── index.ts                         # Ponto de entrada - executa todos os cenarios
├── models/
│   ├── Funcionario.ts               # SRP: calcula salario + gera relatorio + salva no banco
│   ├── NotaFiscal.ts                # SRP: valida + calcula impostos + envia email
│   ├── ContaBancaria.ts             # LSP: ContaPoupanca lanca excecao em sacar()
│   └── Ave.ts                       # LSP: Pinguim lanca excecao em voar()
├── interfaces/
│   ├── ITrabalhador.ts              # ISP: interface gorda com 5 metodos
│   └── IImpressora.ts               # ISP: ImpressoraSimples forcada a implementar scanner/fax
└── services/
    ├── CalculadoraDesconto.ts       # OCP: switch/case para tipos de cliente
    ├── GeradorRelatorio.ts          # OCP: if/else para formatos de relatorio
    ├── PedidoService.ts             # DIP: new SqlRepository() hardcoded
    └── NotificacaoService.ts        # DIP: dependencias concretas + if/else
```

## Mapa de violacoes

| Principio | Cenario | Arquivo | Violacao |
|-----------|---------|---------|----------|
| **SRP** | #1 | `Funcionario.ts` | Uma classe com 3 responsabilidades (calculo, relatorio, persistencia) |
| **SRP** | #2 | `NotaFiscal.ts` | Validacao, calculo de impostos e envio de email na mesma classe |
| **OCP** | #1 | `CalculadoraDesconto.ts` | `switch` que precisa ser alterado para cada novo tipo de cliente |
| **OCP** | #2 | `GeradorRelatorio.ts` | `if/else` que precisa ser alterado para cada novo formato |
| **LSP** | #1 | `ContaBancaria.ts` | `ContaPoupanca.sacar()` lanca `Error` onde a base retorna `void` |
| **LSP** | #2 | `Ave.ts` | `Pinguim.voar()` lanca `Error` quebrando o contrato da classe base |
| **ISP** | #1 | `ITrabalhador.ts` | Interface com 5 metodos; `Estagiario` e `Terceirizado` lancam excecoes |
| **ISP** | #2 | `IImpressora.ts` | `ImpressoraSimples` forcada a implementar `escanear()` e `enviarFax()` |
| **DIP** | #1 | `PedidoService.ts` | Instancia `SqlRepository` e `EmailService` diretamente com `new` |
| **DIP** | #2 | `NotificacaoService.ts` | Cria dependencias concretas no construtor + `if/else` por canal |

## Saida esperada

Ao rodar, o programa exibe cada violacao com mensagens claras, incluindo os erros lancados por metodos que nao deveriam falhar:

```
╔══════════════════════════════════════════════════╗
║     WORKSHOP SOLID (TypeScript) - VIOLAÇÕES      ║
╚══════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────┐
│  S - Single Responsibility Principle (Violações) │
└──────────────────────────────────────────────────┘

>> SRP Violação #1: Classe Funcionario
[Relatório] Maria Silva | Desenvolvedora | Salário líquido: R$ 4400.00
[BD] Salvando Maria Silva no banco de dados...
...
```

## Objetivo

Este projeto serve como material de apoio para workshops sobre SOLID. Os participantes podem:

1. Ler o codigo e identificar as violacoes
2. Comparar com a [versao refatorada](../workshop-solid-ts-refatorado)
3. Entender na pratica por que cada principio existe

## Licenca

MIT
