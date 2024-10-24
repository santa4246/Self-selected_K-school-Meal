    const categoriesDiv = document.getElementById('categories');
    const foodSelectionDiv = document.getElementById('foodSelection');
    const foodOptionsDiv = document.getElementById('foodOptions');
    const tray = document.getElementById('tray');
    const trayItemsUl = document.getElementById('trayItems');
    const caloriesDiv = document.getElementById('calories');
    const totalCaloriesP = document.getElementById('totalCalories');

    let trayItems = [];
    let foodData = {
        '밥': [{ name: '흰쌀밥', calories: 300 }, { name: '현미밥', calories: 250 }],
        '국': [{ name: '미역국', calories: 150 }, { name: '된장국', calories: 180 }],
        '메인메뉴': [{ name: '불고기', calories: 400 }, { name: '닭갈비', calories: 450 }],
        '사이드메뉴': [{ name: '계란말이', calories: 200 }, { name: '샐러드', calories: 100 }],
        '김치': [{ name: '배추김치', calories: 50 }, { name: '깍두기', calories: 40 }],
        '후식': [{ name: '사과', calories: 80 }, { name: '바나나', calories: 90 }]
    };

    categoriesDiv.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const category = e.target.getAttribute('data-category');
            showFoodOptions(category);
        }
    });

    function showFoodOptions(category) {
        foodOptionsDiv.innerHTML = '';
        foodData[category].forEach(food => {
            const button = document.createElement('button');
            button.textContent = `${food.name} (${food.calories} Kcal)`;
            button.addEventListener('click', () => addToTray(food));
            foodOptionsDiv.appendChild(button);
        });
        foodSelectionDiv.style.display = 'block';
    }

    function addToTray(food) {
        trayItems.push(food);
        updateTray();
    }

    function updateTray() {
        trayItemsUl.innerHTML = '';
        trayItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} (${item.calories} Kcal)`;
            trayItemsUl.appendChild(li);
        });
        tray.style.display = 'block';
        caloriesDiv.style.display = 'block';
    }

    document.getElementById('calculateCaloriesButton').addEventListener('click', () => {
        let totalCalories = trayItems.reduce((total, item) => total + item.calories, 0);
        totalCaloriesP.textContent = `총 열량: ${totalCalories} Kcal`;
    });