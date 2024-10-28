// main.js

const categoriesDiv = document.getElementById('categories');
const foodSelectionDiv = document.getElementById('foodSelection');
const foodOptionsDiv = document.getElementById('foodOptions');
const tray = document.getElementById('tray');
const trayItemsUl = document.getElementById('trayItems');
const caloriesDiv = document.getElementById('calories');
const totalCaloriesP = document.getElementById('totalCalories');

let trayItems = {}; // 각 카테고리에서 하나의 음식만 선택되도록 객체로 변경
let foodData = {
    '밥': [
        { name: '찹쌀밥', calories: 300, carbs: 68, protein: 5, fat: 1 },
        { name: '흑미밥', calories: 250, carbs: 52, protein: 6, fat: 2, image: '..\\image\\흑미밥.png' },
        { name: '보리밥', calories: 250, carbs: 52, protein: 6, fat: 2 }
    ],
    '국': [
        { name: '한우미역국', calories: 150, carbs: 3, protein: 10, fat: 8 },
        { name: '닭미역국', calories: 180, carbs: 5, protein: 12, fat: 9 },
        { name: '바지락미역국', calories: 180, carbs: 5, protein: 12, fat: 9 },
        { name: '들깨미역국', calories: 180, carbs: 5, protein: 12, fat: 9 }
    ],
    '주찬': [
        { name: '한우갈비찜', calories: 400, carbs: 10, protein: 25, fat: 30 },
        { name: '돼지매운갈비찜', calories: 450, carbs: 15, protein: 35, fat: 20 },
        { name: '안동찜닭', calories: 180, carbs: 5, protein: 12, fat: 9 },
        { name: '고등어김치찜', calories: 180, carbs: 5, protein: 12, fat: 9 }
    ],
    '부찬': [
        { name: '콩나물무침', calories: 200, carbs: 3, protein: 15, fat: 15 },
        { name: '고사리볶음', calories: 100, carbs: 5, protein: 2, fat: 8 },
        { name: '시금치고추장무침', calories: 100, carbs: 5, protein: 2, fat: 8 },
        { name: '새송이버섯볶음', calories: 100, carbs: 5, protein: 2, fat: 8 }
    ],
    '김치': [
        { name: '배추김치', calories: 50, carbs: 10, protein: 1, fat: 0 },
        { name: '깍두기', calories: 40, carbs: 8, protein: 1, fat: 0 },
        { name: '백김치', calories: 40, carbs: 8, protein: 1, fat: 0 }
    ],
    '후식': [
        { name: '식혜', calories: 80, carbs: 20, protein: 0, fat: 0 },
        { name: '미숫가루', calories: 90, carbs: 22, protein: 1, fat: 0 }
    ]
};

// 카테고리 선택 시 음식 옵션 표시
categoriesDiv.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const category = e.target.getAttribute('data-category');
        showFoodOptions(category);
    }
});

// 선택된 카테고리의 음식 옵션을 표시
function showFoodOptions(category) {
    foodOptionsDiv.innerHTML = '';
    foodData[category].forEach(food => {
        const button = document.createElement('button');
        button.textContent = `${food.name} (${food.calories} Kcal)`;
        button.dataset.image = food.image; // 이미지 경로 추가
        button.addEventListener('click', () => addToTray(category, food));
        foodOptionsDiv.appendChild(button);
    });
    foodSelectionDiv.style.display = 'block';
}

// 음식 선택 시 식판 업데이트하여 하나의 음식만 추가되도록 구현
function addToTray(category, food) {
    // 동일 카테고리에서 선택된 음식이 있으면 대체
    trayItems[category] = food;
    updateTray();


    // 선택된 음식의 이미지를 식판에 추가
    const foodImagesContainer = document.getElementById('food-images');
    foodImagesContainer.innerHTML = ''; // 기존 이미지를 지우고 새로 추가

    if (food.image) {
    const foodImage = document.createElement('img');
    foodImage.src = food.image; // 선택된 음식의 이미지 경로 사용
    foodImage.style.width = '100px'; // 원하는 크기로 조정
    foodImage.style.height = '100px'; // 원하는 크기로 조정
    foodImage.style.margin = '5px'; // 간격 조정

    foodImagesContainer.appendChild(foodImage); // 식판에 이미지 추가
}
}

// 식판 업데이트
function updateTray() {
    trayItemsUl.innerHTML = '';
    Object.values(trayItems).forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} (${item.calories} Kcal)`;
        trayItemsUl.appendChild(li);
    });
    tray.style.display = 'block';
    caloriesDiv.style.display = 'block';
}

// 총 열량 및 비율 계산
document.getElementById('calculateCaloriesButton').addEventListener('click', () => {
    let totalCalories = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFat = 0;

    Object.values(trayItems).forEach(item => {
        totalCalories += item.calories;
        totalCarbs += item.carbs;
        totalProtein += item.protein;
        totalFat += item.fat;
    });

    totalCaloriesP.textContent = `총 열량: ${totalCalories} Kcal`;

    // 비율 계산
    const totalNutrients = totalCarbs * 4 + totalProtein * 4 + totalFat * 9;
    const carbRatio = ((totalCarbs * 4) / totalNutrients * 100).toFixed(1);
    const proteinRatio = ((totalProtein * 4) / totalNutrients * 100).toFixed(1);
    const fatRatio = ((totalFat * 9) / totalNutrients * 100).toFixed(1);

    // 비율 표시
    const ratioDisplay = document.createElement('p');
    ratioDisplay.textContent = `탄:단:지 비율 = ${carbRatio}% : ${proteinRatio}% : ${fatRatio}%`;
    caloriesDiv.appendChild(ratioDisplay);
});