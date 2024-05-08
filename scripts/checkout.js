import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cart, removeFromCart, updateCartQuantity } from '../data/cart.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import { products } from '../data/products.js';
import { twoDecimalPlaces } from './utils/money.js';

let cartSummaryHTML = '';

updateCartQuantity('js-checkout-items');

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today
    .add(deliveryOption.deliveryDays, 'days')
    .format('dddd, MMMM D');

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
      <div class="delivery-date">Delivery date: ${deliveryDate}</div>

      <div class="cart-item-details-grid">
        <img
          class="product-image"
          src="${matchingProduct.image}"
        />

        <div class="cart-item-details">
          <div class="product-name">${matchingProduct.name}</div>
          <div class="product-price">$${twoDecimalPlaces(
            matchingProduct.priceCents,
          )}</div>
          <div class="product-quantity">
            <span> Quantity: <span class="quantity-label">${
              cartItem.quantity
            }</span> </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary" data-product-id="${
              matchingProduct.id
            }">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

            ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;

  document.querySelector('.order-summary').innerHTML = cartSummaryHTML;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today
      .add(deliveryOption.deliveryDays, 'days')
      .format('dddd, MMMM D');

    const priceString =
      deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${twoDecimalPlaces(deliveryOption.priceCents)}`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option">
        <input
          type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}"
          ${isChecked ? 'checked' : ''}
        />
        <div>
          <div class="delivery-option-date">
            ${deliveryDate}
          </div>
          <div class="delivery-option-price">
            $${priceString} - Shipping
          </div>
        </div>
      </div>
    `;
  });
  return html;
}

document.querySelectorAll('.delete-quantity-link').forEach((deleteLink) => {
  deleteLink.addEventListener('click', () => {
    const productId = deleteLink.dataset.productId;

    removeFromCart(productId);

    // Remove dom
    const cartItemContainer = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );

    cartItemContainer.remove();

    updateCartQuantity('js-checkout-items');
  });
});
