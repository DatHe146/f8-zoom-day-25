const tabs = document.querySelectorAll(".tabs");

tabs.forEach((tab) => {
    const tabItems = tab.querySelectorAll(".tab-item");
    const contents = tab.querySelectorAll(".content");
    if (tabItems.length && contents.length) {
        tabItems[0].classList.add("active");
        contents[0].classList.add("active");
    }
    tabItems.forEach((tabItem, tabIndex) => {
        tabItem.onclick = (event) => {
            const tabActived = tab.querySelector(".tab-item.active");
            tabActived.classList.remove("active");
            event.target.classList.add("active");

            const contentActived = tab.querySelector(".content.active");
            contentActived.classList.remove("active");
            contents[tabIndex].classList.add("active");
        };
    });
    tab.onkeydown = (event) => {
        if (
            0 <= event.key &&
            event.key < tabItems.length &&
            event.key < contents.length
        ) {
            const tabActived = tab.querySelector(".tab-item.active");
            tabActived.classList.remove("active");
            tabItems[event.key].classList.add("active");
            const contentActived = tab.querySelector(".content.active");
            contentActived.classList.remove("active");
            contents[event.key].classList.add("active");
        }
    };
});
