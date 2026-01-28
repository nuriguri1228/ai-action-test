// ArrayUtils 사용 예제

const ArrayUtils = require('../src/array-utils');
const arrayUtils = new ArrayUtils();

console.log('=== ArrayUtils 사용 예제 ===\n');

// 1. unique - 중복 제거
console.log('1. unique - 중복 제거');
const numbers = [1, 2, 2, 3, 4, 4, 5];
console.log('입력:', numbers);
console.log('결과:', arrayUtils.unique(numbers));
console.log();

// 2. flatten - 중첩 배열 평탄화
console.log('2. flatten - 중첩 배열 평탄화');
const nested = [1, [2, [3, [4, 5]]]];
console.log('입력:', nested);
console.log('결과 (depth=2):', arrayUtils.flatten(nested, 2));
console.log('결과 (완전 평탄화):', arrayUtils.flatten(nested));
console.log();

// 3. groupBy - 키로 그룹화
console.log('3. groupBy - 키로 그룹화');
const users = [
  { name: 'Alice', role: 'admin', age: 30 },
  { name: 'Bob', role: 'user', age: 25 },
  { name: 'Charlie', role: 'admin', age: 35 },
  { name: 'David', role: 'user', age: 28 }
];
console.log('입력:', users);
console.log('결과 (role로 그룹화):', arrayUtils.groupBy(users, 'role'));
console.log();

// 4. chunk - 배열 분할
console.log('4. chunk - 배열 분할');
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log('입력:', items);
console.log('결과 (크기=3):', arrayUtils.chunk(items, 3));
console.log();

// 5. 통계 함수들
console.log('5. 통계 함수들');
const scores = [85, 90, 75, 95, 88, 92];
console.log('점수:', scores);
console.log('합계:', arrayUtils.sum(scores));
console.log('평균:', arrayUtils.average(scores));
console.log('최소값:', arrayUtils.min(scores));
console.log('최대값:', arrayUtils.max(scores));
console.log();

// 6. shuffle - 무작위 섞기
console.log('6. shuffle - 무작위 섞기');
const cards = ['A', 'K', 'Q', 'J', '10'];
console.log('원본:', cards);
console.log('섞은 결과:', arrayUtils.shuffle(cards));
console.log('다시 섞은 결과:', arrayUtils.shuffle(cards));
console.log();

// 7. take / takeLast - 요소 추출
console.log('7. take / takeLast - 요소 추출');
const sequence = [1, 2, 3, 4, 5, 6, 7, 8];
console.log('배열:', sequence);
console.log('처음 3개:', arrayUtils.take(sequence, 3));
console.log('마지막 3개:', arrayUtils.takeLast(sequence, 3));
console.log();

// 8. uniqBy - 키 기준 중복 제거
console.log('8. uniqBy - 키 기준 중복 제거');
const products = [
  { id: 1, name: 'Apple', price: 100 },
  { id: 2, name: 'Banana', price: 50 },
  { id: 1, name: 'Apple Premium', price: 150 },
  { id: 3, name: 'Orange', price: 80 }
];
console.log('입력:', products);
console.log('결과 (id 기준):', arrayUtils.uniqBy(products, 'id'));
console.log();

// 9. partition - 조건으로 분할
console.log('9. partition - 조건으로 분할');
const mixedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('입력:', mixedNumbers);
const [evens, odds] = arrayUtils.partition(mixedNumbers, n => n % 2 === 0);
console.log('짝수:', evens);
console.log('홀수:', odds);
console.log();

// 10. zip - 배열 합치기
console.log('10. zip - 배열 합치기');
const names = ['Alice', 'Bob', 'Charlie'];
const ages = [30, 25, 35];
const roles = ['admin', 'user', 'user'];
console.log('이름:', names);
console.log('나이:', ages);
console.log('역할:', roles);
console.log('결과:', arrayUtils.zip(names, ages, roles));
console.log();

// 실전 예제: 사용자 데이터 처리
console.log('=== 실전 예제: 사용자 데이터 처리 ===\n');

const userData = [
  { id: 1, name: 'Alice', score: 85, active: true },
  { id: 2, name: 'Bob', score: 92, active: false },
  { id: 3, name: 'Charlie', score: 78, active: true },
  { id: 4, name: 'David', score: 95, active: true },
  { id: 5, name: 'Eve', score: 88, active: false }
];

// 활성 사용자와 비활성 사용자 분리
const [activeUsers, inactiveUsers] = arrayUtils.partition(
  userData,
  user => user.active
);
console.log('활성 사용자:', activeUsers.length + '명');
console.log('비활성 사용자:', inactiveUsers.length + '명');

// 활성 사용자의 점수 통계
const activeScores = activeUsers.map(u => u.score);
console.log('활성 사용자 점수:', activeScores);
console.log('평균 점수:', arrayUtils.average(activeScores));
console.log('최고 점수:', arrayUtils.max(activeScores));
console.log('최저 점수:', arrayUtils.min(activeScores));

// 상위 3명 선발
const topUsers = arrayUtils.take(
  userData.sort((a, b) => b.score - a.score),
  3
);
console.log('\n상위 3명:', topUsers.map(u => `${u.name} (${u.score})`));
