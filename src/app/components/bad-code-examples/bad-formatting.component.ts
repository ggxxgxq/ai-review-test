import { Component } from '@angular/core';

// ❌ 错误示例：违反代码格式规范
@Component({
  selector: 'app-bad-formatting',
  template: `
    <div>
      <h2>错误格式示例</h2>
      <p>计算结果: {{ result }}</p>
      <button (click)="calculate()">计算</button>
    </div>
  `,
  styleUrls: ['./bad-formatting.component.scss'],
})
export class BadFormattingComponent {
  // ❌ 错误：运算符前后没有空格
  result = 0;
  a = 10;
  b = 20;

  // ❌ 错误：缩进不一致（混用空格和制表符）
  calculate() {
    if (this.a > 0 && this.b > 0) {
      this.result = this.a + this.b;
      if (this.result > 30) {
        console.log('结果大于30');
      }
    }
  }

  // ❌ 错误：行末有多余空格
  processData() {
    const data = [1, 2, 3, 4, 5];
    return data.map((x) => x * 2);
  }

  // ❌ 错误：文件末尾没有换行符
}
