# Scenario 3: Auto Documentation

## 개요
이 시나리오는 코드 변경 시 자동으로 문서를 생성하거나 업데이트하는 예제입니다.

## 테스트 방법

### 방법 1: PR에서 문서 생성 요청

```bash
# 1. 새 브랜치 생성
git checkout -b feature/api-service-update

# 2. 코드 수정 (예: 새 메서드 추가)
# api-service.js에 새로운 메서드 추가...

# 3. 커밋 및 푸시
git add examples/scenario-3-auto-docs/
git commit -m "feat: Add new API methods"
git push origin feature/api-service-update

# 4. PR 생성
gh pr create \
  --title "feat: Add new API service methods" \
  --body "Added new methods to APIService"

# 5. PR에 문서 생성 요청
gh pr comment <PR번호> \
  --body "@claude examples/scenario-3-auto-docs/api-service.js에 대한 포괄적인 API 문서를 생성해주세요.

  다음을 포함해주세요:
  - JSDoc 주석
  - README.md 업데이트 (사용 예제 포함)
  - API.md 파일 생성 (전체 API 문서)
  - 코드 예제"
```

### 방법 2: main 브랜치 병합 후 자동 문서 업데이트

```bash
# workflow-example-3-auto-docs.yml이 활성화되어 있으면
# main 브랜치에 병합 시 자동으로 문서 업데이트 이슈가 생성됩니다
```

## 현재 상태

`api-service.js`는 기능은 완성되었지만 문서가 부족합니다:

- ❌ JSDoc 주석 없음
- ❌ 사용 예제 없음
- ❌ API 레퍼런스 없음
- ❌ 에러 처리 문서 없음
- ❌ 반환값 설명 없음

## AI가 생성할 문서

### 1. JSDoc 주석
```javascript
/**
 * Fetches a user by ID with caching support
 * @param {string} userId - The unique identifier of the user
 * @returns {Promise<Object>} The user object
 * @throws {Error} If the API request fails
 */
async fetchUser(userId) {
  // ...
}
```

### 2. README.md 업데이트
- 설치 방법
- 기본 사용 예제
- 고급 사용 예제
- API 개요

### 3. API.md 생성
- 모든 메서드의 상세 문서
- 파라미터 설명
- 반환값 설명
- 에러 케이스
- 코드 예제

### 4. 사용 예제
```javascript
const APIService = require('./api-service');

const api = new APIService('https://api.example.com', 'your-api-key');

// Fetch a user
const user = await api.fetchUser('user-123');
console.log(user);
```

## 기대 효과

- 📝 항상 최신 상태의 문서 유지
- 🎨 일관된 문서 스타일
- 📚 자동으로 예제 코드 생성
- ⏰ 개발자의 문서 작성 시간 절약

## 워크플로우 동작 방식

### Auto Documentation 워크플로우
1. main 브랜치에 코드 변경이 병합됨
2. 워크플로우가 자동으로 실행
3. AI가 변경사항 분석
4. 문서 업데이트 필요성 판단
5. 문서 업데이트 이슈 또는 PR 생성

## 문서 품질 기준

AI가 생성하는 문서는 다음 기준을 따릅니다:

- ✅ 명확하고 간결한 설명
- ✅ 실행 가능한 코드 예제
- ✅ 모든 파라미터와 반환값 문서화
- ✅ 에러 케이스 설명
- ✅ 일관된 포맷 (JSDoc, Markdown)
