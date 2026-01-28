# Scenario 1: Auto Code Review

## 개요
이 시나리오는 PR 생성 시 자동으로 AI 코드 리뷰를 수행하는 예제입니다.

## 테스트 방법

1. **워크플로우 활성화**
   ```bash
   # 워크플로우 파일이 이미 .github/workflows/에 있습니다
   # workflow-example-1-auto-review.yml 확인
   ```

2. **테스트 PR 생성**
   ```bash
   # 새 브랜치 생성
   git checkout -b test/auto-review-demo

   # calculator.js 수정 (예: 새 메서드 추가)
   # 파일 수정...

   # 커밋 및 푸시
   git add examples/scenario-1-auto-review/calculator.js
   git commit -m "feat: Add new calculator method"
   git push origin test/auto-review-demo

   # PR 생성
   gh pr create --title "Test: Auto Code Review" \
     --body "Testing auto code review workflow"
   ```

3. **결과 확인**
   - PR이 생성되면 자동으로 AI 리뷰가 시작됩니다
   - 몇 분 내에 AI가 다음 항목들을 검토하여 코멘트를 작성합니다:
     - 보안 취약점 (XSS, SQL injection 등)
     - 성능 이슈
     - 코드 품질
     - 베스트 프랙티스 준수 여부
     - 잠재적 버그

## calculator.js에 포함된 이슈들

이 예제 파일은 의도적으로 다음과 같은 이슈를 포함하고 있습니다:

1. **누락된 문서화**: JSDoc 주석 없음
2. **입력 검증 부족**: division by zero 가능성
3. **비효율적 알고리즘**: 팩토리얼 계산 최적화 가능
4. **보안 취약점**: innerHTML을 사용한 XSS 가능성
5. **부실한 에러 처리**: parseInt에 대한 에러 핸들링 없음

AI 코드 리뷰는 이러한 이슈들을 자동으로 감지하고 개선 방법을 제안합니다.

## 기대 효과

- ⚡ 즉각적인 피드백 (리뷰 대기 시간 제로)
- 🎯 일관된 품질의 리뷰
- 🔍 사람이 놓치기 쉬운 세부사항 자동 감지
- 👥 사람 리뷰어는 더 중요한 아키텍처 결정에 집중 가능
