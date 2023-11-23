// Получаем все элементы с классом "target"
const targets = document.querySelectorAll('.target');
const workspace = document.querySelector('#workspace');

let previousPositionX, previousPositionY, currentX, currentY, currentWidth, currentHeight, div;
let isFollowingMod = false;
let lastTapTime = 0;
let initialDistance, currentScale;

// Обработчик события перемещения мыши или пальца для перемещения элемента даже после отпускания кнопки мыши или пальца
const move = (e) => {
  // Вычисляем новые координаты элемента
  let x, y;
  if (e.type === 'mousemove') {
    x = e.clientX - currentX;
    y = e.clientY - currentY;
  } else if (e.type === 'touchmove') {
    x = e.touches[0].clientX - currentX;
    y = e.touches[0].clientY - currentY;
  }

  // Перемещаем элемент
  div.style.left = x + 'px';
  div.style.top = y + 'px';
};

// Перебираем каждый элемент и добавляем обработчики событий
targets.forEach((target) => {
  let intervalId = null;

  target.addEventListener('mousedown', e => {
    div = e.target;
    currentX = e.offsetX;
    currentY = e.offsetY;
    previousPositionX = div.offsetLeft;
    previousPositionY = div.offsetTop;

    // Обработчик события перемещения мыши
    workspace.addEventListener('mousemove', move);
    document.addEventListener('keyup', escapeFunc);
  });

  target.addEventListener('mouseup', () => {
    clearInterval(intervalId);
    workspace.removeEventListener('mousemove', move);
    document.removeEventListener('keyup', escapeFunc);
  });

  target.addEventListener('touchstart', (e) => {
    div = e.target;

    const currentTime = new Date().getTime();
    const tapTime = currentTime - lastTapTime;
    // Если время между нажатиями меньше 300 миллисекунд, то считаем это двойным нажатием
    if (tapTime < 300) {
      if (isFollowingMod) {
        isFollowingMod = false;
        workspace.removeEventListener('touchmove', move);
        return;
      } else {
        isFollowingMod = true;
      }
    }

    // Обновляем время последнего нажатия
    lastTapTime = currentTime;

    currentX = e.touches[0].clientX - div.getBoundingClientRect().left;
    currentY = e.touches[0].clientY - div.getBoundingClientRect().top;
    previousPositionX = div.offsetLeft;
    previousPositionY = div.offsetTop;
    currentWidth = div.offsetWidth;
    currentHeight = div.offsetHeight;

    workspace.addEventListener('touchmove', move);
  });

  document.addEventListener('touchend', (e) => {
    if (e.touches.length === 1) {
      div.style.left = previousPositionX + 'px';
      div.style.top = previousPositionY + 'px';
      isFollowingMod = false;
      workspace.removeEventListener('touchmove', move);
    }
    if (!isFollowingMod) {
      workspace.removeEventListener('touchmove', move);
    }
  });

  // Обработчик события двойного клика
  target.addEventListener('dblclick', () => {
    // Функция для генерации случайного цвета
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    // Функция для изменения цвета элемента
    const changeColor = () => {
      target.style.backgroundColor = getRandomColor();
    };

    // Изменяем цвет элемента каждые 500 миллисекунд
    intervalId = setInterval(changeColor, 500);

    // Добавляем обработчики событий перемещения мыши и отпускания кнопки мыши на уровне документа
    workspace.addEventListener('mousemove', move);
    document.addEventListener('keyup', escapeFunc);
  }
  );
});

function escapeFunc(e) {
  if (e.key === 'Escape') {
    div.style.left = `${previousPositionX}px`;
    div.style.top = `${previousPositionY}px`;
    console.log(previousPositionY);
    workspace.removeEventListener('mousemove', move);
  }
};