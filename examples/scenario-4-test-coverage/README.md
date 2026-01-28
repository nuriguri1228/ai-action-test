# Scenario 4: Test Coverage Improvement

## 개요
이 시나리오는 테스트 커버리지가 낮을 때 자동으로 테스트를 생성하는 예제입니다.

## 현재 상태

`string-utils.js`는 10개의 유틸리티 메서드가 있지만:
- ❌ 테스트 파일이 없음
- ❌ 테스트 커버리지: 0%
- ❌ 엣지 케이스 검증 안됨

## 테스트 방법

### 방법 1: PR에서 테스트 생성 요청

```bash
# 1. 새 브랜치 생성
git checkout -b test/add-string-utils-tests

# 2. PR 생성
gh pr create \
  --title "test: Add tests for StringUtils" \
  --body "Adding comprehensive tests for string utilities"

# 3. AI에게 테스트 생성 요청
gh pr comment <PR번호> \
  --body "@claude examples/scenario-4-test-coverage/string-utils.js에 대한 포괄적인 테스트를 작성해주세요.

  다음을 포함해주세요:
  - 모든 메서드에 대한 단위 테스트
  - 엣지 케이스 (null, undefined, 빈 문자열, 특수문자 등)
  - 경계값 테스트
  - 에러 케이스 테스트

  Jest 또는 Mocha를 사용해주세요."
```

### 방법 2: 워크플로우 활용

```bash
# workflow-example-4-test-coverage.yml을 활성화하면
# PR 생성 시 자동으로 커버리지를 체크하고
# 커버리지가 낮으면 자동으로 테스트 추가를 요청합니다
```

## AI가 생성할 테스트

### 예상 테스트 파일: `string-utils.test.js`

```javascript
const StringUtils = require('./string-utils');

describe('StringUtils', () => {
  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(StringUtils.capitalize('hello')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(StringUtils.capitalize('')).toBe('');
    });

    it('should handle null/undefined', () => {
      expect(StringUtils.capitalize(null)).toBe('');
      expect(StringUtils.capitalize(undefined)).toBe('');
    });

    it('should lowercase remaining letters', () => {
      expect(StringUtils.capitalize('hELLO')).toBe('Hello');
    });
  });

  describe('isPalindrome', () => {
    it('should detect palindromes', () => {
      expect(StringUtils.isPalindrome('racecar')).toBe(true);
      expect(StringUtils.isPalindrome('A man a plan a canal Panama')).toBe(true);
    });

    it('should reject non-palindromes', () => {
      expect(StringUtils.isPalindrome('hello')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(StringUtils.isPalindrome('')).toBe(false);
      expect(StringUtils.isPalindrome(null)).toBe(false);
    });
  });

  // ... 더 많은 테스트들
});
```

## 테스트해야 할 엣지 케이스들

각 메서드는 다음과 같은 케이스를 테스트해야 합니다:

### capitalize
- ✅ 일반 문자열
- ✅ 빈 문자열
- ✅ null/undefined
- ✅ 대문자로 된 문자열
- ✅ 숫자가 포함된 문자열

### reverse
- ✅ 일반 문자열
- ✅ 빈 문자열
- ✅ 특수문자 포함
- ✅ 이모지 포함

### isPalindrome
- ✅ 회문 문자열
- ✅ 회문이 아닌 문자열
- ✅ 공백과 특수문자 포함
- ✅ 대소문자 혼합
- ✅ 빈 문자열

### truncate
- ✅ 짧은 문자열 (잘리지 않음)
- ✅ 긴 문자열 (잘림)
- ✅ 정확히 length인 문자열
- ✅ 커스텀 suffix
- ✅ 빈 문자열

### wordCount
- ✅ 일반 문장
- ✅ 여러 공백
- ✅ 앞뒤 공백
- ✅ 빈 문자열
- ✅ 특수문자만

### toCamelCase / toSnakeCase
- ✅ 일반 문자열
- ✅ 이미 변환된 문자열
- ✅ 특수문자 포함
- ✅ 숫자 포함
- ✅ 빈 문자열

### isAlphanumeric
- ✅ 알파벳만
- ✅ 숫자만
- ✅ 알파벳+숫자
- ✅ 특수문자 포함
- ✅ 공백 포함

### extractEmails
- ✅ 이메일 1개
- ✅ 이메일 여러 개
- ✅ 이메일 없음
- ✅ 유효하지 않은 형식
- ✅ 특수한 도메인

### stripHtml
- ✅ HTML 태그 포함
- ✅ 중첩된 태그
- ✅ 태그 없음
- ✅ 속성 포함된 태그
- ✅ 자체 닫힘 태그

## 기대 효과

- 📊 테스트 커버리지 0% → 95%+ 향상
- 🎯 자동으로 엣지 케이스 발견
- 🐛 프로덕션 배포 전 버그 발견
- ⚡ 테스트 작성 시간 80% 단축

## 테스트 프레임워크

AI는 프로젝트에 맞는 테스트 프레임워크를 선택합니다:
- Jest (JavaScript/TypeScript)
- Mocha + Chai
- pytest (Python)
- Go test (Go)
- 등등

## 다음 단계

1. PR 생성 또는 이슈 생성
2. AI에게 테스트 생성 요청
3. 생성된 테스트 검토
4. 테스트 실행하여 검증
5. 병합
