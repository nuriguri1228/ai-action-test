# 🚀 빠른 시작 가이드

이 가이드는 5분 안에 AI Action 워크플로우를 활성화하고 테스트하는 방법을 안내합니다.

## 📋 사전 준비

- ✅ GitHub 저장소에 대한 write 권한
- ✅ Claude Code OAuth 토큰 설정 (`.github/workflows/claude.yml`에 이미 설정됨)
- ✅ GitHub Actions 활성화

## ⚡ 3단계로 시작하기

### 1단계: 워크플로우 활성화 (1분)

#### 옵션 A: 스크립트 사용 (권장)

```bash
./activate-workflows.sh
```

스크립트를 실행하면 인터랙티브 메뉴가 나타납니다:
- 원하는 워크플로우 선택 (1-6)
- 자동으로 `.github/workflows/`로 복사
- 커밋 및 푸시 옵션 제공

#### 옵션 B: 수동 복사

```bash
# 가장 유용한 워크플로우부터 시작
cp workflow-example-1-auto-review.yml .github/workflows/auto-review.yml

# 커밋 및 푸시
git add .github/workflows/auto-review.yml
git commit -m "Add auto code review workflow"
git push
```

### 2단계: 테스트 시나리오 실행 (2분)

#### 옵션 A: 자동 스크립트 사용

```bash
./test-scenarios.sh
```

인터랙티브 메뉴에서 테스트하려는 시나리오를 선택하면:
- 자동으로 테스트 코드 생성
- PR 또는 이슈 자동 생성
- AI 워크플로우 트리거

#### 옵션 B: 수동 테스트

**자동 코드 리뷰 테스트:**

```bash
# 브랜치 생성
git checkout -b test/auto-review

# 테스트 파일 생성
echo "function divide(a, b) { return a / b; }" > test.js

# PR 생성
git add test.js
git commit -m "Add test function"
git push origin test/auto-review
gh pr create --title "Test auto review" --body "Testing AI review"
```

### 3단계: 결과 확인 (2분)

1. **GitHub 웹사이트로 이동**
   - PR 또는 이슈 페이지를 엽니다

2. **AI 응답 확인**
   - 자동으로 `@claude` 코멘트가 추가됩니다
   - AI가 분석 결과를 코멘트로 남깁니다

3. **워크플로우 로그 확인**
   - Actions 탭에서 워크플로우 실행 상태 확인
   - 로그를 통해 상세 실행 과정 확인

## 🎯 각 시나리오별 빠른 테스트

### 1️⃣ 자동 코드 리뷰

```bash
# 브랜치 생성 및 코드 추가
git checkout -b test/review
echo "function unsafe(x) { eval(x); }" > unsafe.js
git add unsafe.js && git commit -m "Add unsafe code"
git push origin test/review

# PR 생성
gh pr create --title "Test review" --body "Testing auto review"

# 결과: AI가 eval() 사용의 보안 위험을 지적
```

### 2️⃣ 버그 자동 수정

```bash
# 버그 이슈 생성
gh issue create \
  --title "[BUG] Login redirect broken" \
  --label "bug" \
  --body "Users see blank page after login instead of home page"

# 결과: AI가 버그를 분석하고 수정 제안
```

### 3️⃣ 문서 자동 업데이트

```bash
# 새 API 추가
mkdir -p src
echo "async function getUser(id) { return fetch(\`/api/users/\${id}\`); }" > src/api.js
git add src/api.js && git commit -m "Add user API"
git push

# main에 병합 후
# 결과: 자동으로 문서 업데이트 이슈 생성
```

### 4️⃣ 테스트 커버리지

```bash
# 테스트 없는 코드 추가
mkdir -p src
cat > src/service.js << 'EOF'
class UserService {
  async createUser(data) { /* ... */ }
  async deleteUser(id) { /* ... */ }
}
module.exports = UserService;
EOF

git add src/service.js && git commit -m "Add service"
git push origin test-branch

# PR 생성
gh pr create --title "Add service" --body "New service without tests"

# 결과: AI가 테스트 추가 요청
```

### 5️⃣ 의존성 업데이트

```bash
# package.json 업데이트
echo '{"dependencies": {"express": "^5.0.0"}}' > package.json
git add package.json && git commit -m "Bump express to 5.0.0"
git push origin deps/update

# PR 생성
gh pr create --title "Bump express" --body "Update to v5"

# 결과: AI가 breaking changes 분석
```

## 🔍 문제 해결

### 워크플로우가 실행되지 않음

```bash
# 1. GitHub Actions 활성화 확인
# Settings > Actions > General > "Allow all actions"

# 2. 워크플로우 파일 위치 확인
ls -la .github/workflows/

# 3. YAML 문법 확인
yamllint .github/workflows/*.yml
```

### AI가 응답하지 않음

```bash
# 1. Claude OAuth 토큰 확인
# Settings > Secrets > CLAUDE_CODE_OAUTH_TOKEN

# 2. 워크플로우 로그 확인
gh run list --limit 5
gh run view <run-id>
```

## 📚 더 알아보기

- **[ACTIVATE-WORKFLOWS.md](./ACTIVATE-WORKFLOWS.md)** - 완전한 활성화 및 테스트 가이드
- **[SCENARIOS.md](./SCENARIOS.md)** - AI Action이 기존 방식보다 나은 이유
- **[WORKFLOW-GUIDE.md](./WORKFLOW-GUIDE.md)** - 상세 설치 및 커스터마이징

## 💡 유용한 팁

### 수동으로 AI 호출

```bash
# PR에서
gh pr comment 123 --body "@claude 성능을 개선해주세요"

# 이슈에서
gh issue comment 456 --body "@claude 테스트를 추가해주세요"
```

### 워크플로우 수동 실행

```bash
# workflow_dispatch가 있는 워크플로우
gh workflow run auto-docs.yml
```

### 워크플로우 비활성화

```bash
# 파일명 변경으로 임시 비활성화
mv .github/workflows/auto-review.yml \
   .github/workflows/auto-review.yml.disabled
```

## ✅ 체크리스트

설정이 완료되었는지 확인하세요:

- [ ] 워크플로우 파일이 `.github/workflows/`에 있음
- [ ] GitHub Actions가 활성화되어 있음
- [ ] Claude OAuth 토큰이 설정되어 있음
- [ ] 테스트 PR 또는 이슈를 생성했음
- [ ] AI가 자동으로 응답함
- [ ] 워크플로우 로그에서 성공 확인

모든 항목을 체크했다면 성공입니다! 🎉

---

**다음 단계:** 팀과 공유하고, 프로젝트에 맞게 커스터마이징하세요!
