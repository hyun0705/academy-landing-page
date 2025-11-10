// 필터 버튼 기능
const filterBtns = document.querySelectorAll('.filter-btn');
const materialItems = document.querySelectorAll('.material-item');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const noResults = document.querySelector('.no-results');

let currentFilter = 'all';

// 필터 버튼 클릭 이벤트
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 모든 버튼 비활성화
            filterBtns.forEach(b => b.classList.remove('active'));

            // 클릭한 버튼 활성화
            btn.classList.add('active');

            // 현재 필터 저장
            currentFilter = btn.getAttribute('data-subject');

            // 필터링 실행
            filterMaterials();
        })
    })
}

// 필터링 함수
function filterMaterials() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visibleCount = 0;

    materialItems.forEach(item => {
        const subject = item.getAttribute('data-subject');
        const title = item.querySelector('.material-title').textContent.toLowerCase();
        const desc = item.querySelector('.material-desc').textContent.toLowerCase();

        // 과목 필터 확인
        const matchesFilter = currentFilter === 'all' || subject === currentFilter;

        // 검색어 확인 (검색어가 있는 경우만)
        const matchesSearch = searchTerm === '' ||
            title.includes(searchTerm) ||
            desc.includes(searchTerm);

        if (matchesFilter && matchesSearch) {
            item.classList.remove('hidden');
            visibleCount++;
        } else {
            item.classList.add('hidden');
        }
    });

    // 결과 없음 표시
    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

// 검색 기능
if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 실시간 검색(검색창 비어있으면 초기화)
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') {
            filterMaterials();
        }
    });
}

// 검색 실행
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        filterMaterials();
        return;
    }

    let visibleCount = 0;

    materialItems.forEach(item => {
        const title = item.querySelector('.material-title').textContent.toLowerCase();
        const desc = item.querySelector('.material-desc').textContent.toLowerCase();
        const subject = item.getAttribute('data-subject');

        // 과목 필터와 검색어 모두 만족하는 경우
        const matchesFilter = currentFilter === 'all' || subject === currentFilter;
        const matchesSearch = title.includes(searchTerm) || desc.includes(searchTerm);

        if (matchesFilter && matchesSearch) {
            item.classList.remove('hidden');
            visibleCount++;
        } else {
            item.classList.add('hidden');
        }
    });

    // 결과 없음 표시
    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}


// 다운로드 버튼 클릭 이벤트 (선택사항)
const downloadBtns = document.querySelectorAll('.download-btn');

if (downloadBtns.length > 0) {
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const item = e.target.closest('.material-item');
            const title = item.querySelector('.material-title').textContent;

            // 실제 다운로드 기능은 서버와 연동 필요
            // 여기서는 알림만 표시
            alert(`"${title}" 다운로드를 시작합니다.`);
        });
    });
}