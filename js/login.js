// ===== 탭 전환 기능 =====
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetTab = this.dataset.tab;

            // 모든 탭 버튼과 콘텐츠에서 active 클래스 제거
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // 클릭된 탭 버튼과 해당 콘텐츠에 active 클래스 추가
            this.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
});

// ===== 비밀번호 표시/숨김 토글 =====
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function () {
        const passwordInput = this.parentElement.querySelector('input');
        const icon = this.querySelector('i');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// ===== 로그인 폼 검증 =====
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const loginId = document.getElementById('login-id');
        const loginPassword = document.getElementById('login-password');
        let isValid = true;

        // 아이디 검증
        if (loginId.value.trim() === '') {
            showError(loginId, '아이디를 입력해주세요.');
            isValid = false;
        } else {
            clearError(loginId);
        }

        // 비밀번호 검증
        if (loginPassword.value.trim() === '') {
            showError(loginPassword, '비밀번호를 입력해주세요.');
            isValid = false;
        } else {
            clearError(loginPassword);
        }

        if (isValid) {
            // 실제 로그인 처리 로직
            alert('로그인 처리 중...');
            // 여기에 실제 서버 통신 코드 추가
            // window.location.href = 'index.html';
        }
    });
}

// ===== 회원가입 폼 검증 =====
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    // 아이디 중복확인 버튼
    const checkIdBtn = document.querySelector('.check-btn');
    let isIdChecked = false;

    if (checkIdBtn) {
        checkIdBtn.addEventListener('click', function () {
            const signupId = document.getElementById('signup-id');
            const idValue = signupId.value.trim();

            if (idValue === '') {
                showError(signupId, '아이디를 입력해주세요.');
                return;
            }

            if (idValue.length < 4 || idValue.length > 12) {
                showError(signupId, '아이디는 4-12자 사이여야 합니다.');
                return;
            }

            // 실제로는 서버에 중복 확인 요청
            // 여기서는 시뮬레이션
            setTimeout(() => {
                const isAvailable = Math.random() > 0.5; // 랜덤으로 사용 가능 여부 결정

                if (isAvailable) {
                    clearError(signupId);
                    signupId.classList.add('success');
                    showSuccess(signupId, '사용 가능한 아이디입니다.');
                    this.classList.add('checked');
                    this.textContent = '확인완료';
                    isIdChecked = true;
                } else {
                    showError(signupId, '이미 사용 중인 아이디입니다.');
                    isIdChecked = false;
                }
            }, 500);
        });
    }

    // 아이디 입력 필드 변경 시 중복확인 초기화
    const signupId = document.getElementById('signup-id');
    if (signupId) {
        signupId.addEventListener('input', function () {
            if (isIdChecked) {
                isIdChecked = false;
                checkIdBtn.classList.remove('checked');
                checkIdBtn.textContent = '중복확인';
                this.classList.remove('success');
            }
        });
    }

    // 전체 동의 체크박스
    const agreeAll = document.getElementById('agree-all');
    const agreeTerms = document.getElementById('agree-terms');
    const agreePrivacy = document.getElementById('agree-privacy');
    const agreeMarketing = document.getElementById('agree-marketing');

    if (agreeAll) {
        agreeAll.addEventListener('change', function () {
            const isChecked = this.checked;
            agreeTerms.checked = isChecked;
            agreePrivacy.checked = isChecked;
            agreeMarketing.checked = isChecked;
        });
    }

    // 개별 체크박스 변경 시 전체 동의 상태 업데이트
    [agreeTerms, agreePrivacy, agreeMarketing].forEach(checkbox => {
        if (checkbox) {
            checkbox.addEventListener('change', function () {
                const allChecked = agreeTerms.checked &&
                    agreePrivacy.checked &&
                    agreeMarketing.checked;
                agreeAll.checked = allChecked;
            });
        }
    });

    // 회원가입 폼 제출
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        // 이름 검증
        const signupName = document.getElementById('signup-name');
        if (signupName.value.trim() === '') {
            showError(signupName, '이름을 입력해주세요.');
            isValid = false;
        } else if (signupName.value.trim().length < 2) {
            showError(signupName, '이름은 2자 이상이어야 합니다.');
            isValid = false;
        } else {
            clearError(signupName);
        }

        // 아이디 검증
        const signupIdField = document.getElementById('signup-id');
        if (signupIdField.value.trim() === '') {
            showError(signupIdField, '아이디를 입력해주세요.');
            isValid = false;
        } else if (signupIdField.value.length < 4 || signupIdField.value.length > 12) {
            showError(signupIdField, '아이디는 4-12자 사이여야 합니다.');
            isValid = false;
        } else if (!isIdChecked) {
            showError(signupIdField, '아이디 중복확인을 해주세요.');
            isValid = false;
        } else {
            clearError(signupIdField);
        }

        // 비밀번호 검증
        const signupPassword = document.getElementById('signup-password');
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (signupPassword.value.trim() === '') {
            showError(signupPassword, '비밀번호를 입력해주세요.');
            isValid = false;
        } else if (signupPassword.value.length < 8) {
            showError(signupPassword, '비밀번호는 8자 이상이어야 합니다.');
            isValid = false;
        } else if (!passwordRegex.test(signupPassword.value)) {
            showError(signupPassword, '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.');
            isValid = false;
        } else {
            clearError(signupPassword);
        }

        // 비밀번호 확인 검증
        const signupPasswordConfirm = document.getElementById('signup-password-confirm');
        if (signupPasswordConfirm.value.trim() === '') {
            showError(signupPasswordConfirm, '비밀번호를 다시 입력해주세요.');
            isValid = false;
        } else if (signupPassword.value !== signupPasswordConfirm.value) {
            showError(signupPasswordConfirm, '비밀번호가 일치하지 않습니다.');
            isValid = false;
        } else {
            clearError(signupPasswordConfirm);
        }

        // 이메일 검증
        const signupEmail = document.getElementById('signup-email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (signupEmail.value.trim() === '') {
            showError(signupEmail, '이메일을 입력해주세요.');
            isValid = false;
        } else if (!emailRegex.test(signupEmail.value)) {
            showError(signupEmail, '올바른 이메일 형식이 아닙니다.');
            isValid = false;
        } else {
            clearError(signupEmail);
        }

        // 전화번호 검증
        const signupPhone = document.getElementById('signup-phone');
        const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;

        if (signupPhone.value.trim() === '') {
            showError(signupPhone, '전화번호를 입력해주세요.');
            isValid = false;
        } else if (!phoneRegex.test(signupPhone.value)) {
            showError(signupPhone, '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)');
            isValid = false;
        } else {
            clearError(signupPhone);
        }

        // 학년 검증
        const signupGrade = document.getElementById('signup-grade');
        if (signupGrade.value === '') {
            showError(signupGrade, '학년을 선택해주세요.');
            isValid = false;
        } else {
            clearError(signupGrade);
        }

        // 약관 동의 검증
        if (!agreeTerms.checked) {
            alert('이용약관에 동의해주세요.');
            isValid = false;
        }

        if (!agreePrivacy.checked) {
            alert('개인정보 수집 및 이용에 동의해주세요.');
            isValid = false;
        }

        if (isValid) {
            // 실제 회원가입 처리 로직
            alert('회원가입이 완료되었습니다!');
            // 여기에 실제 서버 통신 코드 추가
            // window.location.href = 'index.html';
        }
    });
}

// ===== 에러 메시지 표시 함수 =====
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');

    input.classList.add('error');
    input.classList.remove('success');

    if (errorMessage) {
        errorMessage.textContent = message;
    }
}

// ===== 성공 메시지 표시 함수 =====
function showSuccess(input, message) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');

    input.classList.remove('error');
    input.classList.add('success');

    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.color = '#10b981';
    }
}

// ===== 에러 메시지 제거 함수 =====
function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');

    input.classList.remove('error');

    if (errorMessage) {
        errorMessage.textContent = '';
        errorMessage.style.color = '#ef4444';
    }
}

// ===== 전화번호 자동 포맷팅 =====
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function (e) {
        let value = e.target.value.replace(/[^0-9]/g, '');

        if (value.length <= 3) {
            e.target.value = value;
        } else if (value.length <= 7) {
            e.target.value = value.slice(0, 3) + '-' + value.slice(3);
        } else if (value.length <= 11) {
            e.target.value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
        } else {
            e.target.value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
        }
    });
});

// ===== 소셜 로그인 버튼 =====
const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach(button => {
    button.addEventListener('click', function () {
        const provider = this.classList.contains('kakao') ? '카카오' :
            this.classList.contains('naver') ? '네이버' : '구글';
        alert(`${provider} 로그인 기능은 준비 중입니다.`);
    });
});

// ===== 실시간 입력 검증 =====
document.addEventListener('DOMContentLoaded', function () {
    // 이름 실시간 검증
    const signupName = document.getElementById('signup-name');
    if (signupName) {
        signupName.addEventListener('blur', function () {
            if (this.value.trim() !== '' && this.value.trim().length < 2) {
                showError(this, '이름은 2자 이상이어야 합니다.');
            } else if (this.value.trim() !== '') {
                clearError(this);
            }
        });
    }

    // 비밀번호 실시간 검증
    const signupPassword = document.getElementById('signup-password');
    if (signupPassword) {
        signupPassword.addEventListener('blur', function () {
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (this.value !== '' && this.value.length < 8) {
                showError(this, '비밀번호는 8자 이상이어야 합니다.');
            } else if (this.value !== '' && !passwordRegex.test(this.value)) {
                showError(this, '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.');
            } else if (this.value !== '') {
                clearError(this);
            }
        });
    }

    // 비밀번호 확인 실시간 검증
    const signupPasswordConfirm = document.getElementById('signup-password-confirm');
    if (signupPasswordConfirm && signupPassword) {
        signupPasswordConfirm.addEventListener('input', function () {
            if (this.value !== '' && signupPassword.value !== this.value) {
                showError(this, '비밀번호가 일치하지 않습니다.');
            } else if (this.value !== '' && signupPassword.value === this.value) {
                clearError(this);
                this.classList.add('success');
            }
        });
    }

    // 이메일 실시간 검증
    const signupEmail = document.getElementById('signup-email');
    if (signupEmail) {
        signupEmail.addEventListener('blur', function () {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value !== '' && !emailRegex.test(this.value)) {
                showError(this, '올바른 이메일 형식이 아닙니다.');
            } else if (this.value !== '') {
                clearError(this);
            }
        });
    }
});