export interface Payload {
  /**
   *  用户名
   */
  username: string;
  /**
   * 登录时间
   */
  login_at: Date;
  /**
   * 令牌颁发时间，单位：秒
   */
  iat: number;
  /**
   * 令牌过期时间，单位：秒
   */
  exp: number;
  /**
   * 令牌所面向的用户，已由 id 所取代
   */
  sub?: string | number;
  /**
   * 令牌的颁发者
   */
  iss?: string;
  /**
   * 令牌在此时间前不能使用，单位：秒
   */
  nbf?: number;
  /**
   * 令牌的唯一标识
   */
  jti?: string;
}
