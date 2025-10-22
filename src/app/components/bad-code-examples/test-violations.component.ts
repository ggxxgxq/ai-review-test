import { Component } from '@angular/core';

// ❌ 错误示例：测试覆盖率不足和测试质量差
@Component({
  selector: 'app-test-violations',
  template: `
    <div>
      <h2>测试违规示例</h2>

      <!-- 复杂业务逻辑 -->
      <div>
        <h3>复杂业务逻辑</h3>
        <input [(ngModel)]="orderAmount" placeholder="订单金额" />
        <input [(ngModel)]="userType" placeholder="用户类型" />
        <button (click)="calculateDiscount()">计算折扣</button>
        <p>折扣金额: {{ discountAmount }}</p>
      </div>

      <!-- 错误处理逻辑 -->
      <div>
        <h3>错误处理逻辑</h3>
        <input [(ngModel)]="userId" placeholder="用户ID" />
        <button (click)="getUserById()">获取用户</button>
        <p>{{ userResult }}</p>
      </div>

      <!-- 数据验证逻辑 -->
      <div>
        <h3>数据验证逻辑</h3>
        <input [(ngModel)]="email" placeholder="邮箱" />
        <button (click)="validateEmail()">验证邮箱</button>
        <p>验证结果: {{ validationResult }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./test-violations.component.scss'],
})
export class TestViolationsComponent {
  orderAmount = 0;
  userType = '';
  discountAmount = 0;
  userId = '';
  userResult = '';
  email = '';
  validationResult = '';

  // ❌ 错误：复杂业务逻辑没有测试覆盖
  calculateDiscount(): number {
    if (this.orderAmount <= 0) {
      throw new Error('订单金额必须大于0');
    }

    if (
      !this.userType ||
      !['premium', 'regular', 'vip'].includes(this.userType)
    ) {
      throw new Error('无效的用户类型');
    }

    const discountRates = {
      premium: 0.15,
      regular: 0.05,
      vip: 0.25,
    };

    // 复杂的折扣计算逻辑
    let baseDiscount = this.orderAmount * discountRates[this.userType];

    // 根据订单金额调整折扣
    if (this.orderAmount > 1000) {
      baseDiscount *= 1.2; // 大订单额外折扣
    }

    // 根据用户类型调整折扣
    if (this.userType === 'vip' && this.orderAmount > 500) {
      baseDiscount += 50; // VIP用户固定折扣
    }

    this.discountAmount = Math.min(baseDiscount, this.orderAmount * 0.5); // 最大50%折扣
    return this.discountAmount;
  }

  // ❌ 错误：错误处理逻辑没有测试
  async getUserById(): Promise<any> {
    try {
      if (!this.userId) {
        throw new Error('用户ID不能为空');
      }

      if (this.userId.length < 3) {
        throw new Error('用户ID长度不能少于3位');
      }

      const response = await fetch(`/api/users/${this.userId}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('用户不存在');
        } else if (response.status === 403) {
          throw new Error('没有权限访问该用户');
        } else {
          throw new Error(`服务器错误: ${response.status}`);
        }
      }

      const user = await response.json();
      this.userResult = `用户: ${user.name}, 邮箱: ${user.email}`;
      return user;
    } catch (error) {
      this.userResult = `错误: ${error.message}`;
      throw error;
    }
  }

  // ❌ 错误：数据验证逻辑没有测试
  validateEmail(): boolean {
    if (!this.email) {
      this.validationResult = '邮箱不能为空';
      return false;
    }

    if (this.email.length > 254) {
      this.validationResult = '邮箱长度不能超过254个字符';
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.validationResult = '邮箱格式不正确';
      return false;
    }

    // 检查邮箱域名
    const domain = this.email.split('@')[1];
    const validDomains = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'company.com',
    ];
    if (!validDomains.includes(domain)) {
      this.validationResult = '不支持的邮箱域名';
      return false;
    }

    this.validationResult = '邮箱验证通过';
    return true;
  }

  // ❌ 错误：异步操作没有测试
  async processPayment(
    amount: number,
    paymentMethod: string
  ): Promise<boolean> {
    try {
      // 验证支付金额
      if (amount <= 0) {
        throw new Error('支付金额必须大于0');
      }

      // 验证支付方式
      const validMethods = ['credit_card', 'paypal', 'bank_transfer'];
      if (!validMethods.includes(paymentMethod)) {
        throw new Error('不支持的支付方式');
      }

      // 模拟支付处理
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, paymentMethod }),
      });

      if (!response.ok) {
        throw new Error('支付处理失败');
      }

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('支付错误:', error);
      return false;
    }
  }

  // ❌ 错误：边界条件没有测试
  calculateTax(income: number, taxRate: number): number {
    if (income < 0) {
      throw new Error('收入不能为负数');
    }

    if (taxRate < 0 || taxRate > 1) {
      throw new Error('税率必须在0-1之间');
    }

    // 边界条件：收入为0
    if (income === 0) {
      return 0;
    }

    // 边界条件：税率为0
    if (taxRate === 0) {
      return 0;
    }

    // 边界条件：税率为1
    if (taxRate === 1) {
      return income;
    }

    return income * taxRate;
  }

  // ❌ 错误：性能关键代码没有测试
  sortLargeArray(data: number[]): number[] {
    if (!data || data.length === 0) {
      return [];
    }

    // 使用快速排序算法
    const quickSort = (arr: number[]): number[] => {
      if (arr.length <= 1) {
        return arr;
      }

      const pivot = arr[Math.floor(arr.length / 2)];
      const left = arr.filter((x) => x < pivot);
      const middle = arr.filter((x) => x === pivot);
      const right = arr.filter((x) => x > pivot);

      return [...quickSort(left), ...middle, ...quickSort(right)];
    };

    return quickSort(data);
  }
}
