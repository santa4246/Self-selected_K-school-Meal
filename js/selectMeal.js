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
        { name: '찹쌀밥', desc: '찹쌀로 지은 밥으로<br>쫀득쫀득한 식감이 특징입니다.', engDesc: 'Rice cooked with glutinous rice, known for its chewy texture.', engName: 'Glutinous Short Grain Rice', calories: 347.1, carbs: 74.6, protein: 6.4, fat: 1, image: 'images/food/찹쌀밥.png' },
        { name: '흑미밥', desc: '흑미를 섞어 지은 밥으로<br>고소하고 씹는 맛이 더해집니다.', engDesc: 'Rice mixed with black rice, adding a savory flavor and a chewy bite.', engName: 'Black Rice', calories: 338.2, carbs: 72.8, protein: 6.3, fat: 1, image: 'images/food/흑미밥.png' },
        { name: '약콩밥', desc: '약콩을 넣어 만든 밥으로<br>단백질이 풍부합니다.', engDesc: 'Rice made with green flesh black bean, rich in protein.', engName: 'Green Flesh Black bean Rice', calories: 340.5, carbs: 70.4, protein: 7.9, fat: 1.7, image: 'images/food/약콩밥.png' }
    ],
    '국': [
        { name: '한우미역국', desc: '한우로<br>깊은 맛을 낸 미역국입니다.', engDesc: 'Seaweed soup made with Korean beef for a deep,<br>rich flavor.', engName: 'Beef and Seaweed Soup', calories: 56.4, carbs: 2.5, protein: 4.4, fat: 3.6, image: 'images/food/한우미역국.png' },
        { name: '닭미역국', desc: '닭고기로<br>담백한 맛을 낸 미역국입니다.', engDesc: 'Seaweed soup cooked with chicken for a light and mild taste.', engName: 'Chicken and Seaweed Soup', calories: 39.9, carbs: 2.5, protein: 4.9, fat: 1.6, image: 'images/food/닭미역국.png' },
        { name: '조갯살미역국', desc: '조갯살로<br>시원한 맛을 낸 미역국입니다.', engDesc: 'Seaweed soup prepared with clam meat for<br>a refreshing flavor.', engName: 'Clam and Seaweed Soup', calories: 46.8, carbs: 2.7, protein: 5.6, fat: 1.8, image: 'images/food/조갯살미역국.png' },
        { name: '들깨미역국', desc: '들깨로<br>고소한 맛을 낸 미역국입니다.', engDesc: 'Seaweed soup flavored with perilla seeds for<br>a nutty taste.', engName: 'Perilla Seed Seaweed Soup', calories: 54.5, carbs: 4.3, protein: 3.5, fat: 3.3, image: 'images/food/들깨미역국.png' }
    ],
    '주찬': [
        { name: '한우갈비찜', desc: '한우 갈비로 만든<br>부드럽고 달콤한 찜요리입니다.', engDesc: 'A tender and sweet steamed dish made with Korean beef ribs.', engName: 'Braised Beef Short Ribs', calories: 355.7, carbs: 20.8, protein: 21.5, fat: 20.1, image: 'images/food/한우갈비찜.png' },
        { name: '매운돼지갈비찜', desc: '돼지갈비에<br>매콤한 양념을 더한 찜요리입니다.', engDesc: 'A steamed dish of pork ribs seasoned with<br>a spicy sauce.', engName: 'Spicy Braised Pork Short Ribs', calories: 335.1, carbs: 21.4, protein: 20, fat: 18.1, image: 'images/food/매운돼지갈비찜.png' },
        { name: '찜닭', desc: '닭고기와 채소를 간장 양념으로<br>졸인 찜요리입니다.', engDesc: 'A dish of chicken and vegetables simmered<br>in soy sauce.', engName: 'Braised Chicken', calories: 262.1, carbs: 26.4, protein: 19, fat: 8, image: 'images/food/안동찜닭.png' },
        { name: '고등어무조림', desc: '고등어와 무를 양념에 졸인<br>감칠맛 나는 요리입니다.', engDesc: 'A savory dish of mackerel and radish braised in<br>a flavorful sauce.', engName: 'Braised Mackerel with Radish', calories: 202.6, carbs: 17, protein: 14.1, fat: 8.1, image: 'images/food/고등어무조림.png' }
    ],
    '부찬': [
        { name: '콩나물무침', desc: '콩나물을<br>간단히 무친 아삭한 반찬입니다.', engDesc: 'A simple, crunchy side dish of seasoned bean sprouts.', engName: 'Bean Sprout Salad', calories: 30.8, carbs: 2.6, protein: 2.7, fat: 0.9, image: 'images/food/콩나물무침.png' },
        { name: '고사리볶음', desc: '고사리를<br>부드럽게 볶은 담백한 반찬입니다.', engDesc: 'A light side dish of tender stir-fried bracken.', engName: 'Bracken Salad', calories: 43.6, carbs: 3, protein: 1.9, fat: 3, image: 'images/food/고사리볶음.png' },
        { name: '시금치고추장무침', desc: '시금치를 고추장으로<br>무친 매콤한 반찬입니다.', engDesc: 'A spicy side dish of spinach mixed with<br>red pepper paste.', engName: 'Spinach Red Chilli Paste Salad', calories: 46.8, carbs: 7.5, protein: 2.1, fat: 1.4, image: 'images/food/시금치고추장무침.png' },
        { name: '애호박볶음', desc: '애호박을<br>부드럽게 볶은 반찬입니다.', engDesc: 'A side dish made by gently stir-frying zucchini.', engName: 'Stir-fried Zucchini', calories: 23, carbs: 3.4, protein: 0.8, fat: 0.9, image: 'images/food/애호박나물.png' }
    ],
    '김치': [
        { name: '배추김치', desc: '배추로 담근<br>매콤하고 알싸한 김치입니다.', engDesc: 'A spicy and tangy kimchi made with chinese cabbage.', engName: 'Kimchi (Baechukimchi)', calories: 22.8, carbs: 3.7, protein: 1.2, fat: 0.3, image: 'images/food/배추김치.png' },
        { name: '깍두기', desc: '무로 만든<br>아삭하고 매콤한 김치입니다.', engDesc: 'A crunchy and spicy kimchi made with cubed radish.', engName: 'Diced Radish Kimchi', calories: 22.8, carbs: 4.5, protein: 0.9, fat: 0.1, image: 'images/food/깍두기.png' },
        { name: '동치미', desc: '무를 소금물에 절여<br>만든 시원하고 담백한 김치입니다.', engDesc: 'A refreshing and mild kimchi made with radish<br>in salted water.', engName: 'Radish Water Kimchi', calories: 5.2, carbs: 1.2, protein: 0.2, fat: 0, image: 'images/food/동치미.png' }
    ],
    '후식': [
        { name: '식혜', desc: '엿기름과 밥을 발효시켜 만든<br>달콤한 한국 전통 음료입니다.', engDesc: 'A sweet traditional Korean drink made by fermenting rice with malt.', engName: 'Sweet Rice Punch', calories: 40, carbs: 10, protein: 0, fat: 0, image: 'images/food/식혜.png' },
        { name: '미숫가루', desc: '곡물을 갈아 만든<br>한국 전통 음료입니다.', engDesc: 'A nutty traditional Korean drink made from ground grains.', engName: 'Roasted Grain Drink', calories: 398, carbs: 76.2, protein: 14.5, fat: 5.5, image: 'images/food/미숫가루.png' }
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
        button.addEventListener('click', (e) => {
            e.preventDefault();
            modalAction(category);
        });

        foodOptionsDiv.appendChild(button);

        const p = document.createElement('p');
        if (localStorage.getItem("language") == "ko") {
            p.textContent = `${food.name}`;
            foodOptionsDescDiv.style.fontSize = '18px';
        } else {
            p.textContent = `${food.engName}`;
            foodOptionsDescDiv.style.fontSize = '14px';
        }
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
    let zIndex;
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
                coordinate_x = '270px';
                coordinate_y = '90px';
                zIndex = "9999";
                break;
            default:
                alert('다시 선택해주세요. (please try again)');
        }
    } else { // PC
        switch (category) {
            case "밥":
                width = '195px';
                height = '195px';
                coordinate_x = '30px';
                coordinate_y = '137px';
                break;
            case "국":
                width = '195px';
                height = '195px';
                coordinate_x = '250px';
                coordinate_y = '137px';
                break;
            case "주찬":
                width = '155px';
                height = '155px';
                coordinate_x = '160px';
                coordinate_y = '11px';
                break;
            case "부찬":
                width = '126px';
                height = '126px';
                coordinate_x = '30px';
                coordinate_y = '7px';
                break;
            case "김치":
                width = '131px';
                height = '131px';
                coordinate_x = '316px';
                coordinate_y = '5px';
                break;
            case "후식":
                width = '90px';
                height = '90px';
                coordinate_x = '405px';
                coordinate_y = '100px';
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
        if (zIndex) {
            foodImage.style.zIndex = zIndex;
        }

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
    let order = ['밥', '국', '주찬', '부찬', '김치', '후식'];

    let totalCalories = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let food_ = '';


    // 기존 비율 정보 제거
    const existingRatioDisplay = document.getElementById('ratioDisplay');
    if (existingRatioDisplay) {
        existingRatioDisplay.remove();
    }


    order.forEach(key => {
        const item = trayItems[key];
        if (item) {
            food_ += item.name + ', ';
            totalCalories += item.calories;
            totalCarbs += item.carbs;
            totalProtein += item.protein;
            totalFat += item.fat;
        }
    });


    // 비율 계산
    const totalNutrients = totalCarbs * 4 + totalProtein * 4 + totalFat * 9;
    const carbRatio = ((totalCarbs * 4) / totalNutrients * 100).toFixed(1);
    const proteinRatio = ((totalProtein * 4) / totalNutrients * 100).toFixed(1);
    const fatRatio = ((totalFat * 9) / totalNutrients * 100).toFixed(1);

    let result = {
        'food': food_,
        'totalCalories': totalCalories.toFixed(1),
        'carbRatio': carbRatio,
        'proteinRatio': proteinRatio,
        'fatRatio': fatRatio
    }

    localStorage.setItem("result", JSON.stringify(result));
});

const categoryButtons = document.querySelectorAll('.category .food');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

const homeButton = document.getElementById('home');
homeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

let selected = {
    밥: false,
    국: false,
    주찬: false,
    부찬: false,
    김치: false,
    후식: false
}

document.getElementById('calculateCaloriesButton').addEventListener('click', async () => {
    Object.keys(selected).forEach(key => {
        selected[key] = false;
    });

    const trayItems = document.querySelectorAll("#trayItems img");
    trayItems.forEach(img => {
        const category = img.dataset.category;
        if (selected.hasOwnProperty(category)) {
            selected[category] = true;
        }
    });

    const unselectedCategories = Object.keys(selected).filter(
        key => !selected[key]
    );

    if (unselectedCategories.length === 0) {
        const tray = document.getElementById("tray");
        tray.querySelectorAll("img").forEach((img) => {
            if (!img.crossOrigin) {
                img.crossOrigin = "anonymous";
            }
        });
        try {
            const canvas = await html2canvas(tray, {useCORS: true});
            const imageData = canvas.toDataURL("image/png");

            localStorage.setItem("trayImage", imageData);
            window.location.href = 'result.html';

        } catch (error) {
            console.error(error)
        }
    } else {
        // 현재 언어 가져오기
        const currentLanguage = localStorage.getItem("language") || "ko";

        // 선택되지 않은 카테고리를 번역
        const translatedCategories = unselectedCategories.map(category => {
            return translations[currentLanguage][category] || category;
        });

        // 경고 메시지 출력
        errorModal(translatedCategories);
        // alert(`음식을 모두 선택해주세요. \n(Please select all the food menu.) \n\n선택되지 않은 항목 (Unselected menu):\n${translatedCategories.join(", ")}`);
    }
});

const translations = {
	en: {
		타이틀: "Self-selected K-school Meal Programs"
        , 밥: "Rice"
        , 국: "Soup"
        , 주찬: "Main dish"
		, 부찬: "Side dish"
		, 김치: "Kimchi"
		, 후식: "Dessert"
        , 계산하기_버튼: "<span style='display:block; margin-left: -77px; width:200px'>Nutrition calculation</span>"
        , 담기_버튼: "Add"
        , 닫기_버튼: "Close"
	},
	ko: {
		타이틀: "자율선택급식 체험"
		, 밥: "밥"
        , 국: "국"
        , 주찬: "주찬"
		, 부찬: "부찬"
		, 김치: "김치"
		, 후식: "후식"
        , 계산하기_버튼: "<span style='display:block; margin-left: -77px; width:200px'>영양량 계산하기</span>"
        , 담기_버튼: "담기"
        , 닫기_버튼: "닫기"
	}
};

document.addEventListener("DOMContentLoaded", () => {
	const savedLanguage = localStorage.getItem("language") || "ko";
	setLanguage(savedLanguage);

    const defaultButton = document.querySelector('.food[data-category="밥"]');
    defaultButton.click();
});

function setLanguage(language) {
	document.querySelectorAll("[data-i18n]").forEach(element => {
		const key = element.getAttribute("data-i18n");
		element.innerHTML = translations[language][key];
	});
}