// 요일별 탭 기능
const dayTabs = document.querySelectorAll('.day-tab');
const dayMenus = document.querySelectorAll('.day-menu');

if (dayTabs.length > 0) {
    dayTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const selectedDay = tab.getAttribute('data-day');
            
            // 모든 탭에서 active 제거
            dayTabs.forEach(t => t.classList.remove('active'));
            
            // 클릭한 탭에 active 추가
            tab.classList.add('active');
            
            // 모든 메뉴 숨기기
            dayMenus.forEach(menu => menu.classList.remove('active'));
            
            // 선택된 요일 메뉴만 보이기
            const selectedMenu = document.getElementById(selectedDay);
            if (selectedMenu) {
                selectedMenu.classList.add('active');
            }
        });
    });
}