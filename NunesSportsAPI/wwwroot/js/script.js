//Formulário
document.querySelector('.product-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtendo os valores dos inputs
    const nomeProduto = document.getElementById('nome-produto').value;
    const codigoProduto = document.getElementById('codigo-produto').value;
    const descricaoProduto = document.getElementById('descricao-produto').value;
    const precoProduto = document.getElementById('preco-produto').value;
    const quantidadeProduto = document.getElementById('quantidade-produto').value;

    // Criando uma nova linha na tabela
    const tabela = document.querySelector('.product-table tbody');
    const novaLinha = tabela.insertRow();

    // Adicionando as células na nova linha
    const celulaCodigo = novaLinha.insertCell();
    const celulaNome = novaLinha.insertCell();
    const celulaDescricao = novaLinha.insertCell();
    const celulaPreco = novaLinha.insertCell();
    const celulaQuantidade = novaLinha.insertCell();
    const celulaAlteracoes = novaLinha.insertCell();

    // Preenchendo as células com os valores do formulário
    celulaCodigo.textContent = codigoProduto;
    celulaNome.textContent = nomeProduto;
    celulaDescricao.textContent = descricaoProduto;
    celulaPreco.textContent = precoProduto;
    celulaQuantidade.textContent = quantidadeProduto;






    // Botões de editar e remover
    const btnEditar = document.createElement('button');
    btnEditar.classList.add('btn-editar');
    btnEditar.textContent = 'Editar';

    const btnRemover = document.createElement('button');
    btnRemover.classList.add('btn-remover');
    btnRemover.textContent = 'Remover';

    // Adicionando os botões na célula de alterações
    celulaAlteracoes.appendChild(btnEditar);
    celulaAlteracoes.appendChild(btnRemover);

    // Limpando o formulário
    document.querySelector('.product-form').reset();
});

document.querySelector('.product-table').addEventListener('click', function(event) {
    // Verifica se o botão clicado é de editar
    if (event.target.classList.contains('btn-editar')) {
        const linha = event.target.closest('tr'); // Acha a linha correspondente
        const celulas = linha.querySelectorAll('td'); // Pega todas as células da linha

        // Alterna entre modo de edição e salvar
        if (event.target.textContent === 'Editar') {
            // Torna as células editáveis
            celulas.forEach((celula, index) => {
                if (index < celulas.length - 1) { // Evita a célula de ações
                    const valorAtual = celula.textContent;
                    celula.innerHTML = `<input type="text" value="${valorAtual}">`;
                }
            });

            event.target.textContent = 'Salvar'; // Muda o texto do botão para "Salvar"
        } else {
            // Salva as edições
            celulas.forEach((celula, index) => {
                if (index < celulas.length - 1) { // Evita a célula de ações
                    const input = celula.querySelector('input');
                    celula.textContent = input.value; // Substitui o valor na célula
                }
            });

            event.target.textContent = 'Editar'; // Muda o texto do botão de volta para "Editar"
        }
    }

    // Verifica se o botão clicado é de remover
    if (event.target.classList.contains('btn-remover')) {
        const linha = event.target.closest('tr'); // Acha a linha correspondente
        linha.remove(); // Remove a linha da tabela
    }
});






    //Select ordenar
    document.getElementById('ordenar-por').addEventListener('change', function() {
        const tabela = document.querySelector('.product-table tbody');
        const linhas = Array.from(tabela.querySelectorAll('tr'));
        const criterio = this.value;

        linhas.sort((a, b) => {
            const valorA = obterValor(a, criterio);
            const valorB = obterValor(b, criterio);

            if (criterio === 'nome') {
                return valorA.localeCompare(valorB); // Ordenação alfabética
            } else if (criterio === 'preco' || criterio === 'quantidade' || criterio === 'codigo') {
                return valorA - valorB; // Ordenação numérica
            }
        });

        // Reinsere as linhas ordenadas na tabela
        linhas.forEach(linha => tabela.appendChild(linha));
    });

    function obterValor(linha, criterio) {
        const celulaIndex = {
            'codigo': 0,
            'nome': 1,
            'preco': 3,
            'quantidade': 4
        }[criterio];

        const valor = linha.cells[celulaIndex].textContent;

        if (criterio === 'preco' || criterio === 'quantidade' || criterio === 'codigo') {
            return parseFloat(valor); // Converte para número para comparações numéricas
        }

        return valor.trim(); // Para comparações de strings (nome)
    }






    

    //Barra de pesquisa
    document.querySelector('.search-bar input').addEventListener('input', function() {
        const filtro = this.value.toLowerCase(); // Captura o valor digitado, convertido para minúsculas
        const linhas = document.querySelectorAll('.product-table tbody tr');

        linhas.forEach(linha => {
            const nomeProduto = linha.cells[1].textContent.toLowerCase(); // Nome do produto na segunda coluna (índice 1)

            if (nomeProduto.includes(filtro)) {
                linha.style.display = ''; // Exibe a linha se corresponder ao filtro
            } else {
                linha.style.display = 'none'; // Oculta a linha se não corresponder
            }
        });
    });