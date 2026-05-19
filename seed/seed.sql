INSERT INTO users (id, email, password, created_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'demo@example.com', '$2b$10$demo.password.hash', NOW());

INSERT INTO product_categories (id, name, img_path, slug)
VALUES
  (1, 'Детские электромобили', '/images/categories/electric-cars.png', 'kids-electric-cars'),
  (2, 'Детская мототехника', '/images/categories/moto.png', 'kids-moto'),
  (3, 'Электроквадроциклы', '/images/categories/atv.png', 'kids-electric-atv'),
  (4, 'Электросамокаты', '/images/categories/scooters.png', 'kids-electric-scooters'),
  (5, 'Аксессуары', '/images/categories/accessories.png', 'accessories');

INSERT INTO goods (id, product_category_id, name, img_path, price)
VALUES
  (1, 1, 'Детский электромобиль BMW M5', '/images/goods/bmw-m5.png', 32990.00),
  (2, 1, 'Детский электромобиль Mercedes G63', '/images/goods/mercedes-g63.png', 38990.00),
  (3, 1, 'Детский электромобиль Audi Q8', '/images/goods/audi-q8.png', 34990.00),

  (4, 2, 'Детский электромотоцикл SportBike R6', '/images/goods/sportbike-r6.png', 21990.00),
  (5, 2, 'Детский электромотоцикл Police Moto', '/images/goods/police-moto.png', 18990.00),
  (6, 2, 'Детский электромотоцикл MotoCross X', '/images/goods/motocross-x.png', 24990.00),

  (7, 3, 'Детский электроквадроцикл ATV Mini', '/images/goods/atv-mini.png', 27990.00),
  (8, 3, 'Детский электроквадроцикл ATV Pro', '/images/goods/atv-pro.png', 36990.00),
  (9, 3, 'Детский электроквадроцикл Thunder 800', '/images/goods/thunder-800.png', 42990.00),

  (10, 4, 'Детский электросамокат City Kid', '/images/goods/city-kid.png', 14990.00),
  (11, 4, 'Детский электросамокат Speed Mini', '/images/goods/speed-mini.png', 17990.00),
  (12, 4, 'Детский электросамокат Light Ride', '/images/goods/light-ride.png', 12990.00),

  (13, 5, 'Аккумулятор 12V 10Ah', '/images/goods/battery-12v-10ah.png', 4990.00),
  (14, 5, 'Зарядное устройство 12V', '/images/goods/charger-12v.png', 1990.00),
  (15, 5, 'Комплект защитной экипировки', '/images/goods/protection-kit.png', 3990.00);

INSERT INTO bank_cashback_categories (id, name)
VALUES
  (1, 'Детские товары'),
  (2, 'Транспорт'),
  (3, 'Маркетплейсы'),
  (4, 'Спорт и активный отдых'),
  (5, 'Автотовары');

INSERT INTO cards (id, user_id, name)
VALUES
  (1, '11111111-1111-1111-1111-111111111111', 'Tinkoff Black'),
  (2, '11111111-1111-1111-1111-111111111111', 'Альфа-Карта'),
  (3, '11111111-1111-1111-1111-111111111111', 'СберКарта'),
  (4, '11111111-1111-1111-1111-111111111111', 'ВТБ Карта для жизни');

INSERT INTO card_cashback_rules (
  id,
  card_id,
  bank_cashback_category_id,
  product_category_id,
  percent
)
VALUES
  (1, 1, 1, 1, 10),
  (2, 1, 2, 2, 8),
  (3, 1, 5, 3, 7),
  (4, 1, 4, 4, 6),
  (5, 1, 3, 5, 5),

  (6, 2, 1, 1, 8),
  (7, 2, 2, 2, 10),
  (8, 2, 5, 3, 6),
  (9, 2, 4, 4, 7),
  (10, 2, 3, 5, 4),

  (11, 3, 1, 1, 6),
  (12, 3, 2, 2, 5),
  (13, 3, 5, 3, 8),
  (14, 3, 4, 4, 5),
  (15, 3, 3, 5, 3),

  (16, 4, 1, 1, 5),
  (17, 4, 2, 2, 6),
  (18, 4, 5, 3, 10),
  (19, 4, 4, 4, 8),
  (20, 4, 3, 5, 6);