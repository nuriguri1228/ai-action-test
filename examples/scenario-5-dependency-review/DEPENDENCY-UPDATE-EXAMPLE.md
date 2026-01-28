# Dependency Update Example

## 시뮬레이션: Lodash 업데이트

이 문서는 의존성 업데이트 시나리오를 시뮬레이션합니다.

### 현재 버전
```json
"lodash": "^4.17.20"
```

### 업데이트 버전
```json
"lodash": "^4.17.21"
```

### 변경 사항 요약

#### 보안 패치
- **CVE-2021-23337**: Prototype pollution 취약점 수정
- **심각도**: High
- **영향**: `lodash.template` 사용 시 원격 코드 실행 가능성

#### Breaking Changes
- 없음 (패치 버전 업데이트)

#### 새로운 기능
- 없음 (보안 패치만)

---

## AI가 분석할 내용

### 1. 보안 영향 분석

```markdown
⚠️ **보안 취약점 발견**

CVE-2021-23337: lodash의 template 함수에서 prototype pollution 취약점

**위험도**: High
**CVSS 점수**: 7.4

**영향받는 코드**:
- 프로젝트에서 `lodash.template`을 사용하는 경우
- 사용자 입력을 template에 전달하는 경우

**권장 조치**:
✅ 즉시 업데이트 권장
```

### 2. Breaking Changes 확인

```markdown
✅ **Breaking Changes 없음**

이번 업데이트는 패치 버전 업데이트(4.17.20 → 4.17.21)로,
하위 호환성이 보장됩니다.

**예상 영향**:
- 기존 코드 수정 불필요
- 테스트 통과 예상
```

### 3. 코드베이스 영향 분석

```markdown
**Lodash 사용 현황 분석**

프로젝트에서 lodash를 다음과 같이 사용 중:
- `_.map()` - 15곳
- `_.filter()` - 8곳
- `_.debounce()` - 3곳
- `_.template()` - 0곳 ✅ (취약점 영향 없음)

**결론**:
✅ 안전하게 업데이트 가능
❌ `_.template()` 미사용으로 긴급성 낮음
```

### 4. 마이그레이션 가이드

```markdown
**업데이트 절차**

1. package.json 업데이트
2. `npm install` 실행
3. 테스트 실행
4. 배포

**예상 소요 시간**: 5분
**위험도**: 낮음
```

---

## 테스트 방법

### 방법 1: 수동으로 의존성 업데이트 PR 생성

```bash
# 1. 새 브랜치 생성
git checkout -b deps/update-lodash

# 2. package.json 수정 (lodash 버전 업데이트)
# "lodash": "^4.17.21" 로 변경

# 3. 커밋 및 푸시
git add examples/scenario-5-dependency-review/package.json
git commit -m "chore(deps): update lodash to 4.17.21"
git push origin deps/update-lodash

# 4. PR 생성
gh pr create \
  --title "chore(deps): update lodash to 4.17.21" \
  --body "Security update for lodash

  - Updates lodash from 4.17.20 to 4.17.21
  - Fixes CVE-2021-23337
  - No breaking changes"

# 5. AI 분석 자동 실행
# workflow-example-5-dependency-review.yml이 자동으로 영향 분석
```

### 방법 2: Dependabot 시뮬레이션

```bash
# Dependabot을 활성화하면 자동으로 의존성 업데이트 PR이 생성되고
# AI가 자동으로 영향 분석을 수행합니다
```

---

## AI 분석 예시 출력

```markdown
## 의존성 업데이트 분석 결과

### 📦 업데이트 요약
- **패키지**: lodash
- **이전 버전**: 4.17.20
- **새 버전**: 4.17.21
- **업데이트 타입**: 패치 (patch)

### 🔒 보안 이슈
⚠️ **CVE-2021-23337** 수정
- Prototype pollution in lodash
- 심각도: High (7.4)
- 영향: `_.template()` 함수

### ✅ 호환성
- Breaking changes: 없음
- 하위 호환성: 보장됨
- 테스트 통과: 예상됨

### 📊 영향 분석
**프로젝트 내 사용 현황**:
- `_.map`: 15개 파일
- `_.filter`: 8개 파일
- `_.template`: 사용 안함 ✅

**결론**:
✅ 안전하게 업데이트 가능
✅ 긴급성: 중간 (template 미사용)
✅ 권장: 다음 배포 시 포함

### 📝 권장 사항
1. ✅ 업데이트 승인 권장
2. ✅ 전체 테스트 실행 필요
3. ⚠️ 프로덕션 배포 전 스테이징 환경 테스트

### 🔗 참고 자료
- [CVE-2021-23337](https://nvd.nist.gov/vuln/detail/CVE-2021-23337)
- [Lodash Release Notes](https://github.com/lodash/lodash/releases/tag/4.17.21)
```

---

## 기대 효과

- 🔍 의존성 업데이트 영향 자동 파악
- ⚠️ Breaking changes 사전 감지
- 🛡️ 보안 업데이트 우선순위 파악
- 📊 코드베이스 사용 현황 분석
- ⏰ 수동 분석 시간 90% 단축

---

## 워크플로우 동작 방식

1. **PR 생성 감지**
   - package.json, package-lock.json 등 변경 감지
   - 또는 Dependabot PR 감지

2. **AI 분석 시작**
   - 업데이트된 패키지 식별
   - 버전 차이 분석
   - 보안 취약점 확인

3. **코드베이스 분석**
   - 해당 패키지 사용 현황 파악
   - Breaking changes 영향 범위 확인
   - 마이그레이션 필요성 판단

4. **결과 리포트 생성**
   - PR에 코멘트로 분석 결과 추가
   - 권장 사항 제시
   - 참고 자료 링크 제공

---

## 다양한 업데이트 타입

### Patch 업데이트 (4.17.20 → 4.17.21)
- 보안 패치, 버그 수정
- Breaking changes 없음
- 즉시 업데이트 권장

### Minor 업데이트 (4.17.x → 4.18.0)
- 새 기능 추가
- Breaking changes 없음 (대부분)
- 릴리스 노트 확인 필요

### Major 업데이트 (4.x.x → 5.0.0)
- Breaking changes 포함
- 마이그레이션 가이드 필수
- 전체 테스트 필요
- 충분한 시간 확보 필요
