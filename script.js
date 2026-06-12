/* =========================================================
   script.js — index.html 전용
   ---------------------------------------------------------
   변경점 (모달 → 상세 페이지 방식):
   - setupModal() 제거
   - 카드 클릭 시 project.html?id=... 으로 이동
   - 버튼 제거, 카드 전체(<a>)가 클릭 영역
   - 호버 시 제목 오버레이 표시는 CSS가 담당
   ========================================================= */


/* ---------------------------------------------------------
   projects.json 불러오기
--------------------------------------------------------- */
fetch('data/projects.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (projects) {
    renderProjects(projects);
  })
  .catch(function (error) {
    console.error('projects.json 을 불러오지 못했습니다:', error);
  });


/* ---------------------------------------------------------
   카드 렌더링
   ---------------------------------------------------------
   변경 전: <img> + <h3> + <button>
   변경 후: <a href="project.html?id=..."> 로 전체를 감싸고
            <img> + <div class="card-overlay"><h3></div>
            버튼은 없음. 카드 전체가 링크.
--------------------------------------------------------- */
function renderProjects(projects) {
  const list = document.querySelector('#project-list');

  projects.forEach(function (project) {
    const li = document.createElement('li');

    if (project.featured) {
      li.classList.add('featured');
    }

    li.innerHTML = `
      <a href="project.html?id=${project.id}">
        <img src="${project.thumbnail}" alt="${project.title} 썸네일">
        <div class="card-overlay">
          <h3>${project.title}</h3>
        </div>
      </a>
    `;

    list.appendChild(li);
  });
}


/* ---------------------------------------------------------
   스크롤 — 네비게이션 / TOP 버튼
--------------------------------------------------------- */
const navbar = document.querySelector('#navbar');
const topBtn = document.querySelector('.back-to-top-btn');

window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    topBtn.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    topBtn.classList.remove('visible');
  }
});


/* ---------------------------------------------------------
   커스텀 마우스 커서
--------------------------------------------------------- */
const cursor = document.querySelector('.custom-cursor');

window.addEventListener('mousemove', function (e) {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

const projectsSection = document.querySelector('#projects');

projectsSection.addEventListener('mouseover', function (e) {
  if (e.target.closest('#project-list li')) {
    cursor.style.transform = 'translate(-50%, -50%) scale(3)';
    cursor.style.backgroundColor = 'rgba(0, 123, 255, 0.2)';
  }
});

projectsSection.addEventListener('mouseout', function (e) {
  if (e.target.closest('#project-list li')) {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.backgroundColor = '#007bff';
  }
});
