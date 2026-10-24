# ShopNest Interview Starter

A small e-commerce frontend for practicing HTML, CSS, Bootstrap, and beginner JavaScript.

## Open the app

Open `index.html` in a browser. Bootstrap and the product photos load from the internet.

## Separate code files

- `index.html` — page content and Bootstrap stylesheet link
- `styles.css` — ShopNest colors, layout, and responsive styling
- `script.js` — add-to-bag buttons, cart array, item count, and total
- Bootstrap — responsive layout classes such as `container`, `row`, `col`, and `card`

## Practice path

1. Read the product button in `index.html` and find its `data-name` and `data-price` values.
2. In `script.js`, follow the click listener to `addToCart()`.
3. See how `cart.push()` adds a product to the array.
4. Follow the `for` loop in `updateCart()` to calculate the total.
5. Find the `switch` that displays the number of items.
6. Change one product price in the HTML and check that the cart uses the new price.

This is a frontend learning demo. It does not save the cart after closing the page and does not take payments.