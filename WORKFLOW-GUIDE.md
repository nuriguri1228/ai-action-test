# AI Action 워크플로우 설치 가이드

이 가이드는 AI Action 워크플로우를 설치하고 활용하는 방법을 단계별로 설명합니다.

## 📋 목차

1. [빠른 시작](#빠른-시작)
2. [워크플로우 목록](#워크플로우-목록)
3. [설치 방법](#설치-방법)
4. [사용 예시](#사용-예시)
5. [커스터마이징](#커스터마이징)
6. [문제 해결](#문제-해결)

---

## 🚀 빠른 시작

### 1. 필수 준비사항

- GitHub 저장소에 대한 write 권한
- Claude Code OAuth 토큰 (`.github/workflows/claude.yml`에 이미 설정되어 있음)
- GitHub Actions가 활성화된 저장소

### 2. 5분 안에 시작하기

가장 유용한 워크플로우부터 시작해보세요:

```bash
# 1. 자동 코드 리뷰 워크플로우 설치
cp workflow-example-1-auto-review.yml .github/workflows/auto-review.yml

# 2. 변경사항 커밋
git add .github/workflows/auto-review.yml
git commit -m "Add auto code review workflow"
git push

# 3. PR을 생성하면 자동으로 AI 리뷰가 실행됩니다!
```

---

## 📚 워크플로우 목록

이 저장소에는 5개의 예제 워크플로우가 준비되어 있습니다:

### 1. 자동 코드 리뷰 (Auto Code Review)
**파일:** `workflow-example-1-auto-review.yml`

**언제 실행:** PR 생성 또는 업데이트 시

**하는 일:**
- 코드 품질 자동 검토
- 보안 취약점 스캔
- 성능 이슈 감지
- 베스트 프랙티스 확인

**추천 대상:** 모든 프로젝트 (가장 먼저 설치 권장)

---

### 2. 버그 자동 수정 (Auto Bug Fix)
**파일:** `workflow-example-2-auto-bug-fix.yml`

**언제 실행:** `bug` 라벨이 붙은 이슈 생성 시

**하는 일:**
- 버그 원인 자동 분석
- 수정 코드 작성
- 테스트 추가
- PR 자동 생성

**추천 대상:** 빠른 버그 수정이 중요한 프로젝트

---

### 3. 문서 자동 업데이트 (Auto Documentation)
**파일:** `workflow-example-3-auto-docs.yml`

**언제 실행:** main 브랜치에 코드 변경 병합 시

**하는 일:**
- 코드 변경사항 분석
- README 및 API 문서 자동 업데이트
- 예제 코드 추가
- CHANGELOG 업데이트

**추천 대상:** 문서가 중요한 오픈소스 프로젝트, 라이브러리

---

### 4. 테스트 커버리지 개선 (Test Coverage)
**파일:** `workflow-example-4-test-coverage.yml`

**언제 실행:** PR에서 테스트 커버리지가 낮을 때

**하는 일:**
- 커버리지 측정
- 누락된 테스트 자동 생성
- 엣지 케이스 테스트 추가

**추천 대상:** 높은 테스트 커버리지를 유지하려는 프로젝트

---

### 5. 의존성 업데이트 검토 (Dependency Review)
**파일:** `workflow-example-5-dependency-review.yml`

**언제 실행:** 의존성 파일이 변경된 PR

**하는 일:**
- Breaking changes 감지
- 보안 업데이트 확인
- 영향받는 코드 파악
- 마이그레이션 가이드 제공

**추천 대상:** Dependabot을 사용하는 모든 프로젝트

---

## 🛠️ 설치 방법

### 방법 1: 개별 설치 (권장)

필요한 워크플로우만 선택적으로 설치:

```bash
# 1번 워크플로우 설치 (자동 코드 리뷰)
cp workflow-example-1-auto-review.yml .github/workflows/auto-review.yml

# 2번 워크플로우 설치 (버그 자동 수정)
cp workflow-example-2-auto-bug-fix.yml .github/workflows/auto-bug-fix.yml

# 커밋
git add .github/workflows/
git commit -m "Add AI workflows"
git push
```

### 방법 2: 전체 설치

모든 워크플로우를 한번에 설치:

```bash
# 모든 예제 워크플로우 복사
cp workflow-example-*.yml .github/workflows/

# 파일명 변경 (example 제거)
cd .github/workflows
for file in workflow-example-*.yml; do
  mv "$file" "${file/workflow-example-/}"
done

# 커밋
git add .
git commit -m "Add all AI workflows"
git push
```

### 방법 3: 테스트 후 설치

먼저 하나의 워크플로우로 테스트:

```bash
# 1. 테스트 브랜치 생성
git checkout -b test-ai-workflows

# 2. 하나의 워크플로우만 설치
cp workflow-example-1-auto-review.yml .github/workflows/auto-review.yml

# 3. 커밋하고 푸시
git add .github/workflows/auto-review.yml
git commit -m "Test: Add auto review workflow"
git push origin test-ai-workflows

# 4. PR 생성하여 워크플로우 테스트
gh pr create --title "Test AI workflows" --body "Testing auto review"

# 5. 테스트가 성공하면 병합하고 더 많은 워크플로우 추가
```

---

## 💡 사용 예시

### 예시 1: 자동 코드 리뷰

```bash
# 1. 기능 브랜치에서 작업
git checkout -b feature/new-feature
# ... 코드 작성 ...
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# 2. PR 생성
gh pr create --title "Add new feature" --body "This PR adds..."

# 3. 자동으로 AI 리뷰가 시작됨 (수동 멘션 불필요)
# PR에 코멘트로 리뷰 결과가 자동으로 추가됩니다
```

### 예시 2: 버그 자동 수정

```bash
# 1. 버그 이슈 생성 (GitHub 웹 UI 또는 CLI)
gh issue create \
  --title "[BUG] Login redirect not working" \
  --body "After successful login, users see blank page instead of home" \
  --label "bug"

# 2. 워크플로우가 자동으로 실행됨
# 3. AI가 분석하고 수정 PR을 생성함
# 4. 생성된 PR을 검토하고 병합
```

### 예시 3: 수동으로 AI 요청

워크플로우와 별개로 언제든 AI에게 요청 가능:

```bash
# PR에 코멘트로 요청
gh pr comment 123 --body "@claude 이 코드의 성능을 개선해주세요"

# 이슈에 코멘트로 요청
gh issue comment 456 --body "@claude 이 기능에 대한 테스트를 추가해주세요"
```

---

## ⚙️ 커스터마이징

### 1. 트리거 조건 수정

워크플로우가 실행되는 조건을 변경할 수 있습니다:

```yaml
# 예: 특정 브랜치에서만 실행
on:
  pull_request:
    branches: [main, develop]  # main과 develop 브랜치 PR만
    types: [opened, synchronize]

# 예: 특정 파일 변경 시에만 실행
on:
  pull_request:
    paths:
      - 'src/**'  # src 디렉토리 변경 시에만
      - '!src/**/*.test.js'  # 테스트 파일 제외
```

### 2. AI 프롬프트 커스터마이징

각 워크플로우의 `@claude` 요청 내용을 프로젝트에 맞게 수정:

```yaml
# 예: 특정 코딩 스타일 강조
--body "@claude 이 PR을 리뷰해주세요.
특히 다음 규칙을 확인해주세요:
- ESLint 규칙 준수
- TypeScript strict 모드 호환
- React hooks 규칙 준수"

# 예: 특정 언어/프레임워크에 맞춤
--body "@claude Python PEP 8 스타일 가이드를 따르는지 확인하고,
타입 힌트가 적절히 사용되었는지 리뷰해주세요."
```

### 3. 라벨 커스터마이징

프로젝트의 라벨 체계에 맞게 수정:

```yaml
# workflow-example-2-auto-bug-fix.yml
if: |
  (github.event.label.name == 'bug') ||
  (github.event.label.name == 'high-priority-bug')  # 추가

# 또는 라벨 추가 부분 수정
--add-label "bug,ai-processing,priority-high"
```

### 4. 알림 추가

Slack, Discord 등으로 알림 전송:

```yaml
# 워크플로우 끝에 추가
- name: Notify Slack
  if: always()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    payload: |
      {
        "text": "AI 리뷰가 완료되었습니다: ${{ github.event.pull_request.html_url }}"
      }
```

---

## 🔧 프로젝트별 커스터마이징 예시

### JavaScript/TypeScript 프로젝트

```yaml
# workflow-example-4-test-coverage.yml 수정
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'  # 또는 'yarn', 'pnpm'

- name: Install and test
  run: |
    npm ci
    npm run test -- --coverage
```

### Python 프로젝트

```yaml
- name: Setup Python
  uses: actions/setup-python@v5
  with:
    python-version: '3.11'

- name: Install and test
  run: |
    pip install -r requirements.txt
    pytest --cov=src --cov-report=term-missing
```

### Go 프로젝트

```yaml
- name: Setup Go
  uses: actions/setup-go@v5
  with:
    go-version: '1.21'

- name: Run tests
  run: |
    go test -v -coverprofile=coverage.out ./...
    go tool cover -func=coverage.out
```

---

## 🐛 문제 해결

### 워크플로우가 실행되지 않음

**원인 1:** GitHub Actions가 비활성화됨
```bash
# 확인: Settings > Actions > General
# "Allow all actions and reusable workflows" 선택
```

**원인 2:** 워크플로우 파일 위치가 잘못됨
```bash
# 올바른 위치: .github/workflows/
ls -la .github/workflows/

# 잘못된 위치 예: github/workflows/ (점이 없음)
```

**원인 3:** YAML 문법 오류
```bash
# YAML 유효성 검사
yamllint .github/workflows/*.yml

# 또는 온라인 도구 사용
# https://www.yamllint.com/
```

### AI가 응답하지 않음

**원인 1:** Claude OAuth 토큰이 설정되지 않음
```bash
# Settings > Secrets and variables > Actions
# CLAUDE_CODE_OAUTH_TOKEN 확인
```

**원인 2:** `@claude` 멘션이 없음
```bash
# 수동 요청 시 반드시 @claude 포함
gh pr comment 123 --body "@claude 리뷰해주세요"
```

**원인 3:** 권한 부족
```yaml
# 워크플로우 파일에 필요한 권한 확인
permissions:
  contents: write
  pull-requests: write
  issues: write
```

### 테스트 커버리지 측정이 안됨

**원인:** 프로젝트에 맞지 않는 테스트 명령어
```yaml
# workflow-example-4-test-coverage.yml 수정
# 프로젝트의 실제 테스트 명령어 사용
- name: Run tests
  run: |
    # npm test
    # pytest --cov
    # go test -cover
    # 등 프로젝트에 맞게 수정
```

### 워크플로우 실행 비용 걱정

**최적화 방법:**

1. 조건부 실행
```yaml
# 특정 파일만 변경 시 실행
on:
  pull_request:
    paths:
      - 'src/**'
      - '!**/*.md'  # 문서 변경은 제외
```

2. 중복 실행 방지
```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true  # 이전 실행 취소
```

3. 캐싱 사용
```yaml
- name: Cache dependencies
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

---

## 📊 효과 측정

워크플로우 도입 후 다음 지표를 측정해보세요:

### Before vs After

| 지표 | 측정 방법 |
|------|----------|
| PR 리뷰 대기 시간 | PR 생성부터 첫 리뷰까지의 시간 |
| 버그 수정 시간 | 이슈 생성부터 PR 병합까지 |
| 테스트 커버리지 | 코드 커버리지 도구 사용 |
| 문서 최신화율 | 오래된 문서 개수 추적 |
| 개발자 만족도 | 팀 설문조사 |

### GitHub Insights 활용

```bash
# PR 통계 확인
gh pr list --state all --json createdAt,mergedAt,author

# 이슈 처리 시간 확인
gh issue list --state closed --json createdAt,closedAt,labels
```

---

## 🎯 다음 단계

1. **시작하기**
   - 가장 필요한 워크플로우 1-2개부터 설치
   - 1-2주 동안 테스트
   - 팀 피드백 수집

2. **확장하기**
   - 효과가 좋은 워크플로우 추가
   - 프로젝트에 맞게 커스터마이징
   - 새로운 시나리오 발굴

3. **최적화하기**
   - AI 프롬프트 개선
   - 실행 조건 최적화
   - 비용 효율성 검토

4. **공유하기**
   - 팀과 베스트 프랙티스 공유
   - 다른 프로젝트에 적용
   - 커뮤니티에 경험 공유

---

## 📞 도움말

- **Claude Code 문서**: [GitHub Repository](https://github.com/anthropics/claude-code)
- **GitHub Actions 문서**: [공식 문서](https://docs.github.com/actions)
- **문제 보고**: 이 저장소의 Issues 탭 사용

---

## 📝 추가 리소스

- [SCENARIOS.md](./SCENARIOS.md) - 상세한 사용 시나리오
- [README.md](./README.md) - 프로젝트 개요
- [.github/workflows/claude.yml](./.github/workflows/claude.yml) - 기본 Claude 워크플로우

---

**Happy Coding with AI! 🚀**
