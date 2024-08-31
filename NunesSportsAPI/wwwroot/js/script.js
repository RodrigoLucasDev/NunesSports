// Função para adicionar uma nova linha na tabela
function adicionarLinhaTabela({ codigo, nome, descricao, preco, quantidade }) {
    const tabela = document.querySelector('.product-table tbody');
    const novaLinha = tabela.insertRow();

    novaLinha.innerHTML = `
        <td>${codigo}</td>
        <td>${nome}</td>
        <td>${descricao}</td>
        <td>${preco}</td>
        <td>${quantidade}</td>
        <td>
            <button class="btn-editar">Editar</button>
            <button class="btn-remover">Remover</button>
        </td>
    `;
}

// Evento para o envio do formulário
document.querySelector('.product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const dadosProduto = {
        nome: document.getElementById('nome-produto').value,
        codigo: document.getElementById('codigo-produto').value,
        descricao: document.getElementById('descricao-produto').value,
        preco: document.getElementById('preco-produto').value,
        quantidade: document.getElementById('quantidade-produto').value
    };

    adicionarLinhaTabela(dadosProduto);
    this.reset(); // Limpa o formulário
});

// Evento para edição e remoção de linhas na tabela
document.querySelector('.product-table').addEventListener('click', function(event) {
    const linha = event.target.closest('tr');
    const celulas = linha.querySelectorAll('td');

    if (event.target.classList.contains('btn-editar')) {
        editarLinha(event.target, celulas);
    }

    if (event.target.classList.contains('btn-remover')) {
        linha.remove();
    }
});

function editarLinha(botao, celulas) {
    if (botao.textContent === 'Editar') {
        celulas.forEach((celula, index) => {
            if (index < celulas.length - 1) {
                const valorAtual = celula.textContent;
                celula.innerHTML = `<input type="text" value="${valorAtual}">`;
            }
        });
        botao.textContent = 'Salvar';
    } else {
        celulas.forEach((celula, index) => {
            if (index < celulas.length - 1) {
                const input = celula.querySelector('input');
                celula.textContent = input.value;
            }
        });
        botao.textContent = 'Editar';
    }
}

// Evento para ordenação da tabela
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
        const nomeProduto = linha.cells[1].textContent.toLowerCase()
        linha.style.display = nomeProduto.includes(filtro) ? '' : 'none';
    });
});
