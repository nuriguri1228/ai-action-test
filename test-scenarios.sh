#!/bin/bash

# AI Action 워크플로우 테스트 시나리오 스크립트
# 이 스크립트는 각 워크플로우를 테스트하는 시나리오를 자동으로 실행합니다.

set -e  # 오류 발생 시 중단

echo "🤖 AI Action 워크플로우 테스트 시나리오"
echo "=========================================="
echo ""

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 함수: 선택 메뉴 표시
show_menu() {
    echo -e "${BLUE}어떤 시나리오를 테스트하시겠습니까?${NC}"
    echo ""
    echo "1) 시나리오 1: 자동 코드 리뷰 (Auto Code Review)"
    echo "2) 시나리오 2: 버그 자동 수정 (Auto Bug Fix)"
    echo "3) 시나리오 3: 문서 자동 업데이트 (Auto Documentation)"
    echo "4) 시나리오 4: 테스트 커버리지 개선 (Test Coverage)"
    echo "5) 시나리오 5: 의존성 업데이트 검토 (Dependency Review)"
    echo "6) 모든 시나리오 실행"
    echo "0) 종료"
    echo ""
    read -p "선택 (0-6): " choice
}

# 시나리오 1: 자동 코드 리뷰
test_auto_review() {
    echo -e "${GREEN}=== 시나리오 1: 자동 코드 리뷰 ===${NC}"

    BRANCH_NAME="test/auto-review-$(date +%s)"

    git checkout -b "$BRANCH_NAME"

    # 테스트 파일 생성
    cat > test-function.js << 'EOF'
// 테스트를 위한 간단한 함수
function calculateSum(a, b) {
  return a + b;
}

function divide(a, b) {
  // 잠재적 버그: 0으로 나누기 체크 없음
  return a / b;
}

// 보안 취약점 예제: SQL Injection 가능성
function getUserById(id) {
  const query = "SELECT * FROM users WHERE id = " + id;
  return database.query(query);
}

module.exports = { calculateSum, divide, getUserById };
EOF

    git add test-function.js
    git commit -m "Add test functions for auto review"
    git push origin "$BRANCH_NAME"

    echo -e "${YELLOW}PR 생성 중...${NC}"
    gh pr create \
        --title "테스트: 자동 코드 리뷰" \
        --body "자동 코드 리뷰 워크플로우를 테스트합니다. AI가 보안 취약점과 잠재적 버그를 찾아야 합니다."

    echo -e "${GREEN}✅ PR이 생성되었습니다. GitHub에서 자동 리뷰를 확인하세요!${NC}"
    git checkout -
}

# 시나리오 2: 버그 자동 수정
test_auto_bug_fix() {
    echo -e "${GREEN}=== 시나리오 2: 버그 자동 수정 ===${NC}"

    echo -e "${YELLOW}버그 이슈 생성 중...${NC}"
    gh issue create \
        --title "[BUG] 로그인 후 리다이렉션 오류" \
        --label "bug" \
        --body "## 문제 설명
로그인 성공 후 홈페이지로 이동하지 않고 빈 페이지가 표시됩니다.

## 재현 방법
1. 로그인 페이지에서 올바른 자격 증명으로 로그인
2. 제출 버튼 클릭
3. 빈 페이지가 표시됨

## 기대 동작
홈페이지(/home)로 리다이렉션 되어야 함

## 관련 파일
- auth.js
- routes.js

## 환경
- Browser: Chrome 120
- OS: macOS"

    echo -e "${GREEN}✅ 버그 이슈가 생성되었습니다. AI가 자동으로 분석을 시작합니다!${NC}"
}

# 시나리오 3: 문서 자동 업데이트
test_auto_docs() {
    echo -e "${GREEN}=== 시나리오 3: 문서 자동 업데이트 ===${NC}"

    BRANCH_NAME="feature/new-api-$(date +%s)"

    git checkout -b "$BRANCH_NAME"

    # src 디렉토리 생성
    mkdir -p src

    # API 파일 생성
    cat > src/api.js << 'EOF'
/**
 * User API Module
 * 사용자 관련 API 함수들을 제공합니다.
 */

/**
 * 사용자 정보를 가져옵니다.
 * @param {string} userId - 사용자 ID
 * @returns {Promise<Object>} 사용자 정보 객체
 */
async function getUserInfo(userId) {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }
  return response.json();
}

/**
 * 사용자 프로필을 업데이트합니다.
 * @param {string} userId - 사용자 ID
 * @param {Object} profileData - 업데이트할 프로필 데이터
 * @returns {Promise<Object>} 업데이트된 사용자 정보
 */
async function updateUserProfile(userId, profileData) {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData)
  });
  if (!response.ok) {
    throw new Error('Failed to update user profile');
  }
  return response.json();
}

/**
 * 사용자를 삭제합니다.
 * @param {string} userId - 사용자 ID
 * @returns {Promise<boolean>} 삭제 성공 여부
 */
async function deleteUser(userId) {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'DELETE'
  });
  return response.ok;
}

module.exports = { getUserInfo, updateUserProfile, deleteUser };
EOF

    git add src/api.js
    git commit -m "Add user API functions"
    git push origin "$BRANCH_NAME"

    echo -e "${YELLOW}PR 생성 및 병합 중...${NC}"
    PR_URL=$(gh pr create \
        --title "Add user API functions" \
        --body "새로운 사용자 API 함수를 추가했습니다." \
        --json url -q .url)

    echo -e "${YELLOW}PR을 병합하시겠습니까? (y/n)${NC}"
    read -p "선택: " merge_choice

    if [ "$merge_choice" = "y" ]; then
        gh pr merge --merge --delete-branch
        echo -e "${GREEN}✅ PR이 병합되었습니다. main 브랜치 변경 시 문서 업데이트 이슈가 자동 생성됩니다!${NC}"
    else
        echo -e "${YELLOW}PR이 생성되었습니다: $PR_URL${NC}"
        echo -e "${YELLOW}수동으로 병합하면 문서 업데이트가 트리거됩니다.${NC}"
    fi

    git checkout -
}

# 시나리오 4: 테스트 커버리지 개선
test_coverage() {
    echo -e "${GREEN}=== 시나리오 4: 테스트 커버리지 개선 ===${NC}"

    BRANCH_NAME="feature/user-service-$(date +%s)"

    git checkout -b "$BRANCH_NAME"

    # package.json 생성 (없는 경우)
    if [ ! -f package.json ]; then
        cat > package.json << 'EOF'
{
  "name": "ai-action-test",
  "version": "1.0.0",
  "description": "AI Action test repository",
  "scripts": {
    "test": "echo 'No tests found' && exit 0"
  }
}
EOF
        git add package.json
    fi

    # src 디렉토리 생성
    mkdir -p src

    # 테스트 없는 서비스 클래스 생성
    cat > src/user-service.js << 'EOF'
/**
 * User Service
 * 사용자 관련 비즈니스 로직을 처리합니다.
 */
class UserService {
  constructor(database) {
    this.db = database;
  }

  /**
   * 새 사용자를 생성합니다.
   */
  async createUser(userData) {
    // 유효성 검사
    if (!userData.email || !userData.password) {
      throw new Error('Email and password are required');
    }

    if (!this.isValidEmail(userData.email)) {
      throw new Error('Invalid email format');
    }

    // 중복 확인
    const existing = await this.db.findOne('users', { email: userData.email });
    if (existing) {
      throw new Error('User already exists');
    }

    // 비밀번호 해시
    const hashedPassword = await this.hashPassword(userData.password);

    // 사용자 생성
    const user = await this.db.insert('users', {
      ...userData,
      password: hashedPassword,
      createdAt: new Date()
    });

    return user;
  }

  /**
   * 사용자를 삭제합니다.
   */
  async deleteUser(userId) {
    const user = await this.db.findById('users', userId);
    if (!user) {
      throw new Error('User not found');
    }

    return await this.db.delete('users', userId);
  }

  /**
   * 이메일 유효성을 검사합니다.
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * 비밀번호를 해시합니다.
   */
  async hashPassword(password) {
    // 실제로는 bcrypt 등을 사용해야 함
    return 'hashed_' + password;
  }
}

module.exports = UserService;
EOF

    git add src/user-service.js
    [ -f package.json ] && git add package.json
    git commit -m "Add user service without tests"
    git push origin "$BRANCH_NAME"

    echo -e "${YELLOW}PR 생성 중...${NC}"
    gh pr create \
        --title "Add user service" \
        --body "사용자 서비스 클래스를 추가했습니다. 테스트가 필요합니다."

    echo -e "${GREEN}✅ PR이 생성되었습니다. AI가 테스트 추가를 요청할 것입니다!${NC}"
    git checkout -
}

# 시나리오 5: 의존성 업데이트 검토
test_dependency_review() {
    echo -e "${GREEN}=== 시나리오 5: 의존성 업데이트 검토 ===${NC}"

    BRANCH_NAME="deps/update-dependencies-$(date +%s)"

    git checkout -b "$BRANCH_NAME"

    # package.json 생성 또는 업데이트
    cat > package.json << 'EOF'
{
  "name": "ai-action-test",
  "version": "1.0.0",
  "description": "AI Action test repository",
  "dependencies": {
    "express": "^5.0.0",
    "lodash": "^4.17.21",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "jest": "^30.0.0",
    "eslint": "^9.0.0"
  }
}
EOF

    git add package.json
    git commit -m "Bump express from 4.18.0 to 5.0.0

This is a major version update that includes breaking changes.
Please review carefully before merging."
    git push origin "$BRANCH_NAME"

    echo -e "${YELLOW}PR 생성 중...${NC}"
    gh pr create \
        --title "Bump express from 4.18.0 to 5.0.0" \
        --body "## 의존성 업데이트

Express를 4.18.0에서 5.0.0으로 업데이트합니다.

### 주요 변경사항
- Major version update
- Breaking changes 포함 가능성
- 성능 개선 및 보안 패치 포함

### 확인 필요
- API 변경사항
- 마이그레이션 가이드 확인
- 기존 코드 호환성"

    echo -e "${GREEN}✅ PR이 생성되었습니다. AI가 의존성 업데이트를 분석할 것입니다!${NC}"
    git checkout -
}

# 메인 루프
while true; do
    show_menu

    case $choice in
        1)
            test_auto_review
            ;;
        2)
            test_auto_bug_fix
            ;;
        3)
            test_auto_docs
            ;;
        4)
            test_coverage
            ;;
        5)
            test_dependency_review
            ;;
        6)
            echo -e "${YELLOW}모든 시나리오를 순차적으로 실행합니다...${NC}"
            test_auto_review
            sleep 2
            test_auto_bug_fix
            sleep 2
            test_coverage
            sleep 2
            test_dependency_review
            echo -e "${GREEN}✅ 모든 테스트 시나리오가 생성되었습니다!${NC}"
            echo -e "${YELLOW}참고: 시나리오 3(문서 업데이트)은 main 브랜치 병합이 필요하므로 별도로 실행하세요.${NC}"
            ;;
        0)
            echo -e "${GREEN}종료합니다.${NC}"
            exit 0
            ;;
        *)
            echo -e "${YELLOW}잘못된 선택입니다. 다시 시도하세요.${NC}"
            ;;
    esac

    echo ""
    echo -e "${BLUE}다른 시나리오를 테스트하시겠습니까?${NC}"
    echo ""
done
