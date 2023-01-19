"use strict";

/* <div class="product-item">
  <img src="/images/huawei-1.jpg" alt="" />
  <p class="product-name">Huawei p20</p>
  <p class="product-description">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, omnis
    culpa? Repellat rem soluta non nisi quasi alias illum excepturi?
  </p>
  <div class="product-price">
    <span class="price">2999.99zł</span>
    <span class="price-sale">2799.99zł</span>
  </div>
  <button class="add-to-cart-btn">Dodaj do koszyka</button>
</div>; */

let currentProducts = products;
let categories = new Set();

const productsSection = document.querySelector(".products .wrapper ");

const renderProducts = function (items) {
  productsSection.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    const newProduct = document.createElement("div");
    newProduct.className = `product-item ${items[i].sale ? "on-sale" : ""}`;
    newProduct.innerHTML = `<img src="${items[i].image}" />
    <p class="product-name">${items[i].name}</p>
    <p class="product-description"> ${items[i].description}</p>
    <div class="product-price">
      <span class="price">${items[i].price}zł</span>
      <span class="price-sale">${items[i].price - items[i].saleAmount}zł</span>
    </div>
    <button class="add-to-cart-btn">Dodaj do koszyka</button>
    <p class="product-item-sale-info">Promocja</p>`;

    productsSection.appendChild(newProduct);
  }
};

const renderCategories = function (items) {
  for (let i = 0; i < items.length; i++) {
    categories.add(items[i].category);
  }

  const categoriesItems = document.querySelector(".categories-btn-container");
  categories = ["Wszystkie", ...categories];

  categories.forEach((category, index) => {
    const newCategory = document.createElement("button");
    newCategory.innerHTML = category;
    newCategory.dataset.category = category;

    index === 0 ? newCategory.classList.add("active") : "";
    categoriesItems.appendChild(newCategory);
  });
};

document.onload = renderProducts(currentProducts);
document.onload = renderCategories(currentProducts);

const categoriesButtons = document.querySelectorAll(
  ".categories-btn-container button"
);
categoriesButtons.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const category = e.target.dataset.category;
    categoriesButtons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    currentProducts = products;

    if (category === "Wszystkie") {
      currentProducts = products;
    } else {
      currentProducts = currentProducts.filter(
        (product) => product.category === category
      );
    }

    console.log(currentProducts);
    renderProducts(currentProducts);
  })
);
