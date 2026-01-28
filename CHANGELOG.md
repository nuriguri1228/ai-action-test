# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- ArrayUtils 클래스 추가 (src/array-utils.js)
  - `unique(arr)` - 배열에서 중복 값 제거
  - `flatten(arr, depth)` - 중첩 배열 평탄화
  - `groupBy(arr, key)` - 키 기준 배열 그룹화
  - `chunk(arr, size)` - 배열을 청크로 분할
  - `sum(arr)` - 숫자 배열 합계
  - `average(arr)` - 숫자 배열 평균
  - `min(arr)` - 배열 최소값
  - `max(arr)` - 배열 최대값
  - `shuffle(arr)` - 배열 무작위 섞기
  - `take(arr, n)` - 처음 n개 요소 추출
  - `takeLast(arr, n)` - 마지막 n개 요소 추출
  - `uniqBy(arr, key)` - 키 기준 중복 제거
  - `partition(arr, predicate)` - 조건 기반 배열 분할
  - `zip(...arrays)` - 여러 배열 병합

- API 문서 추가 (API.md)
  - ArrayUtils의 모든 메서드에 대한 상세 문서
  - 매개변수, 반환값, 예제 포함

- 사용 예제 추가 (examples/array-utils-examples.js)
  - ArrayUtils의 모든 기능에 대한 실행 가능한 예제
  - 실전 데이터 처리 시나리오 포함

### Changed
- README.md 업데이트
  - 프로젝트 구조에 src/ 디렉토리 추가
  - ArrayUtils 사용 예제 및 API 메서드 목록 추가
  - API 문서 링크 추가

### Fixed
- Claude AI 워크플로우에 Write 및 Edit 도구 권한 추가 (commit 3de52e0)
  - 이전 문서 업데이트 실패 문제 해결
  - permission_denials 오류 수정

## [0.1.0] - 2026-01-28

### Added
- 초기 프로젝트 설정
- GitHub Pages 배포 워크플로우
- Claude AI 통합 워크플로우
- 5가지 AI Action 시나리오 예제 워크플로우
  1. 자동 코드 리뷰
  2. 버그 자동 수정
  3. 문서 자동 업데이트
  4. 테스트 커버리지 개선
  5. 의존성 업데이트 검토
- 시나리오별 예제 코드
- SCENARIOS.md - AI Action 활용 가이드
- WORKFLOW-GUIDE.md - 워크플로우 설치 가이드

[Unreleased]: https://github.com/nuriguri1228/ai-action-test/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/nuriguri1228/ai-action-test/releases/tag/v0.1.0
