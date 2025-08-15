# 🚚 Painel de Operações Logísticas

Um dashboard interativo desenvolvido em **React**, com visualização de
KPIs logísticos, gráficos e mapa de entregas.
O objetivo é oferecer um painel centralizado para acompanhamento de
**pedidos, transportadoras e status de entregas** em todo o Brasil.

------------------------------------------------------------------------

## 📌 Funcionalidades

-   Exibição de **KPIs principais**:

    -   Total de pedidos
    -   Entregues
    -   Pendentes
    -   Média de prazo de entrega
    -   Atrasados

-   **Gráfico de Barras** com desempenho por transportadora.

-   **Mapa Interativo (Leaflet)** com pontos de entrega exibindo status:

    -   ✅ Entregue
    -   🔵 Pendente
    -   ❌ Atrasado

-   Interface responsiva e personalizável.

------------------------------------------------------------------------

## 🛠️ Tecnologias Utilizadas

-   [React](https://react.dev/)
-   [Vite](https://vitejs.dev/)
-   [Recharts](https://recharts.org/)
-   [Leaflet](https://leafletjs.com/) + [React
    Leaflet](https://react-leaflet.js.org/)
-   [TailwindCSS](https://tailwindcss.com/)

------------------------------------------------------------------------

## 🚀 Como Executar o Projeto

1.  Clone o repositório:

    ``` bash
    git clone https://github.com/seu-usuario/painel-logistica.git
    cd painel-logistica
    ```

2.  Instale as dependências:

    ``` bash
    npm install
    ```

3.  Rode o projeto:

    ``` bash
    npm run dev
    ```

4.  Acesse no navegador:

        http://localhost:5173

------------------------------------------------------------------------

## 📂 Estrutura do Projeto

    painel-logistica/
    │── src/
    │   ├── components/     # Componentes reutilizáveis
    │   ├── data/           # Mock de dados (simulação)
    │   ├── pages/          # Páginas do dashboard
    │   ├── App.jsx         # Estrutura principal
    │   └── main.jsx        # Ponto de entrada do React
    │
    │── public/             # Arquivos estáticos
    │── package.json        # Dependências e scripts

------------------------------------------------------------------------

## 🎨 Layout

-   Tema escuro (Dark Mode)
-   Ícones e cores personalizadas
-   Design responsivo para desktop e mobile

------------------------------------------------------------------------

## 📜 Licença

Este projeto é licenciado sob a **Licença MIT**.

    MIT License

    Copyright (c) 2025 Janderson Vidal

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    O texto acima da licença deve ser incluído em todas as cópias ou partes
    substanciais do Software.

    O SOFTWARE É FORNECIDO "NO ESTADO EM QUE SE ENCONTRA", SEM GARANTIAS OU
    CONDIÇÕES DE QUALQUER TIPO, EXPRESSAS OU IMPLÍCITAS, INCLUINDO, MAS NÃO
    SE LIMITANDO ÀS GARANTIAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UMA FINALIDADE
    ESPECÍFICA E NÃO VIOLAÇÃO. EM NENHUM CASO OS AUTORES OU DETENTORES DOS
    DIREITOS SERÃO RESPONSÁVEIS POR QUALQUER RECLAMAÇÃO, DANOS OU OUTRA
    RESPONSABILIDADE, SEJA EM UMA AÇÃO DE CONTRATO, DELITO OU OUTRA FORMA,
    DECORRENTE DE OU EM CONEXÃO COM O SOFTWARE OU O USO OU OUTRAS NEGOCIAÇÕES
    NO SOFTWARE.

------------------------------------------------------------------------

👨‍💻 Desenvolvido por **Janderson Vidal**
