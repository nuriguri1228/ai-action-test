#!/bin/bash

# AI Action 워크플로우 활성화 스크립트
# 이 스크립트는 예제 워크플로우 파일들을 .github/workflows/로 복사합니다.

set -e

echo "🤖 AI Action 워크플로우 활성화"
echo "================================"
echo ""

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# .github/workflows 디렉토리 확인
if [ ! -d ".github/workflows" ]; then
    echo -e "${RED}오류: .github/workflows 디렉토리가 없습니다.${NC}"
    exit 1
fi

# 선택 메뉴
echo -e "${BLUE}어떤 워크플로우를 활성화하시겠습니까?${NC}"
echo ""
echo "1) 자동 코드 리뷰 (Auto Code Review) - 권장"
echo "2) 버그 자동 수정 (Auto Bug Fix)"
echo "3) 문서 자동 업데이트 (Auto Documentation)"
echo "4) 테스트 커버리지 개선 (Test Coverage)"
echo "5) 의존성 업데이트 검토 (Dependency Review)"
echo "6) 모든 워크플로우 활성화"
echo "0) 취소"
echo ""
read -p "선택 (0-6): " choice

case $choice in
    1)
        echo -e "${YELLOW}자동 코드 리뷰 워크플로우 활성화 중...${NC}"
        cp workflow-example-1-auto-review.yml .github/workflows/auto-review.yml
        echo -e "${GREEN}✅ auto-review.yml이 활성화되었습니다!${NC}"
        ;;
    2)
        echo -e "${YELLOW}버그 자동 수정 워크플로우 활성화 중...${NC}"
        cp workflow-example-2-auto-bug-fix.yml .github/workflows/auto-bug-fix.yml
        echo -e "${GREEN}✅ auto-bug-fix.yml이 활성화되었습니다!${NC}"
        ;;
    3)
        echo -e "${YELLOW}문서 자동 업데이트 워크플로우 활성화 중...${NC}"
        cp workflow-example-3-auto-docs.yml .github/workflows/auto-docs.yml
        echo -e "${GREEN}✅ auto-docs.yml이 활성화되었습니다!${NC}"
        ;;
    4)
        echo -e "${YELLOW}테스트 커버리지 워크플로우 활성화 중...${NC}"
        cp workflow-example-4-test-coverage.yml .github/workflows/test-coverage.yml
        echo -e "${GREEN}✅ test-coverage.yml이 활성화되었습니다!${NC}"
        ;;
    5)
        echo -e "${YELLOW}의존성 업데이트 검토 워크플로우 활성화 중...${NC}"
        cp workflow-example-5-dependency-review.yml .github/workflows/dependency-review.yml
        echo -e "${GREEN}✅ dependency-review.yml이 활성화되었습니다!${NC}"
        ;;
    6)
        echo -e "${YELLOW}모든 워크플로우 활성화 중...${NC}"
        cp workflow-example-1-auto-review.yml .github/workflows/auto-review.yml
        cp workflow-example-2-auto-bug-fix.yml .github/workflows/auto-bug-fix.yml
        cp workflow-example-3-auto-docs.yml .github/workflows/auto-docs.yml
        cp workflow-example-4-test-coverage.yml .github/workflows/test-coverage.yml
        cp workflow-example-5-dependency-review.yml .github/workflows/dependency-review.yml
        echo -e "${GREEN}✅ 모든 워크플로우가 활성화되었습니다!${NC}"
        ;;
    0)
        echo -e "${YELLOW}취소되었습니다.${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}잘못된 선택입니다.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${BLUE}변경사항을 커밋하고 푸시하시겠습니까? (y/n)${NC}"
read -p "선택: " commit_choice

if [ "$commit_choice" = "y" ]; then
    echo -e "${YELLOW}커밋 및 푸시 중...${NC}"

    git add .github/workflows/*.yml
    git commit -m "🤖 Activate AI Action workflows

Activated workflow(s):
- Auto code review (PR 생성 시 자동 리뷰)
- Auto bug fix (bug 라벨 이슈 자동 처리)
- Auto documentation (main 병합 시 문서 업데이트)
- Test coverage (낮은 커버리지 시 테스트 추가)
- Dependency review (의존성 업데이트 분석)
"
    git push

    echo ""
    echo -e "${GREEN}✅ 완료! 워크플로우가 활성화되었습니다!${NC}"
    echo ""
    echo -e "${BLUE}다음 단계:${NC}"
    echo "1. GitHub Actions 페이지에서 워크플로우 확인"
    echo "   https://github.com/$(git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/')/actions"
    echo ""
    echo "2. test-scenarios.sh 스크립트로 각 시나리오 테스트:"
    echo "   ./test-scenarios.sh"
    echo ""
    echo "3. 자세한 사용법은 ACTIVATE-WORKFLOWS.md 참고"
else
    echo -e "${YELLOW}커밋은 건너뛰었습니다. 수동으로 커밋해주세요:${NC}"
    echo "  git add .github/workflows/*.yml"
    echo "  git commit -m 'Activate AI Action workflows'"
    echo "  git push"
fi
