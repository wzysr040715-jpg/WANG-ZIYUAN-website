/* =========================================================
   project.js — project.html 전용
   ---------------------------------------------------------
   동작 흐름:
   1. URL에서 ?id= 값을 읽는다
   2. projects.json 을 fetch 한다
   3. id 가 일치하는 프로젝트 데이터를 찾는다
   4. 페이지의 슬롯들을 채운다
   ========================================================= */


/* ---------------------------------------------------------
   STEP 1. URL에서 id 읽기
   ---------------------------------------------------------
   project.html?id=sound-visualization 으로 접속하면
   URLSearchParams 로 "sound-visualization" 을 꺼낼 수 있습니다.
--------------------------------------------------------- */
const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');  // "sound-visualization"

// id 없이 접속했으면 목록으로 돌려보냄
if (!projectId) {
  window.location.href = 'index.html';
}


/* ---------------------------------------------------------
   STEP 2. projects.json fetch → 해당 프로젝트 찾기 → 페이지 채우기
--------------------------------------------------------- */
fetch('data/projects.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (projects) {
    // id 가 일치하는 프로젝트 하나 찾기
    const project = projects.find(function (p) {
      return p.id === projectId;
    });

    // 없는 id 로 접속했으면 목록으로
    if (!project) {
      window.location.href = 'index.html';
      return;
    }

    renderDetail(project);
  })
  .catch(function (error) {
    console.error('projects.json 을 불러오지 못했습니다:', error);
  });


/* ---------------------------------------------------------
   STEP 3. 페이지 슬롯 채우기
--------------------------------------------------------- */
function renderDetail(project) {
  // 브라우저 탭 제목
  document.title = project.title + ' — Jinwoong Kim';

  // 텍스트 슬롯
  document.querySelector('#detail-title').textContent       = project.title;
  document.querySelector('#detail-role').textContent        = project.role;
  document.querySelector('#detail-description').textContent = project.description;

  // 이미지 슬롯: detailImages 배열을 순서대로 삽입
  const imagesEl = document.querySelector('#detail-images');
  project.detailImages.forEach(function (src) {
    const img = document.createElement('img');
    img.src       = src;
    img.alt       = project.title + ' 상세 이미지';
    img.className = 'detail-img';
    imagesEl.appendChild(img);
  });
}


/* ---------------------------------------------------------
   커스텀 마우스 커서 (index.html 과 동일)
--------------------------------------------------------- */
const cursor = document.querySelector('.custom-cursor');

window.addEventListener('mousemove', function (e) {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});


/* ---------------------------------------------------------
   스크롤 — 네비게이션
--------------------------------------------------------- */
const navbar = document.querySelector('#navbar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
