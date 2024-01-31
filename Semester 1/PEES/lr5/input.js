const targets = document.querySelectorAll('.target');
const workspace = document.querySelector('#workspace');

let previousPositionX, previousPositionY, currentX, currentY;
let div;

// Обработчик события перемещения мыши 
const move = (e) => {
  // Вычисление новых координат элемента
  const x = e.clientX - currentX;
  const y = e.clientY - currentY;
  
  // Перемещаем элемент
  div.style.left = x + 'px';
  div.style.top = y + 'px';
};

// Перебор элементов, добавление обработчиков событий
targets.forEach(target => {
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

  // Обработчик события двойного клика
  target.addEventListener('dblclick', () => {
      
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

      // Изменяем цвет элемента
      intervalId = setInterval(changeColor, 500);

      // Добавляем обработчики событий перемещения мыши и отпускания кнопки мыши
      workspace.addEventListener('mousemove', move);
      document.addEventListener('keydown', escapeFunc);
    }
  );
});

function escapeFunc(e) {
  if (e.key === 'Escape') {
    // clearInterval(intervalId);
    div.style.left = `${previousPositionX}px`;
    div.style.top = `${previousPositionY}px`;
    workspace.removeEventListener('mousemove', move);
    
  }
};