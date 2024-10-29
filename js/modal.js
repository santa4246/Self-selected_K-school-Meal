function modalAction(category) {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.modal-overlay');
  let selectedButtonId = null;

  document.querySelectorAll('.open-modal-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      selectedButtonId = event.target.getAttribute('data-btn-id');
      modal.style.display = 'block';
      overlay.style.display = 'block';

      let selectedFoodName = document.getElementById('selectedFoodName');
      let selectedFoodCalories = document.getElementById('selectedFoodCalories');
      let selectedFoodCarbs = document.getElementById('selectedFoodCarbs');
      let selectedFoodProtein = document.getElementById('selectedFoodProtein');
      let selectedFoodFat = document.getElementById('selectedFoodFat');
      let foodInfo = JSON.parse(event.target.getAttribute('data-btn-food'));
      
      selectedFoodName.textContent = `음식 : ${foodInfo.name}`;
      selectedFoodCalories.textContent = `칼로리 : ${foodInfo.calories}`;
      selectedFoodCarbs.textContent = `탄수화물 : ${foodInfo.carbs}`;
      selectedFoodProtein.textContent = `단백질 : ${foodInfo.protein}`;
      selectedFoodFat.textContent = `지방 : ${foodInfo.fat}`;
    });
  });

  document.getElementById('add-btn').addEventListener('click', () => {
    let category = document.querySelectorAll('.open-modal-btn')[selectedButtonId].getAttribute('data-btn-category');
    let food = document.querySelectorAll('.open-modal-btn')[selectedButtonId].getAttribute('data-btn-food');
    addToTray(category, food)
    modal.style.display = 'none';
    overlay.style.display = 'none';
  });

  document.getElementById('cancel-btn').addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  });

  overlay.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  });
}