const scrollBtn = document.querySelector('.scroll-btn');

if (scrollBtn) {
    // 스크롤 이벤트
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    // 클릭 이벤트
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

const applyBtn = document.querySelector('.apply-btn');
const applySection = document.querySelector('.apply-section');

if (applyBtn && applySection) {
    // 페이지 로드 시 해시 확인
    window.addEventListener('DOMContentLoaded', () => {
        if (window.location.hash === '#apply') {
            applySection.style.display = 'block';
            applyBtn.textContent = '접기';
            // 부드럽게 스크롤
            setTimeout(() => {
                applySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    });

    applyBtn.addEventListener('click', () => {
        if (applySection.style.display === 'none' || applySection.style.display === '') {
            applySection.style.display = 'block';
            applySection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            applyBtn.textContent = '접기';
        }
        else {
            applySection.style.display = 'none';
            applyBtn.textContent = '지원하기';
        }
    });
}

//스크롤 애니메이션
const scrollAnimateElements = document.querySelectorAll('.scroll-animate');
if (scrollAnimateElements.length > 0) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    scrollAnimateElements.forEach(element => {
        observer.observe(element);
    });
}