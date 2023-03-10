/*jshint esversion: 6 */

window.addEventListener("DOMContentLoaded", function () {
	//smooth scrolling through links
	const links = document.querySelectorAll('a[href^="#"]');
	for (let link of links) {
		link.addEventListener("click", function (e) {
			e.preventDefault();

			const id = link.getAttribute("href");
			document.querySelector(id).scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		});
	}

	const fadeIn = (el, timeout, display) => {
		el.style.opacity = 0;
		el.style.display = display || "block";
		el.style.transition = `opacity ${timeout}s`;
		setTimeout(() => {
			el.style.opacity = 1;
		}, 10);
	};
	const fadeOut = (el, timeout) => {
		el.style.transition = `opacity ${timeout}s`;
		el.style.opacity = 0;
		setTimeout(() => {
			el.style.display = "none";
		}, 100);
	};

	// scroll-up element
	const scrollUp = document.querySelector(".scroll-up");
	let isDisplayed = false;
	window.addEventListener("scroll", function () {
		if (!isDisplayed && this.scrollY > 500) {
			fadeIn(scrollUp, 0.3, "flex");
			isDisplayed = true;
		} else if (this.scrollY < 500 && isDisplayed) {
			isDisplayed = false;
			fadeOut(scrollUp, 0.3);
		}
	});

	// order calculating
	let checkboxes = document.querySelectorAll("input[type='checkbox']");
	let inputs = document.querySelectorAll("input[type='number']");
	let submit = document.querySelector(".btn");
	let price = document.querySelector(".sum");
	let lastValues = [0, 0, 0, 0, 0, 0, 0];
	let sum = 0;

	checkboxes.forEach(function (item, index) {
		item.addEventListener("change", function () {
			let input = inputs[index];

			if (this.checked == true) {
				input.value = 1;
			} else {
				input.value = 0;
			}

			sum = 0;
			lastValues[index] = +input.value;
			for (let valueIndex in lastValues) {
				sum += lastValues[valueIndex] * checkboxes[valueIndex].value;
			}

			price.innerHTML = `${sum} р.`;
		});
	});

	inputs.forEach(function (item, index) {
		item.addEventListener("change", function () {
			let checkbox = checkboxes[index];
			
			if (+this.value > 0) {
				checkbox.checked = true;
			} else if (+this.value == 0) {
				checkbox.checked = false;
			} else {
				this.value = 0;
				checkbox.checked = false;
			}
			
			sum = 0;
			lastValues[index] = +this.value;
			for (let valueIndex in lastValues) {
				sum += lastValues[valueIndex] * checkboxes[valueIndex].value;
			}

			
			price.innerHTML = `${sum} р.`;
		});
	});

	submit.addEventListener("click", function (e) {
		e.preventDefault();
		let surname = document.querySelector('#surname').value;
		let name = document.querySelector('#name').value;

		alert(`Заказчик: ${surname} ${name}\nИтого: ${sum} р.`);
	});
});
