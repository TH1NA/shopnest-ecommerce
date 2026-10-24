// The cart starts as an empty array. Each added product is one object in this array.
var cart = [];

// Find the page elements that JavaScript needs to update.
var cartCount = document.querySelector('#cart-count');
var cartItems = document.querySelector('#cart-items');
var cartTotal = document.querySelector('#cart-total');
var cartMessage = document.querySelector('#cart-message');
var checkoutButton = document.querySelector('#checkout-button');
var clearCartButton = document.querySelector('#clear-cart-button');
var addButtons = document.querySelectorAll('.add-to-cart');

function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}

function addToCart(productName, productPrice) {
  var product = {
    name: productName,
    price: productPrice
  };

  cart.push(product);
  cartMessage.textContent = productName + ' added to your bag.';
  updateCart();
}

function updateCart() {
  var total = 0;
  cartItems.innerHTML = '';

  // Add up each product price and show that product in the bag.
  for (var i = 0; i < cart.length; i++) {
    total = total + cart[i].price;

    var listItem = document.createElement('li');
    var name = document.createElement('span');
    var price = document.createElement('strong');

    name.textContent = cart[i].name;
    price.textContent = formatPrice(cart[i].price);
    listItem.appendChild(name);
    listItem.appendChild(price);
    cartItems.appendChild(listItem);
  }

  // A switch statement chooses the right item-count message.
  switch (cart.length) {
    case 0:
      cartCount.textContent = '0 items';
      cartMessage.textContent = 'Your bag is empty. Add something you like.';
      break;
    case 1:
      cartCount.textContent = '1 item';
      break;
    default:
      cartCount.textContent = cart.length + ' items';
  }

  cartTotal.textContent = formatPrice(total);
  checkoutButton.disabled = cart.length === 0;
  clearCartButton.disabled = cart.length === 0;
}

// Give each Add to bag button a click function.
for (var buttonIndex = 0; buttonIndex < addButtons.length; buttonIndex++) {
  addButtons[buttonIndex].addEventListener('click', function (event) {
    var clickedButton = event.currentTarget;
    var productName = clickedButton.getAttribute('data-name');
    var productPrice = Number(clickedButton.getAttribute('data-price'));

    addToCart(productName, productPrice);
  });
}

clearCartButton.addEventListener('click', function () {
  cart = [];
  updateCart()
  cartMessage.textContent = 'Your bag has been cleared.';
});

checkoutButton.addEventListener('click', function () {
  if (cart.length === 0) {
    cartMessage.textContent = 'Add a product before checkout.';
  } else {
    cart = [];
    updateCart();
    cartMessage.textContent = 'Demo order placed. No payment was collected.';
  }
});

// Draw the empty cart the first time the page opens.
updateCart();
