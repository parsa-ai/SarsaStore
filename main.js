let start = 0;
let end = 12;
let products = [];

const fetchProducts = async () => {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    products = await response.json(); 
};

const generateCard = (product) => {
    const imgSrc = product.images[0] || './Parler_logo.png';
    return `
        <div class="card">
            <a href="${imgSrc}" target="_blank">
                <div class="img">
                    <img src="${imgSrc}" alt="${product.title}"  onerror="this.onerror=null;this.src='./Parler_logo.png';">
                    <div class="ani"></div>
                    <span>${product.title}</span>
                </div>
                <h3>${product.title}</h3>
                <span>${product.price}</span>
            </a>
        </div>
    `;
};

const updateCards = () => {
    const loader = document.getElementById('loader');
    const main = document.getElementById("main");
    const currentCards = main.querySelectorAll(".card");

    loader.style.display = 'flex';
    main.style.display = 'none';
    currentCards.forEach(card => {
        card.classList.add('fade-out');
    });
    setTimeout(() => {
        const visibleProducts = products.slice(start, end);
        main.innerHTML = visibleProducts.map(generateCard).join(''); 

        const newCards = main.querySelectorAll(".card");
        newCards.forEach(card => {
            card.classList.add('fade-in');
        });

        loader.style.display = 'none';
        main.style.display = 'grid';
    }, 100); 
};

const next = () => {
    if (end < products.length) {
        start = end;
        end += 12;
        updateCards();
    }
};


const previous = () => {
    if (start > 0) {
        end = start;
        start -= 12;
        updateCards();
    }
};

const initialize = async () => {
    await fetchProducts();  
    updateCards();
};

initialize(); 
