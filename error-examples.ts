// 这个文件包含了各种违反代码规范的错误示例
// 用于测试代码规范检查工具

// ===== 1. 变量命名规范违反 =====
// 错误：使用下划线命名法而不是驼峰命名法
var user_name = 'test';
var user_age = 25;
var user_email_address = 'test@example.com';

// 错误：常量使用驼峰命名法而不是大写下划线
const maxSize = 100;
const apiKey = 'secret';
const defaultTimeout = 5000;

// ===== 2. 函数命名规范违反 =====
// 错误：函数名没有使用动词开头
function userData() {
  return 'data';
}

function dataProcessor() {
  return 'processed';
}

// 错误：函数名使用下划线
function get_user_data() {
  return 'user data';
}

// ===== 3. 类命名规范违反 =====
// 错误：类名使用驼峰命名法而不是帕斯卡命名法
class userService {
  constructor() {}
}

class dataProcessor {
  constructor() {}
}

// ===== 4. 代码格式和缩进错误 =====
// 错误：缩进不一致，混用空格和制表符
function badFormatting() {
  var x = 1 + 2;
  if (condition) {
    console.log('test');
  }
}

// 错误：运算符前后没有空格
var result = 1 + 2 * 3;
var name = 'test';
var isValid = true;

// 错误：条件语句格式不正确
if (condition) {
  doSomething();
} else {
  doSomethingElse();
}

// ===== 5. Console使用错误 =====
// 错误：生产代码中使用console语句
function processData(data) {
  console.log('Processing data:', data);
  console.error('Error occurred');
  console.warn('Warning message');
  console.info('Info message');
  return data;
}

// ===== 6. 错误处理缺失 =====
// 错误：异步操作没有错误处理
function fetchUserData(userId) {
  fetch(`/api/users/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      processUserData(data);
    });
}

// 错误：Promise没有catch处理
function saveData(data) {
  return fetch('/api/save', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

// ===== 7. TypeScript类型定义错误 =====
// 错误：函数参数和返回值没有类型定义
function processUserData(data) {
  return data;
}

function calculateTotal(items) {
  let total = 0;
  for (let item of items) {
    total += item.price;
  }
  return total;
}

// 错误：变量没有类型注解
var userData = null;
var isLoading = false;
var errorMessage = '';

// ===== 8. 注释规范违反 =====
// 错误：注释格式不正确
//这是一个函数
function getUser(id) {
  return 'user';
}

// 错误：复杂逻辑没有注释
function complexCalculation(data) {
  let result = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].type === 'premium') {
      result += data[i].value * 1.5;
    } else if (data[i].type === 'standard') {
      result += data[i].value;
    } else {
      result += data[i].value * 0.8;
    }
  }
  return result;
}

// 错误：函数没有JSDoc注释
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ===== 9. 其他代码质量问题 =====
// 错误：使用var而不是let/const
var counter = 0;
var isActive = true;

// 错误：未使用的变量
function unusedVariables() {
  var unusedVar = 'not used';
  var anotherUnused = 123;
  return 'result';
}

// 错误：重复的代码
function calculateTax1(amount) {
  return amount * 0.1;
}

function calculateTax2(amount) {
  return amount * 0.1;
}

// 错误：魔法数字
function calculateDiscount(price) {
  if (price > 100) {
    return price * 0.15;
  } else if (price > 50) {
    return price * 0.1;
  } else {
    return price * 0.05;
  }
}

// 错误：过长的函数
function veryLongFunction(data) {
  // 处理数据验证
  if (!data) {
    return null;
  }
  if (!data.name) {
    return null;
  }
  if (!data.email) {
    return null;
  }
  if (!data.phone) {
    return null;
  }

  // 处理数据转换
  let processedData = {};
  processedData.name = data.name.toUpperCase();
  processedData.email = data.email.toLowerCase();
  processedData.phone = data.phone.replace(/\D/g, '');

  // 处理数据保存
  console.log('Saving data:', processedData);

  // 处理数据返回
  return processedData;
}

// 错误：深层嵌套
function deeplyNested(data) {
  if (data) {
    if (data.user) {
      if (data.user.profile) {
        if (data.user.profile.settings) {
          if (data.user.profile.settings.notifications) {
            if (data.user.profile.settings.notifications.email) {
              return data.user.profile.settings.notifications.email.enabled;
            }
          }
        }
      }
    }
  }
  return false;
}

// 错误：不一致的引号使用
var message1 = 'Hello world';
var message2 = 'Hello world';
var message3 = `Hello world`;

// 错误：行末有多余空格
var trailingSpace = 'test';
var anotherTrailingSpace = 123;

// 错误：文件末尾没有换行符
