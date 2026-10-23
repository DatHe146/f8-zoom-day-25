const listChecks = document.querySelectorAll(".list-check");

listChecks.forEach((listCheck) => {
    const checkAlls = listCheck.querySelectorAll(".check-all");
    const checkItems = listCheck.querySelectorAll(".check-item");
    const h2s = listCheck.querySelectorAll("h2");

    checkAlls.forEach((checkAll) => {
        checkAll.onclick = function (event) {
            event.preventDefault();
            const input = checkAll.querySelector("input");
            input.toggleAttribute("checked");
            checkItems.forEach((checkItem) => {
                const inputCheckItem = checkItem.querySelector("input");
                inputCheckItem.toggleAttribute("checked");
            });
            updateCount();
        };
    });

    checkItems.forEach((checkItem) => {
        checkItem.onclick = (event) => {
            event.preventDefault();
            const inputCheckItem = checkItem.querySelector("input");
            inputCheckItem.toggleAttribute("checked");
            updateCount();

            const targetSibling = Array.from(
                checkItem.parentElement.children,
            ).find((el) => el.matches(".check-all") && el !== checkItem);
            const inputTarget = targetSibling.querySelector('input');
            inputTarget.indeterminate = true;
        };
    });

    function updateCount() {
        let count = 0;
        checkItems.forEach((checkItem) => {
            const inputCheck = checkItem.querySelector("input");
            if (inputCheck.hasAttribute("checked")) count++;
        });
        h2s.forEach((h2) => {
            h2.textContent = `${count}`;
        });
    }
});
