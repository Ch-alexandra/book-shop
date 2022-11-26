document.addEventListener("DOMContentLoaded", () => {
    let main = document.querySelector("#body");
    let fragment = new DocumentFragment();
    let cartSum = 0;

    let header = document.createElement("header");
    let headerImg = document.createElement("img");
    headerImg.src = "../../assets/Шапка.png";
    headerImg.id = "hat";
    header.appendChild(headerImg);
    fragment.append(header);

    let section = document.createElement("section");
    section.id = "catalog";

    let divBooks = document.createElement("div");
    divBooks.className = "books";

    fetch('books.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(bookData => {
                let divBook = document.createElement("div");
                divBook.className = "book";
                divBook.draggable = true;
                divBook.addEventListener("dragstart", (e)=> {
                e.dataTransfer.setData('text/plain', JSON.stringify(bookData));
                });

                let bookImg = document.createElement("img");
                bookImg.className = "img";
                bookImg.setAttribute("src", bookData.imageLink);
                divBook.appendChild(bookImg);

                let divDescription = document.createElement("div");
                divDescription.className = "description";

                let bookTitle = document.createElement("h3");
                bookTitle.textContent = bookData.title;
                divDescription.appendChild(bookTitle);


                let bookAuthor = document.createElement("h4");
                bookAuthor.textContent = bookData.author;
                divDescription.appendChild(bookAuthor);

                let bookPrice = document.createElement("p");
                bookPrice.className = "price";
                bookPrice.textContent = "Price: " + bookData.price + "$";
                divDescription.appendChild(bookPrice);

                let divBtnWrapper = document.createElement("div");
                divBtnWrapper.className = "btn-wrapper";

                let buttonBtn = document.createElement("button");
                buttonBtn.className = "btn";
                buttonBtn.textContent = "Show Description";

                buttonBtn.addEventListener("click", () => {
                    let modal = buildModalDialogElement(bookData.description, () => {
                        main.removeChild(modal);
                    });
                    main.appendChild(modal);
                })

                let buttonBtn2 = document.createElement("button");
                buttonBtn2.className = "btn";
                buttonBtn2.textContent = "Buy";

                buttonBtn2.addEventListener("click", () => {
                    let cartElem = buildCartElement(bookData, () => {
                        divCart.removeChild(cartElem);
                        removeSum(bookData.price);
                    });
                    addSum(bookData.price);
                    divCart.insertBefore(cartElem, divCart.childNodes[1]);
                })

                divBtnWrapper.appendChild(buttonBtn);
                divBtnWrapper.appendChild(buttonBtn2);
                divDescription.appendChild(divBtnWrapper);
                divBook.appendChild(divDescription);
                divBooks.appendChild(divBook);
            });
        });

    section.appendChild(divBooks);

    let divCart = document.createElement("div");
    divCart.className = "cart card";
    divCart.addEventListener("dranenter", (e) => {
        e.preventDefault();
    });

    divCart.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    divCart.addEventListener("drop", (e) => {
        e.preventDefault();
        let bookStr = JSON.parse(e.dataTransfer.getData("text"));
        let cartElem = buildCartElement(bookStr, () => {
            divCart.removeChild(cartElem);
            removeSum(bookStr.price);
        });
        addSum(bookStr.price);
        divCart.insertBefore(cartElem, divCart.childNodes[1]);
    });

    let divHatBag = document.createElement("div");
    divHatBag.id = "hat-bag";

    let imgShopBag = document.createElement("img");
    imgShopBag.id = "shop-bag";
    imgShopBag.src = "../../assets/bag.png";
    divHatBag.appendChild(imgShopBag);

    let shopBagText = document.createElement("h4");
    shopBagText.textContent = "SHOPPING BAG";
    divHatBag.appendChild(shopBagText);

    divCart.appendChild(divHatBag);

    let divCartFoot = document.createElement("div");
    divCartFoot.className = "cart-foot";

    let total = document.createElement("h4");
    updatePriceElem();
    divCartFoot.appendChild(total);

    let buttonCart = document.createElement("a");
    buttonCart.className = "btn-cart";
    buttonCart.textContent = "Make an order";
    buttonCart.href = "../order";
    buttonCart.addEventListener("click", () => {

    })
    divCartFoot.appendChild(buttonCart);

    divCart.appendChild(divCartFoot);

    section.appendChild(divCart);

    fragment.append(section);

    main.appendChild(fragment);
    
    function addSum(price) {
    cartSum += price;
    updatePriceElem();
    }

    function removeSum(price) {
        cartSum -= price;
        updatePriceElem();
    }

    function updatePriceElem() {
        total.textContent = "Total amount: " + cartSum + "$";
    }

    function buildCartElement(bookData, onClose) {
        let divItem = document.createElement("div");
        divItem.id = "item";

        let imgCart = document.createElement("img");
        imgCart.className = "img-cart";
        imgCart.src = bookData.imageLink;
        divItem.appendChild(imgCart);

        let divDescrCart = document.createElement("div");
        divDescrCart.className = "cart-text";
        divItem.appendChild(divDescrCart);

        let titleElem = document.createElement("h4");
        titleElem.textContent = bookData.title;
        divDescrCart.appendChild(titleElem);

        let authorElem = document.createElement("h4");
        authorElem.textContent = bookData.author;
        divDescrCart.appendChild(authorElem);

        let priceElem = document.createElement("h4");
        priceElem.textContent = bookData.price+"$";
        divDescrCart.appendChild(priceElem);

        let imgDelete = document.createElement("img");
        imgDelete.className = "icon-delete";
        imgDelete.src = "../../assets/cross.png";
        imgDelete.addEventListener("click", onClose);
        divItem.appendChild(imgDelete);

        return divItem;
    }

    function buildModalDialogElement(description, onClose) {
        let modal = document.createElement("div");
        modal.className = "modal-background";

        let modalBlock = document.createElement("div");
        modalBlock.className = "modal-block card";

        let modalClose = document.createElement("img");
        modalClose.src = "../../assets/cross.png";
        modalClose.className = "icon-delete modal-close-btn";
        modalClose.addEventListener("click", onClose);
        modalBlock.appendChild(modalClose);

        let modalBlockText = document.createElement("p");
        modalBlockText.textContent = description;

        modalBlock.appendChild(modalBlockText);
        modal.appendChild(modalBlock);

        return modal;
    }

});