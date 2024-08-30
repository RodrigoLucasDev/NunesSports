document.getElementById("produtoForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const nome = document.getElementById("nome").value;
    const codigo = document.getElementById("codigo").value;
    const descricao = document.getElementById("descricao").value;
    const preco = document.getElementById("preco").value;

    const produto = {
        nome: nome,
        codigo: codigo,
        descricao: descricao,
        preco: parseFloat(preco)
    };

    fetch("/teste/enviar-dados", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("mensagem").textContent = data.message;
    })
    .catch(error => console.error("Erro:", error));
});
