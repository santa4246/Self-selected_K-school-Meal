const translations = {
	en: {
		index_title: "ABC School Meal Experience Program"
		, index_title_desc: "The educational school meal policy where students, as the main participants in school meals, autonomously choose nutritious, balanced, and healthy foods"
		, index_content_desc: "A school meal policy aims to expand students' autonomy and choice by offering a variety of meal options that meet individual nutritional needs, allowing them to independently practice healthy eating habits. This represents the direction of future school meal programs, fostering the development of sustainable, community-based dietary management competencies beyond personal meal management skills."
		, index_produce: "Created by Nutrition Teachers Seo Ah-ram, Cho Hyo-hyun, and Cha Seul-gi / Development Advisory: Kang Min-hyeok"
	},
	ko: {
		index_title: "자율 선택 급식 체험"
		, index_title_desc: "학교급식의 주체인 학생들이 자율로, 영양적으로 균형있게, 건강한 식품을 선택하는 교육급식 정책"
		, index_content_desc: "학생의 자율권과 선택권을 확대하여 개개인의 필요한 영양량에 맞는 다양한 식단을 제공하여 스스로 선택하게 함으로써 주도적으로 건강한 식습관을 실천할 수 있는 학교급식 정책 미래학교급식으로의 발전방향이며, 학생들이 개인의 식사관리 역량을 넘어 공동체성 기반 지속가능한 실천적 식생활관리역량을 함양할 수 있는 학교급식 정책"
		, index_produce: "영양교사 서아람, 조효현, 차슬기 제작 / 개발 자문 강민혁"
	}
};

function setLanguage(language) {
	localStorage.setItem("language", language);

	document.querySelectorAll("[data-i18n]").forEach(element => {
		const key = element.getAttribute("data-i18n");
		element.textContent = translations[language][key];
	});
}

document.addEventListener("DOMContentLoaded", () => {
	const savedLanguage = localStorage.getItem("language") || "ko";
	setLanguage(savedLanguage);
});
  