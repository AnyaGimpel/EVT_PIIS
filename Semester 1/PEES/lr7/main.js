const svg = document.getElementById('svg'); // Создание переменной svg и присвоение ей элемента с идентификатором 'svg' из документа
const shapesContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g'); // Создание элемента g с пространством имен 'http://www.w3.org/2000/svg' и присвоение его переменной shapesContainer
svg.appendChild(shapesContainer); // Добавление элемента shapesContainer внутрь элемента svg

svg.addEventListener('mousedown', handleMouseDown);
svg.addEventListener('mousemove', handleMouseMove);
svg.addEventListener('mouseup', handleMouseUp);

let isDrawing = false;
let startX, startY;
let currentShape = null;
let selectedShape = 'circle';

// Обработчик события mousedown
function handleMouseDown(event) {
    if (isDrawing) return;

    isDrawing = true;
    // Запоминаем начальные координаты мыши
    startX = event.offsetX;
    startY = event.offsetY;

    // Если выбрана фигура 'circle', то создаем круг с радиусом 0 и присваиваем его переменной currentShape
    if (selectedShape === 'circle') {
        const radius = 0;
        currentShape = drawCircle(startX, startY, radius);
    } 
    // Если выбрана фигура 'square', то создаем прямоугольник с шириной и высотой равными 1 и присваиваем его переменной currentShape
    else if (selectedShape === 'square') {
        currentShape = drawRectangle(startX, startY, 1, 1);
    }
}

// Обработчик события mousemove
function handleMouseMove(event) {
    if (!isDrawing) return;

    // Получаем текущие координаты мыши
    const { offsetX, offsetY } = event;
    // Вычисляем ширину и высоту фигуры
    const width = offsetX - startX;
    const height = offsetY - startY;

    // Если выбрана фигура 'circle', то обновляем координаты и радиус круга
    if (selectedShape === 'circle') {
        const radius = Math.sqrt(width ** 2 + height ** 2);
        updateCircle(currentShape, startX, startY, radius);
    } 
    // Если выбрана фигура 'square', то обновляем координаты и размеры прямоугольника
    else if (selectedShape === 'square') {
        updateRectangle(currentShape, Math.min(startX, offsetX), Math.min(startY, offsetY), Math.abs(width), Math.abs(height));
    }
}

// Обработчик события mouseup
function handleMouseUp(event) {
    if (!isDrawing) return;

    isDrawing = false;

    // Получаем текущие координаты мыши
    const { offsetX, offsetY } = event;
    // Вычисляем ширину и высоту фигуры
    const width = offsetX - startX;
    const height = offsetY - startY;

    // Если выбрана фигура 'circle', то обновляем координаты и радиус круга
    if (selectedShape === 'circle') {
        const radius = Math.sqrt(width ** 2 + height ** 2);
        updateCircle(currentShape, startX, startY, radius);
    } 
    // Если выбрана фигура 'square', то обновляем координаты и размеры прямоугольника
    else if (selectedShape === 'square') {
        updateRectangle(currentShape, Math.min(startX, offsetX), Math.min(startY, offsetY), Math.abs(width), Math.abs(height));
    }

    currentShape = null;
}

// Функция для создания круга и добавления его в контейнер shapesContainer
function drawCircle(cx, cy, radius) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); // Создает новый элемент <circle> в пространстве имен SVG и присваивает его переменной circle
    circle.setAttribute('cx', cx); // Устанавливает координату центра по оси X
    circle.setAttribute('cy', cy); // Устанавливает координату центра по оси Y
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', 'none'); 
    circle.setAttribute('stroke', 'black'); 
    circle.setAttribute('stroke-width', '3'); 
    shapesContainer.appendChild(circle); // Добавляет элемент <circle> внутрь контейнера shapesContainer
    return circle;
}

// Функция для обновления координат и радиуса круга
function updateCircle(circle, cx, cy, radius) {
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', radius);
}

// Функция для создания прямоугольника и добавления его в контейнер shapesContainer
function drawRectangle(x, y, width, height) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    rect.setAttribute('fill', 'none');
    rect.setAttribute('stroke', 'black');
    rect.setAttribute('stroke-width', '3');
    shapesContainer.appendChild(rect);
    return rect;
}

// Функция для обновления координат и размеров прямоугольника
function updateRectangle(rect, x, y, width, height) {
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
}

// Функция для очистки холста
function clearCanvas() {
    shapesContainer.innerHTML = '';
}

// Добавление слушателей событий change на все элементы input с атрибутом name="shape"
document.querySelectorAll('input[name="shape"]').forEach((radio) => {
    radio.addEventListener('change', (event) => {
        selectedShape = event.target.value;
    });
});
