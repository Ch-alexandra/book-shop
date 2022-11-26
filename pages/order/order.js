document.addEventListener("DOMContentLoaded", () => {

    let inputName = document.querySelector("#input-name");
    let inputSurname = document.querySelector("#input-surname");
    let inputDate = document.querySelector("#input-date");
    let btnSubmit = document.querySelector(".btn-order");
    let body = document.querySelector("body");


    btnSubmit.addEventListener("click", (e) => {
        if (validation()) {
            e.preventDefault();
                    let modalElem = buildModalDialogElement(inputName.value, inputSurname.value, inputDate.value, () => {
            body.removeChild(modalElem);
        });
        body.appendChild(modalElem);
        }

    });

    let date = new Date();
    date.setDate(date.getDate() + 1);
    inputDate.setAttribute("min", date.toJSON().slice(0, 10));

    let checkboxes = Array.from(document.querySelectorAll("input[type=checkbox]"));
    checkboxes.forEach(input => {
        input.addEventListener("change", () => {
            if (checkboxes.filter(item => item.checked).length > 2) {
                input.checked = false;
            }
        })
    });

    let inputs = Array.from(document.getElementsByTagName("input"));
    inputs.forEach(input => {
        input.addEventListener("input", validation);
    })
    function validation() {
        let isValid = inputs.every(input => input.checkValidity());
        isValid ? btnSubmit.classList.add("enabled") : btnSubmit.classList.remove("enabled");

        return isValid;
    }

    function buildModalDialogElement(name, surname, date, onClose) {
        let modal = document.createElement("div");
        modal.className = "modal-background";

        let modalBlock = document.createElement("div");
        modalBlock.className = "modal-block card";

        let modalClose = document.createElement("img");
        modalClose.src = "../../assets/cross.png";
        modalClose.className = "icon-delete modal-close-btn";
        modalClose.addEventListener("click", onClose);
        modalBlock.appendChild(modalClose);

        let title = document.createElement("h3");
        title.textContent = `Thanks for your order, ${name} ${surname}`;
        modalBlock.appendChild(title);

        let modalBlockText = document.createElement("p");
        modalBlockText.textContent = `Your order will be delivered on ${date}`;

        modalBlock.appendChild(modalBlockText);
        modal.appendChild(modalBlock);

        return modal;
    }


});