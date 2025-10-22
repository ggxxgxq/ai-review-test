import { Component } from '@angular/core';

// ❌ 错误示例：安全漏洞 - 输入验证不足
@Component({
  selector: 'app-security-vulnerabilities',
  template: `
    <div>
      <h2>安全漏洞示例</h2>

      <!-- XSS 漏洞示例 -->
      <div>
        <h3>XSS 漏洞</h3>
        <input [(ngModel)]="userInput" placeholder="输入内容" />
        <button (click)="displayContent()">显示内容</button>
        <div [innerHTML]="displayedContent"></div>
      </div>

      <!-- SQL 注入漏洞示例 -->
      <div>
        <h3>SQL 注入漏洞</h3>
        <input [(ngModel)]="searchQuery" placeholder="搜索查询" />
        <button (click)="searchUsers()">搜索用户</button>
        <div *ngFor="let user of searchResults">
          {{ user.name }} - {{ user.email }}
        </div>
      </div>

      <!-- 敏感信息泄露 -->
      <div>
        <h3>敏感信息泄露</h3>
        <button (click)="logUserInfo()">记录用户信息</button>
        <p>日志: {{ logMessage }}</p>
      </div>

      <!-- 权限控制缺失 -->
      <div>
        <h3>权限控制缺失</h3>
        <button (click)="deleteUser()">删除用户</button>
        <button (click)="accessAdminPanel()">访问管理面板</button>
      </div>
    </div>
  `,
  styleUrls: ['./security-vulnerabilities.component.scss'],
})
export class SecurityVulnerabilitiesComponent {
  userInput = '';
  displayedContent = '';
  searchQuery = '';
  searchResults: any[] = [];
  logMessage = '';

  // ❌ 错误：XSS 漏洞 - 直接输出用户输入
  displayContent() {
    this.displayedContent = this.userInput; // 没有进行HTML编码
  }

  // ❌ 错误：SQL 注入漏洞 - 字符串拼接
  searchUsers() {
    // 模拟SQL注入漏洞
    const query = `SELECT * FROM users WHERE name LIKE '%${this.searchQuery}%'`;
    console.log('执行查询:', query);

    // 模拟查询结果
    this.searchResults = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
    ];
  }

  // ❌ 错误：敏感信息泄露 - 在日志中记录密码
  logUserInfo() {
    const userInfo = {
      id: '123',
      name: 'John Doe',
      password: 'secretpassword123', // 密码不应该被记录
      email: 'john@example.com',
      creditCard: '4111-1111-1111-1111', // 信用卡信息不应该被记录
    };

    console.log('用户信息:', userInfo);
    this.logMessage = `用户 ${userInfo.name} 的密码是 ${userInfo.password}`;
  }

  // ❌ 错误：权限控制缺失 - 没有验证用户权限
  deleteUser() {
    // 没有检查当前用户是否有删除权限
    console.log('删除用户操作');
    alert('用户已删除');
  }

  // ❌ 错误：权限控制缺失 - 没有验证管理员权限
  accessAdminPanel() {
    // 没有检查当前用户是否是管理员
    console.log('访问管理面板');
    alert('欢迎来到管理面板');
  }

  // ❌ 错误：不安全的文件上传
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // 没有验证文件类型和大小
      console.log('上传文件:', file.name);
      // 直接处理文件，没有安全检查
    }
  }

  // ❌ 错误：不安全的密码存储
  storePassword(password: string) {
    // 明文存储密码
    localStorage.setItem('password', password);
    console.log('密码已存储:', password);
  }

  // ❌ 错误：不安全的API调用
  makeApiCall() {
    // 没有使用HTTPS
    fetch('http://api.example.com/users') // 应该使用HTTPS
      .then((response) => response.json())
      .then((data) => {
        console.log('API响应:', data);
      });
  }
}
