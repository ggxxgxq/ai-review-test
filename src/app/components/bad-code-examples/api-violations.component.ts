import { Component } from '@angular/core';

// ❌ 错误示例：API设计违规
@Component({
  selector: 'app-api-violations',
  template: `
    <div>
      <h2>API设计违规示例</h2>

      <!-- 错误的RESTful设计 -->
      <div>
        <h3>错误的RESTful设计</h3>
        <button (click)="getUser()">获取用户</button>
        <button (click)="createUser()">创建用户</button>
        <button (click)="updateUser()">更新用户</button>
        <button (click)="deleteUser()">删除用户</button>
        <div>{{ apiResponse }}</div>
      </div>

      <!-- 错误的响应格式 -->
      <div>
        <h3>错误的响应格式</h3>
        <button (click)="fetchData()">获取数据</button>
        <div>{{ responseData }}</div>
      </div>

      <!-- 错误的状态码使用 -->
      <div>
        <h3>错误的状态码使用</h3>
        <button (click)="testStatusCodes()">测试状态码</button>
        <div>{{ statusCodeResult }}</div>
      </div>

      <!-- 缺少版本控制 -->
      <div>
        <h3>缺少版本控制</h3>
        <button (click)="callApiWithoutVersion()">调用API</button>
        <div>{{ versionResult }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./api-violations.component.scss'],
})
export class ApiViolationsComponent {
  apiResponse = '';
  responseData = '';
  statusCodeResult = '';
  versionResult = '';

  // ❌ 错误：使用动词而不是名词
  getUser() {
    // 错误：GET /api/getUser 应该是 GET /api/users
    fetch('/api/getUser')
      .then((response) => response.json())
      .then((data) => {
        this.apiResponse = JSON.stringify(data);
      });
  }

  // ❌ 错误：使用动词而不是名词
  createUser() {
    // 错误：POST /api/createUser 应该是 POST /api/users
    fetch('/api/createUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'John Doe', email: 'john@example.com' }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.apiResponse = JSON.stringify(data);
      });
  }

  // ❌ 错误：使用动词而不是名词
  updateUser() {
    // 错误：POST /api/updateUser 应该是 PUT /api/users/123
    fetch('/api/updateUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 123, name: 'John Updated' }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.apiResponse = JSON.stringify(data);
      });
  }

  // ❌ 错误：使用动词而不是名词
  deleteUser() {
    // 错误：POST /api/removeUser 应该是 DELETE /api/users/123
    fetch('/api/removeUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 123 }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.apiResponse = JSON.stringify(data);
      });
  }

  // ❌ 错误：响应格式不统一
  fetchData() {
    fetch('/api/data')
      .then((response) => response.json())
      .then((data) => {
        // 错误：直接返回数据，没有统一的响应格式
        this.responseData = JSON.stringify(data);
      });
  }

  // ❌ 错误：状态码使用不当
  testStatusCodes() {
    // 错误：所有错误都返回400
    fetch('/api/nonexistent').then((response) => {
      if (response.status === 404) {
        // 错误：404错误返回200状态码
        this.statusCodeResult = '资源不存在，但返回200状态码';
      }
    });

    // 错误：服务器错误返回200
    fetch('/api/server-error').then((response) => {
      if (response.status === 500) {
        // 错误：500错误返回200状态码
        this.statusCodeResult = '服务器错误，但返回200状态码';
      }
    });
  }

  // ❌ 错误：缺少版本控制
  callApiWithoutVersion() {
    // 错误：没有版本控制
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => {
        this.versionResult = 'API调用成功，但没有版本控制';
      });
  }

  // ❌ 错误：使用错误的HTTP方法
  searchUsers() {
    // 错误：搜索应该用GET，不是POST
    fetch('/api/users/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'john' }),
    });
  }

  // ❌ 错误：缺少分页参数
  getUsersList() {
    // 错误：没有分页参数
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => {
        // 可能返回大量数据，没有分页
        console.log('所有用户:', data);
      });
  }

  // ❌ 错误：缺少错误处理
  fetchUserData() {
    // 错误：没有错误处理
    fetch('/api/users/123')
      .then((response) => response.json())
      .then((data) => {
        console.log('用户数据:', data);
      });
    // 缺少 .catch() 处理
  }

  // ❌ 错误：不安全的认证方式
  authenticateUser() {
    // 错误：使用自定义认证头而不是标准Bearer token
    fetch('/api/auth', {
      headers: {
        'X-API-Key': 'my-api-key', // 应该使用 Authorization: Bearer token
        'X-User-Token': 'user-token',
      },
    });
  }
}
