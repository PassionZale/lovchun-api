/**
 * API 业务错误编码
 */
export enum ApiErrorCode {
  /**
   * 默认错误码
   */
  FAIL = 5000,
  /**
   * access_token 解析异常：过期、不合法、未到使用时间等
   */
  ACCESS_TOKEN_INVALID = 40001,
  /**
   * jwt 中的荷载与 lock.json 中的 username login_at 无法完全匹配
   */
  JWT_PAYLOAD_INVALID = 40002,
  /**
   * 权限不足
   */
  PERMISSION_DENIED = 40003,
  /**
   * 上传文件类型不合法
   */
  FILE_MIMETYPE_INVALID = 3000,
}
