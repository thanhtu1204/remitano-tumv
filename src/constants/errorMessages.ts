enum APIStatusCode {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  RATE_LIMIT = 429,
  INTERNAL_SERVER = 500,
}

// Message lỗi bên trong API
const INNER_ERROR_MAPPING = {
  // import lỗi của từng feature vào đây
  'error.css.application.had.score': 'Lỗi lấy điểm',
}

// Lỗi Http
const API_ERROR_MAPPING = {
  [APIStatusCode.UNAUTHORIZED]: 'Hết phiên đăng nhập, vui lòng đăng nhập lại!',
  [APIStatusCode.FORBIDDEN]: 'Bạn không có quyền truy cập chức năng này!',
  [APIStatusCode.INTERNAL_SERVER]: 'Lỗi hệ thống. Vui lòng liên hệ với quản trị viên!',
}

export { API_ERROR_MAPPING, APIStatusCode, INNER_ERROR_MAPPING }
