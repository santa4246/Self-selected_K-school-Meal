const translations = {
	en: {
		index_title: "AA"
		, index_title_desc: "AAAA"
		, index_content_desc: "AAAAAAAAAAAA"
		, index_produce: "AAAAAAAAAAAAAAAAAAAAAAAA"
	},
	ko: {
		index_title: "자율 선택 급식 체험"
		, index_title_desc: "자율, 균형, 미래, 선택급식이 들어갔으면 좋겠다."
		, index_content_desc: "우리 설명~ 두 세 줄 정도 지금부터 아무 말이나 해보겠습니다. 아무도 읽지 않을 수도 있지만 그래도 우리의 제작 의도와 목적을 설명해두면 좋을 것 같아요. 두 줄은 너무 짧나 싶어서 세 줄 정도 쓰는 게 좋을 것 같은데 옆에 공간 너무 비어보여서 급식과 관련된 기구나 재료 사진이라도 넣을까봐요."
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
  