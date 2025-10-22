# 代码风格规范文档

## 1. 命名规范

### 1.1 变量命名
- **规则**: 使用驼峰命名法 (camelCase)
- **示例**:
  ```typescript
  // ✅ 正确
  const userName = 'john_doe';
  const userAge = 25;
  const isUserActive = true;
  
  // ❌ 错误
  const user_name = 'john_doe';
  const user_age = 25;
  const is_user_active = true;
  ```

### 1.2 常量命名
- **规则**: 使用大写下划线分隔 (UPPER_SNAKE_CASE)
- **示例**:
  ```typescript
  // ✅ 正确
  const MAX_RETRY_COUNT = 3;
  const API_BASE_URL = 'https://api.example.com';
  const DEFAULT_TIMEOUT = 5000;
  
  // ❌ 错误
  const maxRetryCount = 3;
  const apiBaseUrl = 'https://api.example.com';
  ```

### 1.3 函数命名
- **规则**: 使用动词开头，驼峰命名法
- **示例**:
  ```typescript
  // ✅ 正确
  function getUserData() {}
  function validateEmail() {}
  function processPayment() {}
  
  // ❌ 错误
  function userData() {}
  function email() {}
  function payment() {}
  ```

### 1.4 类命名
- **规则**: 使用帕斯卡命名法 (PascalCase)
- **示例**:
  ```typescript
  // ✅ 正确
  class UserService {}
  class PaymentProcessor {}
  class EmailValidator {}
  
  // ❌ 错误
  class userService {}
  class paymentProcessor {}
  class emailValidator {}
  ```

## 2. 代码格式

### 2.1 缩进
- **规则**: 使用 2 个空格缩进
- **示例**:
  ```typescript
  // ✅ 正确
  if (condition) {
    doSomething();
    if (anotherCondition) {
      doAnotherThing();
    }
  }
  
  // ❌ 错误
  if (condition) {
      doSomething();
      if (anotherCondition) {
          doAnotherThing();
      }
  }
  ```

### 2.2 空格使用
- **规则**: 运算符前后要有空格
- **示例**:
  ```typescript
  // ✅ 正确
  const result = a + b;
  const isValid = condition && anotherCondition;
  
  // ❌ 错误
  const result=a+b;
  const isValid=condition&&anotherCondition;
  ```

### 2.3 行末处理
- **规则**: 行末不允许有空格，文件末尾必须有换行符
- **示例**:
  ```typescript
  // ✅ 正确
  const message = 'Hello World';
  
  // ❌ 错误 (行末有空格)
  const message = 'Hello World';    
  ```

## 3. 注释规范

### 3.1 单行注释
- **规则**: 使用 `//`，注释前要有空格
- **示例**:
  ```typescript
  // ✅ 正确
  // 获取用户信息
  const user = getUserById(id);
  
  // ❌ 错误
  //这是一个函数
  const user = getUserById(id);
  ```

### 3.2 多行注释
- **规则**: 使用 `/* */`，用于复杂逻辑说明
- **示例**:
  ```typescript
  // ✅ 正确
  /*
   * 复杂的业务逻辑处理
   * 包含多个步骤和条件判断
   */
  function complexBusinessLogic() {}
  ```

### 3.3 JSDoc 注释
- **规则**: 函数必须包含参数和返回值说明
- **示例**:
  ```typescript
  // ✅ 正确
  /**
   * 获取用户信息
   * @param {string} userId - 用户ID
   * @param {boolean} includeProfile - 是否包含用户资料
   * @returns {Promise<User>} 用户信息对象
   */
  async function getUserInfo(userId: string, includeProfile: boolean): Promise<User> {
    // 实现代码
  }
  
  // ❌ 错误
  function getUserInfo(userId, includeProfile) {
    // 实现代码
  }
  ```

## 4. TypeScript 规范

### 4.1 类型定义
- **规则**: 所有函数参数和返回值都要有明确的类型定义
- **示例**:
  ```typescript
  // ✅ 正确
  function calculateTotal(items: Item[]): number {
    return items.reduce((sum, item) => sum + item.price, 0);
  }
  
  // ❌ 错误
  function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
  }
  ```

### 4.2 接口定义
- **规则**: 接口名使用帕斯卡命名法，以 I 开头
- **示例**:
  ```typescript
  // ✅ 正确
  interface IUserService {
    getUserById(id: string): Promise<User>;
    updateUser(user: User): Promise<void>;
  }
  
  // ❌ 错误
  interface userService {
    getUserById(id): Promise<User>;
    updateUser(user): Promise<void>;
  }
  ```

## 5. 错误处理

### 5.1 异步操作错误处理
- **规则**: 所有异步操作都要包含错误处理
- **示例**:
  ```typescript
  // ✅ 正确
  async function fetchUserData(userId: string): Promise<User> {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      throw error;
    }
  }
  
  // ❌ 错误
  async function fetchUserData(userId: string): Promise<User> {
    const response = await fetch(`/api/users/${userId}`);
    return await response.json();
  }
  ```

### 5.2 Promise 错误处理
- **规则**: Promise 链必须包含 catch 处理
- **示例**:
  ```typescript
  // ✅ 正确
  fetch('/api/data')
    .then(response => response.json())
    .then(data => processData(data))
    .catch(error => {
      console.error('Error:', error);
      handleError(error);
    });
  
  // ❌ 错误
  fetch('/api/data')
    .then(response => response.json())
    .then(data => processData(data));
  ```

## 6. 最佳实践

### 6.1 避免使用 console
- **规则**: 生产代码中不应该包含 console 语句
- **示例**:
  ```typescript
  // ✅ 正确
  import { logger } from './logger';
  logger.info('User logged in successfully');
  
  // ❌ 错误
  console.log('User logged in successfully');
  ```

### 6.2 使用 const 和 let
- **规则**: 优先使用 const，需要重新赋值时使用 let，避免使用 var
- **示例**:
  ```typescript
  // ✅ 正确
  const userName = 'john';
  let counter = 0;
  counter++;
  
  // ❌ 错误
  var userName = 'john';
  var counter = 0;
  ```

### 6.3 函数长度控制
- **规则**: 单个函数不超过 50 行，复杂逻辑要拆分
- **示例**:
  ```typescript
  // ✅ 正确 - 拆分为多个小函数
  function processUserData(userData: UserData): ProcessedUserData {
    const validatedData = validateUserData(userData);
    const enrichedData = enrichUserData(validatedData);
    return formatUserData(enrichedData);
  }
  
  // ❌ 错误 - 函数过长
  function processUserData(userData: UserData): ProcessedUserData {
    // 50+ 行的复杂逻辑
  }
  ```

## 7. 代码审查检查点

### 7.1 命名检查
- [ ] 变量名使用驼峰命名法
- [ ] 常量名使用大写下划线分隔
- [ ] 函数名使用动词开头
- [ ] 类名使用帕斯卡命名法

### 7.2 格式检查
- [ ] 使用 2 个空格缩进
- [ ] 运算符前后有空格
- [ ] 行末无多余空格
- [ ] 文件末尾有换行符

### 7.3 注释检查
- [ ] 复杂逻辑有注释说明
- [ ] 函数有 JSDoc 注释
- [ ] 注释格式正确

### 7.4 TypeScript 检查
- [ ] 函数参数有类型定义
- [ ] 函数返回值有类型定义
- [ ] 变量有类型注解

### 7.5 错误处理检查
- [ ] 异步操作有错误处理
- [ ] Promise 链有 catch 处理
- [ ] 错误信息有意义

### 7.6 最佳实践检查
- [ ] 没有 console 语句
- [ ] 使用 const/let 而不是 var
- [ ] 函数长度合理
- [ ] 没有重复代码
