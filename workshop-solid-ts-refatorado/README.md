# Workshop SOLID - TypeScript (Refatorado)

Versao refatorada do projeto [workshop-solid-ts](../workshop-solid-ts), aplicando corretamente os 5 principios SOLID. Cada cenario de violacao foi corrigido com padroes adequados.

> **Versao com violacoes:** [workshop-solid-ts](../workshop-solid-ts)

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
├── index.ts                            # Ponto de entrada
├── models/
│   ├── Funcionario.ts                  # SRP: apenas dados (readonly)
│   ├── NotaFiscal.ts                   # SRP: apenas dados
│   ├── ContaBancaria.ts                # LSP: validarSaque() retorna boolean
│   └── Ave.ts                          # LSP: IVoavel + type guard isVoavel()
├── interfaces/
│   ├── IDescontoStrategy.ts            # OCP: Strategy para descontos
│   ├── IFormatoRelatorio.ts            # OCP: Strategy para formatos
│   ├── ITrabalhador.ts                 # ISP: 5 interfaces segregadas
│   ├── IImpressora.ts                  # ISP: IImpressora, IScanner, IFax, IDuplex
│   └── IRepository.ts                  # DIP: IRepository, IServicoEmail, INotificador
└── services/
    ├── CalculadoraSalario.ts           # SRP: apenas calculo salarial
    ├── RelatorioFuncionario.ts         # SRP: apenas geracao de relatorio
    ├── FuncionarioRepository.ts        # SRP: apenas persistencia
    ├── ValidadorNotaFiscal.ts          # SRP: apenas validacao
    ├── CalculadoraImpostos.ts          # SRP: apenas calculo de impostos
    ├── NotaFiscalEmailService.ts       # SRP: apenas envio de email
    ├── CalculadoraDesconto.ts          # OCP: recebe IDescontoStrategy[]
    ├── GeradorRelatorio.ts             # OCP: recebe IFormatoRelatorio[]
    ├── Infraestrutura.ts               # DIP: implementacoes concretas
    ├── PedidoService.ts                # DIP: injecao via construtor
    └── NotificacaoService.ts           # DIP: recebe INotificador[]
```

## Principios aplicados

### S - Single Responsibility

| Antes | Depois |
|-------|--------|
| `Funcionario` com 3 responsabilidades | `Funcionario` (dados) + `CalculadoraSalario` + `RelatorioFuncionario` + `FuncionarioRepository` |
| `NotaFiscal` com validacao/impostos/email | `NotaFiscal` (dados) + `ValidadorNotaFiscal` + `CalculadoraImpostos` + `NotaFiscalEmailService` |

### O - Open/Closed

| Antes | Depois |
|-------|--------|
| `switch` para tipos de desconto | **Strategy Pattern**: `IDescontoStrategy` com implementacoes independentes |
| `if/else` para formatos | **Strategy Pattern**: `IFormatoRelatorio` com implementacoes independentes |

Novo tipo de desconto ou formato? Basta criar uma nova classe que implementa a interface.

### L - Liskov Substitution

| Antes | Depois |
|-------|--------|
| `ContaPoupanca.sacar()` lanca `Error` | `validarSaque()` retorna `boolean` - subclasse sobrescreve a validacao |
| `Pinguim.voar()` lanca `Error` | `IVoavel` como interface separada + type guard `isVoavel()` |

```typescript
// Type guard para verificar se ave pode voar
export function isVoavel(ave: Ave): ave is Ave & IVoavel {
  return "voar" in ave;
}
```

### I - Interface Segregation

| Antes | Depois |
|-------|--------|
| `ITrabalhador` com 5 metodos | `ITrabalhador`, `IRegistraPonto`, `IUsaRefeitorio`, `IGeradorRelatorioGerencial`, `IParticipanteReuniao` |
| `IImpressora` com imprimir/escanear/fax | `IImpressora`, `IScanner`, `IFax`, `IDuplex` |

Cada classe implementa apenas as interfaces que fazem sentido para ela.

### D - Dependency Inversion

| Antes | Depois |
|-------|--------|
| `new SqlRepository()` dentro do service | Recebe `IRepository` e `IServicoEmail` via construtor |
| `new SmsService()` dentro do service | Recebe `INotificador[]` via construtor |

```typescript
// Troca de banco de dados sem alterar o service
const pedidoSql = new PedidoService(new SqlRepository(), emailService);
const pedidoMongo = new PedidoService(new MongoRepository(), emailService);
```

## Padroes utilizados

- **Strategy Pattern** (OCP) - encapsula algoritmos intercambiaveis atras de interfaces
- **Dependency Injection** (DIP) - dependencias fornecidas via construtor
- **Interface Segregation** (ISP) - interfaces pequenas e coesas
- **Type Guards** (LSP) - `isVoavel()` para verificacao segura de capacidades em runtime

## Saida esperada

```
╔══════════════════════════════════════════════════╗
║   WORKSHOP SOLID (TypeScript) - REFATORADO       ║
╚══════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────┐
│  S - Single Responsibility Principle (Corrigido) │
└──────────────────────────────────────────────────┘

>> SRP Corrigido #1: Funcionario separado em classes
[Relatório] Maria Silva | Desenvolvedora | Salário líquido: R$ 4400.00
[BD] Salvando Maria Silva no banco de dados...
...
```

Nenhuma excecao e lancada. Tudo funciona de forma previsivel.

## Objetivo

Este projeto serve como material de apoio para workshops sobre SOLID. Compare lado a lado com a [versao com violacoes](../workshop-solid-ts) para entender o impacto de cada principio.

## Licenca

MIT
