# AI Action 예제 시나리오

이 디렉토리에는 AI Action을 실제로 테스트해볼 수 있는 5가지 예제 시나리오가 포함되어 있습니다.

## 📁 시나리오 목록

### [Scenario 1: Auto Code Review](./scenario-1-auto-review/)
**목적**: PR 생성 시 자동으로 AI 코드 리뷰 수행

**포함 파일**:
- `calculator.js` - 의도적으로 이슈가 있는 코드
- `README.md` - 테스트 가이드

**테스트 방법**:
```bash
cd examples/scenario-1-auto-review
# README.md 참고하여 테스트 PR 생성
```

**기대 효과**:
- ⚡ 즉각적인 코드 리뷰 (24/7)
- 🎯 일관된 품질 기준
- 🔍 보안, 성능, 품질 자동 검토

---

### [Scenario 2: Auto Bug Fix](./scenario-2-auto-bug-fix/)
**목적**: 버그 이슈 생성 시 자동으로 분석 및 수정

**포함 파일**:
- `user-auth.js` - 보안 취약점이 있는 인증 코드
- `BUG-REPORT.md` - 버그 리포트 템플릿
- `README.md` - 테스트 가이드

**테스트 방법**:
```bash
gh issue create \
  --title "[BUG] 비밀번호 평문 저장" \
  --body "@claude examples/scenario-2-auto-bug-fix/user-auth.js 파일의 보안 취약점을 수정해주세요" \
  --label "bug"
```

**기대 효과**:
- ⏱️ 버그 수정 시간 90% 단축
- 🤖 반복적 버그 즉시 해결
- 🌙 24/7 자동 대응

---

### [Scenario 3: Auto Documentation](./scenario-3-auto-docs/)
**목적**: 코드 변경 시 문서 자동 생성/업데이트

**포함 파일**:
- `api-service.js` - 문서가 없는 API 서비스
- `package.json` - 프로젝트 설정
- `README.md` - 테스트 가이드

**테스트 방법**:
```bash
gh pr comment <PR번호> \
  --body "@claude examples/scenario-3-auto-docs/api-service.js에 대한 포괄적인 문서를 생성해주세요"
```

**기대 효과**:
- 📝 항상 최신 문서 유지
- 🎨 일관된 문서 스타일
- 📚 자동 예제 생성

---

### [Scenario 4: Test Coverage](./scenario-4-test-coverage/)
**목적**: 테스트 커버리지가 낮을 때 자동으로 테스트 생성

**포함 파일**:
- `string-utils.js` - 테스트가 없는 유틸리티 함수들
- `README.md` - 테스트 가이드

**테스트 방법**:
```bash
gh pr comment <PR번호> \
  --body "@claude examples/scenario-4-test-coverage/string-utils.js에 대한 포괄적인 테스트를 작성해주세요"
```

**기대 효과**:
- 📊 테스트 커버리지 0% → 95%+
- 🎯 엣지 케이스 자동 발견
- ⚡ 테스트 작성 시간 80% 단축

---

### [Scenario 5: Dependency Review](./scenario-5-dependency-review/)
**목적**: 의존성 업데이트 시 영향 자동 분석

**포함 파일**:
- `package.json` - 의존성 정의
- `DEPENDENCY-UPDATE-EXAMPLE.md` - 업데이트 시나리오
- `README.md` - 테스트 가이드

**테스트 방법**:
```bash
# package.json의 의존성 버전 변경 후 PR 생성
# AI가 자동으로 영향 분석
```

**기대 효과**:
- 🔍 업데이트 영향 자동 파악
- ⚠️ Breaking changes 사전 감지
- 🛡️ 보안 업데이트 우선순위 파악

---

## 🚀 빠른 시작

### 1. 워크플로우 확인
```bash
ls -la ../.github/workflows/workflow-example-*.yml
```

각 시나리오에 대응하는 워크플로우 파일이 준비되어 있습니다.

### 2. 시나리오 선택
관심 있는 시나리오의 디렉토리로 이동하여 README.md를 확인하세요.

### 3. 테스트 실행
각 시나리오의 README.md에 있는 단계별 가이드를 따라 테스트하세요.

---

## 📊 시나리오별 난이도 및 소요 시간

| 시나리오 | 난이도 | 설정 시간 | 테스트 시간 | 효과 |
|---------|-------|---------|-----------|------|
| 1. Auto Code Review | ⭐⭐ | 5분 | 10분 | ⚡⚡⚡ |
| 2. Auto Bug Fix | ⭐⭐⭐ | 5분 | 15분 | ⚡⚡⚡ |
| 3. Auto Documentation | ⭐⭐ | 5분 | 10분 | ⚡⚡ |
| 4. Test Coverage | ⭐⭐⭐ | 10분 | 15분 | ⚡⚡⚡ |
| 5. Dependency Review | ⭐⭐ | 5분 | 10분 | ⚡⚡ |

---

## 🎯 추천 학습 순서

### 초보자
1. **Scenario 1** (Auto Code Review) - 가장 직관적이고 즉각적인 효과
2. **Scenario 3** (Auto Documentation) - 문서 생성 확인
3. **Scenario 2** (Auto Bug Fix) - 실제 코드 수정 경험

### 중급자
1. **Scenario 4** (Test Coverage) - 테스트 자동화
2. **Scenario 5** (Dependency Review) - 의존성 관리
3. **Scenario 2** (Auto Bug Fix) - 복잡한 버그 수정

### 고급자
- 모든 시나리오를 조합하여 완전한 CI/CD 파이프라인 구축
- 커스텀 워크플로우 작성
- 팀 워크플로우 최적화

---

## 💡 활용 팁

### Tip 1: 순차적으로 테스트
한 번에 하나의 시나리오만 테스트하여 AI의 동작을 명확히 이해하세요.

### Tip 2: 실제 프로젝트 적용
예제로 테스트 후, 자신의 프로젝트에 맞게 커스터마이징하세요.

### Tip 3: 팀과 공유
효과를 확인한 후 팀원들과 베스트 프랙티스를 공유하세요.

### Tip 4: 점진적 도입
모든 시나리오를 한 번에 도입하지 말고, 가장 필요한 것부터 시작하세요.

---

## 🔧 문제 해결

### AI가 응답하지 않을 때
1. `@claude` 멘션을 정확히 입력했는지 확인
2. GitHub Actions 워크플로우가 활성화되어 있는지 확인
3. CLAUDE_CODE_OAUTH_TOKEN이 설정되어 있는지 확인

### 워크플로우가 실행되지 않을 때
1. `.github/workflows/` 디렉토리에 워크플로우 파일이 있는지 확인
2. YAML 문법 오류가 없는지 확인
3. GitHub Actions 권한 설정 확인

### 더 자세한 문제 해결
[WORKFLOW-GUIDE.md](../WORKFLOW-GUIDE.md#문제-해결) 참고

---

## 📚 추가 리소스

- [SCENARIOS.md](../SCENARIOS.md) - 상세한 시나리오 설명 및 효과
- [WORKFLOW-GUIDE.md](../WORKFLOW-GUIDE.md) - 워크플로우 설치 및 커스터마이징
- [README.md](../README.md) - 프로젝트 전체 개요

---

## 🤝 기여하기

새로운 시나리오 아이디어가 있으시면 이슈를 생성해주세요!

---

**Happy Testing! 🚀**

각 시나리오를 직접 테스트하며 AI Action의 강력함을 경험해보세요.
