# AI Action Test

GitHub Pages와 Claude Code를 활용한 자동화 테스트 프로젝트입니다.

> 🎯 **이 저장소는 AI Action을 활용한 개발 자동화 시나리오를 제공합니다.**
> 코드 리뷰, 버그 수정, 문서화, 테스트 등을 AI가 자동으로 처리하는 방법을 배워보세요!

## ⚡ 빠른 시작

이 프로젝트를 통해 다음을 경험할 수 있습니다:

1. **즉각적인 코드 리뷰** - PR 생성 시 AI가 자동으로 리뷰
2. **자동 버그 수정** - 버그 이슈 생성 시 AI가 분석하고 PR 생성
3. **문서 자동화** - 코드 변경 시 문서 자동 업데이트
4. **테스트 자동 생성** - 커버리지 낮은 코드에 테스트 추가
5. **의존성 관리** - 의존성 업데이트의 영향 자동 분석

📚 **[SCENARIOS.md](./SCENARIOS.md)** - AI Action이 기존 방식보다 좋은 이유와 상세 시나리오
🛠️ **[WORKFLOW-GUIDE.md](./WORKFLOW-GUIDE.md)** - 워크플로우 설치 및 사용 가이드

## 🚀 GitHub Pages 배포 설정

이 저장소에는 GitHub Pages 배포를 위한 워크플로우 파일(`deploy-pages.yml`)이 포함되어 있습니다.

### 설정 방법

1. **워크플로우 파일 이동**
   - 루트 디렉토리의 `deploy-pages.yml` 파일을 `.github/workflows/` 디렉토리로 이동합니다:
   ```bash
   mv deploy-pages.yml .github/workflows/deploy-pages.yml
   ```

2. **GitHub Pages 활성화**
   - GitHub 저장소 설정으로 이동: `Settings` > `Pages`
   - **Source**를 `GitHub Actions`로 선택

3. **배포 확인**
   - `main` 브랜치에 변경사항을 푸시하면 자동으로 배포됩니다
   - `Actions` 탭에서 배포 진행 상황을 확인할 수 있습니다
   - 배포 완료 후 `https://nuriguri1228.github.io/ai-action-test/`에서 웹사이트를 확인할 수 있습니다

### 수동 배포

워크플로우는 `workflow_dispatch` 이벤트를 지원하므로 수동으로도 실행할 수 있습니다:
- `Actions` 탭 > `Deploy to GitHub Pages` 워크플로우 선택 > `Run workflow`

## 📝 웹사이트 내용 수정

`index.html` 파일을 수정하여 웹사이트 내용을 변경할 수 있습니다.

## 🤖 Claude AI 통합

Issue나 Pull Request에서 `@claude`를 멘션하면 Claude AI가 자동으로 응답합니다.

### 기본 사용 예시

```bash
# PR에서 코드 리뷰 요청
@claude 이 코드를 리뷰해주세요.

# 이슈에서 기능 추가 요청
@claude 새로운 기능을 추가해주세요.

# 버그 수정 요청
@claude 이 버그를 수정하고 PR을 생성해주세요.

# 테스트 추가 요청
@claude 이 함수에 대한 테스트를 작성해주세요.

# 문서 업데이트 요청
@claude README를 업데이트해주세요.
```

## 🎨 AI Action 활용 시나리오

이 저장소에는 AI Action을 활용한 5가지 주요 시나리오와 예제 워크플로우가 준비되어 있습니다:

### 시나리오 목록

1. **자동 코드 리뷰** (`workflow-example-1-auto-review.yml`)
   - PR 생성 시 자동으로 코드 리뷰 수행
   - 보안, 성능, 코드 품질 자동 검토
   - 리뷰 대기 시간 95% 감소

2. **버그 자동 수정** (`workflow-example-2-auto-bug-fix.yml`)
   - `bug` 라벨이 붙으면 자동으로 분석 시작
   - 수정 코드 작성 및 PR 자동 생성
   - 버그 수정 시간 90% 단축

3. **문서 자동 업데이트** (`workflow-example-3-auto-docs.yml`)
   - 코드 변경 시 문서 자동 업데이트
   - API 문서, README, CHANGELOG 관리
   - 문서 최신화율 95% 유지

4. **테스트 커버리지 개선** (`workflow-example-4-test-coverage.yml`)
   - 커버리지 낮으면 자동으로 테스트 생성
   - 엣지 케이스 테스트 추가
   - 테스트 커버리지 25% 증가

5. **의존성 업데이트 검토** (`workflow-example-5-dependency-review.yml`)
   - 의존성 업데이트의 영향 자동 분석
   - Breaking changes 사전 감지
   - 보안 업데이트 우선순위 파악

### 🚦 빠른 시작 (5분 안에!)

#### 방법 1: 스크립트 사용 (권장)

```bash
# 1. 워크플로우 활성화 스크립트 실행
./activate-workflows.sh

# 2. 테스트 시나리오 실행
./test-scenarios.sh
```

#### 방법 2: 수동 설정

```bash
# 1. 원하는 워크플로우를 .github/workflows/로 복사
cp workflow-example-1-auto-review.yml .github/workflows/auto-review.yml

# 2. 커밋하고 푸시
git add .github/workflows/auto-review.yml
git commit -m "Add auto code review workflow"
git push

# 3. PR을 생성하면 자동으로 AI 리뷰가 실행됩니다!
```

### 📖 상세 가이드

- **[ACTIVATE-WORKFLOWS.md](./ACTIVATE-WORKFLOWS.md)** - 워크플로우 활성화 및 테스트 전체 가이드 ⭐
- **[SCENARIOS.md](./SCENARIOS.md)** - 기존 방식과 비교, 효과 측정
- **[WORKFLOW-GUIDE.md](./WORKFLOW-GUIDE.md)** - 설치 방법, 커스터마이징, 문제 해결

## 📦 프로젝트 구조

```
.
├── .github/
│   └── workflows/
│       ├── claude.yml          # Claude AI 기본 워크플로우
│       └── deploy-pages.yml    # GitHub Pages 배포 워크플로우
├── workflow-example-1-auto-review.yml        # 예제: 자동 코드 리뷰
├── workflow-example-2-auto-bug-fix.yml       # 예제: 버그 자동 수정
├── workflow-example-3-auto-docs.yml          # 예제: 문서 자동 업데이트
├── workflow-example-4-test-coverage.yml      # 예제: 테스트 커버리지 개선
├── workflow-example-5-dependency-review.yml  # 예제: 의존성 업데이트 검토
├── activate-workflows.sh       # 워크플로우 활성화 스크립트 (NEW!)
├── test-scenarios.sh           # 테스트 시나리오 실행 스크립트 (NEW!)
├── ACTIVATE-WORKFLOWS.md       # 활성화 및 테스트 완전 가이드 (NEW!)
├── SCENARIOS.md                # AI Action 활용 시나리오 가이드
├── WORKFLOW-GUIDE.md           # 워크플로우 설치 및 사용 가이드
├── index.html                  # GitHub Pages 메인 웹페이지
└── README.md                   # 프로젝트 개요 (이 파일)
```

## 🔧 기술 스택

- **GitHub Actions**: CI/CD 자동화 및 워크플로우 실행
- **GitHub Pages**: 정적 웹사이트 호스팅
- **Claude AI**: AI 기반 코드 리뷰, 버그 수정, 문서화
- **HTML/CSS**: 프론트엔드

## 📊 AI Action 도입 효과

| 지표 | 기존 | AI Action 도입 후 | 개선율 |
|------|------|-----------------|--------|
| 코드 리뷰 대기 시간 | 4-24시간 | 5-10분 | 📉 95% 감소 |
| 버그 수정 시간 | 2-5일 | 1-4시간 | 📉 90% 감소 |
| 테스트 커버리지 | 60-70% | 85-95% | 📈 25% 증가 |
| 문서 최신화율 | 60% | 95% | 📈 58% 증가 |
| 개발자 생산성 | 기준 | 1.5-2배 | 📈 50-100% 증가 |

자세한 효과 측정 방법은 [SCENARIOS.md](./SCENARIOS.md)를 참고하세요.

## 📄 라이선스

MIT License
