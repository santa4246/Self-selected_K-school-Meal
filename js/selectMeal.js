// main.js

const categoriesDiv = document.getElementById('categories');
const foodSelectionDiv = document.getElementById('foodSelection');
const foodOptionsDiv = document.getElementById('foodOptions');
const foodOptionsDescDiv = document.getElementById('foodOptionsDesc');
const tray = document.getElementById('tray');
const trayItemsUl = document.getElementById('trayItems');
const caloriesDiv = document.getElementById('calories');

let trayItems = {}; // 각 카테고리에서 하나의 음식만 선택되도록 객체로 변경
let foodData = {
    '밥': [
        { name: '찹쌀밥', engName: 'Glutinous Short Grain Rice', calories: 347.1, carbs: 74.6, protein: 6.4, fat: 1, image: 'images/food/찹쌀밥.png' },
        { name: '흑미밥', engName: 'Black Rice', calories: 338.2, carbs: 72.8, protein: 6.3, fat: 1, image: 'images/food/흑미밥.png' },
        { name: '약콩밥', engName: 'Green Flesh Black bean Rice', calories: 340.5, carbs: 70.4, protein: 7.9, fat: 1.7, image: 'images/food/약콩밥.png' }
    ],
    '국': [
        { name: '한우미역국', engName: 'Beef and Seaweed Soup', calories: 56.4, carbs: 2.5, protein: 4.4, fat: 3.6, image: 'images/food/한우미역국.png' },
        { name: '닭미역국', engName: 'Chicken and Seaweed Soup', calories: 39.9, carbs: 2.5, protein: 4.9, fat: 1.6, image: 'images/food/닭미역국.png' },
        { name: '조갯살미역국', engName: 'Clam and Seaweed Soup', calories: 46.8, carbs: 2.7, protein: 5.6, fat: 1.8, image: 'images/food/조갯살미역국.png' },
        { name: '들깨미역국', engName: 'Perilla Seed Seaweed Soup', calories: 54.5, carbs: 4.3, protein: 3.5, fat: 3.3, image: 'images/food/들깨미역국.png' }
    ],
    '주찬': [
        { name: '한우갈비찜', engName: 'Braised Beef Short Ribs', calories: 355.7, carbs: 20.8, protein: 21.5, fat: 20.1, image: 'images/food/한우갈비찜.png' },
        { name: '매운돼지갈비찜', engName: 'Spicy Braised Pork Short Ribs', calories: 335.1, carbs: 21.4, protein: 20, fat: 18.1, image: 'images/food/매운돼지갈비찜.png' },
        { name: '찜닭', engName: 'Braised Chicken', calories: 262.1, carbs: 26.4, protein: 19, fat: 8, image: 'images/food/안동찜닭.png' },
        { name: '고등어무조림', engName: 'Braised Mackerel with Radish', calories: 202.6, carbs: 17, protein: 14.1, fat: 8.1, image: 'images/food/고등어무조림.png' }
    ],
    '부찬': [
        { name: '콩나물무침', engName: 'Bean Sprout Salad', calories: 30.8, carbs: 2.6, protein: 2.7, fat: 0.9, image: 'images/food/콩나물무침.png' },
        { name: '고사리볶음', engName: 'Bracken Salad', calories: 43.6, carbs: 3, protein: 1.9, fat: 3, image: 'images/food/고사리볶음.png' },
        { name: '시금치고추장무침', engName: 'Spinach Red Chilli Paste Salad', calories: 46.8, carbs: 7.5, protein: 2.1, fat: 1.4, image: 'images/food/시금치고추장무침.png' },
        { name: '애호박볶음', engName: 'Stir-fried Zucchini', calories: 23, carbs: 3.4, protein: 0.8, fat: 0.9, image: 'images/food/애호박나물.png' }
    ],
    '김치': [
        { name: '배추김치', engName: 'Kimchi (Baechukimchi)', calories: 22.8, carbs: 3.7, protein: 1.2, fat: 0.3, image: 'images/food/배추김치.png' },
        { name: '깍두기', engName: 'Diced Radish Kimchi', calories: 22.8, carbs: 4.5, protein: 0.9, fat: 0.1, image: 'images/food/깍두기.png' },
        { name: '동치미', engName: 'Radish Water Kimchi', calories: 5.2, carbs: 1.2, protein: 0.2, fat: 0, image: 'images/food/동치미.png' }
    ],
    '후식': [
        { name: '식혜', engName: 'Sweet Rice Punch', calories: 40, carbs: 10, protein: 0, fat: 0, image: 'images/food/식혜.png' },
        { name: '미숫가루', engName: 'Roasted Grain Drink', calories: 398, carbs: 76.2, protein: 14.5, fat: 5.5, image: 'images/food/미숫가루.png' }
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
    let buttonId = 0;
    foodOptionsDiv.innerHTML = '';
    foodOptionsDescDiv.innerHTML = '';

    foodData[category].forEach(food => {
        const button = document.createElement('button');
        button.textContent = `${food.name}`;
        button.dataset.image = food.image; // 이미지 경로 추가
        button.style.backgroundImage = `url("${food.image}")`;
        button.style.backgroundRepeat = `no-repeat`;
        button.className = 'open-modal-btn';
        button.dataset.btnId = buttonId++;
        button.dataset.btnCategory = category;
        button.dataset.btnFood = JSON.stringify(food);

        // 옵션 버튼 클릭할 때마다 modalAction 호출
        button.addEventListener('click', () => {
            modalAction(category);
        });

        foodOptionsDiv.appendChild(button);

        const p = document.createElement('p');
        p.textContent = `${food.name}`;
        foodOptionsDescDiv.appendChild(p);
    });

    foodSelectionDiv.style.display = 'block';
    modalAction(category);
}

// 음식 선택 시 식판 업데이트하여 하나의 음식만 추가되도록 구현
function addToTray(category, food) {
    food = JSON.parse(food);

    const foodImagesContainer = document.getElementById('trayItems');

    const existingImage = document.querySelector(`img[data-category="${category}"]`);
    if (existingImage) {
        existingImage.remove();
    }
    
    trayItems[category] = food;

    let width, height;
    let coordinate_x, coordinate_y;
    let screenWidth = window.innerWidth;
    console.log(screenWidth)
    if (screenWidth < 479) { // 모바일
        switch (category) {
            case "밥":
                width = '150px';
                height = '150px';
                coordinate_x = '10px';
                coordinate_y = '120px';
                break;
            case "국":
                width = '150px';
                height = '150px';
                coordinate_x = '165px';
                coordinate_y = '120px';
                break;
            case "주찬":
                width = '117px';
                height = '117px';
                coordinate_x = '105px';
                coordinate_y = '35px';
                break;
            case "부찬":
                width = '95px';
                height = '95px';
                coordinate_x = '16px';
                coordinate_y = '34px';
                break;
            case "김치":
                width = '95px';
                height = '95px';
                coordinate_x = '215px';
                coordinate_y = '34px';
                break;
            case "후식":
                width = '80px';
                height = '80px';
                coordinate_x = '254px';
                coordinate_y = '250px';
                break;
            default:
                alert('다시 선택해주세요.');
        }
    } else { // PC
        switch (category) {
            case "밥":
                width = '250px';
                height = '250px';
                coordinate_x = '40px';
                coordinate_y = '200px';
                break;
            case "국":
                width = '250px';
                height = '250px';
                coordinate_x = '330px';
                coordinate_y = '200px';
                break;
            case "주찬":
                width = '200px';
                height = '200px';
                coordinate_x = '210px';
                coordinate_y = '35px';
                break;
            case "부찬":
                width = '160px';
                height = '160px';
                coordinate_x = '45px';
                coordinate_y = '30px';
                break;
            case "김치":
                width = '160px';
                height = '160px';
                coordinate_x = '420px';
                coordinate_y = '30px';
                break;
            case "후식":
                width = '100px';
                height = '100px';
                coordinate_x = '530px';
                coordinate_y = '160px';
                break;
            default:
                alert('다시 선택해주세요.');
        }
    }

    if (food.image) {
        const foodImage = document.createElement('img');
        foodImage.src = food.image;
        foodImage.id = food.name;
        foodImage.alt = '선택된 음식 이미지';
        foodImage.style.position = 'absolute';
        foodImage.style.width = width;
        foodImage.style.height = height;
        foodImage.style.left = coordinate_x;
        foodImage.style.top = coordinate_y;
        foodImage.style.margin = '5px';

        foodImage.dataset.category = category;

        foodImagesContainer.appendChild(foodImage); // 식판에 이미지 추가
    }
}

// 식판 업데이트
function updateTray() {
    Object.values(trayItems).forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name}`;
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

    // 기존 비율 정보 제거
    const existingRatioDisplay = document.getElementById('ratioDisplay');
    if (existingRatioDisplay) {
        existingRatioDisplay.remove();
    }

    Object.values(trayItems).forEach(item => {
        totalCalories += item.calories;
        totalCarbs += item.carbs;
        totalProtein += item.protein;
        totalFat += item.fat;
    });

    // totalCaloriesP.textContent = `총 열량: ${totalCalories} Kcal`;

    // 비율 계산
    const totalNutrients = totalCarbs * 4 + totalProtein * 4 + totalFat * 9;
    const carbRatio = ((totalCarbs * 4) / totalNutrients * 100).toFixed(1);
    const proteinRatio = ((totalProtein * 4) / totalNutrients * 100).toFixed(1);
    const fatRatio = ((totalFat * 9) / totalNutrients * 100).toFixed(1);

    // 비율 표시
    const ratioDisplay = document.createElement('p');
    ratioDisplay.id = 'ratioDisplay';  // 새로운 비율 표시 ID 설정
    ratioDisplay.textContent = `탄:단:지 비율 = ${carbRatio}% : ${proteinRatio}% : ${fatRatio}%`;
    caloriesDiv.appendChild(ratioDisplay);
});

document.getElementById('calculateCaloriesButton').addEventListener('click', () => {
    window.location.href = 'result.html';
});

const categoryButtons = document.querySelectorAll('.category .food');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});