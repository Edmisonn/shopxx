const header = document.querySelector("header");
window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 0);
});

let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navbar.classList.toggle("navx"); // Certifique-se de que o CSS usa `.navbar.open`
    console.log('click nav run')
};

function comprar(button) {
    // Pegar os dados do produto
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-title').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;

    // Armazenar os dados no localStorage
    localStorage.setItem('productName', productName);
    localStorage.setItem('productPrice', productPrice);

    // Redirecionar para a página de pagamento
    window.location.href = "pagina-de-pagamento.html";
}

  // Função para adicionar ao carrinho
  function adicionarCarrinho(button) {
    // Localiza os dados do produto
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-title').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;

    // Recupera o carrinho do localStorage (se já existir)
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Adiciona o produto ao carrinho
    carrinho.push({ name: productName, price: productPrice });

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert(`${productName} foi adicionado ao carrinho!`);
}
async function carregarProdutos() {
    const response = await fetch('http://localhost:5000/api/products');
    const produtos = await response.json();
    
    const container = document.querySelector(".container");
    container.innerHTML = ""; // Limpa a lista antes de adicionar

    produtos.forEach(produto => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${produto.image}" alt="imagem do produto">
            <div class="product-title">${produto.title}</div>
            <div class="product-price">${produto.price} MZN</div>
            <div class="product-buttons">
                <button class="btn" onclick="adicionarCarrinho('${produto._id}')">
                    <i class="ri-shopping-cart-line"></i>
                </button>
                <button class="btn buy" onclick="comprar('${produto._id}')">Comprar</button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Carregar produtos ao iniciar a página
document.addEventListener("DOMContentLoaded", carregarProdutos);



document.addEventListener("DOMContentLoaded", function () {
    const userButton = document.getElementById("userButton");
    const token = localStorage.getItem('token');

    if (token) {
        userButton.href = "admin.html"; // Se estiver logado, vai para admin
    } else {
        userButton.href = "login.html"; // Se não estiver logado, vai para login
    }
});

  /*  document.getElementById('loginForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'admin.html'; // Redireciona para painel admin
        } else {
            document.getElementById('error-message').textContent = data.error;
        }
    });*/

/*async function carregarProdutos() {
    const response = await fetch('http://localhost:5000/api/products');
    const produtos = await response.json();
    
    const container = document.querySelector(".container");
    container.innerHTML = ""; // Limpa a lista antes de adicionar

    produtos.forEach(produto => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${produto.image}" alt="imagem do produto">
            <div class="product-title">${produto.title}</div>
            <div class="product-price">${produto.price} MZN</div>
            <div class="product-buttons">
                <button class="btn" onclick="adicionarCarrinho('${produto._id}')">
                    <i class="ri-shopping-cart-line"></i>
                </button>
                <button class="btn buy" onclick="comprar('${produto._id}')">Comprar</button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Carregar produtos ao iniciar a página
document.addEventListener("DOMContentLoaded", carregarProdutos);
*/
