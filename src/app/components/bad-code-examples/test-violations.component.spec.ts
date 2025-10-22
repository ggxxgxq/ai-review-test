import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TestViolationsComponent } from './test-violations.component';

// ❌ 错误示例：测试覆盖率不足
describe('TestViolationsComponent', () => {
  let component: TestViolationsComponent;
  let fixture: ComponentFixture<TestViolationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestViolationsComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestViolationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ❌ 错误：只测试了正常情况，没有测试异常情况
  it('should calculate discount for premium user', () => {
    component.orderAmount = 100;
    component.userType = 'premium';

    const result = component.calculateDiscount();

    expect(result).toBe(15); // 15% discount
  });

  // ❌ 错误：缺少边界条件测试
  // 应该测试：orderAmount = 0, orderAmount < 0, userType = '', userType = 'invalid'

  // ❌ 错误：缺少异步操作测试
  // 应该测试：getUserById 的各种错误情况

  // ❌ 错误：缺少数据验证测试
  // 应该测试：validateEmail 的各种无效输入

  // ❌ 错误：缺少性能测试
  // 应该测试：sortLargeArray 的性能表现

  // ❌ 错误：测试名称不够清晰
  it('should work', () => {
    // 测试名称太模糊
  });

  // ❌ 错误：测试没有使用AAA模式
  it('should validate email', () => {
    component.email = 'test@example.com';
    const result = component.validateEmail();
    expect(result).toBe(true);
    // 缺少 Arrange, Act, Assert 的清晰分离
  });

  // ❌ 错误：测试没有清理
  it('should process payment', () => {
    // 测试后没有清理状态
    component.processPayment(100, 'credit_card');
  });

  // ❌ 错误：测试依赖外部服务
  it('should fetch user data', () => {
    // 测试依赖真实的API调用，应该使用mock
    component.getUserById('123');
  });

  // ❌ 错误：测试覆盖率低
  // 很多方法没有对应的测试用例
  // calculateTax, sortLargeArray 等方法完全没有测试
});
