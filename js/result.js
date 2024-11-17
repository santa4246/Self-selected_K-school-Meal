const result = JSON.parse(localStorage.getItem("result"));
if (result !== null) {
  const totalCalories = result.totalCalories;
  const carbRatio = result.carbRatio;
  const proteinRatio = result.proteinRatio;
  const fatRatio = result.fatRatio;

  const ctx = document.getElementById('nutritionChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Carbohydrates', 'Protein', 'Fat'],
      datasets: [{
        data: [carbRatio, proteinRatio, fatRatio],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: '#FFFFFF',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.raw;
              return `${context.label}: ${value}%`;
            }
          }
        }
      },
      cutout: '70%',
    }
  });
  const centerText = document.getElementById('chartCenterText');
  centerText.innerText = `${totalCalories} Kcal`;

  const selectedTrayInfo = document.getElementById('selectedTrayInfo');
  const selectedTrayKcal = document.getElementById('selectedTrayKcal');
  const selectedTrayRatio = document.getElementById('selectedTrayRatio');

  selectedTrayInfo.textContent = `${(result.food).slice(0, -2)}를 선택하였습니다.`
  selectedTrayKcal.textContent = `해당 식단의 칼로리는 ${totalCalories} Kcal`
  selectedTrayRatio.textContent = `탄수화물:단백질:지방의 비율은 ${carbRatio}%:${proteinRatio}%:${fatRatio}% 입니다.`
}

const homeButton = document.getElementById('home');
homeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
    localStorage.clear();
});

document.addEventListener("DOMContentLoaded", () => {
  const imageData = localStorage.getItem("trayImage");
  if (imageData) {
    const imgElement = document.createElement("img");
    imgElement.src = imageData;
    imgElement.style.width = "100%";
    imgElement.style.height = "auto";

    document.getElementById("imageContainer").appendChild(imgElement);
  } else {
    console.error("Tray image data not found!");
  }
});