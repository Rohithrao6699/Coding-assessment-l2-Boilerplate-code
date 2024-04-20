document.addEventListener("DOMContentLoaded", () => {
  const menBtn = document.getElementById("men-btn");
  const womenBtn = document.getElementById("women-btn");
  const kidsBtn = document.getElementById("kids-btn");
  const productsSection = document.getElementById("products-section");

  const fetchData = async (category) => {
    try {
      const response = await fetch(
        `https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      let products;
      if (category === "men") {
        products = data.categories[0].category_products;
      } else if (category === "women") {
        products = data.categories[1].category_products;
      } else if (category === "kids") {
        products = data.categories[2].category_products;
      } else {
        throw new Error("Invalid category");
      }

      displayProducts(products);
      console.log(products);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const calculateDiscountPercentage = (price, compareAtPrice) => {
    if (!compareAtPrice || compareAtPrice <= price) {
      return 0;
    }
    const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
    return Math.round(discount);
  };

  const displayProducts = (products) => {
    productsSection.innerHTML = ""; // Clear previous content
    products.forEach((product) => {
      const discount = calculateDiscountPercentage(
        product.price,
        product.compare_at_price
      );

      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <span><p>${product.title}</p><div>${product.vendor}</div></span>
        <div class="price-container">
        <p>Rs ${product.price}.00</p>
        <p class="compare-price">Rs ${product.compare_at_price}.00</p>
        <div class="discount">${discount}% off</div>
      </div>
        <button class="add-to-cart-btn">Add to Cart</button>

      `;
      productsSection.appendChild(productDiv);
    });
  };

  menBtn.addEventListener("click", () => {
    fetchData("men");
  });

  womenBtn.addEventListener("click", () => {
    fetchData("women");
  });

  kidsBtn.addEventListener("click", () => {
    fetchData("kids");
  });
});
