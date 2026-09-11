import { useEffect, useRef, useState } from 'react'
import './App.css'

const professions = [
  { name: 'Бариста', space: 'КОФЕ / СТОЙКА', code: 'BR—01', price: '38 490', intro: 'Настроить помол, поймать текстуру молока и держать темп утреннего потока.', skills: ['Эспрессо и работа с зерном', 'Молоко и базовый латте-арт', 'Организация рабочей станции'], reality: 'Ранние подъёмы, смены на ногах и очередь, которая не ждёт.' },
  { name: 'Бармен', space: 'БАР / ВЕЧЕР', code: 'BM—02', price: '39 990', intro: 'Подготовить станцию, собрать напиток и сохранять внимание, когда у стойки уже весь зал.', skills: ['Барный инвентарь и техники', 'Рецептуры и заготовки', 'Коммуникация с гостями'], reality: 'Поздние смены, работа рядом с алкоголем и высокая нагрузка в выходные.' },
  { name: 'Официант', space: 'ЗАЛ / СЕРВИС', code: 'OF—03', price: '36 490', intro: 'Знать меню, слышать гостя и связывать зал с кухней без потери темпа.', skills: ['Подача и стандарты сервиса', 'Меню и рекомендации', 'Взаимодействие с кухней'], reality: 'Много движения, несколько столов одновременно и необходимость быстро решать вопросы.' },
  { name: 'Хостес', space: 'ВСТРЕЧА / ГОСТИ', code: 'HS—04', price: '34 490', intro: 'Встретить, распределить поток и сделать так, чтобы вечер начался хорошо ещё у входа.', skills: ['Бронирование и посадка', 'Первый контакт с гостем', 'Координация загрузки зала'], reality: 'Нужно сохранять спокойствие при полной посадке и работать с ожиданиями гостей.' },
  { name: 'Администратор', space: 'КОМАНДА / ПРОЦЕССЫ', code: 'AD—05', price: '44 490', intro: 'Собрать команду на смену, держать в поле зрения весь зал и принимать решения на ходу.', skills: ['Организация работы команды', 'Контроль сервиса', 'Решение операционных ситуаций'], reality: 'Ответственность за всю смену. Для части вакансий понадобится опыт работы в зале.' },
  { name: 'Повар', space: 'КУХНЯ / ТЕМП', code: 'CK—06', price: '47 490', intro: 'Организовать рабочее место, соблюдать технологию и отдавать блюда в ритме кухни.', skills: ['Подготовка продуктов и mise en place', 'Базовые технологии приготовления', 'Санитарные нормы и работа в команде'], reality: 'Жаркая кухня, высокая физическая нагрузка и строгая дисциплина времени.' },
]

const stories = [
  { person: 'Алексей, 34', from: 'Логистика', to: 'Бармен', duration: '16 дней', interviews: '3', result: 'Вышел в бар при отеле', note: 'Вечерний график оказался удобнее прежнего офисного режима.', status: 'РАБОТА' },
  { person: 'Марина, 27', from: 'Офис', to: 'Бариста', duration: '11 дней', interviews: '2', result: 'Начала работать в кофейне', note: 'Первый график не подошёл — кадровое агентство продолжило поиск.', status: 'РАБОТА' },
  { person: 'Илья, 20', from: 'Студент', to: 'Официант', duration: '9 дней', interviews: '1', result: 'Совмещает смены с учёбой', note: 'Сразу обозначил доступные дни и не менял условия в процессе.', status: 'РАБОТА' },
  { person: 'Светлана, 31', from: 'Ритейл', to: 'Хостес', duration: '13 дней', interviews: '2', result: 'Работает в ресторане у дома', note: 'Опыт общения с покупателями помог быстрее пройти встречу.', status: 'РАБОТА' },
  { person: 'Роман, 38', from: 'Официант', to: 'Администратор', duration: '24 дня', interviews: '4', result: 'Принял первую смену', note: 'Опыт был, но понадобилось подтянуть операционные процессы.', status: 'РАБОТА' },
  { person: 'Тимур, 25', from: 'Курьер', to: 'Повар', duration: '18 дней', interviews: '2', result: 'Вышел на холодный цех', note: 'Начал с базовой позиции и понятной зоны ответственности.', status: 'РАБОТА' },
  { person: 'Елена, 42', from: 'Бухгалтерия', to: 'Бариста', duration: '21 день', interviews: '3', result: 'Нашла неполный график', note: 'Поиск занял больше времени из-за ограниченных часов работы.', status: 'РАБОТА' },
  { person: 'Никита, 19', from: 'Без опыта', to: 'Бармен', duration: '14 дней', interviews: '2', result: 'Начал помощником бармена', note: 'Согласился на стартовую позицию, чтобы набрать практику.', status: 'РАБОТА' },
  { person: 'Алина, 29', from: 'Декрет', to: 'Хостес', duration: '26 дней', interviews: '5', result: 'Вышла на дневные смены', note: 'Подходящий график нашёлся не сразу, поиск не останавливали.', status: 'РАБОТА' },
  { person: 'Павел, 33', from: 'Продажи', to: 'Официант', duration: '12 дней', interviews: '2', result: 'Работает в гастробаре', note: 'Навыки общения перенёс в сервис, остальное отработал на практике.', status: 'РАБОТА' },
  { person: 'Ольга, 36', from: 'Кейтеринг', to: 'Администратор', duration: '19 дней', interviews: '3', result: 'Стала менеджером смены', note: 'Выбрала движение внутри знакомой индустрии.', status: 'РАБОТА' },
  { person: 'Артур, 23', from: 'Склад', to: 'Повар', duration: '17 дней', interviews: '2', result: 'Работает на открытой кухне', note: 'Дисциплина оказалась важнее предыдущего опыта.', status: 'РАБОТА' },
  { person: 'Дарья, 22', from: 'Колл-центр', to: 'Бариста', duration: '10 дней', interviews: '1', result: 'Вышла в сетевую кофейню', note: 'Была готова быстро начать и прошла встречу с первого раза.', status: 'РАБОТА' },
  { person: 'Максим, 30', from: 'Доставка', to: 'Официант', duration: '32 дня', interviews: '6', result: 'Поиск временно приостановлен', note: 'Предложения были, но условия по графику пока не совпали.', status: 'ПАУЗА' },
  { person: 'Денис, 29', from: 'Офис', to: 'Бармен', duration: 'Мастер-классы пройдены', interviews: '0', result: 'Решил не менять профессию', note: 'После практического этапа понял, что вечерние смены ему не подходят.', status: 'НЕ ПРОДОЛЖИЛ' },
]

const journey = [
  ['Заявка', 'Вы называете профессию, график и свой опыт. Это единственный выбор на старте.'],
  ['Условия', 'Мы объясняем состав услуги, общую стоимость и договор до оплаты.'],
  ['Оплата', 'Вы оплачиваете ПАСС единую стоимость услуги под ключ.'],
  ['Назначение', 'После оплаты мы самостоятельно определяем компанию мастер-классов и кадровое агентство.'],
  ['Практика', 'Информационно-консультационная компания проводит мастер-классы со спикерами и выдаёт внутренний сертификат.'],
  ['Поиск', 'Отдельное кадровое агентство ведёт работу с вакансиями и собеседованиями. Решение о найме принимает работодатель.'],
]

const questions = [
  ['Что именно делает ПАСС?', 'Мы принимаем ваше поручение, самостоятельно определяем двух независимых исполнителей и организуем маршрут от мастер-классов до передачи в кадровое агентство.'],
  ['Можно выбрать компанию самостоятельно?', 'Нет. Вы выбираете профессию, а определение информационно-консультационной компании и кадрового агентства полностью доверяете ПАСС.'],
  ['Когда я узнаю исполнителей?', 'После оплаты. Мы сообщим, какая компания проводит мастер-классы и какое кадровое агентство будет работать с вашим профилем.'],
  ['ПАСС проводит мастер-классы?', 'Нет. Их проводит отдельная информационно-консультационная компания. ПАСС организует процесс в рамках вашего поручения.'],
  ['Кто занимается вакансиями?', 'Отдельное кадровое агентство — другое юридическое лицо, не связанное с компанией мастер-классов одной услугой.'],
  ['Какой документ я получу?', 'После прохождения программы информационно-консультационная компания может выдать свой внутренний сертификат. Это внутренний документ компании, а не документ об образовании.'],
  ['Что с выходом на работу?', 'Результат зависит от наличия вакансий, решений работодателей, пройденных собеседований и вашей готовности выходить на предложенный график.'],
  ['Сколько времени занимает маршрут?', 'В отдельных сценариях первый выход возможен примерно через неделю. Единого срока нет: на него влияют расписание мастер-классов, рынок вакансий и действия всех участников.'],
  ['Что входит в указанную цену?', 'Это единая стоимость маршрута под ключ, оплачиваемая ПАСС. Конкретный состав поручения и условия возврата фиксируются в договоре до оплаты.'],
]

const documents = ['Договор комиссии', 'Политика обработки данных', 'Согласие на обработку данных', 'Условия оплаты и возврата']

function Arrow({ diagonal = false, className = '' }) {
  return <svg className={className} viewBox="0 0 32 32" aria-hidden="true"><path d={diagonal ? 'M7 25 25 7M7 7h18v18' : 'M3 16h25M17 5l11 11-11 11'} /></svg>
}

function Brand() {
  return <a className="brand" href="#top" aria-label="ПАСС — на главную">ПАСС<Arrow diagonal /></a>
}

function Label({ number, children }) {
  return <p className="section-label"><span>{number} /</span> {children}</p>
}

function DocumentModal({ title, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    dialog.showModal()
    return () => dialog.close()
  }, [])
  return <dialog ref={ref} className="document-modal" aria-label={title} onCancel={onClose} onClick={event => {
    if (event.target !== event.currentTarget) return
    const rect = event.currentTarget.getBoundingClientRect()
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose()
  }}>
    <button className="modal-close" aria-label="Закрыть документ" onClick={onClose}>×</button>
    <span className="mono">ДОКУМЕНТ / СТАТУС</span><h2>{title}</h2>
    <p>Утверждённая версия документа пока не размещена. Она будет доступна здесь до подключения оплаты.</p>
    <button className="button" onClick={onClose}>Понятно <Arrow /></button>
  </dialog>
}

export default function App() {
  const [menu, setMenu] = useState(false)
  const [selected, setSelected] = useState(0)
  const [story, setStory] = useState(0)
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [activeDocument, setActiveDocument] = useState(null)
  const [form, setForm] = useState({ direction: '', schedule: '', experience: '', name: '', phone: '' })
  const currentStory = stories[story]

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealItems = document.querySelectorAll('.reveal')
    if (reducedMotion) {
      revealItems.forEach(item => item.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })
    revealItems.forEach(item => observer.observe(item))
    const updateProgress = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      document.documentElement.style.setProperty('--page-progress', height > 0 ? window.scrollY / height : 0)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    if (window.location.hash) {
      window.requestAnimationFrame(() => document.querySelector(window.location.hash)?.scrollIntoView())
    }
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateProgress)
    }
  }, [])

  const change = event => setForm({ ...form, [event.target.name]: event.target.value })
  const choose = name => {
    setForm({ ...form, direction: name })
    setSubmitted(false)
    setStep(1)
  }
  const changeStory = direction => setStory((story + direction + stories.length) % stories.length)
  const tickerItems = professions.map(item => item.name.toUpperCase())

  return <>
    <a className="skip-link" href="#main">К содержимому</a>
    <header className="header" id="top">
      <Brand /><span className="header-caption">МАРШРУТ В ИНДУСТРИЮ<br />ГОСТЕПРИИМСТВА</span>
      <nav aria-label="Основная навигация" id="navigation" className={menu ? 'navigation is-open' : 'navigation'}>
        {[["#directions", 'Профессии'], ['#process', 'Схема'], ['#cases', 'Маршруты'], ['#price', 'Стоимость'], ['#faq', 'Вопросы']].map(([href, text]) => <a key={href} href={href} onClick={() => setMenu(false)}>{text}</a>)}
      </nav>
      <a className="header-action" href="#request">Начать маршрут <Arrow diagonal /></a>
      <button className="menu-toggle" aria-label={menu ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? '×' : '☰'}</button>
    </header>

    <main id="main">
      <section className="entrance" aria-labelledby="hero-title">
        <div className="hero-motion" aria-hidden="true"><i /><i /><i /></div>
        <div className="entrance-meta"><span><i /> МОСКВА · 6 ПРОФЕССИЙ</span><span>ОДНО ПОРУЧЕНИЕ · ДВА ИСПОЛНИТЕЛЯ</span><span>ПАСС / 001</span></div>
        <h1 id="hero-title"><span className="hero-first">ВЫ ЗНАЕТЕ <Arrow /></span><span>КЕМ СТАТЬ.</span></h1>
        <div className="hero-bottom">
          <div className="entry-sign"><span>УСЛУГА ПОД КЛЮЧ</span><strong>Вы — цель.<br />Мы — маршрут.</strong><Arrow diagonal /></div>
          <div className="hero-description"><p>Назовите профессию.<br /><strong>Остальное поручите нам.</strong></p><span>После оплаты ПАСС самостоятельно определит компанию для мастер-классов и отдельное кадровое агентство. Вы не сравниваете и не выбираете исполнителей.</span></div>
          <div className="hero-next"><a className="button" href="#request">Запустить маршрут <Arrow /></a><span className="mono">СНАЧАЛА — ДОГОВОР И ОПЛАТА.<br />ИСПОЛНИТЕЛИ — ПОСЛЕ.</span><a className="down-link" href="#process">Увидеть схему <span>↓</span></a></div>
        </div>
        <div className="profession-tape" aria-hidden="true"><div className="tape-track">{[...tickerItems, ...tickerItems].map((item, index) => <span key={`${item}-${index}`}>{item}<b>✳</b></span>)}</div></div>
      </section>

      <section className="roles section reveal" id="process">
        <Label number="01">КТО ЕСТЬ КТО</Label>
        <div className="roles-heading"><h2>Вы доверяете.<br />Мы назначаем.</h2><p>Компании разделены юридически.<br />Каждая отвечает только за свою работу.</p></div>
        <div className="trust-route">
          <article className="trust-client"><span className="route-point">А</span><h3>ВЫ</h3><p>Называете профессию, график и опыт. Заключаете договор и оплачиваете маршрут ПАСС.</p><span className="mono">ЦЕЛЬ + ПОРУЧЕНИЕ</span></article>
          <div className="trust-arrow"><Arrow /><span>доверие</span></div>
          <article className="trust-pass"><span className="route-point">Б</span><h3>ПАСС</h3><p>По своим каналам определяет исполнителей, организует взаимодействие и ведёт маршрут.</p><span className="mono">ВЫБОР + ОРГАНИЗАЦИЯ</span></article>
          <div className="trust-arrow trust-arrow-split"><Arrow /><span>после оплаты</span></div>
          <div className="executors">
            <article><span className="route-point">В1</span><h3>КОМПАНИЯ</h3><p>Информационно-консультационное предприятие проводит мастер-классы со спикерами.</p><span className="mono">МАСТЕР-КЛАССЫ + ВНУТРЕННИЙ СЕРТИФИКАТ</span></article>
            <article><span className="route-point">В2</span><h3>АГЕНТСТВО</h3><p>Отдельное кадровое агентство работает с вакансиями и собеседованиями.</p><span className="mono">ПОИСК + КОММУНИКАЦИЯ</span></article>
          </div>
        </div>
        <div className="roles-note"><span>ВАЖНО</span><p>Компания мастер-классов и кадровое агентство — разные юридические лица. Они не выполняют работу друг за друга.</p></div>
      </section>

      <section className="professions section reveal" id="directions">
        <Label number="02">ВЫБЕРИТЕ ТОЛЬКО ПРОФЕССИЮ</Label>
        <div className="profession-heading"><h2>КЕМ<br />БУДЕТЕ?</h2><div className="profession-count">06<span>НАПРАВЛЕНИЙ<br />ОДНА ИНДУСТРИЯ</span></div></div>
        <div className="profession-list">{professions.map((profession, index) => <article className={selected === index ? 'profession open' : 'profession'} key={profession.code}>
          <button className="profession-switch" id={`profession-${index}`} aria-expanded={selected === index} aria-controls={`profession-panel-${index}`} onClick={() => setSelected(selected === index ? null : index)}><span className="mono">0{index + 1}</span><h3>{profession.name}</h3><span className="profession-space mono">{profession.space}</span><span className="expand-mark">{selected === index ? '−' : '+'}</span></button>
          {selected === index && <div className="profession-content" id={`profession-panel-${index}`} role="region" aria-labelledby={`profession-${index}`}><div className="job-description"><p>{profession.intro}</p><ul>{profession.skills.map(skill => <li key={skill}>{skill}</li>)}</ul><a className="text-action" href="#request" onClick={() => choose(profession.name)}>Выбрать профессию <Arrow diagonal /></a></div><aside className="job-reality"><span className="mono">ОБРАТНАЯ СТОРОНА СМЕНЫ</span><p>{profession.reality}</p><strong className="job-price">{profession.price} ₽</strong><span className="job-code">{profession.code}</span></aside></div>}
        </article>)}</div>
      </section>

      <section className="work-interlude reveal"><figure><img src={`${import.meta.env.BASE_URL}images/pass-hero.jpg`} alt="Руки бармена у рабочей стойки" loading="lazy" /><figcaption>ЗА СТОЙКОЙ / ПЕРЕД ОТКРЫТИЕМ <span>Иллюстрация создана ИИ</span></figcaption></figure><div><span className="mono">ПРОФЕССИЯ НАЧИНАЕТСЯ С ПРАКТИКИ</span><p>Навык.<br />Темп.<br /><em>Команда.</em></p><span>Вы определяете направление.<br />Исполнителей определяет ПАСС.</span></div></section>

      <section className="journey section reveal">
        <Label number="03">МАРШРУТ ПОСЛЕ ЗАЯВКИ</Label>
        <div className="journey-layout"><div className="journey-title"><h2>Одна цель.<br />Шесть<br />понятных<br />шагов.</h2><a className="text-action" href="#request">Начать с заявки <Arrow diagonal /></a><p className="journey-promise">Многое зависит от нас.<br /><strong>Но кое-что зависит и от вас.</strong></p></div><ol className="journey-list">{journey.map(([title, text], index) => <li className="reveal" style={{ '--delay': `${index * 55}ms` }} key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div><b aria-hidden="true">↘</b></li>)}</ol></div>
      </section>

      <section className="stories section reveal" id="cases">
        <Label number="04">15 МАРШРУТОВ / РАЗНЫЙ РЕЗУЛЬТАТ</Label>
        <div className="case-summary"><h2><strong>13</strong> вышли<br />на работу.</h2><p>Один маршрут поставлен на паузу.<br />Один участник решил не продолжать.</p><span className="demo-label">ДЕМОНСТРАЦИОННЫЕ СЦЕНАРИИ ДЛЯ МАКЕТА</span></div>
        <div className="story-top"><p className="case-honesty">Мы открыты к критике и показываем разные исходы, а не только красивый финал.</p><div className="story-controls"><span className="mono">{String(story + 1).padStart(2, '0')} / 15</span><button aria-label="Предыдущий маршрут" onClick={() => changeStory(-1)}>←</button><button aria-label="Следующий маршрут" onClick={() => changeStory(1)}>→</button></div></div>
        <div className="story-layout" key={story}><div className="story-main"><span className={`case-status status-${currentStory.status === 'РАБОТА' ? 'success' : 'other'}`}>{currentStory.status}</span><h2>{currentStory.result}</h2><p className="case-note">{currentStory.note}</p><p>{currentStory.person} <span>Москва</span></p></div><aside className="story-file"><span className="mono">МАРШРУТ / {String(story + 1).padStart(2, '0')}</span><div className="story-transition"><span>{currentStory.from}</span><Arrow /><strong>{currentStory.to}</strong></div><dl><div><dt>От заявки</dt><dd>{currentStory.duration}</dd></div><div><dt>Собеседований</dt><dd>{currentStory.interviews}</dd></div></dl><span className="mono">РЕЗУЛЬТАТ НЕ ОДИНАКОВ ДЛЯ ВСЕХ</span></aside></div>
        <div className="case-index" aria-label="Выбор маршрута">{stories.map((item, index) => <button className={story === index ? 'active' : ''} key={`${item.person}-${index}`} onClick={() => setStory(index)} aria-label={`Маршрут ${index + 1}: ${item.to}`}><span>{String(index + 1).padStart(2, '0')}</span><i /></button>)}</div>
      </section>

      <section className="reviews section reveal" id="reviews"><Label number="05">ОТЗЫВЫ БЕЗ ПОСТАНОВКИ</Label><div className="reviews-layout"><h2>Публикуем<br />только то,<br />что можно<br /><em>подтвердить.</em></h2><div className="review-policy"><p>Этот блок готов для настоящих отзывов. Тексты, имена и фотографии появятся после согласования с авторами.</p>{[['01', 'Автор подтверждает текст'], ['02', 'Критика остаётся на сайте'], ['03', 'Результаты не приукрашиваются']].map(([number, text]) => <div key={number}><span className="mono">{number}</span><strong>{text}</strong><Arrow diagonal /></div>)}</div></div></section>

      <section className="partners section reveal" id="partners"><Label number="06">ДВА ИСПОЛНИТЕЛЯ / ДВА ЮРЛИЦА</Label><div className="partners-layout"><h2>Две<br />разные<br />компании.</h2><div><p className="section-intro">Вы узнаёте назначенных исполнителей после оплаты. Выбрать или заменить их по своему усмотрению нельзя.</p><div className="partner-line"><span className="mono">01 / МК</span><p>Информационно-консультационная компания,<br />мастер-классы и внутренний сертификат</p><Arrow diagonal /></div><div className="partner-line"><span className="mono">02 / КА</span><p>Отдельное кадровое агентство,<br />вакансии и организация собеседований</p><Arrow diagonal /></div><p className="muted">Названия и реквизиты сообщаются клиенту после оплаты и назначения исполнителей.</p></div></div></section>

      <section className="estimate section reveal" id="price"><Label number="07">ЕДИНАЯ СТОИМОСТЬ ПОД КЛЮЧ</Label><div className="estimate-title"><h2>ОДИН<br />ПЛАТЁЖ.</h2><span className="estimate-plus" aria-hidden="true">₽</span></div><div className="price-intro"><p>Вы оплачиваете ПАСС. Мы организуем маршрут и взаимодействие с двумя независимыми исполнителями.</p><span>Точный состав услуги и условия возврата фиксируются договором до оплаты.</span></div><div className="price-grid">{professions.map((profession, index) => <article className={profession.name === 'Бармен' ? 'price-card featured' : 'price-card'} key={profession.code}><span className="mono">0{index + 1} / {profession.code}</span><h3>{profession.name}</h3><strong>{profession.price}<small> ₽</small></strong><p>единая стоимость маршрута</p><a href="#request" onClick={() => choose(profession.name)} aria-label={`Выбрать направление ${profession.name}`}><Arrow diagonal /></a></article>)}</div></section>

      <section className="faq section reveal" id="faq"><div className="faq-heading"><Label number="08">СПРОСИТЕ ПРЯМО</Label><h2>БЕЗ<br />МЕЛКОГО<br />ШРИФТА.</h2><span className="question-sign" aria-hidden="true">?</span></div><div className="faq-questions">{questions.map(([question, answer], index) => <details key={question} open={index === 0 ? true : undefined}><summary><span className="mono">0{index + 1}</span><h3>{question}</h3><span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="application section reveal" id="request"><Label number="09">ТЕПЕРЬ ВАША ОЧЕРЕДЬ</Label><div className="application-layout"><div className="application-title"><h2>НАЗОВИТЕ<br />ЦЕЛЬ.<Arrow diagonal /></h2><p>Вы выбираете профессию.<br />Маршрут и исполнителей<br />определяем мы.</p><span className="mono">МОСКВА / ЗАЯВКА НА УСЛУГУ ПОД КЛЮЧ</span></div><form className="application-form" onSubmit={event => { event.preventDefault(); if (step === 1) setStep(2); else setSubmitted(true) }}>
        <div className="form-heading"><span className="mono">АНКЕТА ЗНАКОМСТВА</span><span className="mono">{submitted ? '✓' : `0${step} / 02`}</span></div>
        {submitted ? <div className="form-result" role="status"><Arrow diagonal /><h3>Анкета заполнена.</h3><p>Это демонстрация формы. Перед запуском подключим отправку данных в Telegram.</p><button type="button" className="text-action" onClick={() => { setSubmitted(false); setStep(1) }}>Вернуться к анкете ↗</button></div> : <><p className="form-step-title">{step === 1 ? 'Какую профессию вы выбрали?' : 'Как с вами связаться?'}</p>{step === 1 ? <><label>Направление<select name="direction" value={form.direction} onChange={change} required><option value="" disabled>Выберите профессию</option>{professions.map(profession => <option key={profession.code}>{profession.name}</option>)}</select></label><label>Удобный график<select name="schedule" value={form.schedule} onChange={change} required><option value="" disabled>Выберите график</option><option>Полный день</option><option>Сменный</option><option>Неполный день</option><option>Совмещать с учёбой</option></select></label><label>Опыт<textarea name="experience" value={form.experience} onChange={change} placeholder="Можно просто написать «пока нет»" rows="2" required /></label></> : <><label>Имя<input name="name" autoComplete="given-name" value={form.name} onChange={change} placeholder="Как вас зовут" required /></label><label>Телефон<input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={change} pattern="[+0-9 ()\-]{10,20}" title="Укажите номер телефона: от 10 до 20 символов" placeholder="+7 999 000-00-00" required /></label><p className="form-selection">{form.direction} / {form.schedule}</p><label className="consent"><input type="checkbox" required /><span>Согласен на обработку данных. <button type="button" onClick={() => setActiveDocument(documents[2])}>Условия</button></span></label></>}<button className="button form-submit" type="submit">{step === 1 ? 'Дальше — контакты' : 'Отправить заявку'} <Arrow /></button>{step === 2 && <button className="form-back" type="button" onClick={() => setStep(1)}>← Назад</button>}<p className="form-note">Демо-режим. Данные пока никуда не отправляются.</p></>}
      </form></div></section>

      <section className="documents section reveal" id="documents"><Label number="10">ДОКУМЕНТЫ</Label><div className="documents-layout"><h2>Прочитать<br />до оплаты.</h2><div>{documents.map((item, index) => <button key={item} onClick={() => setActiveDocument(item)}><span className="mono">0{index + 1}</span><span>{item}</span><Arrow diagonal /></button>)}</div></div></section>
    </main>

    <footer className="footer"><div className="footer-top"><Brand /><p>ПРОФЕССИЮ НАЗЫВАЕТЕ ВЫ.<br />ИСПОЛНИТЕЛЕЙ НАЗНАЧАЕМ МЫ.<br />ОДИН МАРШРУТ ПОД КЛЮЧ.</p><a href="#top">НАВЕРХ ↑</a></div><div className="footer-bottom"><span>© ПАСС, 2026</span><p>ПАСС не проводит мастер-классы и не является кадровым агентством.<br />Демонстрационная версия сайта.</p><span>МОСКВА</span></div></footer>
    <a className="mobile-action" href="#request">Начать маршрут <Arrow /></a>
    {activeDocument && <DocumentModal title={activeDocument} onClose={() => setActiveDocument(null)} />}
  </>
}
