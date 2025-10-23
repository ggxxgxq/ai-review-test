import { Component } from '@angular/core';

// 错误示例组件索引
@Component({
  selector: 'app-error-examples-index',
  template: `
    <div class="error-examples-container">
      <h1>错误示例组件集合</h1>
      <p class="description">
        基于项目规范文档创建的错误示例组件，用于演示常见的代码违规行为。
        <strong>注意：这些组件仅用于学习目的，不要在生产环境中使用。</strong>
      </p>

      <div class="examples-grid">
        <!-- 代码规范违规 -->
        <div class="example-card">
          <h3>命名规范违规</h3>
          <p>演示违反命名规范的错误示例</p>
          <ul>
            <li>变量使用下划线命名</li>
            <li>常量使用驼峰命名</li>
            <li>函数名没有动词开头</li>
            <li>类名使用下划线</li>
          </ul>
          <button (click)="loadComponent('bad-naming')">查看示例</button>
        </div>

        <!-- 代码格式违规 -->
        <div class="example-card">
          <h3>代码格式违规</h3>
          <p>演示违反代码格式规范的错误示例</p>
          <ul>
            <li>运算符前后没有空格</li>
            <li>缩进不一致</li>
            <li>行末有多余空格</li>
            <li>文件末尾没有换行符</li>
          </ul>
          <button (click)="loadComponent('bad-formatting')">查看示例</button>
        </div>

        <!-- TypeScript规范违规 -->
        <div class="example-card">
          <h3>TypeScript规范违规</h3>
          <p>演示违反TypeScript规范的错误示例</p>
          <ul>
            <li>缺少类型定义</li>
            <li>使用any类型</li>
            <li>没有错误处理</li>
            <li>Promise链没有catch处理</li>
          </ul>
          <button (click)="loadComponent('bad-typescript')">查看示例</button>
        </div>

        <!-- 注释规范违规 -->
        <div class="example-card">
          <h3>注释规范违规</h3>
          <p>演示违反注释规范的错误示例</p>
          <ul>
            <li>注释格式不正确</li>
            <li>缺少JSDoc注释</li>
            <li>注释与代码不同步</li>
            <li>无意义的注释</li>
          </ul>
          <button (click)="loadComponent('bad-comments')">查看示例</button>
        </div>

        <!-- 安全漏洞示例 -->
        <div class="example-card security">
          <h3>安全漏洞示例</h3>
          <p>演示常见的安全漏洞和风险</p>
          <ul>
            <li>XSS攻击漏洞</li>
            <li>SQL注入漏洞</li>
            <li>敏感信息泄露</li>
            <li>权限控制缺失</li>
          </ul>
          <button (click)="loadComponent('security-vulnerabilities')">
            查看示例
          </button>
        </div>

        <!-- API设计违规 -->
        <div class="example-card">
          <h3>API设计违规</h3>
          <p>演示违反API设计规范的错误示例</p>
          <ul>
            <li>使用动词而不是名词</li>
            <li>响应格式不统一</li>
            <li>状态码使用不当</li>
            <li>缺少版本控制</li>
          </ul>
          <button (click)="loadComponent('api-violations')">查看示例</button>
        </div>

        <!-- 测试违规示例 -->
        <div class="example-card">
          <h3>测试违规示例</h3>
          <p>演示测试覆盖率不足和质量差的示例</p>
          <ul>
            <li>复杂业务逻辑没有测试</li>
            <li>错误处理逻辑没有测试</li>
            <li>边界条件没有测试</li>
            <li>异步操作没有测试</li>
          </ul>
          <button (click)="loadComponent('test-violations')">查看示例</button>
        </div>

        <!-- 综合违规示例 -->
        <div class="example-card comprehensive">
          <h3>综合违规示例</h3>
          <p>演示同时违反多项规范的错误示例</p>
          <ul>
            <li>命名规范违规</li>
            <li>安全漏洞</li>
            <li>代码质量问题</li>
            <li>性能问题</li>
          </ul>
          <button (click)="loadComponent('comprehensive-violations')">
            查看示例
          </button>
        </div>
      </div>

      <!-- 当前加载的组件 -->
      <div class="current-component" *ngIf="currentComponent">
        <h2>当前示例: {{ currentComponent }}</h2>
        <div class="component-content">
          <!-- 这里可以动态加载组件 -->
          <p>组件内容将在这里显示...</p>
        </div>
      </div>

      <!-- 检查清单 -->
      <div class="checklist-section">
        <h2>代码审查检查清单</h2>
        <div class="checklist-grid">
          <div class="checklist-item">
            <h4>代码质量检查</h4>
            <ul>
              <li>□ 变量和函数命名是否清晰</li>
              <li>□ 代码结构是否合理</li>
              <li>□ 函数长度是否适中</li>
              <li>□ 代码复杂度是否可接受</li>
              <li>□ 是否有重复代码</li>
            </ul>
          </div>

          <div class="checklist-item">
            <h4>安全性检查</h4>
            <ul>
              <li>□ 输入验证是否充分</li>
              <li>□ 是否存在SQL注入风险</li>
              <li>□ 是否存在XSS攻击风险</li>
              <li>□ 敏感信息是否泄露</li>
              <li>□ 权限控制是否完善</li>
            </ul>
          </div>

          <div class="checklist-item">
            <h4>性能检查</h4>
            <ul>
              <li>□ 是否存在性能瓶颈</li>
              <li>□ 数据库查询是否优化</li>
              <li>□ 内存使用是否合理</li>
              <li>□ 算法复杂度是否可接受</li>
              <li>□ 是否有不必要的循环</li>
            </ul>
          </div>

          <div class="checklist-item">
            <h4>测试检查</h4>
            <ul>
              <li>□ 是否有对应的单元测试</li>
              <li>□ 测试覆盖率是否达标</li>
              <li>□ 测试用例是否覆盖正常和异常情况</li>
              <li>□ 测试名称是否清晰</li>
              <li>□ 集成测试是否完整</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .error-examples-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          sans-serif;
      }

      .description {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: 4px;
        padding: 15px;
        margin-bottom: 30px;
        color: #856404;
      }

      .examples-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
      }

      .example-card {
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease;
      }

      .example-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      .example-card.security {
        border-left: 4px solid #dc3545;
      }

      .example-card.comprehensive {
        border-left: 4px solid #ffc107;
      }

      .example-card h3 {
        margin-top: 0;
        color: #333;
      }

      .example-card ul {
        margin: 10px 0;
        padding-left: 20px;
      }

      .example-card li {
        margin: 5px 0;
        color: #666;
      }

      .example-card button {
        background: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.2s ease;
      }

      .example-card button:hover {
        background: #0056b3;
      }

      .current-component {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 30px;
      }

      .checklist-section {
        background: #e3f2fd;
        border: 1px solid #bbdefb;
        border-radius: 8px;
        padding: 20px;
      }

      .checklist-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }

      .checklist-item {
        background: white;
        border-radius: 4px;
        padding: 15px;
      }

      .checklist-item h4 {
        margin-top: 0;
        color: #1976d2;
      }

      .checklist-item ul {
        margin: 10px 0;
        padding-left: 20px;
      }

      .checklist-item li {
        margin: 5px 0;
        color: #333;
      }

      h1 {
        color: #2c3e50;
        text-align: center;
        margin-bottom: 10px;
      }

      h2 {
        color: #34495e;
        margin-top: 30px;
      }
    `,
  ],
})
export class ErrorExamplesIndexComponent {
  currentComponent: string | null = null;

  loadComponent(componentName: string): void {
    this.currentComponent = componentName;
    console.log(`加载组件: ${componentName}`);
    // 这里可以添加动态加载组件的逻辑
  }
}
