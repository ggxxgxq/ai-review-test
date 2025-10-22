import { Component } from '@angular/core';

// ❌ 错误示例：违反TypeScript规范
@Component({
  selector: 'app-bad-typescript',
  template: `
    <div>
      <h2>错误TypeScript示例</h2>
      <p>用户信息: {{ userInfo }}</p>
      <button (click)="processUser()">处理用户</button>
    </div>
  `,
  styleUrls: ['./bad-typescript.component.scss']
})
export class BadTypeScriptComponent {
  // ❌ 错误：没有类型定义
  userInfo: any;
  userData;
  config;

  // ❌ 错误：函数参数和返回值没有类型定义
  processUser(userData) {
    this.userInfo = userData;
    return this.userInfo;
  }

  // ❌ 错误：接口定义不规范
  interface userService {
    getUserById(id): Promise<User>;
    updateUser(user): Promise<void>;
  }

  // ❌ 错误：使用any类型
  processData(data: any): any {
    return data.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        value: item.value * 2
      };
    });
  }

  // ❌ 错误：没有错误处理
  async fetchUserData(userId) {
    const response = await fetch(`/api/users/${userId}`);
    return await response.json();
  }

  // ❌ 错误：Promise链没有catch处理
  loadData() {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => this.processData(data));
  }
}
