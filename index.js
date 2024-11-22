import { getAllProducts } from './api/produse.js';
import { mapProductToCard } from './utils/layout.js';

document.addEventListener('DOMContentLoaded', displayProducts);

async function displayProducts() {
	const products = await getAllProducts();
	document.querySelector('.products').innerHTML = products
		.map(mapProductToCard)
		.join('');

	const addToCartButtons = document.querySelectorAll('.add-to-cart');
	addToCartButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const productId = button.getAttribute('data-productId');
			const name = button.getAttribute('data-name');
			const price = button.getAttribute('data-price');
			const imageURL = button.getAttribute('data-image');

			let cart = JSON.parse(localStorage.getItem('cart')) || {};

			if (cart[productId]) {
				cart[productId].quantity++;
			} else {
				cart[productId] = {
					quantity: 1,
					price: Number(price),
					image: imageURL,
					name: name,
				};
			}

			localStorage.setItem('cart', JSON.stringify(cart));
		});
	});
}
