const companyList = document.querySelector(".nav>ul");
const productsContainer = document.querySelector(".products");
const input = document.querySelector(".nav>input");

let filteredProducts = [...products];

const displayCompanies = () => {
  const buttons = [
    "all",
    ...new Set(products.map((product) => product.company)),
  ];
  companyList.innerHTML = buttons
    .map((company) => {
      return `<li data-id="${company}">${company}</li>`;
    })
    .join("");
};
displayCompanies();

const displayProducts = () => {
  if (filteredProducts.length < 1) {
    productsContainer.innerHTML = `<h4>Sorry, no products matched your search</h4>`;
    return;
  }

  productsContainer.innerHTML = filteredProducts
    .map((item) => {
      return `    
        <article class="product">
            <img src=${item.image} alt=${item.title} />
            <h5 class="product-name">${item.title}</h5>
            <span class="product-price">$${item.price}</span>
        </article>`;
    })
    .join("");
};
displayProducts();

input.addEventListener("keyup", (e) => {
  let searchVal = input.value;

  filteredProducts = products.filter((item) => {
    return item.title.toLowerCase().includes(searchVal);
  });
  displayProducts();
});

companyList.addEventListener("click", (e) => {
  let btnTarget = e.target.dataset.id;

  if (btnTarget === "all") {
    filteredProducts = [...products];
    displayProducts();
  } else {
    filteredProducts = products.filter((item) => item.company === btnTarget);
    displayProducts();
  }

  input.value = "";
});
