const urlParams = new URLSearchParams(window.location.search);
const shirtName = urlParams.get('name');
const shirtDescription = urlParams.get('description');
const shirtPrice = urlParams.get('price');
const frontImage1 = urlParams.get('frontImage');
const backImage1 = urlParams.get('backImage');

const shirtNameElement = document.getElementById('shirt-name');
shirtNameElement.textContent = shirtName;

const shirtImageElement = document.getElementById('shirt-image');
shirtImageElement.src = frontImage1;

const shirtPriceElement = document.getElementById('shirt-price');
shirtPriceElement.textContent = shirtPrice;

const shirtDescriptionElement = document.getElementById('shirt-description');
shirtDescriptionElement.textContent = 'Description: ' + shirtDescription;

let isFrontSide = true;
let currentColor = null;

const colorsCount = (urlParams.toString().match(/color\d+/g) || []).length;

const colorButtonsContainer = document.getElementById('color-buttons-container');

for (let i = 0; i < colorsCount; i++) {
    const color = urlParams.get(`color${i}`);
    const frontImage = urlParams.get(`frontImage${i}`);
    const backImage = urlParams.get(`backImage${i}`);

    const colorButton = document.createElement('button');
    colorButton.textContent = color;
    colorButton.classList.add('color-button');

    colorButton.style.setProperty('--button-color', color);

    colorButton.addEventListener('click', function () {
        currentColor = i;
        if (isFrontSide) {
            shirtImageElement.src = frontImage;
        } else {
            shirtImageElement.src = backImage;
        }
    });

    colorButtonsContainer.appendChild(colorButton);

    const frontButton = document.getElementById('front-button');
    const backButton = document.getElementById('back-button');

    frontButton.addEventListener('click', function () {
        if (currentColor) {
            shirtImageElement.src = urlParams.get(`frontImage${currentColor}`);
        }
        else {
            shirtImageElement.src = frontImage1;
        }
    });

    backButton.addEventListener('click', function () {
        if (currentColor) {
            shirtImageElement.src = urlParams.get(`backImage${currentColor}`);
        }
        else {
            shirtImageElement.src = backImage1;
        }
    });
}

function goBack() {
    window.history.back();
}