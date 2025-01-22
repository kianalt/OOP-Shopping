class Display {
  constructor(parent, products) {
    this.parent = parent;
    this.products = products;
    this.parent.addEventListener("click", (event) => this.handleEvent(event));
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
}

export default Display;
