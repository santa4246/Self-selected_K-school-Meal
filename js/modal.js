function modalAction(category) {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.modal-overlay');
  let selectedButtonId = null;

  document.querySelectorAll('.open-modal-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      selectedButtonId = event.target.getAttribute('data-btn-id');
      modal.style.display = 'block';
      overlay.style.display = 'block';
    });
  });

  document.getElementById('add-btn').addEventListener('click', () => {
    // result.textContent = `버튼 ${selectedButtonId}이(가) 선택되었습니다.`;
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