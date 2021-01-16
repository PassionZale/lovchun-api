# LOVCHUN-API

## 说明

Typescript Api Server for [LOVCHUN.COM](https://www.lovchun.com)

## 安装

```bash
$ npm install
```

## 运行

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 依赖说明

### CONFIG
```bash
npm install --save @nestjs/config @hapi/joi
npm install --save-dev @types/hapi__joi
```

### DATABASE
```bash
npm install --save @nestjs/typeorm typeorm mysql
```

### AUTH
```bash
npm install --save @nestjs/passport @nestjs/jwt passport passport-jwt bcryptjs
npm install --save-dev @types/passport-jwt @types/jsonwebtoken @types/bcryptjs
```

### UPLOAD
```bash
npm install --save multer mkdirp uuid
npm install --save-dev @types/multer @types/mkdirp @types/uuid
```

### VALIDATE
```bash
npm install --save class-transformer class-validator
```

### HELP
```bash
npm install --save moment-timezone
```

### API DOCUMENT
```bash
npm install --save @nestjs/swagger swagger-ui-express
```
## 测试

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```