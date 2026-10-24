# E-Commerce Project Training

## Beginner JavaScript Training Sheet

Use this training sheet with the ShopNest project. Work through the exercises in order, and test the page in your browser after each change.

## Learning goals

By the end, you should be able to:

- Find and select HTML elements with JavaScript.
- Respond to button clicks with event listeners.
- Store and update data in arrays and objects.
- Use loops and conditional statements.
- Update page content using the DOM.
- Debug common browser errors.

## Getting started

1. Open `index.html` in your browser.
2. Open the project folder in your code editor.
3. Open `script.js` and `index.html` side by side.
4. In your browser, open Developer Tools and select the **Console** tab to check for errors.
5. Click **Add to bag**, **Clear bag**, and **Place demo order** to explore the existing behavior.

## How the project works

- `index.html` contains the product cards and shopping-bag elements.
- `styles.css` controls the page's appearance.
- `script.js` listens for button clicks, stores products in the `cart` array, calculates the total, and updates the page.

## Exercises

### 1. Trace an add-to-bag click

In `script.js`, find where click listeners are added to `.add-to-cart` buttons.

- What information is read from the clicked button?
- Where is the product added?
- Which function refreshes the cart display?

**Practice:** Add a short `console.log` to show the product name when it is added. Click a product and check the Console.

### 2. Change a product

In `index.html`, choose one product card.

- Change its `data-name` and `data-price` attributes.
- Update its displayed product name and price so they match.
- Reload the page and add that product to the bag.

**Check:** The cart should show the new name and use the new price in its total.

### 3. Add a product count

Update `script.js` so the cart shows how many units of each product are in the bag, rather than adding a separate row for every click.

**Hint:** Before adding a product, search the `cart` array for one with the same name. If it exists, increase its quantity; otherwise, add it with a quantity of `1`. Update the cart display and total to use that quantity.

### 4. Add a remove button

Add a **Remove** button beside each cart item.

- Create the button in `updateCart()`.
- When clicked, remove that item from the `cart` array.
- Refresh the display and total.

**Hint:** You can use the item's index with `splice()`. Make sure the click handler refers to the correct item.

### 5. Save the cart between page visits

Use `localStorage` to keep the cart after a reload.

- Save the cart after it changes.
- Load saved data when the page starts.
- Check that a cleared or checked-out cart is also cleared from storage.

**Hint:** `localStorage` stores strings. Use `JSON.stringify()` to save an array and `JSON.parse()` to read it back. Handle the case where nothing has been saved yet.

### 6. Validate product data

Before adding an item, check that its name is present and its price is a valid, non-negative number.

**Check:** Try temporarily changing a product's `data-price` to invalid text. The page should not add an invalid price to the total.

## Test checklist

- [ ] Adding a product updates the item count, list, and total.
- [ ] Adding multiple products calculates the correct total.
- [ ] Clearing the bag empties the list and disables the bag buttons.
- [ ] Checkout displays the demo message and empties the bag.
- [ ] The page Console has no JavaScript errors.
- [ ] Any new feature works after reloading the page, if it is intended to persist.

## Debugging tips

- Read the first error in the browser Console; later errors may be caused by it.
- Check that element IDs and class names in JavaScript match `index.html` exactly.
- Check spelling, capitalization, parentheses, braces, and quotation marks.
- Use `console.log()` to inspect values while learning, then remove temporary logs.
- After changing a file, save it and reload the page.

## Safety note

This is a front-end learning project with a demo checkout. Do not collect real payment details or put private API keys in browser-side JavaScript.
