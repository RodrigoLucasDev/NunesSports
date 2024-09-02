# Nunes Sports - Controle de Vendas de Produtos Esportivos

## Descrição do Projeto

Este projeto foi desenvolvido como parte de um desafio de desenvolvimento de um sistema de controle de vendas para a empresa fictícia NunesSports. O sistema é composto por um front-end responsivo e um back-end com integração ao banco de dados MySQL, desenvolvido em C# utilizando ASP.NET Core e Entity Framework.

### Funcionalidades Implementadas
- **Frontend -**
O front-end do projeto foi desenvolvido utilizando HTML, CSS e JavaScript puro. Algumas das principais funcionalidades incluem:

  - Formulário de Cadastro de Produtos: Permite ao usuário cadastrar produtos com campos para nome, código, descrição, preço e quantidade.
  -Tabela Dinâmica: Os produtos cadastrados são exibidos em uma tabela que é populada dinamicamente.
  - Ordenação de Produtos: Através de um select, o usuário pode ordenar os produtos por código, nome, preço ou quantidade.
  - Barra de Pesquisa: O usuário pode buscar por produtos pelo nome, e a tabela é filtrada dinamicamente com base na busca.
  - Edição e Remoção de Produtos: Cada linha da tabela possui botões para editar e remover o produto correspondente.
  - Design Responsivo: O layout foi desenvolvido para ser responsivo, inspirado na paleta de cores do site Globo Esporte, refletindo a temática esportiva da empresa.

- **Backend -**
  O back-end foi desenvolvido utilizando C# com ASP.NET Core e Entity Framework para facilitar a integração com o banco de dados MySQL.
  - Criação e Configuração do Projeto: O projeto ASP.NET Core foi configurado para suportar as funcionalidades necessárias para o sistema.
  - Modelagem de Dados: O sistema foi configurado para usar o Entity Framework para mapear as tabelas e colunas do banco de dados diretamente a partir das classes C#.
  - Migrações: A configuração do banco de dados foi realizada através de migrações do Entity Framework, garantindo que o banco de dados MySQL seja estruturado de acordo com as necessidades   do sistema.

### Status do Projeto
  - Atualmente, o front-end está completamente funcional e responsivo, com todas as funcionalidades implementadas. No entanto, a integração do back-end com o banco de dados ainda está em desenvolvimento. A lógica de programação em C# utilizando .NET foi aplicada, mas a integração completa com o banco de dados MySQL utilizando o Entity Framework ainda não está finalizada.

### Tecnologias Utilizadas
- **C# + ASP.NET Core + Entity Framework**
  - Escolhi essa stack devido à minha familiaridade com a linguagem C#. A combinação dessas tecnologias é poderosa para o desenvolvimento de aplicações web robustas e escaláveis. Embora eu tenha conhecimento em lógica de programação em C#, essa foi a primeira vez que trabalhei com frameworks como ASP.NET Core e Entity Framework, o que se mostrou desafiador.
- **Banco de Dados MySQL:**
  - O MySQL foi escolhido por ser um banco de dados relacional confiável, com boa performance e que atende perfeitamente às necessidades deste projeto. Eu já tinha conhecimento em SQL, criação de tabelas e consultas, mas nunca havia feito um projeto que integrasse o banco de dados com um back-end, o que adicionou um nível extra de desafio.
- **Front-End (HTML + CSS + JavaScript)**
  - Para o desenvolvimento do front-end, optei por utilizar HTML, CSS e JavaScript puro, devido à minha inexperiência com frameworks modernos como React, que eu havia começado a estudar recentemente. Essa escolha me permitiu focar em desenvolver uma interface funcional e responsiva, sem o peso de aprender uma nova tecnologia durante o desenvolvimento.

### Desafios e Aprendizados

- O desenvolvimento deste projeto foi um grande desafio e uma oportunidade de aprendizado. A integração entre o back-end e o banco de dados, algo que eu nunca havia feito antes, se mostrou bastante desafiadora, principalmente no que diz respeito à configuração do Entity Framework e às migrações no MySQL. Apesar das dificuldades, essa experiência me fez evoluir muito como desenvolvedor, ampliando meu entendimento sobre essas tecnologias.
Embora o projeto ainda não esteja completo, principalmente no que se refere à integração do back-end com o banco de dados, estou confiante de que com tempo e estudo conseguirei resolver as pendências e entregar um sistema plenamente funcional.

### Próximos Passos

- Finalizar a Integração do Back-End com o Banco de Dados: Resolver as pendências de migração e configuração para que os dados inseridos no front-end sejam persistidos corretamente no banco de dados MySQL.
- Incrementar Funcionalidades: Conforme vou aprendendo mais sobre as tecnologias utilizadas, pretendo adicionar mais funcionalidades ao sistema, como autenticação de usuários e relatórios de vendas.
- Estudo de Novas Tecnologias: Tenho interesse em explorar frameworks de front-end como React no futuro para modernizar a interface do sistema e otimizar o código.

### Considerações Finais
Esse projeto me proporcionou um grande aprendizado e me motivou a continuar evoluindo nas tecnologias utilizadas, além de permitir que eu consolidasse meu conhecimento em várias áreas e me desafiando a resolver problemas complexos. Pretendo continuar desenvolvendo e aprimorando este sistema, buscando sempre o aprimoramento das minhas habilidades como desenvolvedor.Continuarei a trabalhar neste projeto a fim de entregar uma aplicação completa e funcional.

## Créditos

Desenvolvido por Rodrigo Teixeira Lucas

