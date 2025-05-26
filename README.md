# 🍔 Aiqfome

Projeto feito para posição de Desenvolvedor Front-End Sênior

## 🚀 Tecnologias Utilizadas

- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Radix UI / shadcn/ui** (Accordion, Button, Tag, etc.)
- **React Icons personalizados** (`MotocycleIcon`, `ChevronRightIcon`, etc.)
- **json-server** (mock backend)
- **LocalStorage API** (para favoritos e carrinho)
- **Formatação com utilitários próprios** (`formatCurrency`, `cn`, etc.)

## 📁 Estrutura de Pastas

```
src/
├── app/ → Rotas do Next.js
├── components/ → UI reutilizável
├───├── icons/ → Ícones SVG personalizados
|   └── ui/ → Componentes do shadcn/ui
├── hooks/ → Hooks compartilhados
├── lib/ → Funções utilitárias
├── templates/ → Telas estruturadas
└── types/ → Tipagens globais
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

## Fluxo de desenvolvimento

Para fins de avaliação interna do time técnico, deixo registrado aqui o meu fluxo durante a criação do projeto:

1. Iniciei o projeto seguindo a [documentação oficial do Next.js](https://nextjs.org/docs/app/getting-started/installation). Utilizei a configuração com TypeScript e TailwindCSS.

2. Criei o arquivo JSON para servir de mock do backend.

3. Exportei os assets do Figma proposto e adicionei à pasta `public`, separei os ícones por pastas para manter a organização.

4. Instalei a biblioteca [`shadcn/ui`](https://ui.shadcn.com/) para obter alguns componentes a serem utilizados na aplicação. Optei por essa biblioteca pois ela é usa como base o com Radix (o que já melhora a acessibilidade e facilita customização) e possui integração com Tailwind.

5. Comecei criando o header seguindo fielmente o Figma, para isso precisei criar 2 componentes para utilizar ali, o `Button` e o `Input`. O input do Figma possui o tamanho de fonte de 14px e isso ocasiona um pequeno zoom quando o input é focado, para evitar isso o ideal é que o input tenha 16px no mínimo. Optei por seguir o layout proposto, mas deixo aqui essa observação.

6.
