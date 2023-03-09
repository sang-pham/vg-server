module.exports = {
  API_PAGE_LIMIT_DEFAULT: 100,
  API_PAGE_OFFSET_DEFAULT: 0,
  DEFAULT_USER_PASSWORD: '123456',
  IGNORE_CAST_TO_NUMBER: ['phone_number'],
  ORDER_TYPE: {
    PRODUCT: 0,
    BOOKING: 1
  },
  ORDER_STATUS: {
    ORDER_SUCCESS: 'Đặt hàng thành công/Chờ xác nhận',
    ORDER_COMFIRM: 'Xác nhận đặt hàng',
    ORDER_PREPARING: 'Đang chuẩn bị hàng',
    ORDER_TRANSFORM: 'Đã giao cho đơn vị vận chuyển',
    ORDER_DELIVERYING: 'Đang giao hàng',
    ORDER_RECEIVED: 'Nhận hàng thành công',
    ORDER_FAILED: 'Từ chối/Không nhận hàng'
  }
}