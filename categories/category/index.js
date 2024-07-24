import Data from "../../constants/index.js";

document.addEventListener("DOMContentLoaded", () => {
    const CATEGORY = sessionStorage.getItem("category");

    document.getElementById(
        "categories-title"
    ).textContent = `category ${CATEGORY}`;

    const categoryData = Data[0][CATEGORY];

    const categoryContainer = document.getElementById("category-container");

    fetch("../../header/index.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("header-container").innerHTML = data;

            document
                .getElementById("header-title")
                .addEventListener("click", function () {
                    window.location.href = "/";
                });
        });

    categoryData.forEach((category) => {
        const categoryItem = document.createElement("div");
        categoryItem.className = "category-item";
        categoryItem.addEventListener("click", () => {
            sessionStorage.setItem("id", category.id);
            window.location.href = `/categories/details/`;
        });

        const imgElem = document.createElement("img");
        imgElem.src = category.thumbnail;
        imgElem.alt = category.title;

        const discountFlex = document.createElement("div");
        discountFlex.className = "discount-flex";

        const newElem = document.createElement("div");
        newElem.className = "category-item-type";
        newElem.textContent = "NEW!";

        const discountElem = document.createElement("div");
        discountElem.className = "category-item-type";
        const discountIcon = document.createElement("span");
        discountIcon.className = "material-icons-outlined icon";
        discountIcon.style.color = "green";
        discountIcon.style.marginRight = "20px";
        discountIcon.textContent = "discount";
        discountElem.appendChild(discountIcon);
        discountElem.appendChild(
            document.createTextNode(
                ` ${Math.round(category.discountPercentage)}% OFF`
            )
        );

        discountFlex.appendChild(newElem);
        discountFlex.appendChild(discountElem);

        const titleElem = document.createElement("div");
        titleElem.className = "category-item-type";
        titleElem.textContent = category.title;

        const priceElem = document.createElement("div");
        priceElem.className = "category-item-type";
        priceElem.textContent = `RS. ${category.price}`;

        const ratingElem = document.createElement("div");
        ratingElem.className = "rating";
        ratingElem.textContent = "Ratings";
        const ratingValue = document.createElement("div");
        ratingValue.textContent = `: ${category.rating} / 5`;
        ratingElem.appendChild(ratingValue);

        categoryItem.appendChild(imgElem);
        categoryItem.appendChild(discountFlex);
        categoryItem.appendChild(titleElem);
        categoryItem.appendChild(priceElem);
        categoryItem.appendChild(ratingElem);

        categoryContainer.appendChild(categoryItem);
    });

    fetch("../../footer/index.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("footer-container").innerHTML = data;
        });
});
