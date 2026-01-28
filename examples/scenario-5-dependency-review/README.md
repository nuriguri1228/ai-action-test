# Scenario 5: Dependency Update Review

## 개요
이 시나리오는 의존성 업데이트 PR에 대해 AI가 자동으로 영향을 분석하고 리포트하는 예제입니다.

## 테스트 방법

### 방법 1: 수동 의존성 업데이트

```bash
# 1. 새 브랜치 생성
git checkout -b deps/update-dependencies

# 2. package.json에서 의존성 버전 업데이트
# 예: "lodash": "^4.17.20" → "^4.17.21"

# 3. 커밋 및 푸시
git add examples/scenario-5-dependency-review/package.json
git commit -m "chore(deps): update lodash to fix security vulnerability"
git push origin deps/update-dependencies

# 4. PR 생성
gh pr create \
  --title "chore(deps): Security update for lodash" \
  --body "Updates lodash to address CVE-2021-23337"

# 5. 자동으로 AI 분석이 시작됨
# workflow-example-5-dependency-review.yml이 실행되어 영향 분석
```

### 방법 2: Dependabot 활용

1. **Dependabot 활성화**
   - Repository Settings → Security → Dependabot
   - "Enable Dependabot security updates" 체크

2. **자동 PR 생성 대기**
   - Dependabot이 자동으로 의존성 업데이트 PR 생성
   - AI가 자동으로 분석 시작

3. **분석 결과 확인**
   - PR 코멘트에서 AI의 영향 분석 확인
   - Breaking changes, 보안 이슈 등 리뷰

## package.json 분석

현재 프로젝트는 다음 의존성을 사용합니다:

### Production Dependencies
- **express** (4.18.2): 웹 프레임워크
- **lodash** (4.17.20): 유틸리티 라이브러리
- **axios** (1.4.0): HTTP 클라이언트
- **jsonwebtoken** (9.0.0): JWT 인증
- **bcrypt** (5.1.0): 비밀번호 해싱

### Dev Dependencies
- **jest** (29.5.0): 테스트 프레임워크
- **webpack** (5.88.0): 번들러
- **eslint** (8.45.0): 린터

## AI가 분석하는 항목

### 1. 보안 취약점
```markdown
🔒 **CVE 스캔**
- 알려진 보안 취약점 확인
- 심각도 평가 (Critical, High, Medium, Low)
- 영향 범위 분석
- 패치 여부 확인
```

### 2. Breaking Changes
```markdown
⚠️ **하위 호환성 분석**
- Major 버전 변경 감지
- API 변경사항 파악
- 마이그레이션 가이드 제공
- 영향받는 코드 위치 파악
```

### 3. 사용 현황
```markdown
📊 **코드베이스 분석**
- 해당 패키지 사용 빈도
- 사용 중인 API/함수 목록
- 영향받는 파일 목록
- 테스트 커버리지 확인
```

### 4. 업데이트 권장사항
```markdown
✅ **권장 사항**
- 업데이트 우선순위
- 예상 소요 시간
- 위험도 평가
- 테스트 체크리스트
```

## AI 분석 결과 예시

```markdown
## 🔍 의존성 업데이트 분석

### 📦 업데이트 내용
**패키지**: lodash
**변경**: 4.17.20 → 4.17.21
**타입**: Patch (패치)

---

### 🔒 보안 영향
⚠️ **CVE-2021-23337 수정**
- **설명**: Prototype pollution in template
- **심각도**: High (CVSS 7.4)
- **영향**: `_.template()` 사용 시 RCE 가능

**프로젝트 영향**:
✅ `_.template()` 미사용 - 직접적 영향 없음

---

### ⚡ Breaking Changes
✅ **Breaking changes 없음**

Patch 버전 업데이트로 하위 호환성 보장됨.

---

### 📊 사용 현황
프로젝트 내 lodash 사용:
- `src/utils/array.js`: `_.map`, `_.filter`
- `src/services/data.js`: `_.groupBy`, `_.sortBy`
- `src/helpers/format.js`: `_.debounce`

**총 15개 파일에서 사용 중**

---

### ✅ 권장사항
1. ✅ **즉시 업데이트 권장**
   - 보안 패치 포함
   - 호환성 이슈 없음

2. 📝 **테스트 계획**
   - 전체 테스트 스위트 실행
   - lodash 사용 부분 집중 테스트

3. ⏱️ **예상 소요시간**: 10분
   - 설치: 2분
   - 테스트: 5분
   - 배포: 3분

---

### 🔗 참고자료
- [CVE Details](https://nvd.nist.gov/vuln/detail/CVE-2021-23337)
- [Release Notes](https://github.com/lodash/lodash/releases/tag/4.17.21)
- [Migration Guide](https://lodash.com/docs/)
```

## 다양한 시나리오 테스트

### Scenario A: 보안 패치
```json
"lodash": "^4.17.20" → "^4.17.21"
```
- 보안 취약점 수정
- Breaking changes 없음
- 즉시 업데이트 권장

### Scenario B: Minor 업데이트
```json
"express": "^4.18.2" → "^4.19.0"
```
- 새 기능 추가
- 대부분 하위 호환
- 릴리스 노트 검토 필요

### Scenario C: Major 업데이트
```json
"webpack": "^5.88.0" → "^6.0.0"
```
- Breaking changes 포함
- 마이그레이션 필수
- 충분한 시간 확보

## 기대 효과

- 🔍 **자동 영향 분석**: 수동 분석 시간 90% 단축
- ⚠️ **위험 사전 감지**: Breaking changes 미리 파악
- 🛡️ **보안 강화**: 취약점 즉시 인지
- 📊 **데이터 기반 결정**: 사용 현황 기반 우선순위
- ⏰ **시간 절약**: 리뷰 시간 80% 감소

## 워크플로우 커스터마이징

### 특정 패키지만 분석
```yaml
on:
  pull_request:
    paths:
      - 'package.json'
      - 'package-lock.json'
      - 'yarn.lock'
```

### 자동 승인 조건
```yaml
# Patch 업데이트 + 보안 패치 + Breaking changes 없음
# → 자동 승인 및 병합
```

### 알림 통합
```yaml
# Slack, Discord 등으로 중요 업데이트 알림
```

## 다음 단계

1. 의존성 업데이트 PR 생성
2. AI 분석 대기 (2-5분)
3. 분석 결과 검토
4. 권장사항 따라 업데이트
5. 테스트 실행 및 배포
