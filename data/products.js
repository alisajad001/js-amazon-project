import { twoDecimalPlaces } from "../scripts/utils/money.js";

export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = new Product(product);
    }
  });

  return matchingProduct;
}

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${twoDecimalPlaces(this.priceCents)}`;
  }

  extraInfoHTML() {
    return "";
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size Chart
      </a>
    `;
  }
}

export let products = [];

export function loadProductsFetch() {
  const promise = fetch("http://supersimplebackend.dev/products")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      products = data.map((product) => {
        if (product.type === "clothing") {
          return new Clothing(product);
        }

        return new Product(product);
      });

      console.log("load products");
    });

  return promise;
}

/*loadProductsFetch().then(() => {
  console.log("Products loaded");
});*/

export function loadProducts(func) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    products = JSON.parse(xhr.response).map((product) => {
      if (product.type === "clothing") {
        return new Clothing(product);
      }

      return new Product(product);
    });

    console.log("load products");
    func();
  });

  xhr.open("GET", "https://supersimplebackend.dev/products");
  xhr.send();
}
