document.addEventListener("DOMContentLoaded", function() {
    var svg = document.getElementById('svg');
    var button = document.getElementById('removeButton');
    var rect;

    
    createMiddleLine();
    createRandomSquare();
    button.addEventListener('click', removeAllCircles);
    svg.addEventListener('click', createCircleOnClick);

    // Функция для генерации случайного числа в заданном диапазоне
    function getRandomNumber(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    // Функция для создания квадрата в определенной части svg
    function createRandomSquare() {

      var x = getRandomNumber(550, 1000);
      var y = getRandomNumber(0, 600);
  
      rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", x);
      rect.setAttribute("y", y);
      rect.setAttribute("width", 100);
      rect.setAttribute("height", 100);
      rect.setAttribute("fill", "blue");
      svg.appendChild(rect);
    }

    // Функция для создания вертикальной разделительной линии
    function createMiddleLine() {
        var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", 550);
        line.setAttribute("y1", 0);
        line.setAttribute("x2", 550);
        line.setAttribute("y2", 700);
        line.setAttribute("stroke", "black");
        svg.appendChild(line);
    }

    // Функция для создания круга по клику
    function createCircleOnClick(event) {
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); // Создает новый элемент <circle> в пространстве имен SVG и присваивает его переменной circle
        var x = event.clientX - svg.getBoundingClientRect().left;
        var y = event.clientY - svg.getBoundingClientRect().top;
        if (x <= 540){
            circle.setAttribute('cx', x); // Устанавливает координату центра по оси X
            circle.setAttribute('cy', y); // Устанавливает координату центра по оси Y
            circle.setAttribute('r', 10);
            circle.setAttribute('fill', 'red'); 
            circle.setAttribute('stroke', 'none'); 
            circle.setAttribute('stroke-width', '3'); 
            svg.appendChild(circle);
            createDuplCircle(x, y)
        }
    }

    // Функция для дублирования круга симметрично
    function createDuplCircle(x, y) {
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        x1 = x + (550 - x) * 2;
        y1 = y + (350 - y) * 2;
        circle.setAttribute('cx', x1); // Устанавливает координату центра по оси X
        circle.setAttribute('cy', y1); // Устанавливает координату центра по оси Y
        circle.setAttribute('r', 10);
        circle.setAttribute('fill', 'red'); 
        circle.setAttribute('stroke', 'none'); 
        circle.setAttribute('stroke-width', '3'); 
        svg.appendChild(circle);

        isFinishGame(x1, y1);

    }

    // Функция для проверки, победил ли пользователь
    function isFinishGame(x1, y1){
        var rx = parseInt(rect.getAttribute('x')); // Получаем координаты квадрата и преобразуем их в числовой тип
        var ry = parseInt(rect.getAttribute('y'));

        if(x1 > rx && x1 < rx + 100 && y1 > ry && y1 < ry + 100){
            rect.setAttribute('fill', 'yellow');
            setTimeout(function() {
                alert("Ура! Вы победили!");
            }, 500);
            
            setTimeout(function() {
                removeAllCircles();
                rect.parentNode.removeChild(rect);
                createRandomSquare();
              }, 500);
            
        }
        
    }

    // Функция для удаления с поля всех кругов
    function removeAllCircles() {
        var circles = document.getElementsByTagName('circle');
        for (var i = circles.length - 1; i >= 0; i--) {
          circles[i].parentNode.removeChild(circles[i]);
        }
    }
    
  });