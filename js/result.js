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
  centerText.innerText = `${totalCalories} kcal`;
}

const homeButton = document.getElementById('home');
homeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
    localStorage.clear();
});