# 安全开发指南

## 1. 输入验证与数据清理

### 1.1 用户输入验证
- **规则**: 所有用户输入都必须进行验证和清理
- **示例**:
  ```typescript
  // ✅ 正确
  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }
  
  function sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }
  
  // ❌ 错误
  function processUserInput(input: string) {
    // 直接使用用户输入，没有验证
    return `<div>${input}</div>`;
  }
  ```

### 1.2 SQL 注入防护
- **规则**: 使用参数化查询，避免字符串拼接
- **示例**:
  ```typescript
  // ✅ 正确
  async function getUserById(id: string): Promise<User> {
    const query = 'SELECT * FROM users WHERE id = ?';
    return await db.query(query, [id]);
  }
  
  // ❌ 错误
  async function getUserById(id: string): Promise<User> {
    const query = `SELECT * FROM users WHERE id = '${id}'`;
    return await db.query(query);
  }
  ```

## 2. 身份认证与授权

### 2.1 密码安全
- **规则**: 密码必须加密存储，使用强密码策略
- **示例**:
  ```typescript
  // ✅ 正确
  import bcrypt from 'bcrypt';
  
  async function hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }
  
  async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
  
  // ❌ 错误
  function storePassword(password: string) {
    // 明文存储密码
    localStorage.setItem('password', password);
  }
  ```

### 2.2 JWT Token 安全
- **规则**: 使用安全的 JWT 配置，设置合理的过期时间
- **示例**:
  ```typescript
  // ✅ 正确
  import jwt from 'jsonwebtoken';
  
  function generateToken(userId: string): string {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET!,
      { 
        expiresIn: '15m',
        issuer: 'your-app',
        audience: 'your-app-users'
      }
    );
  }
  
  // ❌ 错误
  function generateToken(userId: string): string {
    return jwt.sign({ userId }, 'weak-secret');
  }
  ```

### 2.3 权限检查
- **规则**: 每个敏感操作都要进行权限验证
- **示例**:
  ```typescript
  // ✅ 正确
  async function deleteUser(userId: string, currentUserId: string): Promise<void> {
    // 检查权限
    if (currentUserId !== userId && !await isAdmin(currentUserId)) {
      throw new Error('Unauthorized');
    }
    
    await userService.deleteUser(userId);
  }
  
  // ❌ 错误
  async function deleteUser(userId: string): Promise<void> {
    // 没有权限检查
    await userService.deleteUser(userId);
  }
  ```

## 3. 跨站脚本攻击 (XSS) 防护

### 3.1 输出编码
- **规则**: 所有用户数据输出都要进行编码
- **示例**:
  ```typescript
  // ✅ 正确
  function escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
  
  function renderUserContent(content: string): string {
    return `<div>${escapeHtml(content)}</div>`;
  }
  
  // ❌ 错误
  function renderUserContent(content: string): string {
    return `<div>${content}</div>`;
  }
  ```

### 3.2 Content Security Policy
- **规则**: 设置适当的 CSP 头部
- **示例**:
  ```typescript
  // ✅ 正确
  app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
    );
    next();
  });
  ```

## 4. 跨站请求伪造 (CSRF) 防护

### 4.1 CSRF Token
- **规则**: 敏感操作使用 CSRF Token
- **示例**:
  ```typescript
  // ✅ 正确
  import csrf from 'csurf';
  
  const csrfProtection = csrf({ cookie: true });
  
  app.use(csrfProtection);
  
  app.post('/api/transfer', (req, res) => {
    // CSRF token 会自动验证
    const { amount, toAccount } = req.body;
    // 处理转账逻辑
  });
  
  // ❌ 错误
  app.post('/api/transfer', (req, res) => {
    // 没有 CSRF 防护
    const { amount, toAccount } = req.body;
    // 处理转账逻辑
  });
  ```

## 5. 敏感数据保护

### 5.1 环境变量
- **规则**: 敏感配置使用环境变量
- **示例**:
  ```typescript
  // ✅ 正确
  const config = {
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    apiKey: process.env.API_KEY
  };
  
  // ❌ 错误
  const config = {
    databaseUrl: 'postgresql://user:password@localhost:5432/db',
    jwtSecret: 'my-secret-key',
    apiKey: 'sk-1234567890abcdef'
  };
  ```

### 5.2 日志安全
- **规则**: 日志中不记录敏感信息
- **示例**:
  ```typescript
  // ✅ 正确
  function logUserAction(userId: string, action: string) {
    logger.info(`User ${userId} performed ${action}`);
  }
  
  // ❌ 错误
  function logUserAction(userId: string, password: string, action: string) {
    logger.info(`User ${userId} with password ${password} performed ${action}`);
  }
  ```

## 6. HTTPS 和安全头部

### 6.1 强制 HTTPS
- **规则**: 生产环境强制使用 HTTPS
- **示例**:
  ```typescript
  // ✅ 正确
  app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production' && !req.secure) {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
  ```

### 6.2 安全头部
- **规则**: 设置适当的安全头部
- **示例**:
  ```typescript
  // ✅ 正确
  import helmet from 'helmet';
  
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  }));
  ```

## 7. 文件上传安全

### 7.1 文件类型验证
- **规则**: 严格验证上传文件的类型和大小
- **示例**:
  ```typescript
  // ✅ 正确
  import multer from 'multer';
  import path from 'path';
  
  const upload = multer({
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif'];
      const ext = path.extname(file.originalname).toLowerCase();
      
      if (allowedTypes.includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type'));
      }
    }
  });
  
  // ❌ 错误
  const upload = multer();
  // 没有文件类型和大小限制
  ```

## 8. API 安全

### 8.1 速率限制
- **规则**: 实施 API 速率限制防止滥用
- **示例**:
  ```typescript
  // ✅ 正确
  import rateLimit from 'express-rate-limit';
  
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 分钟
    max: 100, // 限制每个 IP 15 分钟内最多 100 个请求
    message: 'Too many requests from this IP'
  });
  
  app.use('/api/', limiter);
  
  // ❌ 错误
  // 没有速率限制
  ```

### 8.2 API 版本控制
- **规则**: 使用版本控制管理 API 变更
- **示例**:
  ```typescript
  // ✅ 正确
  app.use('/api/v1', v1Routes);
  app.use('/api/v2', v2Routes);
  
  // ❌ 错误
  app.use('/api', routes);
  // 没有版本控制
  ```

## 9. 依赖安全

### 9.1 依赖扫描
- **规则**: 定期扫描和更新依赖包
- **示例**:
  ```bash
  # ✅ 正确
  npm audit
  npm audit fix
  
  # 使用 Snyk 等工具进行安全扫描
  npx snyk test
  ```

### 9.2 最小权限原则
- **规则**: 依赖包只安装必要的功能
- **示例**:
  ```json
  // ✅ 正确 - package.json
  {
    "dependencies": {
      "lodash.get": "^4.4.2"
    }
  }
  
  // ❌ 错误
  {
    "dependencies": {
      "lodash": "^4.17.21"
    }
  }
  ```

## 10. 安全测试

### 10.1 自动化安全测试
- **规则**: 集成安全测试到 CI/CD 流程
- **示例**:
  ```yaml
  # .github/workflows/security.yml
  name: Security Tests
  on: [push, pull_request]
  jobs:
    security:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v2
        - name: Run security audit
          run: npm audit
        - name: Run Snyk security scan
          run: npx snyk test
  ```

## 11. 安全审查检查点

### 11.1 输入验证检查
- [ ] 所有用户输入都经过验证
- [ ] 使用参数化查询防止 SQL 注入
- [ ] 文件上传有类型和大小限制

### 11.2 身份认证检查
- [ ] 密码使用强加密算法存储
- [ ] JWT Token 配置安全
- [ ] 敏感操作有权限验证

### 11.3 输出安全检查
- [ ] 用户数据输出经过编码
- [ ] 设置了 Content Security Policy
- [ ] 没有 XSS 漏洞

### 11.4 传输安全检查
- [ ] 生产环境强制 HTTPS
- [ ] 设置了安全头部
- [ ] 实施了 CSRF 防护

### 11.5 配置安全检查
- [ ] 敏感配置使用环境变量
- [ ] 日志不包含敏感信息
- [ ] API 有速率限制

### 11.6 依赖安全检查
- [ ] 定期进行安全审计
- [ ] 使用最小权限原则
- [ ] 集成自动化安全测试
