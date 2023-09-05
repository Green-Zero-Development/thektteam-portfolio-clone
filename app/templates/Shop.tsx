// @ts-nocheck
'use client';

import { useState, useEffect, createElement } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';

const carttoggle = () => {
    document.getElementById("cart").classList.toggle("cart-active");
    document.getElementById("cart-off").classList.toggle("hidden");
    document.getElementById("checkout-button").classList.toggle("hidden");
    document.body.classList.toggle("overflow-hidden");
}

const cart:any = [];

let cartJson = {
    addItem: function(productId, productTitle, productImage, option0, option1, option2, quantity) {
      this[productId] = {
        title: productTitle,
        img: productImage,
        option0: option0,
        option1: option1,
        option2: option2,
        quantity: quantity
      };
    },
    removeItem: function(productId) {
      if (this.hasOwnProperty(productId)) {
        var item = this[productId];
        delete this[productId];
      }
    }
};

const cartForCheckout:any = [];

const cartForCheckoutPrepared:any = [];

const pushLocalStorageToCart = async (parsedStorageCart) => {
    let localStorageCheck = true;
    for (const key of Object.entries(parsedStorageCart)) {
        addToCartForCheckout(key[0], '1');
        addToCartv4(key, key[1].title, key[1].img, key[1].option0, key[1].option1, key[1].option2, key[1].quantity, localStorageCheck);
    }
}

const addToCartv2 = async (product:any) => {

    const productId = product.target.parentElement.querySelector('#productId').innerText;
    const productTitle = product.target.parentElement.querySelector('#productTitle').innerText;
    const productImg = product.target.parentElement.querySelector('#productImg').src;
    const variantTableItems = document.querySelectorAll('.variant-table-item');
    if (product.target.parentElement.querySelector('#option0') && product.target.parentElement.querySelector('#option1')  && product.target.parentElement.querySelector('#option2')) {
        var option0 = product.target.parentElement.querySelector('#option0').value;
        var option1 = product.target.parentElement.querySelector('#option1').value;
        var option2 = product.target.parentElement.querySelector('#option2').value;
        var idToFind = productId + option0 + option1 + option2;
    } else if (product.target.parentElement.querySelector('#option0') && product.target.parentElement.querySelector('#option1')) {
        var option0 = product.target.parentElement.querySelector('#option0').value;
        var option1 = product.target.parentElement.querySelector('#option1').value;
        var idToFind = productId + option0 + option1;
    } else if (product.target.parentElement.querySelector('#option0')) {
        var option0 = product.target.parentElement.querySelector('#option0').value;
        var idToFind = productId + option0;
    } else {
        var idToFind = productId;
    }
    for (let i = 0; i < variantTableItems.length; i++) {
        if (variantTableItems[i].id === idToFind) {
            if (option0 && option1 && option2) {
                addToCartv4(variantTableItems[i].innerText, productTitle, productImg, option0, option1, option2);
                cartJson.addItem(variantTableItems[i].innerText, productTitle, productImg, option0, option1, option2);
            } else if (option0 && option1) {
                addToCartv4(variantTableItems[i].innerText, productTitle, productImg, option0, option1);
                cartJson.addItem(variantTableItems[i].innerText, productTitle, productImg, option0, option1);
            } else if (option0) {
                addToCartv4(variantTableItems[i].innerText, productTitle, productImg, option0);
                cartJson.addItem(variantTableItems[i].innerText, productTitle, productImg, option0);
            } else {
                addToCartv4(variantTableItems[i].innerText, productTitle, productImg);
                cartJson.addItem(variantTableItems[i].innerText, productTitle, productImg);
            }
        }
    }
}

// const addToCartv3 = async (id:any, title:any, img:any, option0:any, option1:any, option2:any) => {
//     const cartElement = document.getElementById('cart');
//     const productId = id;
//     const productTitle = title;
//     const productImage = img;

//     if (cart.includes(productId)) {
//         // stop user from adding products already in the cart.
//         console.log('already added');
//     } else {
//         cart.push(productId);

//         // create cart item and append to cart ID
//         const cartItem = document.createElement('div');
//         cartItem.classList.add('cart-item');

//         const cartItemData = document.createElement('div');
//         cartItemData.classList.add('cart-item-data');

//         const cartItemImage = document.createElement('img');
//         cartItemImage.classList.add('cart-item-image');
//         cartItemImage.src = productImage;

//         const cartItemTitle = document.createElement('h5');
//         cartItemTitle.classList.add('cart-item-title');
//         cartItemTitle.textContent = productTitle;
        
//         if (option0 && option1 && option2) {
//             const cartItemVariant = document.createElement('h6');
//             cartItemVariant.classList.add('cart-item-variant');
//             cartItemVariant.textContent = option0 + '/' + option1 + '/' + option2;
//             cartItemData.appendChild(cartItemVariant);
//         } else if (option0 && option1) {
//             const cartItemVariant = document.createElement('h6');
//             cartItemVariant.classList.add('cart-item-variant');
//             cartItemVariant.textContent = option0 + '/' + option1;
//             cartItemData.appendChild(cartItemVariant);
//         } else if (option0) {
//             const cartItemVariant = document.createElement('h6');
//             cartItemVariant.classList.add('cart-item-variant');
//             cartItemVariant.textContent = option0;
//             cartItemData.appendChild(cartItemVariant);
//         }

//         const cartItemRemove = document.createElement('button');
//         cartItemRemove.classList.add('cart-remove');
//         cartItemRemove.textContent = 'Remove';
//         cartItemRemove.addEventListener('click', function() {
//             removeCartItem(cartItem, productId);
//         });

//         const cartItemQuantity:any = document.createElement('input');
//             cartItemQuantity.classList.add('quantity');
//             cartItemQuantity.id = "quantity";
//             cartItemQuantity.setAttribute('type', 'number');
//             cartItemQuantity.setAttribute('value', '1');
//             cartItemQuantity.setAttribute('min', '1');

//             cartItemQuantity.addEventListener('change', function() {
//                 addToCartForCheckout(id, cartItemQuantity.value);
//             });

//         cartItem.appendChild(cartItemImage);
//         cartItemData.appendChild(cartItemTitle);
//         cartItemData.appendChild(cartItemQuantity);
//         cartElement.appendChild(cartItem);
//         cartItemData.appendChild(cartItemRemove);
//         cartItem.appendChild(cartItemData);
//     }
//     console.log(cart);

//     cartItemNumber();
// }


const addToCartv4 = async (id:any, title:any, img:any, option0:any, option1:any, option2:any, quantity, localStorageCheck) => {
    const cartElement = document.getElementById('cart');
    const productTitle = title;
    const productImage = img;

    if (typeof id === 'object') {
        var productId = id[0];
    } else {
        var productId = id;
    }

    if (quantity !== 1 && quantity !== undefined) {
        var quantity = quantity;
        addToCartForCheckout(productId, quantity);
    } else {
        var quantity = 1;
        addToCartForCheckout(productId, '1');
    }

    if (cartJson.hasOwnProperty(productId)) {
        console.log('already added');
    } else {

        console.log(productId);

        cartJson.addItem(productId, productTitle, productImage, option0, option1, option2, quantity);

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const cartItemData = document.createElement('div');
        cartItemData.classList.add('cart-item-data');

        const cartItemImage = document.createElement('img');
        cartItemImage.classList.add('cart-item-image');
        cartItemImage.src = cartJson[productId].img;

        const cartItemTitle = document.createElement('h5');
        cartItemTitle.classList.add('cart-item-title');
        cartItemTitle.textContent = cartJson[productId].title;

        if (option0 && option1 && option2) {
            const cartItemVariant = document.createElement('h6');
            cartItemVariant.classList.add('cart-item-variant');
            cartItemVariant.textContent = cartJson[productId].option0 + '/' + cartJson[productId].option1 + '/' + cartJson[productId].option2;
            cartItemData.appendChild(cartItemVariant);
        } else if (option0 && option1) {
            const cartItemVariant = document.createElement('h6');
            cartItemVariant.classList.add('cart-item-variant');
            cartItemVariant.textContent = cartJson[productId].option0 + '/' + cartJson[productId].option1;
            cartItemData.appendChild(cartItemVariant);
        } else if (option0) {
            const cartItemVariant = document.createElement('h6');
            cartItemVariant.classList.add('cart-item-variant');
            cartItemVariant.textContent = cartJson[productId].option0;
            cartItemData.appendChild(cartItemVariant);
        }

        const cartItemRemove = document.createElement('button');
        cartItemRemove.classList.add('cart-remove');
        cartItemRemove.textContent = 'Remove';
        cartItemRemove.addEventListener('click', function() {
            removeCartItem(cartItem, productId);
        });

        const cartItemQuantity:any = document.createElement('input');
        cartItemQuantity.classList.add('quantity');
        cartItemQuantity.id = "quantity";
        cartItemQuantity.setAttribute('type', 'number');
        cartItemQuantity.setAttribute('value', quantity);
        cartItemQuantity.setAttribute('min', '1');

        cartItemQuantity.addEventListener('change', function() {
            if (cartJson.hasOwnProperty(productId)) {
                cartJson.removeItem(productId);
                cartJson.addItem(productId, productTitle, productImage, option0, option1, option2, Number(cartItemQuantity.value));
                localStorage.removeItem("cartItemList");
                window.localStorage.setItem("cartItemList", JSON.stringify(cartJson));
            } 
            addToCartForCheckout(id, cartItemQuantity.value);
        });

        cartItem.appendChild(cartItemImage);
        cartItemData.appendChild(cartItemTitle);
        cartItemData.appendChild(cartItemQuantity);
        cartElement.appendChild(cartItem);
        cartItemData.appendChild(cartItemRemove);
        cartItem.appendChild(cartItemData);

        if (localStorageCheck === true) {

        } else {
            localStorage.removeItem("cartItemList");
            window.localStorage.setItem("cartItemList", JSON.stringify(cartJson));
        }
    }

    // if (cart.includes(productId)) {
    //     // stop user from adding products already in the cart.
    //     console.log('already added');
        
    // } else if (cartJson.hasOwnProperty(id)) {
    //     cart.push(productId);
        
    //     console.log(cartJson[id].title)
    // } else {
    //     if (cartJson.hasOwnProperty(id)) {
    //         console.log(cartJson[id].title)
    //     }
        
    // }

    // if (cart.includes(productId)) {
        
    // } else {
    //     cart.push(productId);

    //     // create cart item and append to cart ID
    //     const cartItem = document.createElement('div');
    //     cartItem.classList.add('cart-item');

    //     const cartItemData = document.createElement('div');
    //     cartItemData.classList.add('cart-item-data');

    //     // const cartItemImage = document.createElement('img');
    //     // cartItemImage.classList.add('cart-item-image');
    //     // cartItemImage.src = productImage;

    //     const cartItemTitle = document.createElement('h5');
    //     cartItemTitle.classList.add('cart-item-title');
    //     cartItemTitle.textContent = productTitle;
        
    //     if (option0 && option1 && option2) {
    //         const cartItemVariant = document.createElement('h6');
    //         cartItemVariant.classList.add('cart-item-variant');
    //         cartItemVariant.textContent = option0 + '/' + option1 + '/' + option2;
    //         cartItemData.appendChild(cartItemVariant);
    //     } else if (option0 && option1) {
    //         const cartItemVariant = document.createElement('h6');
    //         cartItemVariant.classList.add('cart-item-variant');
    //         cartItemVariant.textContent = option0 + '/' + option1;
    //         cartItemData.appendChild(cartItemVariant);
    //     } else if (option0) {
    //         const cartItemVariant = document.createElement('h6');
    //         cartItemVariant.classList.add('cart-item-variant');
    //         cartItemVariant.textContent = option0;
    //         cartItemData.appendChild(cartItemVariant);
    //     }

    //     const cartItemRemove = document.createElement('button');
    //     cartItemRemove.classList.add('cart-remove');
    //     cartItemRemove.textContent = 'Remove';
    //     cartItemRemove.addEventListener('click', function() {
    //         removeCartItem(cartItem, productId);
    //     });

    //     const cartItemQuantity:any = document.createElement('input');
    //         cartItemQuantity.classList.add('quantity');
    //         cartItemQuantity.id = "quantity";
    //         cartItemQuantity.setAttribute('type', 'number');
    //         cartItemQuantity.setAttribute('value', '1');
    //         cartItemQuantity.setAttribute('min', '1');

    //         cartItemQuantity.addEventListener('change', function() {
    //             addToCartForCheckout(id, cartItemQuantity.value);
    //         });

    //     cartItem.appendChild(cartItemImage);
    //     cartItemData.appendChild(cartItemTitle);
    //     cartItemData.appendChild(cartItemQuantity);
    //     cartElement.appendChild(cartItem);
    //     cartItemData.appendChild(cartItemRemove);
    //     cartItem.appendChild(cartItemData);
    // }

    cartItemNumber();
}

const handleCheckout = async () => {
    for (let i = 0; i < cartForCheckout.length; i += 2) {
        // Join the two elements together
        let joinedElements = cartForCheckout[i] + cartForCheckout[i + 1];
      
        // Add the joined elements to the new array
        cartForCheckoutPrepared.push(joinedElements);
    }
    window.location.href = `https://the-kt-team.myshopify.com/cart/` + cartForCheckoutPrepared;
};

function addToCart(product:any) {

    const cartElement = document.getElementById('cart');
    const productId = product.target.parentElement.querySelector('.product-id').innerText;
    const productTitle = product.target.parentElement.querySelector('.product-title').innerText;
    const productImage = product.target.parentElement.querySelector('.product-image').src;
    const variants = product.target.parentElement.querySelector('.variants');

    if (cart.includes(productId)) {
        // stop user from adding products already in the cart.
        console.log('already added');
    } else {
        cart.push(productId);

        // create cart item and append to cart ID
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const cartItemData = document.createElement('div');
        cartItemData.classList.add('cart-item-data');

        const cartItemImage = document.createElement('img');
        cartItemImage.classList.add('cart-item-image');
        cartItemImage.src = productImage;

        const cartItemTitle = document.createElement('h5');
        cartItemTitle.classList.add('cart-item-title');
        cartItemTitle.textContent = productTitle;

        const cartItemVariants = document.createElement('ul');
        cartItemVariants.classList.add('cart-variants');

        const cartItemRemove = document.createElement('button');
        cartItemRemove.classList.add('cart-remove');
        cartItemRemove.textContent = 'Remove';
        cartItemRemove.addEventListener('click', function() {
            removeCartItem(cartItem, productId);
        });

        // loop the product's variants and create the quantity inputs for each

        for (let i = 0; i < variants.children.length; i++) {

            let variantId = variants.children[i].querySelector('.variant-id').innerText;
            let variantTitle = variants.children[i].querySelector('.variant-title').innerText;
            let variantStock = variants.children[i].querySelector('.variant-stock').innerText;

            const cartItemQuantity:any = document.createElement('input');
            cartItemQuantity.classList.add('quantity');
            cartItemQuantity.setAttribute('type', 'number');
            cartItemQuantity.setAttribute('value', '0');
            cartItemQuantity.setAttribute('min', '0');
            cartItemQuantity.setAttribute('max', variantStock);

            const cartIncrement = document.createElement('img');
            cartIncrement.classList.add('cart-increment');
            cartIncrement.src = 'https://inside.thektteam.org/wp-content/uploads/2023/03/plus-solid.svg';

            cartIncrement.addEventListener('click', function() {
                if (cartItemQuantity.value !== variantStock) {
                    cartItemQuantity.value++;
                    addToCartForCheckout(variantId, cartItemQuantity);
                } else {

                }
            });

            const cartDecrement = document.createElement('img');
            cartDecrement.classList.add('cart-decrement');
            cartDecrement.src = 'https://inside.thektteam.org/wp-content/uploads/2023/03/minus-solid.svg';

            cartDecrement.addEventListener('click', function() {
                if (cartItemQuantity.value !== '0') {
                    cartItemQuantity.value--;
                    addToCartForCheckout(variantId, cartItemQuantity);
                } else {

                }
            });

            const cartItemVariant = document.createElement('li');
            cartItemVariant.classList.add('cart-variant');
            const cartItemVariantTitle = document.createElement('h6');
            cartItemVariantTitle.classList.add('cart-variant-title');
            const cartItemVariantId = document.createElement('div');
            cartItemVariantId.classList.add('cart-variant-id');
            cartItemVariantId.classList.add('hidden');
            cartItemVariantTitle.textContent = variantTitle;
            cartItemVariantId.textContent = variantId;
            cartItemVariant.appendChild(cartItemVariantTitle);
            cartItemVariant.appendChild(cartItemVariantId);
            cartItemVariant.appendChild(cartItemQuantity);
            cartItemVariant.append(cartIncrement);
            cartItemVariant.prepend(cartDecrement);

            cartItemVariants.appendChild(cartItemVariant);

            // remove the variant title from the cart and set the quantity to one if there's only one variant.
            if (variants.children.length === 1) {
                cartItemVariantTitle.classList.add('hidden');
                cartItemQuantity.value = 1;
                addToCartForCheckout(variantId, cartItemQuantity);
            }
        }
        cartItem.appendChild(cartItemImage);
        cartItemData.appendChild(cartItemTitle);
        cartItemData.appendChild(cartItemVariants);
        cartElement.appendChild(cartItem);
        cartItemData.appendChild(cartItemRemove);
        cartItem.appendChild(cartItemData);
    }
    

    cartItemNumber();
}

function addToCartForCheckout(variantId:any, cartItemQuantity:any) {

    // process quantity inputs by user and prepare cart for shopify checkout.

    if (typeof variantId === 'object') {
        var variantId = variantId[0];
    } else {
        var variantId = variantId;
    }
    
    if (cartForCheckout.includes(variantId) && cartItemQuantity == 0) {
        console.log('quantity is 0, removing variant ID');
        let indexToRemove = cartForCheckout.indexOf(variantId);
        if (indexToRemove !== -1) {
            cartForCheckout.splice(indexToRemove, 2);
        }
    } else if (cartForCheckout.includes(variantId)) {
        console.log('updated quantity');
        let indexToRemove = cartForCheckout.indexOf(variantId);
        if (indexToRemove !== -1) {
            cartForCheckout.splice(indexToRemove, 2);
            cartForCheckout.push(variantId);
            cartForCheckout.push(':' + cartItemQuantity);
        }
    } else {
        console.log('added the variant to the checkout array');
        cartForCheckout.push(variantId);
        cartForCheckout.push(':' + cartItemQuantity);
    }

    console.log(cartForCheckout);
}

function removeCartItem(cartItem:any, productId:any) {
    const cartElement = document.getElementById('cart');
    const quantityInput = cartItem.querySelector('#quantity');
    cartElement.removeChild(cartItem);

    let indexToRemove = cartForCheckout.indexOf(productId);

    if (indexToRemove !== -1) {
        cartForCheckout.splice(indexToRemove, 2);
    }

    if (cartJson.hasOwnProperty(productId)) {
        cartJson.removeItem(productId);
        console.log(cartJson);
        localStorage.removeItem("cartItemList");
        window.localStorage.setItem("cartItemList", JSON.stringify(cartJson));
    } 

    cartItemNumber();
}

// function removeCartItem(cartItem:any, productId:any) {
//     const cartElement = document.getElementById('cart');
//     cartElement.removeChild(cartItem);
//     let quantityInput = cartItem.querySelector('#quantity');
//     quantityInput.value = 0;
    
//     let indexToRemove = cartForCheckout.indexOf(productId);
//     if (indexToRemove !== -1) {
//         cartForCheckout.splice(indexToRemove, 1);
//         console.log(cart)
//     }
//     console.log(cart);
//     console.log(cartForCheckout);

//     cartItemNumber();
// }

function openProductModal(product:any) {
    const productId = product.target.parentElement.querySelector('.product-id').innerText;
    const productModalParent = document.getElementById('product-modals');
    const productModals = document.querySelectorAll('.modal');
    for (let i = 0; i < productModals.length; i++) {
        let modalId = productModals[i].id;
        productModalParent.classList.add('active-product-modal-parent');
        if (productId === modalId) {
            productModals[i].classList.add('active-product-modal');
            productModals[i].querySelector('#slider-image-box').classList.remove('hidden');
        }
    }
    
}

function closeProductModal(product:any) {
    const productModalParent = document.getElementById('product-modals');
    const productModals = document.querySelectorAll('.modal');
    if (product.target.querySelector('.modal') !== null || product.target.id == 'close-button') {
        for (let i = 0; i < productModals.length; i++) {
            productModalParent.classList.remove('active-product-modal-parent');
            productModals[i].classList.remove('active-product-modal');
        }
    } else {
        
    }
}

function cartItemNumber() {
    const cartTotal:any = document.getElementById('cart-total');
    const cartItems = document.querySelectorAll('.cart-item');
    cartTotal.value = cartItems.length;

    if (cartTotal.value == 0) {
        cartTotal.classList.add('hidden');
    } else {
        cartTotal.classList.remove('hidden');
    }
}

function getButtonLink(linkToWhere:string, onSiteLink:string, offSiteLink:string, fileLink:any) {
    switch (linkToWhere) {
      case "Onsite":
        return (onSiteLink);
      case "Offsite":
        return (offSiteLink);
      case "File":
        return (fileLink.url);
      default:
        return ('/');
    }
}

// #region Styles

const ProductList = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    column-gap: 32px;
    max-width: 1200px;
    list-style: none;
    padding: 50px 16px 50px 16px;
    margin: 0 auto;
    text-align: center;
    @media (min-width: 576px) {
        grid-template-columns: repeat(2, 1fr);
    }
`

const Cart = styled.div`
    position: fixed;
    inset: 0;
    overflow-y: scroll;
    pointer-events: none;
    opacity: 0;
    transform: scale(1.1);
    background-color: #013725;
    padding: 56px 12px 200px 12px;
    z-index: 998;
    transition: .25s;
    .cart-item {
        border: 1px solid #d6582d;
        width: 100%;
        margin-bottom: 20px;
        padding: 20px;
        .cart-item-image {
            width: 10%;
            min-width: 150px;
            height: 150px;
            object-fit: cover;
        }
        .cart-item-data {
            width: 100%;
            @media (min-width: 768px) {
                width: 90%;
                padding: 0px 20px 0 20px;
            }
        }
        .cart-item-title {
            font-family: 'prohibition', sans-serif;
            font-size: 24px;
            color: #e2dccc;
            padding: 20px 0 20px 0;
            @media (min-width: 768px) {
                padding: 0 0 20px 0;
            }
        }
        .cart-item-variant {
            font-family: 'ibm-plex-sans', sans-serif;
            font-size: 10px;
            color: #d6582d;
        }
        .cart-remove {
            font-family: 'ibm-plex-sans', sans-serif !important;
            font-size: 12px !important;
            font-weight: 700;
            text-transform: uppercase !important;
            text-decoration: underline;
            letter-spacing: 2px !important;
            color: #e2dccc !important;
            border: none;
        }
        @media (min-width: 768px) {
            display: flex;
        }
        @media (min-width: 992px) {
            display: flex;
            width: 90%;
        }
    }
    .quantity {
        max-width: 50px;
        margin: 0 10px 0 0px;
        background-color: #e2dccc;
        font-family: 'prohibition', sans-serif;
        font-weight: 700;
        text-align: center;
        padding-left: 5px;
        border-radius: 16px;
    }
    .cart-increment {
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        width: 25px;
        height: 25px;
        padding: 5px;
        border-radius: 6em;
        &:hover {
            background-color: #d6582d;
            cursor: pointer;
            transition: 0.25s;
        }
    }
    .cart-decrement {
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        width: 25px;
        height: 25px;
        padding: 5px;
        border-radius: 6em;
        &:hover {
            background-color: #d6582d;
            cursor: pointer;
            transition: 0.25s;
        }
    }
    @media (min-width: 768px) {
        padding: 56px 56px 200px 56px;
    }
`

const CartToggle = styled.div`
    position: fixed;
    bottom: 120px;
    right: 12px;
    background-color: #013725;
    border: 1px solid #d6582d;
    padding: 20px;
    z-index: 999;
    transition: 0.25s;
    &:hover {
        background-color: #d6582d;
        border: 1px solid #d6582d;
        cursor: pointer;
        transition: 0.25s;
    }
    svg {
        width: 32px;
        height: 32px;
        @media (min-width: 768px) {
            width: 40px;
            height: 40px;
        }
    }
    .cart-total {
        position: absolute;
        top: 8px;
        right: 8px;
        font-family: 'prohibition', sans-serif;
        background-color: #ffffff;
        border: 1px solid #aaaaaa;
        width: 25px;
        border-radius: 6em;
        text-align: center;
        ::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        ::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        @media (min-width: 768px) {
            top: 15px;
            right: 15px;
        }
    }
    @media (min-width: 768px) {
        bottom: 56px;
        right: 56px;
    }
`

const CartOff = styled.div`
    position: fixed;
    top: 56px;
    right: 56px;
    z-index: 999;
    svg {
        display: none;
        background-color: #D6582D;
        margin: auto;
        fill: #e2dccc;
        @media (min-width: 768px) {
            display: block;
            width: 40px;
            height: 40px;
        }
    }
    &:hover {
        cursor: pointer;
    }
`

const CheckoutButton = styled.button`
    position: fixed;
    width: 100%;
    font-size: 32px;
    bottom: 0px;
    left: 0px;
    z-index: 999;
    @media (min-width: 768px) {
        width: auto;
        bottom: 56px;
        left: 56px;
    }
`

const ProductSingle = styled.li`
    padding: 0 0 50px 0;
    .product-image {
        width: 100%;
        height: 350px;
        object-fit: contain;
        object-position: center;
        margin: 0 auto;
        @media (min-width: 416px) {
            height: 350px;
        }
        @media (min-width: 768px) {
            height: 350px;
        }
    }
    .product-title {
        font-size: 24px;
        font-weight: 400;
        padding: 20px 0 20px 0;
    }
    .product-price {
        padding: 0 0 40px 0;
    }
`
const Content = styled.div`
    max-width: 1440px;
    padding: 100px 16px 0 16px;
    margin: 0 auto;
    text-align: center;
    h2 {
        font-size: 32px;
        color: #013725;
        font-style: italic;
        padding: 0 0 10px 0;
        @media (min-width: 768px) {
            font-size: 48px;
        }
    }
    p {
        font-size: 16px;
        color: #013725;
        padding: 0 0 40px 0;
        @media (min-width: 768px) {
            font-size: 20px;
        }
    }
`

const ProductModals = styled.div`
    opacity: 0;
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    transition: 0.25s;
    .modal {
        transform: translate(-50%, -500%);
        pointer-events: none;
        position: fixed;
        top: 50%;
        left: 50%;
        background-color: #fff;
        padding: 20px;
        width: 80%;
        max-width: 1000px;
        max-height: 80%;
        overflow-y: scroll;
        border-radius: 5px;
        text-align: center;
        z-index: 2;
        transition: 0.25s;
        .close-button {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 32px;
            height: 32px;
            transition: 0.25s;
            &:hover {
                cursor: pointer;
                transform: scale(1.1);
                transition: 0.25s;
            }
            path {
                pointer-events: none;
            }
        }
        .splide {
            width: 100%;
            .splide__pagination {
                bottom: -8px !important;
            }
            @media (min-width: 768px) {
                width: 50%;
            }
        }
        .img-box {
            width: 100%;
            margin-bottom: 30px;
            img {
                max-height: 300px;
                margin: 0 auto;
                @media (min-width: 768px) {
                    max-height: 400px;
                }
            }
            @media (min-width: 768px) {
                width: 50%;
            }
        }
        .content-box {
            width: 100%;
            text-align: left;
            padding: 8px;
            .product-title {
                font-family: 'prohibition', sans-serif;
                color: #013725;
                font-size: 24px;
                @media (min-width: 768px) {
                    font-size: 32px;
                }
            }
            .product-price {
                font-family: 'ibm-plex-sans', sans-serif !important;
                font-weight: 200;
                padding: 20px 0 20px 0;
            }
            .add-to-cart {
                margin-bottom: 40px;
            }
            .product-description {
                font-family: 'ibm-plex-sans', sans-serif !important;
                font-weight: 200;
                font-size: 14px;
            }
            .option-name {
                font-family: prohibition,sans-serif;
                color: #013725;
                font-style: italic;
                line-height: 1.1;
                font-size: 14px;
                padding: 8px 0 8px 0;
            }
            select {
                width: 100%;
                border-color: #b4a47b;
                border-width: 1px;
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
                padding-left: 0.75rem;
                padding-right: 0.75rem;
                background-color: #ebe7dc;
                margin-bottom: 20px;
            }
            @media (min-width: 768px) {
                width: 50%;
                padding: 25px;
            }
        }
        @media (min-width: 768px) {
            display: flex;
        }
    }
    .slide-single-img {
        position: relative;
        height: 300px;
        @media (min-width: 768px) {
            height: 400px;
        }
    }
    .single-img {
        position: relative;
        height: 300px;
        @media (min-width: 768px) {
            height: 400px;
        }
    }
`

// #endregion

export default function Shop({ pageData, activeProducts }:any) {
    
    useEffect(() => {
        function disableAddToCart() {
            const allProducts = document.querySelectorAll('.product');
            for (let i = 0; i < allProducts.length; i++) {
                const thisProductsVariants = allProducts[i].querySelectorAll('.variant');
                for (let i2 = 0; i2 < thisProductsVariants.length; i2++) {
                    if (thisProductsVariants[i2].classList.contains('out-of-stock')) {
                        thisProductsVariants[i2].parentElement.parentElement.classList.add('hidden');
                    } else {
                        thisProductsVariants[i2].parentElement.parentElement.classList.remove('hidden');
                    }
                };
            };  
        };
          
        disableAddToCart();

        function cartLocalHostSettings() {
            let localStorageCart = window.localStorage.getItem("cartItemList");
            if (localStorageCart !== null) {
                let parsedStorageCart = JSON.parse(localStorageCart);
                pushLocalStorageToCart(parsedStorageCart);
            } else {
                console.log('local empty');
            }
        
            cartItemNumber();
        }

        cartLocalHostSettings();

        function categoryFiltering() {
            const params = new URLSearchParams(window.location.search);
            const categoryUrlParam = params.get('category');
            const allProducts = document.querySelectorAll('.product');
            const shopPageTitle = document.getElementById('shop-page-title');

            if (categoryUrlParam) {
                for (let i = 0; i < allProducts.length; i++) {
                    allProducts[i].classList.add('hidden');
                    let productTypeElement:any = allProducts[i].querySelector('.product-type');
                    let productType = productTypeElement.innerText;
                    if (categoryUrlParam == 'turkey-calls' && productType === "Turkey Call") {
                        allProducts[i].classList.remove('hidden');
                        shopPageTitle.innerText = "Turkey Calls"
                    } else if (categoryUrlParam == 'apparel' && (productType === "Shirts" || productType === "Hats" || productType === "Apparel & Accessories" || productType === "Apparel" || productType === "Hat" || productType === "Shirts & Tops")) {
                        allProducts[i].classList.remove('hidden');
                        shopPageTitle.innerText = "Apparel"
                    } else if (categoryUrlParam == 'specialty-choke' && productType === "Specialty Choke") {
                        allProducts[i].classList.remove('hidden');
                        shopPageTitle.innerText = "Specialty Chokes"
                    } else if (categoryUrlParam == 'accessories' && (productType === "Apparel & Accessories" || productType === "Accessories")) {
                        allProducts[i].classList.remove('hidden');
                        shopPageTitle.innerText = "Accessories"
                    } else {
                       
                    }
                };
            }
        }
        
        categoryFiltering();

    }, []);
    

    var optionsUsed:any = [];

    
    return (
        <>
            <div dangerouslySetInnerHTML={{__html: pageData.yoast_head[0]}}>

            </div>
            <Cart id="cart" >
                
            </Cart>
            <CartToggle id="cart-toggle" onClick={carttoggle}>
                <svg fill="#e2dccc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M24 0H0V48H24 76.1l60.3 316.5 3.7 19.5H160 488h24V336H488 179.9l-9.1-48H496L576 32H122l-2.4-12.5L115.9 0H96 24zM176 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm336-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/></svg>
                <input type="number" id="cart-total" className="cart-total hidden" value="0" disabled></input>
            </CartToggle>
            <CartOff id="cart-off" className="hidden" onClick={carttoggle}>
                <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
            </CartOff>
            <CheckoutButton id="checkout-button" className="filled-button hidden" onClick={handleCheckout}>CHECKOUT</CheckoutButton>
            <Content>
                <h2 id="shop-page-title">Shop</h2>
            </Content>
            <ProductList>
                {activeProducts.map((product:any, index:any) => (
                    <ProductSingle key={index} className="product">
                    <div className="product-id hidden">{product.item.id}</div>
                    <div className="product-type hidden">{product.item.product_type}</div>
                    <img className="product-image" src={product.item.image.src} alt={product.item.image.alt} />
                    <h2 className="product-title">{product.item.title}</h2>
                    <h6 className="product-price">${product.item.variants[0].price}</h6>
                    <a href={`/shop/${product.item.handle}`} className="filled-button">View Product</a>
                    </ProductSingle>
                ))}
            </ProductList>
            {/* <ProductModals id="product-modals" onClick={closeProductModal}>
                    {activeProducts.map((product:any, index:any) => {
                        if (product.item.images.length !== 1) {
                            return (
                            <div key={index} id={product.item.id} className="modal">
                                <svg id="close-button" className="close-button" onClick={closeProductModal} fill="#013725" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M345 137l17-17L328 86.1l-17 17-119 119L73 103l-17-17L22.1 120l17 17 119 119L39 375l-17 17L56 425.9l17-17 119-119L311 409l17 17L361.9 392l-17-17-119-119L345 137z"/></svg>
                                    <Splide hasTrack={ false }
                                    options={ 
                                        {
                                            type: 'slide',
                                            perPage: 1,
                                            arrows: false
                                        } 
                                    }
                                        id="slider-image-box"
                                        className="hidden"
                                    >
                                        <SplideTrack>
                                            {product.item.images.map((item:any, index:any) => {
                                                return (
                                                    <SplideSlide key={index} className="slide-single-img splide__slide">
                                                        {product.id}<Image src={item.src} alt={item.alt} fill style={{ objectFit: 'contain' }} />
                                                    </SplideSlide>
                                                );
                                            })}
                                        </SplideTrack>
                                    </Splide>
                                <div className="content-box">
                                    <div id="productId" className="hidden">{product.item.id}</div>
                                    <h4 id="productTitle" className="product-title">{product.item.title}</h4>
                                    <h6 className="product-price">${product.item.variants[0].price}</h6>
                                    <img id="productImg" className="hidden" src={product.item.image.src} alt={product.item.image.alt} />
                                    {product.item.options.map((option:any, index:any) => {
                                        if (product.item.variants.length !== 1) {
                                            return (
                                                <div key={index}>
                                                    <h5 className="option-name">{option.name}</h5>
                                                    <select id={'option' + index}>
                                                        {option.values.map((value:any, index:any) => {
                                                            if (index === 0) {
                                                                return (
                                                                    <option defaultValue value={value} key={index}>{value}</option>
                                                                );
                                                            } else {
                                                                return (
                                                                    <option value={value} key={index}>{value}</option>
                                                                );
                                                            }
                                                        })}
                                                    </select>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={index}>
                                                    <h5 className="option-name" className="hidden">{option.name}</h5>
                                                    <select id={'option' + index} className="hidden">
                                                        {option.values.map((value:any, index:any) => {
                                                            if (index === 0) {
                                                                return (
                                                                    <option defaultValue value={value} key={index}>{value}</option>
                                                                );
                                                            } else {
                                                                return (
                                                                    <option value={value} key={index}>{value}</option>
                                                                );
                                                            }
                                                        })}
                                                    </select>
                                                </div>
                                            )
                                        }
                                    })}
                                    <br />
                                    <button onClick={addToCartv2} className="filled-button add-to-cart">Add to Cart</button>
                                    <div className="product-description" dangerouslySetInnerHTML={{__html: product.item.body_html }}></div>
                                </div>
                            </div>
                            )
                        } else {
                            return (
                            <div key={index} id={product.item.id} className="modal">
                                <svg id="close-button" className="close-button" onClick={closeProductModal} fill="#013725" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M345 137l17-17L328 86.1l-17 17-119 119L73 103l-17-17L22.1 120l17 17 119 119L39 375l-17 17L56 425.9l17-17 119-119L311 409l17 17L361.9 392l-17-17-119-119L345 137z"/></svg>
                                <div className="img-box">
                                    <img src={product.item.image.src} alt={product.item.image.alt} />
                                </div>
                                <div className="content-box">
                                    <div id="productId" className="hidden">{product.item.id}</div>
                                    <h4 id="productTitle" className="product-title">{product.item.title}</h4>
                                    <h6 className="product-price">${product.item.variants[0].price}</h6>
                                    <img id="productImg" className="hidden" src={product.item.image.src} alt={product.item.image.alt} />
                                    {product.item.options.map((option:any, index:any) => {
                                    if (product.item.variants.length !== 1) {
                                        return (
                                            <div key={index}>
                                            <h5 className="option-name">{option.name}</h5>
                                            <select id={'option' + index}>
                                                {option.values.map((value:any, index:any) => {
                                                    if (index === 0) {
                                                        return (
                                                            <option defaultValue value={value} key={index}>{value}</option>
                                                        );
                                                    } else {
                                                        return (
                                                            <option value={value} key={index}>{value}</option>
                                                        );
                                                    }
                                                })}
                                            </select>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={index}>
                                            <h5 className="option-name" className="hidden">{option.name}</h5>
                                            <select id={'option' + index} className="hidden">
                                                {option.values.map((value:any, index:any) => {
                                                    if (index === 0) {
                                                        return (
                                                            <option defaultValue value={value} key={index}>{value}</option>
                                                        );
                                                    } else {
                                                        return (
                                                            <option value={value} key={index}>{value}</option>
                                                        );
                                                    }
                                                })}
                                            </select>
                                            </div>
                                        )
                                    }
                                    })}
                                    <button onClick={addToCartv2} className="filled-button add-to-cart">Add to Cart</button>
                                    <div className="product-description" dangerouslySetInnerHTML={{__html: product.item.body_html }}></div>
                                </div>
                            </div>
                            )
                        }           

                })}
            </ProductModals> */}

            <div id="variant-table" className="hidden">
            {activeProducts.map((product:any, index:any) => {
                return (
                    <div key={index}>
                        {product.item.variants.map((variant:any, index:any) => {
                            return (
                                <div id={product.item.id + (variant.option1 !== null ? variant.option1 : '') + (variant.option2 !== null ? variant.option2 : '') + (variant.option3 !== null ? variant.option3 : '')} className="variant-table-item" key={index}>{variant.id}</div>
                            )
                        })}
                    </div>
                );
            })}
            </div>
            </>
    );
}