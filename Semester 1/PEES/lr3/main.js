const shirts = [{
  "name": "Beep Boop",
  "description": "Once upon a time, a mighty guide guarded the intersection of Forbes and Morewood, and would dutifully direct distracted college students when it was safe to cross the street. Its voice was soothing, strong, and steady. Its name was beep boop.",
  "price": "$19.99",
  "colors": {
    "white": {
      "front": "shirt_images/beepboop-white-front.png",
      "back": "shirt_images/beepboop-white-back.png"
    },
    "blue": {
      "front": "shirt_images/beepboop-blue-front.png",
      "back": "shirt_images/beepboop-blue-back.png"
    },
    "pink": {
      "front": "shirt_images/beepboop-pink-front.png",
      "back": "shirt_images/beepboop-pink-back.png"
    },
    "red": {
      "front": "shirt_images/beepboop-red-front.png",
      "back": "shirt_images/beepboop-red-back.png"
    }
  },
  "default": {
    "front": "shirt_images/default-m-front.png",
    "back": "shirt_images/default-m-back.png"
  }
},
{
  "name": "Car",
  "description": "As you move in to campus, one of the first memories so many students have is driving up to their dorm, unloading their bags, and moving in. How do they arrive to campus? By car, of course!",
  "price": "$10.99",
  "colors": {
    "white": {
      "front": "shirt_images/car-white-front.png",
      "back": "shirt_images/car-white-back.png"
    },
    "blue": {
      "front": "shirt_images/car-blue-front.png",
      "back": "shirt_images/car-blue-back.png"
    },
    "green": {
      "front": "shirt_images/car-green-front.png",
      "back": "shirt_images/car-green-back.png"
    },
    "yellow": {
      "front": "shirt_images/car-yellow-front.png",
      "back": "shirt_images/car-yellow-back.png"
    },
    "red": {
      "front": "shirt_images/car-red-front.png",
      "back": "shirt_images/car-red-back.png"
    }
  },
  "default": {
    "front": "shirt_images/default-w-front.png",
    "back": "shirt_images/default-w-back.png"
  }
},
{
  "name": "Forever Plaid",
  "price": "$13.99",
  "description": "Proudly wear your tartan plaid as a patch on your front shirt pocket. And on the back, ask the important question that all CMU students should know the answer to: got plaid?",
  "colors": {
    "white": {
      "front": "shirt_images/plaid-white-front.png",
      "back": "shirt_images/plaid-white-back.png"
    },
    "pink": {
      "front": "shirt_images/plaid-pink-front.png",
      "back": "shirt_images/plaid-pink-back.png"
    }
  },
  "default": {
    "front": "shirt_images/default-w-front.png",
    "back": "shirt_images/default-w-back.png"
  }
},
{
  "name": "BSUIR",
  "description": "BSUIR mission is to train engineers and scientists capable of generating and implementing innovative ideas, creating competitive high technology products in the spheres of computer science and electronics.",
  "price": "$6.99",
  "colors": {
    "white": {
      "front": "shirt_images/bsuir-white-front.png",
      "back": "shirt_images/bsuir-white-back.png"
    }
  },
  "default": {
    "front": "shirt_images/default-m-front.png",
    "back": "shirt_images/default-m-back.png"
  }
}];

const container = document.getElementById('shirts-container');

shirts.forEach((shirt) => {
  const shirtElement = document.createElement('div');
  shirtElement.classList.add('shirt');

  const imageElement = document.createElement('img');
  const nameElement = document.createElement('h2');
  const descriptionElement = document.createElement('p');

  nameElement.textContent = shirt.name;
  if (Object.keys(shirt.colors).length > 1)
  descriptionElement.textContent = `Available in ${Object.keys(shirt.colors).length} colors`;
else descriptionElement.textContent = `Available in ${Object.keys(shirt.colors).length} color`;

  if (shirt.colors) {
    const firstColor = Object.keys(shirt.colors)[0];
    const frontImage = shirt.colors[firstColor].front;
    imageElement.src = frontImage;
  } else {
    imageElement.src = shirt.default.front;
  }

  shirtElement.appendChild(imageElement);
  shirtElement.appendChild(nameElement);
  shirtElement.appendChild(descriptionElement);

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('shirt-buttons');

  const quickViewButton = document.createElement('button');
  quickViewButton.textContent = 'Quick View';

  quickViewButton.addEventListener('click', function() {
    const shirtName = shirt.name;
    const shirtPrice = shirt.price;
    const frontImage = imageElement.src;
    const firstColor = Object.keys(shirt.colors)[0];
    const backImage = shirt.colors[firstColor].back;
  
    openModal(shirtName, shirtPrice, frontImage, backImage);
  });  

  const seePageButton = document.createElement('button');
  seePageButton.textContent = 'See Page';

  seePageButton.addEventListener('click', function() {
    const shirtName = shirt.name;
    const shirtPrice = shirt.price;
    const shirtDescription = shirt.description;
    const frontImage = imageElement.src;
    const firstColor = Object.keys(shirt.colors)[0];
    const backImage = shirt.colors[firstColor].back;
  
    // Создаем массив цветов и названий картинок майки
    const colors = Object.keys(shirt.colors);
    const frontImages = colors.map(color => shirt.colors[color].front);
    const backImages = colors.map(color => shirt.colors[color].back);
  
    const urlParams = new URLSearchParams();
    urlParams.append('name', shirtName);
    urlParams.append('description', shirtDescription);
    urlParams.append('price', shirtPrice);
    urlParams.append('frontImage', frontImage);
    urlParams.append('backImage', backImage);
  
    colors.forEach((color, index) => {
      urlParams.append(`color${index}`, color);
      urlParams.append(`frontImage${index}`, frontImages[index]);
      urlParams.append(`backImage${index}`, backImages[index]);
    });
  
    window.location.href = 'details.html?' + urlParams.toString();
  });  

  buttonsContainer.appendChild(quickViewButton);
  buttonsContainer.appendChild(seePageButton);

  shirtElement.appendChild(buttonsContainer);

  container.appendChild(shirtElement);
});

const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');

function openModal(name, price, frontImage, backImage) {
  const modalFrontImage = document.getElementById('modal-front-image');
  const modalBackImage = document.getElementById('modal-back-image');
  const modalName = document.getElementById('modal-name');
  const modalPrice = document.getElementById('modal-price');

  modalFrontImage.src = frontImage;
  modalBackImage.src = backImage;
  modalName.textContent = name;
  modalPrice.textContent = price;

  modal.style.display = 'block'; // Отображаем модальное окно
}

function closeModal() {
  modal.style.display = 'none';
}

modalClose.addEventListener('click', closeModal);