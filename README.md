
# Catálogo Interativo de Filmes e Séries com APIs Públicas

Aplicação web responsiva que consome dados de uma API REST pública para exibir filmes e séries com filtros, detalhes e interação.  
Este projeto foi desenvolvido como parte da disciplina **Programação Web** do curso de **Tecnologia em Sistemas de Computação** da **Universidade Estadual do Piauí (UESPI)**.

---

## Objetivo

Construir um catálogo interativo de filmes e séries que:

- Liste lançamentos recentes  
- Permita paginação e filtragem  
- Exiba detalhes dos títulos   
- Trate erros e carregamento de dados com feedback visual  
- Tenha interface clara, responsiva e bem elaborada  

---

## Tecnologias Utilizadas

- **HTML5**
- **CSS3**  
- **JavaScript ES6+** (modular, sem frameworks)
- Consumo de **API REST pública** para filmes/séries

> **Composição do repositório**  
> - CSS: 42.9%  
> - JavaScript: 32.6%  
> - HTML: 24.5%

---

## Funcionalidades

1. **Listagem de lançamentos recentes**  
   - Mostra títulos lançados desde o início do ano corrente, com:
     - Título  
     - Tipo (filme/série)  
     - Gênero  
     - Ano  
     - Imagem/capa  

2. **Paginação dos resultados**  
   - Navegação entre páginas de resultados sem recarregar toda a aplicação.  

3. **Filtro por gênero**  
   - Possibilidade de filtrar a lista por categorias (ex.: ação, comédia, drama etc.).

4. **Detalhes de filmes/séries**  
   - Seção com:
     - Sinopse  
     - Nota/rating  
     - Informações adicionais (ex.: duração, idioma, etc., conforme a API).

5. **Temporadas e episódios (quando disponível)**  
   - Para séries, exibe temporadas e episódios retornados pela API.

6. **Tratamento de campos ausentes**  
   - Quando a API não devolve algum dado (ex.: sem sinopse), a interface exibe mensagens amigáveis.

7. **Feedback de carregamento e erros**  
   - Indicadores visuais enquanto os dados são carregados.  


8. **Interface responsiva (mobile-first)**  
    - Layout adaptável para diferentes tamanhos de tela (celular, tablet, desktop).

---

## API(s) Utilizadas

- **Nome da API:** `OMDb API`  
  - URL base: `https://api.exemplo.com/`   
  - Principais endpoints:
    - `GET /movies` – lista filmes  
    - `GET /series` – lista séries  
    - `GET /details/{id}` – detalhes completos de um título  

---

## Estrutura do Projeto

```text
Cat-logo-Interativo-de-Filme/
├── index.html
├── /css
│   └── styles.css
├── /js
│   ├── api.js          # Funções de acesso à API
│   └── main.js         # Ponto de entrada da aplicação
└── /assets
    └── img/            # Logos, ícones, imagens estáticas
```

- O JavaScript é organizado de forma **modular**, separando:
  - Consumo da API  
  - Lógica de negócio  
  - Atualização da interface (DOM)  

---

## Como Executar o Projeto

1. **Clonar o repositório**

```bash
git clone https://github.com/Denisnascimentor/Cat-logo-Interativo-de-Filme.git
cd Cat-logo-Interativo-de-Filme
```

2. **Configurar variáveis da API (se necessário)**  
   - Caso a API utilizada exija chave (`API_KEY`), crie um arquivo de configuração JavaScript (por exemplo `js/config.example.js` → `js/config.js`) e defina sua chave lá.  
   - Nunca versione chaves reais de API.

3. **Executar em ambiente local**

Como o projeto é apenas HTML/CSS/JS estático, basta abrir o arquivo:

- `index.html` diretamente no navegador **ou**
- Servir com um servidor estático simples, por exemplo:

```bash
npx serve .
```

4. Acessar no navegador:

```text
http://localhost:3000   # ou a porta exibida pelo servidor
```

---

## Integrantes do Projeto

- `@Denisnascimentor`
- `@maranhaojose`

---

