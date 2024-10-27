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
    '밥': [{ name: '흰쌀밥', calories: 300 }, { name: '현미밥', calories: 250 }],
    '국': [{ name: '미역국', calories: 150 }, { name: '된장국', calories: 180 }],
    '메인메뉴': [{ name: '불고기', calories: 400 }, { name: '닭갈비', calories: 450 }],
    '사이드메뉴': [{ name: '계란말이', calories: 200 }, { name: '샐러드', calories: 100 }],
    '김치': [{ name: '배추김치', calories: 50 }, { name: '깍두기', calories: 40 }],
    '후식': [{ name: '사과', calories: 80 }, { name: '바나나', calories: 90 }]
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

// 열량 계산
document.getElementById('calculateCaloriesButton').addEventListener('click', () => {
    let totalCalories = Object.values(trayItems).reduce((total, item) => total + item.calories, 0);
    totalCaloriesP.textContent = `총 열량: ${totalCalories} Kcal`;
});
