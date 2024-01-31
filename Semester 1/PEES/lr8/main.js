const canvas = document.getElementById('canvas'); // Получаем элемент canvas из DOM
const ctx = canvas.getContext('2d'); 
let isDrawing = false;
let startX, startY;
let shapes = [];
let selectedShape = 'circle';

canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);

// Функция обработки события нажатия кнопки мыши
function handleMouseDown(event) {
    if (isDrawing) return;

    isDrawing = true;
    // Запоминаем начальные координаты рисования
    startX = event.offsetX;
    startY = event.offsetY;
}

// Функция обработки события перемещения мыши
function handleMouseMove(event) {
    if (!isDrawing) return;

    // Получаем текущие координаты мыши
    const { offsetX, offsetY } = event;
    // Вычисляем ширину и высоту фигуры
    const width = offsetX - startX;
    const height = offsetY - startY;

    // Очищаем canvas
    redrawCanvas();

    // Рисуем выбранную фигуру в зависимости от значения selectedShape
    if (selectedShape === 'circle') {
        // Вычисляем радиус круга
        const radius = Math.sqrt(width ** 2 + height ** 2);
        drawCircle(startX, startY, radius);
    } else if (selectedShape === 'square') {
        drawRectangle(Math.min(startX, offsetX), Math.min(startY, offsetY), Math.abs(width), Math.abs(height));
    }
}

// Функция обработки события отпускания кнопки мыши
function handleMouseUp(event) {
    if (!isDrawing) return;

    isDrawing = false;

    // Получаем текущие координаты мыши
    const { offsetX, offsetY } = event;
    // Вычисляем ширину и высоту фигуры
    const width = offsetX - startX;
    const height = offsetY - startY;

    // Добавляем фигуру в массив shapes в зависимости от значения selectedShape
    if (selectedShape === 'circle') {
        // Вычисляем радиус круга
        const radius = Math.sqrt(width ** 2 + height ** 2);
        // Добавляем круг в массив shapes
        addCircle(startX, startY, radius);
    } else if (selectedShape === 'square') {
        // Добавляем прямоугольник в массив shapes
        addRectangle(Math.min(startX, offsetX), Math.min(startY, offsetY), Math.abs(width), Math.abs(height));
    }
}

// Функция рисования круга
function drawCircle(cx, cy, radius) {
    ctx.beginPath(); // Начинаем новый путь
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI); // Рисуем окружность
    ctx.stroke(); // Рисуем контур окружности
}

// Функция рисования прямоугольника
function drawRectangle(x, y, width, height) {
    ctx.strokeRect(x, y, width, height); // Рисуем контур прямоугольника
}

// Функция добавления круга в массив shapes
function addCircle(cx, cy, radius) {
    shapes.push({ type: 'circle', cx, cy, radius }); // Добавляем объект круга в массив shapes
}

// Функция добавления прямоугольника в массив shapes
function addRectangle(x, y, width, height) {
    shapes.push({ type: 'rectangle', x, y, width, height }); // Добавляем объект прямоугольника в массив shapes
}

// Функция перерисовки canvas
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas

    // Перебираем все фигуры в массиве shapes и рисуем их
    for (const shape of shapes) {
        if (shape.type === 'circle') {
            drawCircle(shape.cx, shape.cy, shape.radius);
        } else if (shape.type === 'rectangle') {
            drawRectangle(shape.x, shape.y, shape.width, shape.height);
        }
    }
}

// Функция очистки canvas
function clearCanvas() {
    shapes = [];
    // Очищаем canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Получаем все радиокнопки с именем "shape"
document.querySelectorAll('input[name="shape"]').forEach((radio) => {
    radio.addEventListener('change', (event) => {
        selectedShape = event.target.value;
    });
});