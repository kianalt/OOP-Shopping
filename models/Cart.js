class Cart {
  constructor(parent, price) {
    this.parent = parent;
    this.price = price;
    this.products = [];
    this.toShow = [];
  }

  showProducts() {
    // Remove repetitive products
    this.toShow = [...new Set(this.products)];
    this.parent.innerHTML = ""; // Clear the cart
    this.toShow.forEach((product) => {
      const qty = this.products.filter((p) => p.id === product.id).length;
      this.createdCard(product, qty);
    });
    this.calculateTotalPrice();
  }

  createdCard(data, qty) {
    const cartEle = document.createElement("div");
    cartEle.classList.add("cart-item");

    const imgElm = this.productImage(data);
    const infoElm = this.productInfo(data);
    const controlElm = this.productControl(data, qty);

    cartEle.innerHTML = imgElm;
    cartEle.innerHTML += infoElm;
    cartEle.innerHTML += controlElm;

    this.parent.appendChild(cartEle);
  }

  productImage(data) {
    const { image, alt } = data;
    return `<img alt="${alt}" src="${image}" />`;
  }

  productInfo(data) {
    const { name, price } = data;
    return `<div id="cart-info"><h4>${name}</h4><p>${price} USD</p></div>`;
  }

  productControl(data, qty) {
    return `<div id="cart-control">
      <div> 
        <button>-</button>
        <span>${qty}</span>
        <button>+</button>
      </div>
      <button>Remove</button>
    </div>`;
  }

  calculateTotalPrice() {
    const total = this.products.reduce((acc, cur) => acc + cur.price, 0);
    this.price.innerText = total;
  }
}

export default Cart;
