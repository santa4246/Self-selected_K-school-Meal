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
    },
    plugins: [{
      id: 'customLabels',
      afterDraw: (chart) => {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        const datasets = chart.data.datasets[0];
        const total = datasets.data.reduce((sum, val) => sum + val, 0);
  
        datasets.data.forEach((value, index) => {
          const meta = chart.getDatasetMeta(0).data[index];
          const { x, y } = meta.tooltipPosition();
          const label = chart.data.labels[index];
  
          // 값 표시
          ctx.fillStyle = '#000';
          ctx.textAlign = 'center';
          ctx.font = 'bold 12px Arial';
          ctx.fillText(`${value}%`, x, y);
        });
      }
    }]
  });
  const centerText = document.getElementById('chartCenterText');
  centerText.innerText = `${totalCalories} Kcal`;

  const selectedTrayInfo = document.getElementById('selectedTrayInfo');
  const selectedTrayKcal = document.getElementById('selectedTrayKcal');
  const selectedTrayRatio = document.getElementById('selectedTrayRatio');

  if (localStorage.getItem("language") == "ko") {
    selectedTrayInfo.textContent = `${(result.food).slice(0, -2)}를 선택하였습니다.`
    selectedTrayKcal.textContent = `해당 식단의 칼로리는 ${totalCalories} Kcal`
    selectedTrayRatio.textContent = `탄수화물:단백질:지방의 비율은 ${carbRatio}%:${proteinRatio}%:${fatRatio}% 입니다.`
  } else {
    selectedTrayInfo.textContent = `You made your meal with ${(result.food).slice(0, -2)}`
    selectedTrayKcal.textContent = `Total calories of this meal is ${totalCalories} Kcal`
    selectedTrayRatio.textContent = `The ratio of carbohydrates to protein to fat is ${carbRatio}%:${proteinRatio}%:${fatRatio}%`
  }
  
}

const homeButton = document.getElementById('home');
homeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
    /* localStorage.removeItem('trayImage');
    localStorage.removeItem('result'); */
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

  const savedLanguage = localStorage.getItem("language") || "ko";
	setLanguage(savedLanguage);
});

const translations = {
	en: {
		타이틀: "Self-selected K-school Meal Programs"
		, 선택된_식단: "Your Meal"
		, 설명: `The nutritional guidelines for K-school meal programs are based on<br>the School Meal Act, and they are as follows :
            <br>(1) The energy content should be within ±10%,<br>with the energy ratio of carbohydrates to protein to fat set at 55-65%: 7-20%: 15-30%.
            <br>(2) The menu is designed considering the intake of various micronutrients,<br>such as vitamins and minerals.
            <br>
            <br>In this way, school meals in Korea are structured to meet the nutritional needs necessary for students' growth and health, and to help develop healthy eating habits, following the School Meal Act.`
	},
	ko: {
		타이틀: "자율선택급식 체험"
		, 선택된_식단: "내가 선택한 식단"
		, 설명: `학교급식의 영양관리기준은 학교급식 기본 방향에 따라,
            <br>(1) 에너지는 ±10%로, 탄수화물: 단백질: 지방의 비율이 각각 55~65%: 7~20%: 15~30%가 되도록 구성하고 있습니다.
            <br>(2) 비타민, 무기질 등 다양한 미량 영양소 섭취를 고려하여 식단을 구성하고 있습니다.
            <br>
            <br>이렇게 한국의 학교급식은 학교급식법에 따라 학생의 발육과 건강에 필요한 영양을 충족하고<br>올바른 식생활습관 형성에 도움을 줄 수 있도록 다양한 식품으로 구성하고 있습니다.`
	}
};

function setLanguage(language) {
	document.querySelectorAll("[data-i18n]").forEach(element => {
		const key = element.getAttribute("data-i18n");
		element.innerHTML = translations[language][key];
	});
}