VAHRAM PORTFOLIO V2 — TEST VERSION

Что уже есть:
- мультяшный тёмно-синий дизайн с жёлтыми акцентами
- левое меню
- большая hero-секция
- 5 карточек проектов
- About / Skills / Contact
- интерактивная муха (HTML/CSS/JS, без картинки)
- паук, который бегает по нижней части экрана
- 4 кликабельные точки на hero-картинке
- адаптация под мобильный экран

КАК ЗАМЕНИТЬ КАРТИНКИ ПОЗЖЕ:
1) Добавьте изображения в папку assets.
2) В style.css замените background у .t1 .t2 .t3 .t4 .t5 на:
   background-image:url('assets/имя-файла.jpg');
   background-size:cover;
   background-position:center;

Для hero можно заменить .hero-bg на:
background-image:url('assets/hero.jpg');
background-size:cover;
background-position:center;

КАК ЗАПУСТИТЬ:
Откройте index.html двойным кликом.

КАК ЗАЛИТЬ НА GITHUB PAGES:
Загрузите index.html, style.css, script.js и папку assets в корень репозитория.
