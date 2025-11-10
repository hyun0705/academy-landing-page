// 공지사항 펼치기/접기 기능
const noticeItems = document.querySelectorAll('.notice-item');

if (noticeItems.length > 0) {
    noticeItems.forEach(item => {
        const header = item.querySelector('.notice-header');
        
        header.addEventListener('click', () => {
            // 현재 아이템이 열려있는지 확인
            const isActive = item.classList.contains('active');
            
            // 모든 아이템 닫기
            noticeItems.forEach(i => i.classList.remove('active'));
            
            // 현재 아이템이 닫혀있었으면 열기
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });     
}