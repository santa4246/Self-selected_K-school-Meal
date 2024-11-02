// script.js

const translations = {
	en: {
		index_content_desc: "index_content_desc index_content_desc index_content_desc index_content_desc index_content_desc"
	},
	ko: {
		index_content_desc: "우리 설명~ 두 세 줄 정도 지금부터 아무 말이나 해보겠습니다. 아무도 읽지 않을 수도 있지만 그래도 우리의 제작 의도와 목적을 설명해두면 좋을 것 같아요. 두 줄은 너무 짧나 싶어서 세 줄 정도 쓰는 게 좋을 것 같은데 옆에 공간 너무 비어보여서 급식과 관련된 기구나 재료 사진이라도 넣을까봐요."
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
  