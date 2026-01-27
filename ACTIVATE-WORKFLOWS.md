# 워크플로우 활성화 및 테스트 가이드

이 가이드는 AI Action 워크플로우를 실제로 활성화하고 테스트하는 방법을 단계별로 안내합니다.

## 🚀 빠른 시작 (5분 안에 실행)

### 1단계: 워크플로우 파일 복사

터미널에서 다음 명령어를 실행하세요:

```bash
# 모든 예제 워크플로우를 .github/workflows/로 복사
cp workflow-example-1-auto-review.yml .github/workflows/auto-review.yml
cp workflow-example-2-auto-bug-fix.yml .github/workflows/auto-bug-fix.yml
cp workflow-example-3-auto-docs.yml .github/workflows/auto-docs.yml
cp workflow-example-4-test-coverage.yml .github/workflows/test-coverage.yml
cp workflow-example-5-dependency-review.yml .github/workflows/dependency-review.yml

# 변경사항 커밋 및 푸시
git add .github/workflows/*.yml
git commit -m "🤖 Add AI Action workflow examples"
git push
```

또는 하나씩 테스트하려면:

```bash
# 1번 워크플로우만 활성화 (자동 코드 리뷰)
cp workflow-example-1-auto-review.yml .github/workflows/auto-review.yml
git add .github/workflows/auto-review.yml
git commit -m "Add auto code review workflow"
git push
```

### 2단계: 각 시나리오 테스트

워크플로우를 활성화한 후, 아래 테스트 시나리오를 실행하여 동작을 확인하세요.

---

## 📋 시나리오별 테스트 가이드

### 시나리오 1: 자동 코드 리뷰 테스트

**워크플로우:** `auto-review.yml`
**트리거:** PR 생성 또는 업데이트 시

#### 테스트 방법:

```bash
# 1. 테스트 브랜치 생성
git checkout -b test/auto-review

# 2. 테스트 파일 생성 (간단한 코드 추가)
cat > test-function.js << 'EOF'
// 테스트를 위한 간단한 함수
function calculateSum(a, b) {
  return a + b;
}

function divide(a, b) {
  // 잠재적 버그: 0으로 나누기 체크 없음
  return a / b;
}

module.exports = { calculateSum, divide };
EOF

# 3. 커밋 및 푸시
git add test-function.js
git commit -m "Add test functions"
git push origin test/auto-review

# 4. PR 생성
gh pr create \
  --title "테스트: 자동 코드 리뷰" \
  --body "자동 코드 리뷰 워크플로우를 테스트합니다."

# 5. PR 페이지를 확인하면 자동으로 AI 리뷰가 추가됩니다!
```

**기대 결과:**
- PR에 자동으로 `@claude` 코멘트가 추가됨
- AI가 코드를 리뷰하고 피드백 제공
- `divide` 함수의 0으로 나누기 문제를 지적해야 함
- `ai-reviewed` 라벨이 자동으로 추가됨

---

### 시나리오 2: 버그 자동 수정 테스트

**워크플로우:** `auto-bug-fix.yml`
**트리거:** `bug` 라벨이 붙은 이슈 생성 시

#### 테스트 방법 A: 라벨을 통한 트리거

```bash
# 1. 버그 이슈 생성
gh issue create \
  --title "로그인 후 리다이렉션 오류" \
  --label "bug" \
  --body "로그인 성공 후 홈페이지로 이동하지 않고 빈 페이지가 표시됩니다.

관련 파일: auth.js 또는 routes.js
재현 방법:
1. 로그인 페이지에서 올바른 자격 증명으로 로그인
2. 제출 버튼 클릭
3. 빈 페이지가 표시됨

기대 동작: 홈페이지(/home)로 리다이렉션 되어야 함"

# 2. 워크플로우가 자동 실행되고 AI가 이슈에 코멘트를 남깁니다
# 3. GitHub Issues 페이지에서 결과 확인
```

#### 테스트 방법 B: [BUG] 제목을 통한 트리거

```bash
# 제목에 [BUG]를 포함하여 이슈 생성
gh issue create \
  --title "[BUG] 사용자 프로필 이미지가 표시되지 않음" \
  --body "사용자 프로필 페이지에서 프로필 이미지가 깨져서 표시됩니다.

오류 메시지: Failed to load resource: the server responded with a status of 404
이미지 URL: /uploads/profile/undefined.jpg

예상 원인: 이미지 업로드 시 파일명이 제대로 저장되지 않는 것 같습니다."
```

**기대 결과:**
- `ai-processing` 라벨이 자동으로 추가됨
- AI가 이슈에 코멘트를 남기며 버그 분석 시작
- 관련 파일을 찾고 수정 사항을 제안
- 필요시 PR을 자동으로 생성

---

### 시나리오 3: 문서 자동 업데이트 테스트

**워크플로우:** `auto-docs.yml`
**트리거:** main 브랜치에 코드 변경 병합 시

#### 테스트 방법:

```bash
# 1. 기능 브랜치 생성
git checkout -b feature/new-api

# 2. 새로운 API 함수 추가
mkdir -p src
cat > src/api.js << 'EOF'
/**
 * 사용자 정보를 가져오는 API
 */
async function getUserInfo(userId) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

/**
 * 사용자 프로필을 업데이트하는 API
 */
async function updateUserProfile(userId, profileData) {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData)
  });
  return response.json();
}

module.exports = { getUserInfo, updateUserProfile };
EOF

# 3. 커밋 및 PR 생성
git add src/api.js
git commit -m "Add user API functions"
git push origin feature/new-api

gh pr create \
  --title "Add user API functions" \
  --body "새로운 사용자 API 함수를 추가했습니다."

# 4. PR 병합
gh pr merge --merge

# 5. main 브랜치로 돌아가기
git checkout main
git pull

# 6. 워크플로우가 자동으로 실행되고 문서 업데이트 이슈가 생성됩니다
```

**기대 결과:**
- main 브랜치 병합 후 자동으로 워크플로우 실행
- "📝 문서 업데이트" 이슈가 자동 생성됨
- 이슈에 변경된 파일과 함께 `@claude` 요청이 포함됨
- AI가 README.md 및 API 문서를 업데이트하는 PR 생성

---

### 시나리오 4: 테스트 커버리지 개선 테스트

**워크플로우:** `test-coverage.yml`
**트리거:** src/ 디렉토리 변경이 포함된 PR

#### 테스트 방법:

```bash
# 1. 테스트 브랜치 생성
git checkout -b feature/user-service

# 2. package.json 생성 (테스트 환경 설정)
cat > package.json << 'EOF'
{
  "name": "ai-action-test",
  "version": "1.0.0",
  "scripts": {
    "test": "echo 'No tests found' && exit 0"
  }
}
EOF

# 3. 테스트 없는 코드 추가
mkdir -p src
cat > src/user-service.js << 'EOF'
class UserService {
  constructor(database) {
    this.db = database;
  }

  async createUser(userData) {
    // 유효성 검사
    if (!userData.email || !userData.password) {
      throw new Error('Email and password are required');
    }

    // 사용자 생성
    const user = await this.db.insert('users', userData);
    return user;
  }

  async deleteUser(userId) {
    return await this.db.delete('users', userId);
  }
}

module.exports = UserService;
EOF

# 4. 커밋 및 PR 생성
git add package.json src/user-service.js
git commit -m "Add user service without tests"
git push origin feature/user-service

gh pr create \
  --title "Add user service" \
  --body "사용자 서비스 클래스를 추가했습니다."
```

**기대 결과:**
- 워크플로우가 실행되고 테스트 부족을 감지
- PR에 테스트 추가 요청 코멘트가 자동으로 추가됨
- `needs-tests` 라벨이 자동으로 추가됨
- AI가 누락된 테스트 케이스를 생성

---

### 시나리오 5: 의존성 업데이트 검토 테스트

**워크플로우:** `dependency-review.yml`
**트리거:** package.json 등 의존성 파일 변경 시

#### 테스트 방법 A: 수동 의존성 업데이트

```bash
# 1. 브랜치 생성
git checkout -b deps/update-dependencies

# 2. package.json 생성 또는 업데이트
cat > package.json << 'EOF'
{
  "name": "ai-action-test",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
EOF

# 3. 의존성 업데이트 시뮬레이션
cat > package.json << 'EOF'
{
  "name": "ai-action-test",
  "version": "1.0.0",
  "dependencies": {
    "express": "^5.0.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "jest": "^30.0.0"
  }
}
EOF

# 4. 커밋 및 PR 생성
git add package.json
git commit -m "Bump express from 4.18.0 to 5.0.0"
git push origin deps/update-dependencies

gh pr create \
  --title "Bump express from 4.18.0 to 5.0.0" \
  --body "의존성 업데이트: express를 최신 버전으로 업데이트합니다."
```

#### 테스트 방법 B: Dependabot 시뮬레이션

먼저 Dependabot을 활성화하려면:

```bash
# .github/dependabot.yml 파일 생성
mkdir -p .github
cat > .github/dependabot.yml << 'EOF'
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
EOF

git add .github/dependabot.yml
git commit -m "Add Dependabot configuration"
git push
```

**기대 결과:**
- 워크플로우가 의존성 업데이트를 감지
- AI가 다음 사항을 분석:
  - Major/Minor/Patch 업데이트 여부
  - Breaking changes 확인
  - 보안 취약점 수정 여부
  - 영향받는 코드 영역
- `dependencies` 및 `ai-reviewed` 라벨 자동 추가
- 보안 업데이트인 경우 `security` 라벨 추가

---

## 🔍 워크플로우 실행 확인

### GitHub Actions 페이지에서 확인

```bash
# 1. Actions 탭으로 이동
https://github.com/nuriguri1228/ai-action-test/actions

# 2. 각 워크플로우 클릭하여 실행 로그 확인
```

### CLI로 확인

```bash
# 최근 워크플로우 실행 목록 확인
gh run list --limit 10

# 특정 워크플로우 실행 상태 확인
gh run view <run-id>

# 실시간 로그 확인
gh run watch <run-id>
```

---

## 🐛 문제 해결

### 워크플로우가 실행되지 않는 경우

1. **GitHub Actions 권한 확인**
   - Settings → Actions → General
   - "Allow all actions and reusable workflows" 선택되어 있는지 확인

2. **워크플로우 파일 위치 확인**
   ```bash
   ls -la .github/workflows/
   # auto-review.yml 등의 파일이 있어야 함
   ```

3. **YAML 문법 오류 확인**
   ```bash
   # yamllint 설치 (macOS)
   brew install yamllint

   # YAML 검증
   yamllint .github/workflows/*.yml
   ```

4. **Claude OAuth 토큰 확인**
   - Settings → Secrets and variables → Actions
   - `CLAUDE_CODE_OAUTH_TOKEN`이 설정되어 있는지 확인

### AI가 응답하지 않는 경우

1. **권한 확인**
   - 워크플로우 파일의 `permissions` 섹션 확인
   - `contents: write`, `pull-requests: write`, `issues: write` 필요

2. **토큰 유효성 확인**
   - Claude OAuth 토큰이 만료되지 않았는지 확인

3. **트리거 조건 확인**
   - PR/이슈가 올바른 조건을 만족하는지 확인
   - 라벨, 파일 경로 등이 워크플로우 조건과 일치하는지 확인

---

## 📊 테스트 체크리스트

다음 체크리스트로 모든 시나리오를 테스트했는지 확인하세요:

- [ ] **시나리오 1**: PR 생성 시 자동 코드 리뷰가 실행됨
- [ ] **시나리오 2**: `bug` 라벨 이슈에 AI가 자동으로 응답함
- [ ] **시나리오 3**: main 병합 후 문서 업데이트 이슈가 생성됨
- [ ] **시나리오 4**: 테스트 없는 PR에 테스트 추가 요청이 생성됨
- [ ] **시나리오 5**: 의존성 업데이트 PR에 AI 리뷰가 추가됨

---

## 🎯 다음 단계

모든 테스트가 성공하면:

1. **팀과 공유**
   - 워크플로우 사용법을 팀원들과 공유
   - 피드백 수집

2. **커스터마이징**
   - 프로젝트에 맞게 AI 프롬프트 수정
   - 트리거 조건 조정
   - 라벨 체계에 맞게 수정

3. **모니터링**
   - 워크플로우 실행 결과 추적
   - 효과 측정 (리뷰 시간, 버그 수정 시간 등)

4. **최적화**
   - 불필요한 실행 줄이기
   - 캐싱 활용
   - 실행 비용 최적화

---

## 💡 유용한 팁

### 수동으로 AI 호출하기

워크플로우와 별개로 언제든 수동으로 AI를 호출할 수 있습니다:

```bash
# PR에 코멘트로 요청
gh pr comment <PR번호> --body "@claude 이 코드의 성능을 개선해주세요"

# 이슈에 코멘트로 요청
gh issue comment <이슈번호> --body "@claude 이 기능에 대한 테스트를 추가해주세요"
```

### 워크플로우 일시 비활성화

특정 워크플로우를 잠시 비활성화하려면:

```bash
# GitHub 웹 UI에서:
# Actions → 워크플로우 선택 → "..." 메뉴 → Disable workflow

# 또는 파일 이름 변경:
mv .github/workflows/auto-review.yml .github/workflows/auto-review.yml.disabled
git add .github/workflows/
git commit -m "Temporarily disable auto review"
git push
```

### 워크플로우 수동 실행

`workflow_dispatch` 트리거가 있는 워크플로우는 수동으로 실행할 수 있습니다:

```bash
# CLI로 수동 실행
gh workflow run auto-docs.yml

# 또는 GitHub 웹 UI에서:
# Actions → 워크플로우 선택 → "Run workflow" 버튼
```

---

**Happy Testing! 🚀**
