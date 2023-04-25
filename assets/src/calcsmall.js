// Получаем ссылки на элементы формы и результатов
const quantityInput = document.getElementById('quantity');
const widthInput = document.getElementById('width');
const depthInput = document.getElementById('depth');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const unitVolumeOutput = document.getElementById('unit-volume');
const totalVolumeOutput = document.getElementById('total-volume');
const totalWeightOutput = document.getElementById('total-weight');
const boxesNeededOutput = document.getElementById('boxes-needed');
const palletsNeededOutput = document.getElementById('pallets-needed');

// Функция для вычисления объема одной единицы товара
function calculateUnitVolume(width, depth, height) {
return width * depth * height / 1000000;
}

// Функция для обновления блока с результатами
function updateResultContainer(quantity, width, depth, height, weight) {
const unitVolume = calculateUnitVolume(width, depth, height);
const totalVolume = quantity * unitVolume;
const totalWeight = weight * quantity / 1000;
const boxesNeeded = Math.ceil(totalVolume / 0.096);
const palletsNeeded = Math.ceil(boxesNeeded / 9);

unitVolumeOutput.textContent = Math.abs(unitVolume.toFixed(3)) + ' м³';
totalVolumeOutput.textContent = Math.abs(totalVolume.toFixed(3)) + ' м³';
totalWeightOutput.textContent = Math.abs(totalWeight.toFixed(3)) + ' кг';
boxesNeededOutput.textContent = boxesNeeded + ' шт.';
palletsNeededOutput.textContent = palletsNeeded + ' шт.';
}

// Функция для обработки события изменения поля ввода
function handleInputChange() {
const quantity = Number(quantityInput.value);
const width = Number(widthInput.value);
const depth = Number(depthInput.value);
const height = Number(heightInput.value);
const weight = Number(weightInput.value);

if (isNaN(quantity) || isNaN(width) || isNaN(depth) || isNaN(height) || isNaN(weight)) {
unitVolumeOutput.textContent = 'Ошибка ввода';
totalVolumeOutput.textContent = 'Ошибка ввода';
totalWeightOutput.textContent = 'Ошибка ввода';
boxesNeededOutput.textContent = 'Ошибка ввода';
palletsNeededOutput.textContent = 'Ошибка ввода';
} else {
updateResultContainer(quantity, width, depth, height, weight);
}
}

// Добавляем обработчики событий на поля ввода
quantityInput.addEventListener('input', handleInputChange);
widthInput.addEventListener('input', handleInputChange);
depthInput.addEventListener('input', handleInputChange);
heightInput.addEventListener('input', handleInputChange);
weightInput.addEventListener('input', handleInputChange);

// Вызываем функцию для инициализации результатов
handleInputChange();