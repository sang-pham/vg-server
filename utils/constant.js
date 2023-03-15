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
  },
  HORSE_SERVICE_TYPE: ['JUST_FOR_ONE_DAY', 'COURSE', 'PICNIC', 'STAY'],
  HORSE_PRICE_UNIT: ['PERSON', 'SET'],
  VALID_HORSE_SERVICE_UNIT_TYPE: {
    'PERSON': ['JUST_FOR_ONE_DAY', 'STAY', 'COURSE'],
    'SET': ['UNIT']
  },
  HORSE_SERVICE_PRICE_MAP: {
    'JUST_FOR_ONE_DAY': {
      'child': {
        price: 0,
        note: '',
        title: 'Trẻ em'
      },
      'adult': {
        price: 0,
        note: '',
        title: 'Người lớn'
      },
      'weekend_child': {
        price: 0,
        note: '',
        title: 'Trẻ em(cuối tuần)'
      },
      'weekend_adult': {
        price: 0,
        note: '',
        title: 'Người lớn em(cuối tuần)'
      }
    },
    'COURSE': {
      price: 0,
      number_of_months: 0,
      number_of_sessions: 0,
      note: ''
    },
    'PICNIC': {
      price: 0,
      note: ''
    },
    'STAY': {
      price: 0,
      note: ''
    }
  }
}