/**
 * jsonwebtoken verfiyErrors
 */
export enum JwtErrorName {
  'JsonWebTokenError' = '凭证不合法',

  'NotBeforeError' = '凭证不在使用时间',

  'TokenExpiredError' = '凭证已过期',

  'SyntaxError' = '凭证无法解析',
}
