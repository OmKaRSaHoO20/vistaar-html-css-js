import Data from "./constants/index.js";
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

document.addEventListener("DOMContentLoaded", () => {
    fetch("header/index.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("header-container").innerHTML = data;

            document
                .getElementById("header-title")
                .addEventListener("click", function () {
                    window.location.href = "/";
                });
        });

    const ThumbnailData = {
        womens: Data[0].womens[0].thumbnail,
        accessories: Data[0].accessories[0].thumbnail,
        mens: Data[0].mens[0].thumbnail,
    };

    document.querySelectorAll(".category-item").forEach((item) => {
        const category = item.getAttribute("data-category");
        const img = item.querySelector("img");
        img.src = ThumbnailData[category];
    });

    document.querySelectorAll(".category-item").forEach((item) => {
        item.addEventListener("click", () => {
            const category = item.getAttribute("data-category");
            sessionStorage.setItem("category", category);
            window.location.href = `/categories/category`;
        });
    });

    fetch("footer/index.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("footer-container").innerHTML = data;
        });

    const swiper = new Swiper(".swiper", {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        slidesPerView: "auto",
        spaceBetween: 20,
        controller: {
            inverse: true,
        },
        grabCursor: true,
        direction: "horizontal",
        loop: true,
    });
});
