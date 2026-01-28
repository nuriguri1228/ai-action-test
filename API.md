# API 문서

## ArrayUtils

배열 조작을 위한 유틸리티 클래스입니다. 모든 메서드는 원본 배열을 수정하지 않고 새로운 배열을 반환합니다.

### 생성자

```javascript
const ArrayUtils = require('./src/array-utils');
const arrayUtils = new ArrayUtils();
```

### 메서드

#### `unique(arr)`

배열에서 중복된 값을 제거합니다.

**매개변수:**
- `arr` (Array) - 중복을 제거할 배열

**반환값:**
- (Array) - 중복이 제거된 새 배열

**예제:**
```javascript
arrayUtils.unique([1, 2, 2, 3, 4, 4, 5]);
// [1, 2, 3, 4, 5]
```

---

#### `flatten(arr, depth = Infinity)`

중첩된 배열을 지정된 깊이만큼 평탄화합니다.

**매개변수:**
- `arr` (Array) - 평탄화할 배열
- `depth` (Number) - 평탄화할 깊이 (기본값: Infinity)

**반환값:**
- (Array) - 평탄화된 새 배열

**예제:**
```javascript
arrayUtils.flatten([1, [2, [3, [4]]]], 2);
// [1, 2, 3, [4]]
```

---

#### `groupBy(arr, key)`

배열의 각 요소를 지정된 키의 값에 따라 그룹화합니다.

**매개변수:**
- `arr` (Array) - 그룹화할 객체 배열
- `key` (String) - 그룹화 기준 키

**반환값:**
- (Object) - 그룹화된 객체

**예제:**
```javascript
const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' }
];
arrayUtils.groupBy(users, 'role');
// {
//   admin: [{ name: 'Alice', role: 'admin' }],
//   user: [{ name: 'Bob', role: 'user' }]
// }
```

---

#### `chunk(arr, size)`

배열을 지정된 크기의 청크(작은 배열들)로 분할합니다.

**매개변수:**
- `arr` (Array) - 분할할 배열
- `size` (Number) - 각 청크의 크기

**반환값:**
- (Array) - 청크들로 이루어진 2차원 배열

**예제:**
```javascript
arrayUtils.chunk([1, 2, 3, 4, 5], 2);
// [[1, 2], [3, 4], [5]]
```

---

#### `sum(arr)`

숫자 배열의 합계를 계산합니다.

**매개변수:**
- `arr` (Array) - 숫자 배열

**반환값:**
- (Number) - 배열 요소들의 합

**예제:**
```javascript
arrayUtils.sum([1, 2, 3, 4, 5]);
// 15
```

---

#### `average(arr)`

숫자 배열의 평균을 계산합니다.

**매개변수:**
- `arr` (Array) - 숫자 배열

**반환값:**
- (Number) - 배열 요소들의 평균

**예제:**
```javascript
arrayUtils.average([10, 20, 30, 40, 50]);
// 30
```

---

#### `min(arr)`

배열에서 최소값을 찾습니다.

**매개변수:**
- `arr` (Array) - 숫자 배열

**반환값:**
- (Number|null) - 최소값 (배열이 비어있으면 null)

**예제:**
```javascript
arrayUtils.min([5, 2, 8, 1, 9]);
// 1
```

---

#### `max(arr)`

배열에서 최대값을 찾습니다.

**매개변수:**
- `arr` (Array) - 숫자 배열

**반환값:**
- (Number|null) - 최대값 (배열이 비어있으면 null)

**예제:**
```javascript
arrayUtils.max([5, 2, 8, 1, 9]);
// 9
```

---

#### `shuffle(arr)`

배열의 요소를 무작위로 섞습니다 (Fisher-Yates 알고리즘).

**매개변수:**
- `arr` (Array) - 섞을 배열

**반환값:**
- (Array) - 무작위로 섞인 새 배열

**예제:**
```javascript
arrayUtils.shuffle([1, 2, 3, 4, 5]);
// [3, 1, 4, 5, 2] (실행할 때마다 다름)
```

---

#### `take(arr, n = 1)`

배열의 처음 n개 요소를 가져옵니다.

**매개변수:**
- `arr` (Array) - 대상 배열
- `n` (Number) - 가져올 요소 개수 (기본값: 1)

**반환값:**
- (Array) - 처음 n개 요소로 이루어진 새 배열

**예제:**
```javascript
arrayUtils.take([1, 2, 3, 4, 5], 3);
// [1, 2, 3]
```

---

#### `takeLast(arr, n = 1)`

배열의 마지막 n개 요소를 가져옵니다.

**매개변수:**
- `arr` (Array) - 대상 배열
- `n` (Number) - 가져올 요소 개수 (기본값: 1)

**반환값:**
- (Array) - 마지막 n개 요소로 이루어진 새 배열

**예제:**
```javascript
arrayUtils.takeLast([1, 2, 3, 4, 5], 2);
// [4, 5]
```

---

#### `uniqBy(arr, key)`

지정된 키를 기준으로 중복을 제거합니다. 첫 번째로 나타난 요소만 유지합니다.

**매개변수:**
- `arr` (Array) - 대상 배열
- `key` (String|Function) - 비교 기준 (문자열 키 또는 함수)

**반환값:**
- (Array) - 중복이 제거된 새 배열

**예제:**
```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice2' }
];
arrayUtils.uniqBy(users, 'id');
// [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]

arrayUtils.uniqBy(users, user => user.id);
// [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

---

#### `partition(arr, predicate)`

배열을 조건 함수에 따라 두 그룹으로 분할합니다.

**매개변수:**
- `arr` (Array) - 분할할 배열
- `predicate` (Function) - 조건 함수

**반환값:**
- (Array) - [조건을 만족하는 요소들, 조건을 만족하지 않는 요소들]

**예제:**
```javascript
const numbers = [1, 2, 3, 4, 5, 6];
arrayUtils.partition(numbers, n => n % 2 === 0);
// [[2, 4, 6], [1, 3, 5]]
```

---

#### `zip(...arrays)`

여러 배열을 하나로 합쳐 2차원 배열을 만듭니다.

**매개변수:**
- `...arrays` (Array) - 합칠 배열들

**반환값:**
- (Array) - 각 배열의 동일 인덱스 요소들을 묶은 2차원 배열

**예제:**
```javascript
arrayUtils.zip([1, 2, 3], ['a', 'b', 'c'], [true, false, true]);
// [[1, 'a', true], [2, 'b', false], [3, 'c', true]]
```

---

## 오류 처리

모든 메서드는 입력 검증을 수행합니다:
- 배열이 아닌 값이 전달되면 빈 배열을 반환하거나 적절한 기본값을 반환합니다
- 잘못된 매개변수가 제공되면 안전한 기본값을 사용합니다

## 참고사항

- 모든 메서드는 순수 함수로 작성되어 원본 배열을 수정하지 않습니다
- 빈 배열이나 잘못된 입력에 대해서도 안전하게 동작합니다
- 성능이 중요한 경우 네이티브 메서드 사용을 고려하세요
