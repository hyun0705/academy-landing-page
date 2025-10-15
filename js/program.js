// 탭 메뉴 기능
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// 페이지 로드 시 해시 확인
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1); // #제거
    
    // 해시가 있을 때 페이지 맨 위로 스크롤
    // 이유: 브라우저가 자동으로 id="winter" 또는 id="regular" 요소로 스크롤하기 때문
    if (hash) {
        // 약간의 지연을 두고 스크롤 (브라우저의 자동 스크롤 이후)
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    }
    
    if (hash === 'winter') {
        // 윈터 스쿨 탭 활성화
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        document.querySelector('[data-tab="winter"]').classList.add('active');
        document.getElementById('winter').classList.add('active');
    }
    // 기본값은 regular(정규 수업)이므로 별도 처리 불필요
});

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // 현재 스크롤 위치 저장
        const currentScrollY = window.scrollY;
        
        // 모든 탭 버튼과 콘텐츠에서 active 클래스 제거
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // 클릭한 탭 버튼과 해당 콘텐츠에 active 클래스 추가
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
        
        // URL 해시 업데이트 (히스토리에 추가하지 않음)
        history.replaceState(null, null, '#' + targetTab);
        
        // 스크롤 위치 복원
        window.scrollTo(0, currentScrollY);
    });
});

// CTA 버튼 클릭 이벤트
const ctaBtns = document.querySelectorAll('.cta-btn');

ctaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 메인 페이지의 지원하기 섹션으로 이동하고 폼 자동 열기
        window.location.href = 'index.html#apply';
    });
});