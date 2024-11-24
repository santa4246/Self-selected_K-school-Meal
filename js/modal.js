function modalAction(category) {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.modal-overlay');
  let selectedButtonId = null;

  document.getElementById('add-btn').removeEventListener('click', add_btn_listener);
  document.getElementById('cancel-btn').removeEventListener('click', cancle_btn_listener);
  overlay.removeEventListener('click', overlay_click_listener);

  document.querySelectorAll('.open-modal-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      selectedButtonId = event.target.getAttribute('data-btn-id');
      modal.style.display = 'block';
      overlay.style.display = 'block';

      let modalImage = document.getElementById('modalImage');
      let modalFoodName = document.getElementById('modalFoodName');
      let modalFoodKcal = document.getElementById('modalFoodKcal');

      let selectedFoodDesc = document.getElementById('selectedFoodDesc');
      let selectedFoodCalories = document.getElementById('selectedFoodCalories');
      let selectedFoodCarbs = document.getElementById('selectedFoodCarbs');
      let selectedFoodProtein = document.getElementById('selectedFoodProtein');
      let selectedFoodFat = document.getElementById('selectedFoodFat');
      let foodInfo = JSON.parse(event.target.getAttribute('data-btn-food'));

      modalImage.style.backgroundImage = `url("${foodInfo.image}")`;
      modalImage.style.backgroundSize = 'cover';
      modalImage.style.width = '150px';
      modalImage.style.height = '150px';

      modalFoodName.textContent = `${foodInfo.name}`;
      modalFoodEngName.textContent = `${foodInfo.engName}`;

      if (localStorage.getItem("language") == "ko") {
        selectedFoodDesc.innerHTML = `${foodInfo.desc}`;
        selectedFoodCalories.textContent = `열량(Kcal) : ${foodInfo.calories}`;
        selectedFoodCarbs.textContent = `탄수화물(g) : ${foodInfo.carbs}`;
        selectedFoodProtein.textContent = `단백질(g) : ${foodInfo.protein}`;
        selectedFoodFat.textContent = `지방(g) : ${foodInfo.fat}`;
      } else {
        selectedFoodDesc.innerHTML = `${foodInfo.engDesc}`;
        selectedFoodCalories.textContent = `Calories(Kcal) : ${foodInfo.calories}`;
        selectedFoodCarbs.textContent = `Carbohydrate(g) : ${foodInfo.carbs}`;
        selectedFoodProtein.textContent = `Protein(g) : ${foodInfo.protein}`;
        selectedFoodFat.textContent = `Fat(g) : ${foodInfo.fat}`;
      }
    });
  });

  document.getElementById('add-btn').addEventListener('click', add_btn_listener), { once: true };
  document.getElementById('cancel-btn').addEventListener('click', cancle_btn_listener), { once: true };
  overlay.addEventListener('click', overlay_click_listener), { once: true };

  function add_btn_listener() {
    if (selectedButtonId) {
      const category = document.querySelectorAll('.open-modal-btn')[selectedButtonId].getAttribute('data-btn-category');
      const food = document.querySelectorAll('.open-modal-btn')[selectedButtonId].getAttribute('data-btn-food');
      
      const existingImage = document.querySelector(`img[data-category="${category}"]`);
      if (existingImage) {
          existingImage.remove();
      }
      addToTray(category, food);
  
      modal.style.display = 'none';
      overlay.style.display = 'none';
  
      document.getElementById('add-btn').removeEventListener('click', add_btn_listener);
    }
}

  function cancle_btn_listener() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  }

  function overlay_click_listener() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  }
}

function errorModal(translatedCategories) {
    const errModal = document.querySelector('.error-modal');
    const errModalOverlay = document.querySelector('.error-modal-overlay');
    const errModalText = document.getElementById('error_modal_text');
    document.getElementById('error-modal-cancel-btn').removeEventListener('click', error_modal_cancle_btn_listener);
    document.getElementById('error-modal-cancel-btn').addEventListener('click', error_modal_cancle_btn_listener), { once: true };
    errModalOverlay.removeEventListener('click', error_modal_overlay_click_listener);
    errModalOverlay.addEventListener('click', error_modal_overlay_click_listener), { once: true };
    
    function error_modal_cancle_btn_listener() {
        errModal.style.display = 'none';
        errModalOverlay.style.display = 'none';
    }

    function error_modal_overlay_click_listener() {
        errModal.style.display = 'none';
        errModalOverlay.style.display = 'none';
    }

    if (localStorage.getItem("language") == "ko") {
        errModalText.innerHTML = `음식을 모두 선택해주세요.<br><br>선택되지 않은 항목:<br>${translatedCategories.join(", ")}`
    } else {
        errModalText.innerHTML = `Please select all the food menu.<br><br>Unselected menu:<br>${translatedCategories.join(", ")}`
    }

    

    errModal.style.display = 'block';
    errModalOverlay.style.display = 'block';
}