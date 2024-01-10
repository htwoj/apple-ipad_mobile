# 예제 3 - apple-ipad 반응형 페이지(모바일 모드)

## 설명
- HTML/CSS/JS를 활용하여 ipad 제품 페이지 구현
- 모바일 모드의 반응형 페이지
- 라이브러리 사용 안함
- [DEMO 페이지로 이동](https://kaleidoscopic-kitsune-2d3a82.netlify.app/)


## 주요 파일/폴더
**index.html**  
**css**
- main.css

**js**
- main.js

**images**
- 헤더라인, 아이콘 등 이미지

**data**
- ipads.js // ipad 종류 정보
- navigations.js // 바로가기 페이지 정보

**videos**
- center-stage.mp4 // 영상 삽입용(javascript로 video 태그 제어)

## 기타

**[CSS 변수]**  
- --로 시작하는 변수 선언으로 값 할당  
  ex) --color-font: #1d1d1d;  
- var() 함수 사용  
  ex) var(--color-font);

**[Sprite Animation]**  
- 여러 이미지를 한 이미지로 합쳐서 관리하는 방식
- animation은 @keyframes와 세트

**[VSCODE 확장 프로그램]**
- COMMENT TAGGED TEMPLATES
- 언어를 지정하는 주석을 사용해 템플릿 문자열에 대한 태그 하이라이트 표시 가능  
  ex) const div = /*html*/ \`<div> ${ipad.name}</div> \`;