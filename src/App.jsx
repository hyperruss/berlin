import { useEffect, useState } from 'react'
import './App.css'

const directions = [
  { key: 'barista', number: '01', title: 'Бариста', place: 'Кофейни и рестораны', text: 'Подойдёт тем, кому нравится точность, ритм и короткий контакт с гостем.', facts: ['Работа с зерном и молоком', 'Практика за стойкой', 'Сменный график'], warning: 'Много времени на ногах, утренние смены и высокий темп в часы пик.' },
  { key: 'bartender', number: '02', title: 'Бармен', place: 'Бары и рестораны', text: 'Для тех, кто спокойно работает в вечернем темпе и умеет держать внимание на деталях.', facts: ['Барный инвентарь', 'Базовые техники', 'Работа с гостями'], warning: 'Поздние смены, алкоголь рядом и непростые гости — обычная часть профессии.' },
  { key: 'waiter', number: '03', title: 'Официант', place: 'Рестораны и отели', text: 'Быстрый вход в индустрию для тех, кто любит движение и живое общение.', facts: ['Стандарты сервиса', 'Меню и продажи', 'Работа в команде'], warning: 'Долгие смены на ногах, физическая нагрузка и высокая ответственность за столы.' },
  { key: 'hostess', number: '04', title: 'Хостес', place: 'Рестораны и клубы', text: 'Первая точка контакта с заведением: встреча гостей, посадка и управление ожиданием.', facts: ['Работа с бронями', 'Коммуникация', 'Организация зала'], warning: 'Нужно сохранять спокойствие в конфликтных ситуациях и весь вечер быть на виду.' },
  { key: 'administrator', number: '05', title: 'Администратор', place: 'Рестораны и кофейни', text: 'Для тех, кто готов отвечать не за одну задачу, а за работу всей смены.', facts: ['Команда и процессы', 'Кассовая дисциплина', 'Работа с гостями'], warning: 'Нужны стрессоустойчивость, самостоятельность и готовность решать чужие проблемы.' },
]

const cases = [
  { tag: 'Смена профессии', initials: 'АК', name: 'Алексей, 34', path: 'логистика → бар', quote: '«На третьем собеседовании понял, что не нужно изображать опыт — нужно нормально показать базу.»', meta: ['18 дней обучения', '3 собеседования', 'Москва'] },
  { tag: 'Первое место не подошло', initials: 'МС', name: 'Марина, 27', path: 'офис → кофейня', quote: '«В первой кофейне не совпал график. Агентство предложило вторую — там я и осталась.»', meta: ['12 дней обучения', '2 места работы', 'Москва'] },
  { tag: 'Долгий поиск', initials: 'ТИ', name: 'Тимур, 20', path: 'без опыта → ресторан', quote: '«Было три отказа. На четвёртом собеседовании вышел на пробную смену.»', meta: ['21 день обучения', '4 собеседования', 'Москва'] },
]

const faqs = [
  ['Вы гарантируете трудоустройство?', 'Нет. Решение о найме всегда принимает работодатель. Мы подбираем варианты школы и кадрового агентства, оформляем поручение и сопровождаем процесс.'],
  ['Вы сами обучаете?', 'Нет. Обучение проводят независимые школы-партнёры. До выбора вы увидите их данные, программу и документы.'],
  ['Почему не пойти в школу напрямую?', 'У нас цена обучения не должна быть выше прямой цены школы. При этом вы сравниваете несколько вариантов и отдельно получаете сопровождение кадрового агентства.'],
  ['Как формируется цена?', 'Отдельно показываем стоимость школы, работу кадрового агентства и вознаграждение сервиса. Никаких скрытых частей в итоговой сумме.'],
  ['Какой документ я получу?', 'Документ выдаёт школа-партнёр от своего имени. Тип документа зависит от выбранной программы и указывается до оплаты.'],
  ['Что, если первое место работы не подойдёт?', 'Это зависит от условий выбранного кадрового агентства. Мы покажем их до оформления поручения и зафиксируем в документах.'],
]

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
}

function Logo() {
  return <a className="logo" href="#top" aria-label="ПАСС — на главную"><span className="logo-mark"><i /><i /></span><span>ПАСС</span></a>
}

function App() {
  const [activeDirection, setActiveDirection] = useState(directions[0])
  const [openFaq, setOpenFaq] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const submitLead = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="site-shell" id="top">
      <header className="header">
        <Logo />
        <button className="menu-button" type="button" aria-label="Открыть меню" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><span /><span /></button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          <a href="#directions" onClick={() => setMenuOpen(false)}>Направления</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Как это работает</a>
          <a href="#cases" onClick={() => setMenuOpen(false)}>Кейсы</a>
          <a href="#partners" onClick={() => setMenuOpen(false)}>Партнёры</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>Вопросы</a>
        </nav>
        <a className="button button-small header-cta" href="#request">Подобрать программу</a>
      </header>

      <main>
        <section className="hero-section">
          <img src="/images/pass-hero.jpg" alt="Бармен готовит рабочее место перед открытием бара" />
          <div className="hero-shade" />
          <div className="hero-content reveal">
            <p className="eyebrow light">Москва · сервис выбора и сопровождения</p>
            <h1>Найдите своё место<br />в индустрии<br /><em>гостеприимства</em></h1>
            <p className="hero-lead">Подберём школу и кадровое агентство для старта в баре, кофейне или ресторане.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#request">Подобрать программу <ArrowIcon /></a>
              <a className="text-link light-link" href="#process">Узнать, как всё устроено</a>
            </div>
          </div>
          <div className="hero-disclaimer"><span>Важно</span><p>Мы не обучаем сами и не обещаем трудоустройство. Вы выбираете партнёров — мы организуем процесс.</p></div>
          <div className="scroll-note">Листайте вниз <span>↓</span></div>
        </section>

        <section className="triad-section section-dark" id="process">
          <div className="section-head reveal">
            <p className="eyebrow light">Кто за что отвечает</p>
            <h2>Три стороны.<br />Один понятный процесс.</h2>
            <p>Никакой роли школы под своим именем. Мы помогаем выбрать исполнителей и действуем по вашему поручению.</p>
          </div>
          <div className="triad reveal">
            <article className="triad-card customer-card"><span className="triad-no">01</span><p className="eyebrow">Вы</p><h3>Выбираете</h3><p>Рассказываете о цели, городе и графике. Сравниваете минимум два варианта.</p></article>
            <div className="triad-arrow"><ArrowIcon /><span>поручение</span></div>
            <article className="triad-card service-card"><span className="triad-no">02</span><p className="eyebrow">ПАСС</p><h3>Организуем</h3><p>Проверяем партнёров, оформляем договоры и держим вас в курсе этапов.</p></article>
            <div className="triad-arrow"><ArrowIcon /><span>договоры</span></div>
            <article className="triad-card partner-card"><span className="triad-no">03</span><p className="eyebrow">Партнёры</p><h3>Выполняют</h3><p>Школа обучает и выдаёт документ. Агентство помогает искать работу.</p></article>
          </div>
          <p className="legal-note reveal">ПАСС — сервис-посредник. Мы не ведём образовательную деятельность и не принимаем решение о найме.</p>
        </section>

        <section className="directions-section section-light" id="directions">
          <div className="section-head split-head reveal"><div><p className="eyebrow">Пять направлений</p><h2>Выберите,<br />что ближе вам</h2></div><p>Без теста «профессия за пять минут». Покажем реальную работу, требования и ограничения каждого направления.</p></div>
          <div className="direction-layout reveal">
            <div className="direction-list" role="tablist" aria-label="Направления">
              {directions.map((direction) => (
                <button key={direction.key} className={activeDirection.key === direction.key ? 'direction-tab active' : 'direction-tab'} type="button" onClick={() => setActiveDirection(direction)} role="tab" aria-selected={activeDirection.key === direction.key}>
                  <span>{direction.number}</span><strong>{direction.title}</strong><small>{direction.place}</small><i>↗</i>
                </button>
              ))}
            </div>
            <article className="direction-detail" key={activeDirection.key}>
              <div className={`profession-symbol symbol-${activeDirection.key}`} aria-hidden="true"><span>{activeDirection.number}</span></div>
              <p className="eyebrow">{activeDirection.place}</p><h3>{activeDirection.title}</h3><p className="direction-copy">{activeDirection.text}</p>
              <ul>{activeDirection.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
              <div className="not-for-all"><strong>Кому может не подойти</strong><p>{activeDirection.warning}</p></div>
              <a href="#request" className="text-link">Подобрать варианты <ArrowIcon /></a>
            </article>
          </div>
        </section>

        <section className="steps-section section-cream">
          <div className="section-head split-head reveal"><div><p className="eyebrow">Как это работает</p><h2>От заявки<br />до первой смены</h2></div><p>Шесть прозрачных этапов. На каждом вы понимаете, что происходит и кто отвечает за результат.</p></div>
          <ol className="steps-grid reveal">
            {[
              ['Заявка', 'Вы указываете направление, график и опыт.'], ['Варианты', 'Мы показываем минимум две подходящие школы.'], ['Ваш выбор', 'Вы сравниваете условия и оформляете поручение.'], ['Договоры', 'Мы заключаем договоры с выбранными партнёрами.'], ['Обучение', 'Школа проводит программу и выдаёт документ.'], ['Сопровождение', 'Агентство помогает с поиском, мы даём отчёт.'],
            ].map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}
          </ol>
          <a className="button button-dark reveal" href="#responsibility">Посмотреть зоны ответственности <ArrowIcon /></a>
        </section>

        <section className="numbers-section section-green">
          <div className="demo-ribbon">Визуал блока · временные данные</div>
          <div className="section-head reveal"><p className="eyebrow light">Результаты без громких обещаний</p><h2>Показываем не лозунги,<br />а измеримый путь</h2></div>
          <div className="numbers-grid reveal"><article><strong>78<sup>%</sup></strong><p>дошли до собеседования</p></article><article><strong>19<sup>дн.</sup></strong><p>медианный срок до первой смены</p></article><article><strong>2,4</strong><p>собеседования в среднем</p></article></div>
          <p className="numbers-method reveal">Пример отображения: завершившие программу и не отказавшиеся от вакансий, весенний набор, срез через 90 дней, n=64. Перед публикацией заменим фактическими данными.</p>
        </section>

        <section className="cases-section section-light" id="cases">
          <div className="section-head split-head reveal"><div><p className="eyebrow">Истории без ретуши</p><h2>У каждого свой<br />путь до смены</h2></div><p>Для макета используются вымышленные примеры. Перед запуском здесь будут реальные люди, цифры и согласия на публикацию.</p></div>
          <div className="cases-grid reveal">
            {cases.map((item, index) => <article className="case-card" key={item.name}><div className={`case-visual case-${index + 1}`}><span className="demo-badge">Демо-кейс</span><strong>{item.initials}</strong><span className="play">▶</span></div><div className="case-body"><p className="eyebrow">{item.tag}</p><h3>{item.name}</h3><p className="case-path">{item.path}</p><blockquote>{item.quote}</blockquote><ul>{item.meta.map((meta) => <li key={meta}>{meta}</li>)}</ul></div></article>)}
          </div>
        </section>

        <section className="partners-section section-dark" id="partners">
          <div className="section-head split-head reveal"><div><p className="eyebrow light">Открыто о партнёрах</p><h2>Вы знаете,<br />кто делает работу</h2></div><p>До оплаты покажем юридические данные, документы и условия каждого исполнителя. Блок готов к наполнению после согласования партнёров.</p></div>
          <div className="partner-placeholder-grid reveal"><article><span>ШП / 01</span><h3>Школа-партнёр</h3><p>Название · ИНН · лицензия · программа</p><small>Данные на согласовании</small></article><article><span>ШП / 02</span><h3>Школа-партнёр</h3><p>Название · ИНН · лицензия · программа</p><small>Данные на согласовании</small></article><article><span>КА / 01</span><h3>Кадровое агентство</h3><p>Название · ИНН · условия сопровождения</p><small>Данные на согласовании</small></article></div>
          <div className="why-service reveal"><p className="eyebrow light">Зачем нужен сервис</p><div><span>Напрямую</span><p>Один вариант школы и только её программа.</p></div><div><span>С ПАСС</span><p>Сравнение вариантов, отдельное кадровое агентство и единый контроль этапов.</p></div></div>
        </section>

        <section className="price-section section-cream">
          <div className="demo-ribbon dark-ribbon">Пример структуры · суммы временные</div>
          <div className="section-head split-head reveal"><div><p className="eyebrow">Честная стоимость</p><h2>Видно, куда<br />идёт каждый рубль</h2></div><p>Итоговая цена зависит от направления и выбранных партнёров. Вы увидите разбивку до оплаты.</p></div>
          <div className="receipt reveal"><div className="receipt-brand"><Logo /><span>Расчёт программы · пример</span></div><div className="receipt-row"><span>Программа школы</span><strong>29 900 ₽</strong></div><div className="receipt-row"><span>Сопровождение агентства</span><strong>9 900 ₽</strong></div><div className="receipt-row"><span>Вознаграждение сервиса</span><strong>7 500 ₽</strong></div><div className="receipt-total"><span>Итого</span><strong>47 300 ₽</strong></div><p>Точные суммы будут указаны в поручении и договоре до оплаты.</p></div>
        </section>

        <section className="responsibility-section section-light" id="responsibility">
          <div className="section-head reveal"><p className="eyebrow">Без мелкого шрифта</p><h2>Границы ответственности</h2></div>
          <div className="responsibility-table reveal"><div className="table-row table-head"><span>Сторона</span><span>Отвечает за</span><span>Не отвечает за</span></div><div className="table-row"><strong>Школа</strong><p>Программу, обучение, преподавателей и итоговый документ</p><p>Решение работодателя о найме</p></div><div className="table-row"><strong>Агентство</strong><p>Подбор вакансий и организацию собеседований по своим условиям</p><p>Решение работодателя и действия школы</p></div><div className="table-row emphasized"><strong>ПАСС</strong><p>Подбор вариантов, оформление поручения и контроль этапов</p><p>Качество обучения и решение о найме</p></div></div>
          <p className="legal-note ink reveal">Финальные формулировки должны соответствовать договору и заключению юриста по потребительскому праву.</p>
        </section>

        <section className="faq-section section-cream" id="faq">
          <div className="section-head split-head reveal"><div><p className="eyebrow">Прямые ответы</p><h2>Неудобные<br />вопросы — сначала</h2></div><p>Если ответ нельзя сказать просто и открыто, значит процесс ещё недостаточно понятен.</p></div>
          <div className="faq-list reveal">{faqs.map(([question, answer], index) => <article className={openFaq === index ? 'faq-item open' : 'faq-item'} key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{String(index + 1).padStart(2, '0')}</span><strong>{question}</strong><i>{openFaq === index ? '−' : '+'}</i></button><div className="faq-answer"><p>{answer}</p></div></article>)}</div>
        </section>

        <section className="request-section section-green" id="request">
          <div className="request-copy reveal"><p className="eyebrow light">Первый шаг</p><h2>Расскажите,<br />что ищете</h2><p>Свяжемся в Telegram, уточним задачу и соберём несколько вариантов. Без оплаты на этом этапе.</p><div className="request-contact"><span>Обычно отвечаем</span><strong>в течение рабочего дня</strong></div></div>
          <form className="lead-form reveal" onSubmit={submitLead}>
            {submitted ? <div className="form-success"><span>✓</span><h3>Форма работает</h3><p>Это демонстрационный режим. После получения Telegram-бота или рабочего аккаунта подключим реальную отправку заявок.</p><button type="button" className="text-link" onClick={() => setSubmitted(false)}>Заполнить ещё раз</button></div> : <>
              <label><span>Как вас зовут</span><input name="name" type="text" placeholder="Имя" required /></label>
              <label><span>Телефон</span><input name="phone" type="tel" placeholder="+7 999 000-00-00" required /></label>
              <label><span>Направление</span><select name="direction" defaultValue="" required><option value="" disabled>Выберите направление</option>{directions.map((item) => <option key={item.key}>{item.title}</option>)}</select></label>
              <label><span>Какой график удобен</span><select name="schedule" defaultValue="" required><option value="" disabled>Выберите график</option><option>Полный день</option><option>Сменный</option><option>Неполный день</option><option>Совмещать с учёбой</option></select></label>
              <label className="wide"><span>Опыт</span><textarea name="experience" placeholder="Коротко расскажите, что уже умеете" rows="3" required /></label>
              <label className="form-consent wide"><input type="checkbox" required /><span>Согласен на обработку персональных данных и связь со мной в Telegram</span></label>
              <button className="button button-gold wide" type="submit">Отправить заявку <ArrowIcon /></button><small className="wide">Оплата и касса появятся на следующем этапе после согласования партнёров и документов.</small>
            </>}
          </form>
        </section>

        <section className="documents-section section-dark" id="documents">
          <div className="section-head split-head reveal"><div><p className="eyebrow light">Документы</p><h2>Всё доступно<br />до оплаты</h2></div><p>Здесь будут размещены утверждённые версии документов. Сейчас показана структура раздела.</p></div>
          <div className="document-list reveal">{['Договор комиссии', 'Политика конфиденциальности', 'Согласие на обработку данных', 'Правила возврата'].map((document, index) => <div key={document}><span>0{index + 1}</span><strong>{document}</strong><small>Будет добавлен</small></div>)}</div>
        </section>
      </main>

      <footer className="footer">
        <div><Logo /><p>Сервис выбора школы и кадрового сопровождения в индустрии гостеприимства.</p></div>
        <div><span>Навигация</span><a href="#directions">Направления</a><a href="#process">Как это работает</a><a href="#cases">Кейсы</a><a href="#faq">Вопросы</a></div>
        <div><span>Информация</span><a href="#partners">Партнёры</a><a href="#documents">Документы</a><a href="#responsibility">Ответственность</a></div>
        <div><span>Контакты</span><p>Москва</p><p>Telegram будет подключён</p><p>Реквизиты будут добавлены</p></div>
        <p className="footer-legal">ПАСС не является образовательной организацией и не осуществляет образовательную деятельность. Информация на странице является демонстрационным макетом и не является публичной офертой.</p>
        <p className="copyright">© 2026 ПАСС · Демонстрационная версия</p>
      </footer>
      <a className="mobile-sticky" href="#request">Подобрать программу <ArrowIcon /></a>
    </div>
  )
}

export default App
