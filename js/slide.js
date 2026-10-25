const slides = document.querySelectorAll(".slides");
let currentIndex = 0;

slides.forEach((slide) => {
    const slideInner = slide.querySelector(".slide-inner");
    const next = slide.querySelector(".prev-btn.next");
    const prev = slide.querySelector(".prev-btn.prev");
    const pagination = document.querySelector(".pagination");

    const slideItems = Array.from(
        slide.querySelectorAll(".slide-inner .slide-item"),
    );
    if (slideItems.length) {
        const lastItem = slideItems[0].cloneNode(true);
        // const firstItem = slideItems[slideItems.length - 1].cloneNode(true);
        slideInner.appendChild(lastItem);
        slideItems.push(lastItem);

        // slideInner.insertBefore(firstItem, slideInner.firstChild)
        // slideItems.unshift(firstItem)
    }

    const maxIndex = slideItems.length - 1;

    prev.onclick = (event) => {
        if (currentIndex === 0) currentIndex = maxIndex;
        else currentIndex = Math.max(0, --currentIndex);
        updatePosition();
        dotActive(pagination, currentIndex);
    };

    next.onclick = (event) => {
        if (currentIndex === maxIndex) {
            currentIndex = 0;
        } else currentIndex = Math.min(++currentIndex, maxIndex);
        updatePosition();
        dotActive(pagination, currentIndex);
    };
    function updatePosition(instant = false) {
        const offset = `-${currentIndex * 100}%`;
        slideInner.style.transition = instant ? "none" : "ease 0.5s";
        slideInner.style.translate = offset;
    }
    slideInner.ontransitionend = (event) => {
        if (currentIndex === maxIndex) {
            currentIndex = 0;
            updatePosition(true);
            dotActive(pagination, currentIndex);
        }
    };

    let autoNext = setInterval(function () {
        if (currentIndex === maxIndex) {
            currentIndex = 0;
        } else currentIndex = Math.min(++currentIndex, maxIndex);
        updatePosition();
        dotActive(pagination, currentIndex);
    }, 3000);

    slide.onmouseenter = function () {
        clearInterval(autoNext);
    };

    slide.onmouseleave = function () {
        autoNext = setInterval(function () {
            if (currentIndex === maxIndex) {
                currentIndex = 0;
            } else currentIndex = Math.min(++currentIndex, maxIndex);
            updatePosition();
            dotActive(pagination, currentIndex);
        }, 3000);
    };
});

function dotActive(pagination, currentIndex) {
    const dots = pagination.querySelectorAll(".dot");
    const dotActived = pagination.querySelector(".dot.active");
    if (dotActived) dotActived.classList.remove("active");
    dots[currentIndex].classList.add("active");
}
