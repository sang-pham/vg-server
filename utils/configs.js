const configs = [
  {
    key: "HORSE_SERVICE",
    description: "Cấu hình liên quan đến VietgangzHorse",
    name: "Cấu hình VietgangzHorse",
    configs: {
      services: {
        KHOA_THAM_QUAN: {
          service_name: "Khóa tham quan",
          service_code: "KHOA_THAM_QUAN",
          ticker_price: {
            adult: 99000,
            low_children: 66000,
            high_children: 699000,
          },
          thumbnail:
            "https://vietgangz.com/wp-content/uploads/2022/09/293382954_192792019752648_120047178045655581_n-267x400.jpg",
          number: 1,
          content:
            "QK tự do tham quan sở thú mini, học cách làm quen và cho thú ăn, tự do chụp hình check-in tại nông trại không giới hạn thời gian, miễn phí đồ uống.",
          description: "description",
        },
        KHOA_CUOI_NGUA_TRAI_NGHIEM: {
          service_name: "Khóa cưỡi ngựa trải nghiệm",
          service_code: "KHOA_CUOI_NGUA_TRAI_NGHIEM",
          ticker_price: {
            adult: 99000,
            low_children: 66000,
            high_children: 699000,
          },
          thumbnail:
            "https://vietgangz.com/wp-content/uploads/2022/09/293382954_192792019752648_120047178045655581_n-267x400.jpg",
          number: 2,
          description: "description",
        },
        KHOA_HOC_CO_BAN: {
          service_name: "Khóa học cơ bản",
          service_code: "KHOA_HOC_CO_BAN",
          ticker_price: {
            adult: 99000,
            low_children: 66000,
            high_children: 699000,
          },
          thumbnail:
            "https://vietgangz.com/wp-content/uploads/2022/09/293382954_192792019752648_120047178045655581_n-267x400.jpg",
          number: 3,
          description: "description",
        },
        KHOA_HOC_NANG_CAO: {
          service_name: "Khóa học nâng cao",
          service_code: "KHOA_HOC_NANG_CAO",
          ticker_price: {
            adult: 99000,
            low_children: 66000,
            high_children: 699000,
          },
          thumbnail:
            "https://vietgangz.com/wp-content/uploads/2022/09/293382954_192792019752648_120047178045655581_n-267x400.jpg",
          number: 4,
          description: "description",
        },
        KHOA_CHUYEN_NGHIEP: {
          service_name: "Khóa chuyên nghiệp",
          service_code: "KHOA_CHUYEN_NGHIEP",
          ticker_price: {
            adult: 99000,
            low_children: 66000,
            high_children: 699000,
          },
          thumbnail:
            "https://vietgangz.com/wp-content/uploads/2022/09/293382954_192792019752648_120047178045655581_n-267x400.jpg",
          number: 5,
          description: "description",
        },
        KHOA_THAM_QUAN_BBQ: {
          service_name: "Picnic: Tham quan và ăn uống BBQ",
          service_code: "KHOA_THAM_QUAN_BBQ",
          ticker_price: {
            adult: 699000,
            low_children: 699000,
            high_children: 999000,
            high_children: 699000,
          },
          thumbnail:
            "https://vietgangz.com/wp-content/uploads/2022/09/293382954_192792019752648_120047178045655581_n-267x400.jpg",
          number: 6,
          description: "description",
        },
        KHOA_TRAI_NGHIEM_TRONG_LEU: {
          service_name: "Lưu trú: Trải nghiệm qua đêm trong lều 699.000 VND/người",
          service_code: "KHOA_TRAI_NGHIEM_TRONG_LEU",
          ticker_price: {
            adult: 699000,
            low_children: 699000,
            high_children: 699000,
          },
          thumbnail:
            "https://vietgangz.com/wp-content/uploads/2022/09/293382954_192792019752648_120047178045655581_n-267x400.jpg",
          number: 7,
          description: "description",
        },
        KHOA_LUU_TRU_TRONG_XE_NGUA: {
          service_name: "Lưu trú: Trải nghiệm qua đêm trong Cỗ xe ngựa 999.000 VND/người",
          service_code: "KHOA_LUU_TRU_TRONG_XE_NGUA",
          ticker_price: {
            adult: 999000,
            low_children: 999000,
            high_children: 699000,
          },
          thumbnail:
            "https://vietgangz.com/wp-content/uploads/2022/09/293382954_192792019752648_120047178045655581_n-267x400.jpg",
          number: 8,
          description: "description",
        },
      },
      tenants: [
        {
          number: 1,
          tenant_name: "Vietgangz Horse Club Saigon",
          address: "88 đường số 9 – phường Long Phước – Quận 9",
          slot: [{ slotName: 1, status: 1, orderId: "" }],
          thumbnail:
            "https://vietgangz.com/wp-content/uploads/2022/04/z3321486777130_c9d6d793343ab69095fec14a8c1955aa-300x400.jpg",
        },
        {
          number: 2,
          tenant_name: "Vietgangz Horse Club Hanoi",
          address: "Khu du lịch Đầm Trành – phường Thạch Bàn – Quận Long Biên",
          slot: [{ slotName: 1, status: 1, orderId: "" }],
          thumbnail:
            "https://vietgangz.com/wp-content/uploads/2022/04/z3321486777130_c9d6d793343ab69095fec14a8c1955aa-300x400.jpg",
        },
        {
          number: 3,
          tenant_name: "Vietgangz Horse Club Danang",
          address: "88 đường",
          slot: [{ slotName: 1, status: 1, orderId: "" }],
          thumbnail:
            "https://vietgangz.com/wp-content/uploads/2022/04/z3321486777130_c9d6d793343ab69095fec14a8c1955aa-300x400.jpg",
        },
        {
          number: 4,
          tenant_name: "Vietgangz Horse Club Saigon",
          address: "88 đường số 9 – phường Long Phước – Quận 9",
          slot: [{ slotName: 1, status: 1, orderId: "" }],
          thumbnail:
            "https://vietgangz.com/wp-content/uploads/2022/04/z3321486777130_c9d6d793343ab69095fec14a8c1955aa-300x400.jpg",
        },
        {
          number: 5,
          tenant_name: "Vietgangz Horse Club Saigon",
          address: "88 đường số 9 – phường Long Phước – Quận 9",
          slot: [{ slotName: 1, status: 1, orderId: "" }],
          thumbnail:
            "https://vietgangz.com/wp-content/uploads/2022/04/z3321486777130_c9d6d793343ab69095fec14a8c1955aa-300x400.jpg",
        },
        {
          number: 6,
          tenant_name: "Vietgangz Horse Club Saigon",
          address: "88 đường số 9 – phường Long Phước – Quận 9",
          slot: [{ slotName: 1, status: 1, orderId: "" }],
          thumbnail:
            "https://vietgangz.com/wp-content/uploads/2022/04/z3321486777130_c9d6d793343ab69095fec14a8c1955aa-300x400.jpg",
        },
      ],
    },
  },
];

module.exports = configs;
