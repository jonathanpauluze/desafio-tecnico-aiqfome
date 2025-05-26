# 🍔 Aiqfome

Projeto feito para posição de Desenvolvedor Front-End Sênior

## 🚀 Tecnologias utilizadas

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui + Radix UI
- json-server (para servir de mock do backend)
- Zod + react-hook-form
- Zustand

## 📁 Estrutura de pastas

```
src/
├── app/                     # Rotas App Router
├── components/              # Componentes reutilizáveis
│   ├── icons/               # Ícones SVG como React components
│   └── ui/                  # Base do shadcn/ui e componentes gerais
├── hooks/                   # Hooks compartilhados
├── lib/                     # Funções utilitárias
├── templates/               # Páginas estruturadas por contexto (ex: restaurante, checkout)
├── contexts/                # Contexts e stores do Zustand
├── constants/               # Variáveis constantes
└── types/                   # Tipagens globais
```

## 📦 Rodando o projeto

Instale as dependências:

```bash
npm i
# ou
yarn i
# ou
pnpm i
```

Inicie o servidor json na porta 3001:

```bash
npx json-server --watch db.json --port 3001
```

Em uma novo terminal, execute o projeto:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

## ✅ Funcionalidades entregues

- [x] Listagem de restaurantes
- [x] Navegação de produtos no cardápio
- [x] Tela de produto com múltiplas variações (radio, checkbox, quantidades dinâmicas)
- [x] Carrinho de compras persistente
- [x] Edição de item do carrinho
- [x] Controle de restaurante único por carrinho (com dialog de conflito)
- [x] Compartilhamento via API de share do Navigator (adicionado fallback para copiar link)
- [x] Mobile-first
- [x] Dark mode nativo via Tailwind
- [x] Tipagem total (sem any), com validação de formulário utilizando Zod

## ❌ Funcionalidades não implementadas

Alguns pontos foram considerados, mas optados por não serem implementados neste teste por priorização de tempo:

- [ ] Tela de login e autenticação de usuário
- [ ] Testes unitários
- [ ] Animações de transição (para melhoria na usabilidade)
- [ ] Uso da API de geolocalização do browser e busca por CEP
- [ ] Internacionalização com i18next

## 🧠 Decisões técnicas

- Persistência com Zustand e LocalStorage: permite salvar estado mesmo após reloads sem depender de context API complexa
- Formulário dinâmico e validado: montado com base no JSON de opções e validado dinamicamente via schema
- Separação de templates e components: `templates/` cuida da estrutura de página e `components/` é reutilizável
- Controle de carrinho pelo id do restaurante: evita conflitos e permite clareza ao usuário sobre a origem dos produtos
- Extração de lógica complexa: como cálculo de total e organização de extras

## 🧪 Fluxo de desenvolvimento

Meu processo na construção do projeto:

1. Setup do projeto com Next.js 15, App Router, Tailwind, TypeScript e estruturação das rotas e templates

2. Criação do mock backend com json-server para simular endpoints REST e facilitar o desenvolvimento offline

3. Implementação dos componentes visuais baseados no Figma, respeitando o design system proposto

4. Validação e montagem do formulário de produto com opções complexas (radio, checkbox, quantity), usando react-hook-form + zod

5. Criação de lógica de carrinho inteligente, com identificação única dos itens por ID (nanoid), agrupamento de itens extras e edição individual

6. Adição de funcionalidades de compartilhamento, dark mode e feedbacks ao usuário com Dialog e Toast do shadcn/ui

## 🤝 Considerações finais

Este projeto foi desenvolvido com cuidado para balancear performance, usabilidade, legibilidade e organização de código

Agradeço a oportunidade e fico à disposição para qualquer dúvida técnica
