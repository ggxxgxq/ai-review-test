import { Component, OnInit } from '@angular/core';

// ❌ 错误示例：综合违规 - 违反多项规范
@Component({
  selector: 'app-comprehensive-violations',
  template: `
    <div>
      <h2>综合违规示例</h2>

      <!-- 用户管理功能 -->
      <div>
        <h3>用户管理</h3>
        <input [(ngModel)]="user_name" placeholder="用户名" />
        <input [(ngModel)]="user_email" placeholder="邮箱" />
        <input [(ngModel)]="user_password" placeholder="密码" />
        <button (click)="create_user()">创建用户</button>
        <button (click)="delete_user()">删除用户</button>
        <div [innerHTML]="user_list"></div>
      </div>

      <!-- 支付功能 -->
      <div>
        <h3>支付处理</h3>
        <input [(ngModel)]="payment_amount" placeholder="支付金额" />
        <input [(ngModel)]="card_number" placeholder="信用卡号" />
        <button (click)="process_payment()">处理支付</button>
        <p>{{ payment_result }}</p>
      </div>

      <!-- 数据查询 -->
      <div>
        <h3>数据查询</h3>
        <input [(ngModel)]="search_query" placeholder="搜索查询" />
        <button (click)="search_data()">搜索</button>
        <div>{{ search_results }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./comprehensive-violations.component.scss'],
})
export class comprehensive_violations_component implements OnInit {
  // ❌ 错误：命名规范违规
  user_name = '';
  user_email = '';
  user_password = '';
  user_list = '';
  payment_amount = 0;
  card_number = '';
  payment_result = '';
  search_query = '';
  search_results = '';

  // ❌ 错误：使用console.log
  ngOnInit() {
    console.log('组件初始化');
  }

  // ❌ 错误：函数命名违规，没有类型定义，没有错误处理
  create_user() {
    // 没有输入验证
    const user_data = {
      name: this.user_name,
      email: this.user_email,
      password: this.user_password,
    };

    // 没有错误处理
    fetch('/api/createUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user_data),
    })
      .then((response) => response.json())
      .then((data) => {
        this.user_list += `<div>用户: ${data.name}</div>`;
      });
  }

  // ❌ 错误：权限控制缺失，SQL注入风险
  delete_user() {
    // 没有权限检查
    const query = `DELETE FROM users WHERE name = '${this.user_name}'`;
    console.log('执行删除:', query);

    // 模拟删除操作
    this.user_list = '';
  }

  // ❌ 错误：敏感信息处理不当，没有加密
  process_payment() {
    // 明文存储敏感信息
    localStorage.setItem('card_number', this.card_number);
    localStorage.setItem('payment_amount', this.payment_amount.toString());

    // 没有验证支付金额
    if (this.payment_amount > 0) {
      this.payment_result = `支付成功: $${this.payment_amount}`;
    } else {
      this.payment_result = '支付失败';
    }
  }

  // ❌ 错误：SQL注入漏洞，没有参数化查询
  search_data() {
    // 直接字符串拼接，存在SQL注入风险
    const query = `SELECT * FROM users WHERE name LIKE '%${this.search_query}%'`;
    console.log('搜索查询:', query);

    // 模拟搜索结果
    this.search_results = `搜索结果: ${this.search_query}`;
  }

  // ❌ 错误：函数过长，复杂度过高
  complex_business_logic() {
    // 50+ 行的复杂逻辑
    const data = [];
    for (let i = 0; i < 1000; i++) {
      data.push(i);
    }

    // 复杂的嵌套逻辑
    data.forEach((item) => {
      if (item > 100) {
        if (item % 2 === 0) {
          if (item % 3 === 0) {
            if (item % 5 === 0) {
              console.log('复杂条件满足:', item);
            }
          }
        }
      }
    });

    // 更多的复杂逻辑...
    const result = data
      .filter((x) => x > 50)
      .map((x) => x * 2)
      .reduce((sum, x) => sum + x, 0);

    return result;
  }

  // ❌ 错误：没有注释，没有类型定义
  calculate_total(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].price * items[i].quantity;
    }
    return total;
  }

  // ❌ 错误：使用var，没有错误处理
  process_data() {
    var data = [];
    try {
      // 可能抛出异常的操作
      data = JSON.parse('invalid json');
    } catch (e) {
      // 空的catch块
    }
    return data;
  }

  // ❌ 错误：内存泄漏风险
  setup_event_listeners() {
    // 没有清理事件监听器
    document.addEventListener('click', () => {
      console.log('点击事件');
    });

    window.addEventListener('resize', () => {
      console.log('窗口大小改变');
    });
  }

  // ❌ 错误：不安全的DOM操作
  update_dom() {
    // 直接操作DOM，没有使用Angular的方式
    const element = document.getElementById('user-list');
    if (element) {
      element.innerHTML = this.user_list;
    }
  }

  // ❌ 错误：硬编码配置
  get_api_url() {
    return 'http://api.example.com'; // 应该使用环境变量
  }

  // ❌ 错误：没有版本控制
  call_api() {
    fetch('/api/users') // 没有版本控制
      .then((response) => response.json())
      .then((data) => {
        console.log('API响应:', data);
      });
  }
}
