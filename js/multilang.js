const translations = {
	en: {
		index_title1: "Self-"
        , index_title2: "selection<br>"
        , index_title3: " K-School Meal programs"
        , index_title4: " Experience"
		, index_title_desc1: "The students who are the main agents<br>of Korean school meals (autonomously)"
		, index_title_desc2: "In a nutritional balance"
		, index_title_desc3: "Choose Healthy Food"
		, index_content_desc1: "학생의 자율권과 선택권을 확대하여 개개인의 필요한 영양량에 맞는 다양한 식단을 제공하여 <br>스스로 선택하게 함으로써 주도적으로 건강한 식습관을 실천할 수 있는 경기도교육청 정책"
		, index_content_desc2: "미래학교급식으로의 발전방향이며, 학생들이 개인의 식사관리 역량을 넘어 <br>공동체성 기반 지속가능한 실천적 식생활관리역량을 함양할 수 있는 경기도교육청 정책"
		, index_produce: "Produced by nutrition teachers Seo A-ram, Cho Hyo-hyun, and Cha Seul-gi<br>/ Development advisor Kang Minhyeok"
	},
	ko: {
		index_title1: "자율"
        , index_title2: "선택"
        , index_title3: "급식"
        , index_title4: " 체험"
		, index_title_desc1: "학교급식의 주체인 학생들이 자율로"
		, index_title_desc2: "영양적으로 균형있게"
		, index_title_desc3: "건강한 식품을 선택하는 경기도교육청 정책"
		, index_content_desc1: "학생의 자율권과 선택권을 확대하여 개개인의 필요한 영양량에 맞는 다양한 식단을 제공하여 <br>스스로 선택하게 함으로써 주도적으로 건강한 식습관을 실천할 수 있는 경기도교육청 정책"
		, index_content_desc2: "미래학교급식으로의 발전방향이며, 학생들이 개인의 식사관리 역량을 넘어 <br>공동체성 기반 지속가능한 실천적 식생활관리역량을 함양할 수 있는 경기도교육청 정책"
		, index_produce: "영양교사 서아람, 조효현, 차슬기 제작 / 개발 자문 강민혁"
	}
};

function setLanguage(language) {
	localStorage.setItem("language", language);
    setStyle(language);

	document.querySelectorAll("[data-i18n]").forEach(element => {
		const key = element.getAttribute("data-i18n");
		element.innerHTML = translations[language][key];
	});
}

document.addEventListener("DOMContentLoaded", () => {
	const savedLanguage = localStorage.getItem("language") || "ko";
    setStyle(savedLanguage);
    
	setLanguage(savedLanguage);
});

function setStyle(lang){
    let h1_size = document.getElementById('title-desc-h1');
    let title_desc = document.getElementById('title-desc');

    if (lang === "ko") {
        h1_size.style.fontSize = '90px';
    } else {
        h1_size.style.fontSize = '62px';
        title_desc.style.marginBottom = '30px';
    }
}