import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'


// HEADER
// 장바구니 버튼 이벤트
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

function showBasket() {
    basketEl.classList.add('show');
}
function hideBasket() {
    basketEl.classList.remove('show');
}

basketStarterEl.addEventListener('click', function(event){
    // 최상위 부모요소 window까지 적용되지 않도록 설정
    // 버튼을 클릭했을 때 드롭다운 메뉴가 나타나야 함
    event.stopPropagation();

    if (basketEl.classList.contains('show')){
        hideBasket();
    } else {
        showBasket();
    }
});

basketEl.addEventListener('click', function(event){
    // 드롭다운 메뉴 영역을 클릭했을 때 메뉴가 사라지지 않아야 함
    event.stopPropagation();
});

// 전체 화면 클릭 시, 메뉴가 사라짐
window.addEventListener('click', function(){
    hideBasket();
})


// HEADER
// 검색 버튼 이벤트
const headerEl = document.querySelector('header');
// 배열로 변환
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
// 배열로 변환
const searchDelayEl = [...searchWrapEl.querySelectorAll('li')];

function showSearch() {
    headerEl.classList.add('searching');
    // html 태그 찾기
    stopScroll();
    headerMenuEls.reverse().forEach(function(el, index) {
        // 순서 * 지연시간 / 애니메이션할 요소 개수
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'; 
    });
    // .reverse() 사용하지 않고 원래 순서대로 반복 처리
    searchDelayEl.forEach(function(el, index){
        el.style.transitionDelay = index * .4 / searchDelayEl.length + 's'; 
    });
    // 검색 input 요소의 focus 설정을 위한 setTimeout
    // input 요소가 나타난 후 동작
    setTimeout(function(){
        searchInputEl.focus();
    }, 600);
}
function hideSearch() {
    headerEl.classList.remove('searching');
    playScroll();
    headerMenuEls.reverse().forEach(function(el, index) {
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'; 
    });
    searchDelayEl.reverse().forEach(function(el, index){
        el.style.transitionDelay = index * .4 / searchDelayEl.length + 's'; 
    });
    // 나타날 때 원래 순서대로 처리해야해서 다시 뒤집어서 순서 돌려놓기
    searchDelayEl.reverse();

    // 검색바가 사라질 때 입력한 값 초기화
    searchInputEl.value="";
}

searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', function(event){
    // 데스크탑 레이아웃에서 클릭 이벤트가 버블링되어, 
    // 모바일 레이아웃에서 searchTextField가 클릭된 상태로 변하는 것을 방지
    // -> 버튼을 클릭한 게 textfield를 클릭한 것으로 인식하지 않는 것!!!
    event.stopPropagation();

    hideSearch();
});
searchShadowEl.addEventListener('click', hideSearch);


function playScroll() {
    document.documentElement.classList.remove('fixed');
}
function stopScroll() {
    document.documentElement.classList.add('fixed');
}



// HEADER
// (모바일) 헤더 메뉴 토글
const menuStarterEl = document.querySelector('header .menu-starter');
menuStarterEl.addEventListener('click', function() {
    if (headerEl.classList.contains('menuing')){
        headerEl.classList.remove('menuing');
        searchInputEl.value="";
        playScroll()
    } else {
        headerEl.classList.add('menuing');
        stopScroll();
    }
});

// HEADER
// (모바일) 헤더 검색
const searchTextFieldEl = document.querySelector('header .textfield');
const searchCancelEl = document.querySelector('header .search-canceler');

searchTextFieldEl.addEventListener('click', function(){
    headerEl.classList.add('searching--mobile');
    searchInputEl.focus()
})
searchCancelEl.addEventListener('click', function (){
    headerEl.classList.remove('searching--mobile');
})

// HEADER
// (모바일<->데스크탑모드) 검색창 변화
// 화면 크기가 달라졌을 때 검색 모드가 종료되도록 처리
window.addEventListener('resize', function(){
    if (window.innerWidth<=740){
        headerEl.classList.remove('searching');
    } else {
        headerEl.classList.remove('searching--mobile');
    }
})

// NAV
// (모바일) nav 메뉴 토글
const navEl = document.querySelector('nav');
const navMenuToggleEl = navEl.querySelector('.menu-toggler');
const navMenuShadowEl = navEl.querySelector('.shadow');

navMenuToggleEl.addEventListener('click', function() {
    if (navEl.classList.contains('menuing')) {
        hideNavMenu();
    } else {
        showNavMenu();
    }
})
navEl.addEventListener('click', function(event) {
    event.stopPropagation();
})

navMenuShadowEl.addEventListener('click', hideNavMenu);
window.addEventListener('click',  hideNavMenu);

function showNavMenu() {
    navEl.classList.add('menuing');
}
function hideNavMenu() {
    navEl.classList.remove('menuing');
}



// info가 들어간 POWER, DISPLAY, CAMERA, WIRELESS, 
// ACCESSORIES, IPADOS, APPS, PRIVACY, ACCESSIBILITY
// 요소의 가시성 관찰 로직
const io = new IntersectionObserver(function (entries){
    // entries는 `io.observe(el)`로 등록된 모든 관찰 대상의 배열
    entries.forEach(function(entry){
        // 사라질 때
        if(!entry.isIntersecting){
            return
        } else {
            entry.target.classList.add('show');
        }
    })
})
// 관찰할 요소 검색
const infoEls = document.querySelectorAll('.info');
// 관찰 시작
infoEls.forEach(function(el) {
    io.observe(el);
});


// CAMERA
// 비디오 재생
const video = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click', function() {
    video.play();
    playBtn.classList.add('hide');
    pauseBtn.classList.remove('hide');
});
pauseBtn.addEventListener('click', function() {
    video.pause();
    playBtn.classList.remove('hide');
    pauseBtn.classList.add('hide');
});



// COMPARE
// '당신에게 맞는 ipad는?' ipad 정보 렌더링
const itemsEl = document.querySelector('section.compare .items');
ipads.forEach(function(ipad) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    let colorList = '';
    ipad.colors.forEach(function(color){
        colorList += `<li style="background-color: ${color}"></li>`
    })

    // VSCODE 확장 프로그램 - COMMENT TAGGED TEMPLATES 사용
    itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
        <img src="${ipad.thumbnail}" alt="${ipad.name}">
    </div>
    <ul class="colors">
        ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
    `;

    itemsEl.append(itemEl);

})

// FOOTER
// NAVIGATION 바로가기 사이트
const navigationEl = document.querySelector('footer .navigations');

navigations.forEach(function(nav) {
    const mapEl = document.createElement('div');
    mapEl.classList.add('map');

    let mapList = ''
    nav.maps.forEach(function(map){
        mapList += /* html */ `<li>
        <a href="${map.url}">${map.name}</a>
        </li>`
    });

    mapEl.innerHTML = /* html */  `
    <h3>
        <span class="text">${nav.title}</span>
        <span class="icon">+</span>
    </h3>
    <ul>
        ${mapList}
    </ul>
    `;

    navigationEl.append(mapEl);
})


// FOOTER
// 아코디언 메뉴
const mapEls = document.querySelectorAll('footer .navigations .map');
mapEls.forEach(function (el) {
    const h3El = el.querySelector('h3');
    h3El.addEventListener('click', function() {
        // 클래스를 toggle (add, remove 메소드 동시 사용)
        el.classList.toggle('active');
    });
});


// FOOTER
// 올해 년도
const thisYear = document.querySelector('span.this-year');
thisYear.textContent = new Date().getFullYear();

