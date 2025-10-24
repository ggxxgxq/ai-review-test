import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  template: ` <div class="thy-menu-container"></div>`,
  styles: [
    `
      .thy-menu-item {
        border-top: 2px solid transparent;
        border-bottom: 2px solid transparent;
        box-sizing: border-box;
        transform-style: preserve-3d;
        .thy-menu-item-content {
          margin-top: -2px;
          &:hover {
            //transform: translateZ(-10px);问题的原因修改为z-index就好了
            z-index: 1;
          }
        }
      }
    `,
  ],
})
export class MenuItemComponent {}
