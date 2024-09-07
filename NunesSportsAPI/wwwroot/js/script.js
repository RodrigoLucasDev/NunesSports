const apiBaseUrl = 'http://localhost:5210/api/produtos';

// Função para adicionar uma nova linha na tabela
function adicionarLinhaTabela({ id, codigo, nome, descricao, preco, quantidade }) {
    const tabela = document.querySelector('.product-table tbody');
    const novaLinha = tabela.insertRow();

    // Calcular o total
    const total = (preco * quantidade).toFixed(2); // Multiplica o preço pela quantidade e formata com 2 casas decimais

    // Atribuir o ID do produto à linha
    novaLinha.setAttribute('data-id', id);

    novaLinha.innerHTML = `
        <td>${codigo}</td>
        <td>${nome}</td>
        <td>${descricao}</td>
        <td>${preco.toFixed(2)}</td> <!-- Preço formatado com 2 casas decimais -->
        <td>${quantidade}</td>
        <td>${total}</td> <!-- Total calculado -->
        <td>
            <button class="btn-editar">Editar</button>
            <button class="btn-remover">Remover</button>
        </td>
    `;
}

// Evento para o envio do formulário (POST)
document.querySelector('.product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const dadosProduto = {
        nome: document.getElementById('nome-produto').value.trim(),
        codigo: document.getElementById('codigo-produto').value.trim(),
        descricao: document.getElementById('descricao-produto').value.trim(),
        preco: parseFloat(document.getElementById('preco-produto').value),
        quantidade: parseInt(document.getElementById('quantidade-produto').value)
    };

    if (!dadosProduto.nome || !dadosProduto.codigo || !dadosProduto.descricao || isNaN(dadosProduto.preco) || isNaN(dadosProduto.quantidade)) {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
    }

    fetch(`${apiBaseUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosProduto)
    })
    .then(response => {
        if (!response.ok) throw new Error("Erro ao adicionar produto.");
        return response.json();
    })
    .then(data => {
        adicionarLinhaTabela(data); // Adiciona produto com ID
        console.log('Produto adicionado:', data);
    })
    .catch(error => {
        console.error('Erro ao adicionar o produto:', error);
    });

    this.reset(); // Limpa o formulário
});

// Função para buscar todos os produtos da API e exibir na tabela (GET)
function carregarProdutos() {
    fetch(`${apiBaseUrl}`)
        .then(response => response.json()) // Converter a resposta em JSON
        .then(produtos => {
            const tabela = document.querySelector('.product-table tbody');
            tabela.innerHTML = ''; // Limpa a tabela para evitar duplicatas
            produtos.forEach(produto => adicionarLinhaTabela(produto)); // Adicionar cada produto na tabela
        })
        .catch(error => {
            console.error('Erro ao carregar os produtos:', error);
            alert('Erro ao carregar produtos. Tente novamente.');
        });
}

// Chamar a função para carregar produtos quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarProdutos);

// Função para editar a linha e enviar uma requisição PUT para o backend (PUT)
function editarLinha(botao, celulas) {
    const linha = botao.closest('tr');
    const produtoId = linha.getAttribute('data-id'); // Pegar o ID do produto

    if (botao.textContent === 'Editar') {
        // Transformar as células em inputs para edição
        celulas.forEach((celula, index) => {
            if (index < celulas.length - 1) {
                const valorAtual = celula.textContent;
                celula.innerHTML = `<input type="text" value="${valorAtual}">`;
            }
        });
        botao.textContent = 'Salvar';
    } else {
        // Coletar os valores dos inputs e enviar a requisição PUT
        const dadosAtualizados = {
            id: parseInt(produtoId), // Adicionar o ID no corpo da requisição
            codigo: celulas[0].querySelector('input').value,
            nome: celulas[1].querySelector('input').value,
            descricao: celulas[2].querySelector('input').value,
            preco: parseFloat(celulas[3].querySelector('input').value),
            quantidade: parseInt(celulas[4].querySelector('input').value)
        };

        fetch(`${apiBaseUrl}/${produtoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAtualizados)
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao atualizar produto.");
            // Verificar se a resposta foi 204 (No Content) para evitar erro ao processar JSON
            if (response.status === 204) {
                return null; // Não há conteúdo para processar
            } else {
                return response.json();
            }
        })
        .then(data => {
            // Atualizar as células com os novos valores
            celulas.forEach((celula, index) => {
                if (index < celulas.length - 1) {
                    const input = celula.querySelector('input');
                    celula.textContent = input.value;
                }
            });
            botao.textContent = 'Editar';
        })
        .catch(error => {
            console.error('Erro ao atualizar o produto:', error);
            alert('Erro ao atualizar o produto.');
        });
    }
}

// Evento para edição e remoção de linhas na tabela
document.querySelector('.product-table').addEventListener('click', function(event) {
    const linha = event.target.closest('tr');
    const celulas = linha.querySelectorAll('td');

    if (event.target.classList.contains('btn-editar')) {
        editarLinha(event.target, celulas);
    }

    if (event.target.classList.contains('btn-remover')) {
        const produtoId = linha.getAttribute('data-id');
        linha.remove();

        // Implementação para remover o produto do backend
        fetch(`${apiBaseUrl}/${produtoId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao remover produto.");
        })
        .catch(error => {
            console.error('Erro ao remover o produto:', error);
        });
    }
});

// Função para ordenação da tabela
document.getElementById('ordenar-por').addEventListener('change', function() {
    const criterio = this.value;
    const tabela = document.querySelector('.product-table tbody');
    const linhas = Array.from(tabela.querySelectorAll('tr'));

    linhas.sort((a, b) => {
        const valorA = obterValor(a, criterio);
        const valorB = obterValor(b, criterio);
        return criterio === 'nome' ? valorA.localeCompare(valorB) : valorA - valorB;
    });

    linhas.forEach(linha => tabela.appendChild(linha));
});

function obterValor(linha, criterio) {
    const celulaIndex = { 'codigo': 0, 'nome': 1, 'preco': 3, 'quantidade': 4 }[criterio];
    const valor = linha.cells[celulaIndex].textContent;
    return criterio === 'nome' ? valor.trim() : parseFloat(valor);
}

// Evento para a barra de pesquisa
document.querySelector('.search-bar input').addEventListener('input', function() {
    const filtro = this.value.toLowerCase();
    const linhas = document.querySelectorAll('.product-table tbody tr');

    linhas.forEach(linha => {
        const nomeProduto = linha.cells[1].textContent.toLowerCase();
        linha.style.display = nomeProduto.includes(filtro) ? '' : 'none';
    });
});
