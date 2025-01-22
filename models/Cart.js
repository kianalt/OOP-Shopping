import Display from "./Display.js";

class Cart extends Display {
  constructor(parent, price) {
    super(parent);
    this.price = price;
    this.products = [];
    this.toShow = [];
    this.parent.addEventListener("click", (event) => this.handleEvent(event));
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
        <button data-id="${data.id}">-</button>
        <span>${qty}</span>
        <button data-id="${data.id}">+</button>
      </div>
      <button data-id="${data.id}">Remove</button>
    </div>`;
  }
  handleEvent(event) {
    const tagName = event.target.tagName;
    const id = event.target.dataset.id;
    const type = event.target.innerText;

    if (tagName !== "BUTTON") return;

    switch (type) {
      case "+":
        this.increase(id);
        break;
      case "-":
        this.decrease(id);
        break;
      case "Remove":
        this.remove(id);
        break;
    }
  }

  increase(id) {
    const product = this.products.find((p) => p.id === +id);
    this.products.push(product);
    this.showProducts();
  }

  decrease(id) {
    const index = this.products.findIndex((p) => p.id === +id);
    this.products.splice(index, 1);
    this.showProducts();
  }

  remove(id) {
    const newProduct = this.products.filter((p) => p.id !== +id);
    this.products = newProduct;
    this.showProducts();
  }
  calculateTotalPrice() {
    const total = this.products.reduce((acc, cur) => acc + cur.price, 0);
    this.price.innerText = "$" + total;
  }
}

export default Cart;
