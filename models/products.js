class Products {
  constructor(parents, products, cart) {
    this.parents = parents;
    this.products = products;
    this.cart = cart;
    // Bind the event handler to the class context
    this.handelEvent = this.handelEvent.bind(this);
    this.parents.addEventListener("click", this.handelEvent);
  }

  showProducts() {
    this.products.forEach((product) => {
      this.createCard(product);
    });
  }

  productImage(data) {
    const img = document.createElement("img");
    img.src = data.image;
    img.alt = data.alt;
    return img;
  }

  createCard(data) {
    const cardElement = document.createElement("div");
    const imgEle = this.productImage(data);
    cardElement.appendChild(imgEle);

    const info = document.createElement("div");
    info.classList.add("products-info");

    const productName = document.createElement("h3");
    const control = document.createElement("div");
    const price = document.createElement("span");
    const button = document.createElement("button");

    productName.innerText = data.name;
    price.innerText = `${data.price} USD`;
    button.innerText = "+";
    button.dataset.id = data.id; // Set the product ID for the button

    control.append(price, button);
    info.append(productName, control);
    cardElement.appendChild(info);
    this.parents.appendChild(cardElement);
  }

  handelEvent(event) {
    // Check if the clicked element is a button
    const element = event.target;
    if (element.tagName === "BUTTON") {
      const productId = element.dataset.id;
      this.addToCart(productId);
    }
  }

  addToCart(id) {
    const product = this.products.find((i) => i.id === +id);
    if (product) {
      this.cart.products.push(product);
      this.cart.showProducts();
    }
  }
}

export default Products;
