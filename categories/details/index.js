import Data from "../../constants/index.js";

document.addEventListener("DOMContentLoaded", () => {
    const category = sessionStorage.getItem("category")
    const id = sessionStorage.getItem("id")

    const categoryData = Data[0][category];
    const PRODUCT = categoryData.find(item => item.id === parseInt(id));

    if (!PRODUCT) {
        document.body.innerHTML = '<div>Product not found</div>';
        return;
    }

    const selectedImageElem = document.getElementById("selected-image");
    const demoImagesContainer = document.getElementById("demo-images");
    const categoryChipElem = document.getElementById("category-chip");
    const discountPercentageElem = document.getElementById("discount-percentage");
    const productTitleElem = document.getElementById("product-title");
    const productSizeContainer = document.getElementById("product-size-container");
    const decreaseBtn = document.getElementById("decrease-btn");
    const increaseBtn = document.getElementById("increase-btn");
    const quantityElem = document.getElementById("quantity");
    const buyBtn = document.getElementById("buy-btn");
    const productPriceElem = document.getElementById("product-price");
    const productDescriptionElem = document.getElementById("product-description");
    const productRatingElem = document.getElementById("product-rating");

    let selectedImage = PRODUCT.thumbnail;
    let quantity = 0;
    let value = "S";

    selectedImageElem.src = selectedImage;
    categoryChipElem.textContent = PRODUCT.category;
    discountPercentageElem.textContent = Math.round(PRODUCT.discountPercentage);
    productTitleElem.textContent = PRODUCT.title;
    productPriceElem.textContent = PRODUCT.price * quantity;
    productDescriptionElem.textContent = PRODUCT.description;
    productRatingElem.innerHTML = `Rating: ${PRODUCT.rating}`;

    const updateBuyButtonState = () => {
        buyBtn.disabled = quantity === 0;
        buyBtn.textContent = `BUY @ RS. ${PRODUCT.price * quantity}`;
        decreaseBtn.disabled = quantity === 0;
    };

    decreaseBtn.addEventListener("click", () => {
        quantity = Math.max(0, quantity - 1);
        quantityElem.textContent = quantity;
        updateBuyButtonState();
    });

    increaseBtn.addEventListener("click", () => {
        quantity += 1;
        quantityElem.textContent = quantity;
        updateBuyButtonState();
    });

    buyBtn.addEventListener("click", () => {
        window.location.href = '../../contact/';
    });

    PRODUCT.images.forEach((image) => {
        const imgContainer = document.createElement("div");
        imgContainer.className = "demo-image-container";
        imgContainer.addEventListener("click", () => {
            selectedImage = image;
            selectedImageElem.src = selectedImage;
        });
        const imgElem = document.createElement("img");
        imgElem.src = image;
        imgElem.alt = "data";
        imgContainer.appendChild(imgElem);
        demoImagesContainer.appendChild(imgContainer);
    });

    const sizes = ["S", "M", "L", "XL", "XXL"];
    sizes.forEach((size) => {
        const button = document.createElement("button");
        button.className = "product-size-button";
        button.textContent = size;
        button.value = size;
        button.style.backgroundColor = value === size ? "#000" : "";
        button.style.color = value === size ? "white" : "";
        button.addEventListener("click", () => {
            value = size;
            document.querySelectorAll(".product-size-button").forEach((btn) => {
                btn.style.backgroundColor = btn.value === value ? "#000" : "";
                btn.style.color = btn.value === value ? "white" : "";
            });
        });
        productSizeContainer.appendChild(button);
    });
});