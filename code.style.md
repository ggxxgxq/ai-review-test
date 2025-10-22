# 代码风格规范

## 命名规范检查

- **id**: naming-convention
- **description**: 检查变量、函数、类名是否符合命名规范
- **severity**: warning
- **category**: style
- **enabled**: true

### 规则说明

1. 变量名使用驼峰命名法（camelCase）
2. 常量使用大写下划线命名法（UPPER_SNAKE_CASE）
3. 函数名使用动词开头，驼峰命名法
4. 类名使用帕斯卡命名法（PascalCase）

### 示例

```rule-example
❌ var userName = 'test';
✅ const userName = 'test';

❌ const API_KEY = 'secret';
✅ const API_KEY = 'secret';

❌ function getUserData() {}
✅ function getUserData() {}

❌ class userService {}
✅ class UserService {}
```

## 代码格式检查

- **id**: code-format
- **description**: 检查代码格式和缩进
- **severity**: warning
- **category**: style
- **enabled**: true

### 规则说明

1. 使用 2 个空格缩进
2. 行末不允许有空格
3. 文件末尾必须有换行符
4. 运算符前后要有空格

### 示例

```rule-example
❌ if(condition){
✅ if (condition) {

❌ var x=1+2;
✅ var x = 1 + 2;
```

## 注释规范

- **id**: comment-style
- **description**: 检查注释格式和内容
- **severity**: info
- **category**: style
- **enabled**: true

### 规则说明

1. 单行注释使用 `//`
2. 多行注释使用 `/* */`
3. 函数注释包含参数和返回值说明
4. 复杂逻辑必须添加注释

### 示例

```rule-example
❌ //这是一个函数
✅ // 获取用户信息

❌ function getUser(id) {}
✅ /**
   * 获取用户信息
   * @param {string} id 用户ID
   * @returns {Object} 用户信息
   */
   function getUser(id) {}
```
