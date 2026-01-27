# AI Action Test

GitHub Pages와 Claude Code를 활용한 자동화 테스트 프로젝트입니다.

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

### 사용 예시

```
@claude 이 코드를 리뷰해주세요.
@claude 새로운 기능을 추가해주세요.
```

## 📦 프로젝트 구조

```
.
├── .github/
│   └── workflows/
│       └── claude.yml          # Claude AI 워크플로우
├── index.html                  # 메인 웹페이지
├── deploy-pages.yml            # GitHub Pages 배포 워크플로우 (이동 필요)
└── README.md                   # 프로젝트 문서
```

## 🔧 기술 스택

- **GitHub Actions**: CI/CD 자동화
- **GitHub Pages**: 정적 웹사이트 호스팅
- **Claude AI**: AI 어시스턴트 통합
- **HTML/CSS**: 프론트엔드

## 📄 라이선스

MIT License
