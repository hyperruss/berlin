import { useEffect, useRef, useState } from 'react'
import './App.css'

const professions = [
  { name: 'Бариста', space: 'КОФЕ / СТОЙКА', code: 'BR—01', intro: 'Настроить помол. Поймать текстуру молока. Запомнить, что постоянный гость пьёт без сахара.', skills: ['Эспрессо и работа с зерном', 'Молоко и базовый латте-арт', 'Порядок на рабочем месте'], reality: 'Ранние подъёмы, смены на ногах и очередь, которая не ждёт.' },
  { name: 'Бармен', space: 'БАР / ВЕЧЕР', code: 'BM—02', intro: 'Подготовить станцию. Собрать напиток. Держать темп, даже когда у стойки уже весь зал.', skills: ['Барный инвентарь и техники', 'Рецептуры и заготовки', 'Коммуникация с гостями'], reality: 'Поздние смены, работа рядом с алкоголем и высокая нагрузка в выходные.' },
  { name: 'Официант', space: 'ЗАЛ / СЕРВИС', code: 'OF—03', intro: 'Знать меню. Увидеть, что гостю что-то нужно, ещё до того, как он поднимет руку.', skills: ['Подача и стандарты сервиса', 'Меню и рекомендации', 'Взаимодействие с кухней'], reality: 'Много движения, несколько столов одновременно и необходимость быстро решать вопросы.' },
  { name: 'Хостес', space: 'ВСТРЕЧА / ГОСТИ', code: 'HS—04', intro: 'Встретить. Найти стол. Сделать так, чтобы вечер начался хорошо ещё у входа.', skills: ['Бронирование и посадка', 'Первый контакт с гостем', 'Организация потока в зале'], reality: 'Нужно сохранять спокойствие при полной посадке и работать с ожиданиями гостей.' },
  { name: 'Администратор', space: 'КОМАНДА / ПРОЦЕССЫ', code: 'AD—05', intro: 'Собрать команду на смену. Держать в голове весь зал. Помочь там, где сейчас сложнее всего.', skills: ['Организация работы команды', 'Контроль сервиса', 'Решение рабочих ситуаций'], reality: 'Ответственность за всю смену. Для части программ и вакансий понадобится опыт.' },
]
const stories = [
  { title: 'В профессию можно\nприйти не сразу.', person: 'Алексей, 34 года', from: 'Логистика', to: 'Бар', quote: 'На третьем собеседовании понял: не нужно изображать опыт. Нужно показать, чему научился.', steps: ['Выбрал школу из двух вариантов', 'Прошёл практическую программу', 'Вышел на смену после трёх собеседований'] },
  { title: 'Первое место —\nне всегда твоё.', person: 'Марина, 27 лет', from: 'Офис', to: 'Кофейня', quote: 'В первой кофейне не совпал график. Мы вернулись к подбору и нашли место, где я могу совмещать работу с семьёй.', steps: ['Сравнила программы для начинающих', 'Освоила базу работы бариста', 'Сменила первое место из-за графика'] },
  { title: 'Попробовать.\nИ передумать.', person: 'Денис, 29 лет', from: 'Офис', to: 'Новый опыт', quote: 'Мне понравилось учиться, но вечерний график оказался не моим. Я решил пока остаться на прежней работе.', steps: ['Выбрал программу школы-партнёра', 'Завершил обучение', 'Сам отказался от поиска работы'] },
]
const questions = [
  ['Вы гарантируете трудоустройство?', 'Нет. Решение о найме принимает работодатель. Мы помогаем выбрать школу и кадровое агентство, организуем процесс по вашему поручению. Условия сопровождения вы увидите до оплаты.'],
  ['ПАСС — это школа?', 'ПАСС — сервис-посредник. Обучают школы-партнёры, а подбором вакансий занимаются кадровые агентства. Мы помогаем сравнить варианты и организовать взаимодействие.'],
  ['Можно прийти совсем без опыта?', 'Да, можно начать с подбора программы для начинающих. Требования зависят от направления: например, для части программ администраторов нужен опыт работы в зале.'],
  ['Зачем обращаться через сервис?', 'Чтобы сравнить варианты школ с учётом своего графика и целей, отдельно выбрать кадровое сопровождение и понимать последовательность всех этапов.'],
  ['Кто выдаёт документ об обучении?', 'Школа-партнёр от своего имени. Вид документа и условия его получения указываются в программе выбранной школы до оплаты.'],
  ['Что делать, если условия изменились?', 'Обсудить изменения с менеджером. Возможность сменить программу, остановить сопровождение или вернуть средства определяется условиями заключённых договоров.'],
]
const documents = ['Договор комиссии', 'Политика обработки данных', 'Согласие на обработку данных', 'Условия оплаты и возврата']

function Arrow({ diagonal = false, className = '' }) {
  return <svg className={className} viewBox="0 0 32 32" aria-hidden="true"><path d={diagonal ? 'M7 25 25 7M7 7h18v18' : 'M3 16h25M17 5l11 11-11 11'} /></svg>
}
function Brand() { return <a className="brand" href="#top" aria-label="ПАСС — на главную">ПАСС<Arrow diagonal /></a> }
function Label({ number, children }) { return <p className="section-label"><span>{number} /</span> {children}</p> }

function DocumentModal({ title, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    dialog.showModal()
    return () => dialog.close()
  }, [])
  return <dialog ref={ref} className="document-modal" aria-label={title} onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose() } }}><button className="modal-close" aria-label="Закрыть документ" onClick={onClose}>×</button><span className="mono">ДОКУМЕНТ / СТАТУС</span><h2>{title}</h2><p>Утверждённая версия документа пока не размещена. Она будет доступна здесь до начала приёма заявок и оплаты.</p><button className="button" onClick={onClose}>Понятно <Arrow /></button></dialog>
}

export default function App() {
  const [menu, setMenu] = useState(false)
  const [selected, setSelected] = useState(0)
  const [story, setStory] = useState(0)
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [document, setDocument] = useState(null)
  const [form, setForm] = useState({ direction: '', schedule: '', experience: '', name: '', phone: '' })
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const choose = (name) => { setForm({ ...form, direction: name }); setSubmitted(false); setStep(1) }
  const currentStory = stories[story]
  return <>
    <a className="skip-link" href="#main">К содержимому</a>
    <header className="header" id="top">
      <Brand /><span className="header-caption">ВХОД В ИНДУСТРИЮ<br />ГОСТЕПРИИМСТВА</span>
      <nav aria-label="Основная навигация" id="navigation" className={menu ? 'navigation is-open' : 'navigation'}>
        {[['#directions', 'Профессии'], ['#process', 'Как это работает'], ['#cases', 'Истории'], ['#faq', 'Вопросы']].map(([href, text]) => <a key={href} href={href} onClick={() => setMenu(false)}>{text}</a>)}
      </nav>
      <a className="header-action" href="#request">Подобрать программу <Arrow diagonal /></a>
      <button className="menu-toggle" aria-label={menu ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? '×' : '☰'}</button>
    </header>
    <main id="main">
      <section className="entrance" aria-labelledby="hero-title">
        <div className="entrance-meta"><span><i /> МОСКВА · 5 ПРОФЕССИЙ</span><span>ДЛЯ ТЕХ, КТО ХОЧЕТ НАЧАТЬ</span><span>ПАСС / 001</span></div>
        <h1 id="hero-title"><span className="hero-first">ВАШ ВХОД <Arrow /></span><span>В ПРОФЕССИЮ.</span></h1>
        <div className="hero-bottom">
          <div className="entry-sign"><span>СЛУЖЕБНЫЙ ВХОД</span><strong>Здесь<br />начинают.</strong><Arrow diagonal /></div>
          <div className="hero-description"><p>За хорошим вечером<br />стоит чья-то <strong>работа.</strong><br />Найдите в ней своё место.</p><span>Подберём школу и кадровое агентство для старта в баре, кофейне или ресторане. Обучают партнёры. Мы помогаем выбрать и организуем процесс.</span></div>
          <div className="hero-next"><a className="button" href="#request">Подобрать программу <Arrow /></a><span className="mono">Сначала — знакомство.<br />Выбор и оплата — потом.</span><a className="down-link" href="#process">Как всё устроено <span>↓</span></a></div>
        </div>
        <div className="profession-tape" aria-hidden="true"><span>БАРИСТА</span><b>✳</b><span>БАРМЕН</span><b>✳</b><span>ОФИЦИАНТ</span><b>✳</b><span>ХОСТЕС</span><b>✳</b><span>АДМИНИСТРАТОР</span><b>↗</b></div>
      </section>

      <section className="roles section" id="process">
        <Label number="01">КТО ЕСТЬ КТО</Label>
        <div className="roles-heading"><h2>Вы выбираете.<br />Мы соединяем.</h2><p>Одна заявка. Три стороны.<br />У каждой — своя работа.</p></div>
        <div className="role-route">
          <article><span className="route-point">А</span><h3>ВЫ</h3><p>Рассказываете о себе и выбираете школу из предложенных вариантов.</p><span className="mono">ЦЕЛЬ + ВЫБОР</span></article>
          <div className="route-link"><Arrow /><span>поручение</span></div>
          <article className="our-role"><span className="route-point">Б</span><h3>ПАСС</h3><p>Подбираем варианты, организуем договоры и сопровождаем ваше поручение.</p><span className="mono">ПОДБОР + ОРГАНИЗАЦИЯ</span></article>
          <div className="route-link"><Arrow /><span>договоры</span></div>
          <article><span className="route-point">В</span><h3>ПАРТНЁРЫ</h3><p>Школа проводит обучение. Кадровое агентство помогает искать работу.</p><span className="mono">ОБУЧЕНИЕ + ПОИСК РАБОТЫ</span></article>
        </div>
        <div className="roles-note"><span>ПОНЯТНО С САМОГО НАЧАЛА</span><p>Мы не обучаем сами. Решение о найме принимает работодатель.</p></div>
      </section>

      <section className="professions section" id="directions">
        <Label number="02">ВЫБЕРИТЕ СВОЮ СТОРОНУ СТОЙКИ</Label>
        <div className="profession-heading"><h2>КЕМ<br />БУДЕТЕ?</h2><div className="profession-count">05<span>НАПРАВЛЕНИЙ<br />ОДНА ИНДУСТРИЯ</span></div></div>
        <div className="profession-list">{professions.map((p, i) => <article className={selected === i ? 'profession open' : 'profession'} key={p.code}>
          <button className="profession-switch" id={`profession-${i}`} aria-expanded={selected === i} aria-controls={`profession-panel-${i}`} onClick={() => setSelected(selected === i ? null : i)}><span className="mono">0{i + 1}</span><h3>{p.name}</h3><span className="profession-space mono">{p.space}</span><span className="expand-mark">{selected === i ? '−' : '+'}</span></button>
          {selected === i && <div className="profession-content" id={`profession-panel-${i}`} role="region" aria-labelledby={`profession-${i}`}><div className="job-description"><p>{p.intro}</p><ul>{p.skills.map(s => <li key={s}>{s}</li>)}</ul><a className="text-action" href="#request" onClick={() => choose(p.name)}>Хочу в это направление <Arrow diagonal /></a></div><aside className="job-reality"><span className="mono">ОБРАТНАЯ СТОРОНА СМЕНЫ</span><p>{p.reality}</p><span className="job-code">{p.code}</span></aside></div>}
        </article>)}</div>
      </section>

      <section className="work-interlude"><figure><img src="/images/pass-hero.jpg" alt="Руки бармена у рабочей стойки" loading="lazy" /><figcaption>ЗА СТОЙКОЙ / ПЕРЕД ОТКРЫТИЕМ <span>Иллюстрация создана ИИ</span></figcaption></figure><div><span className="mono">НЕ ТОЛЬКО КРАСИВЫЙ ФАРТУК</span><p>Навык.<br />Темп.<br /><em>Команда.</em></p><span>У каждой профессии свой характер.<br />Поможем разобраться до выбора школы.</span></div></section>

      <section className="journey section">
        <Label number="03">МАРШРУТ В ПРОФЕССИЮ</Label>
        <div className="journey-layout"><div className="journey-title"><h2>Сначала<br />знакомимся.<br />Дальше —<br />по шагам.</h2><a className="text-action" href="#request">Начать с заявки <Arrow diagonal /></a></div>
          <ol className="journey-list">{[['Знакомство', 'Направление, удобный график, опыт. Начинаем с вашей ситуации.'], ['Сравнение', 'Показываем минимум два варианта школы и условия кадрового сопровождения.'], ['Ваше решение', 'Выбираете партнёров. Уточняем стоимость и оформляем поручение.'], ['Организация', 'Заключаем договоры с выбранными партнёрами в рамках поручения.'], ['Обучение', 'Занимаетесь в школе-партнёре. Она же выдаёт итоговый документ.'], ['Поиск работы', 'Агентство подбирает вакансии. Мы предоставляем отчёт о выполненном поручении.']].map(([title, text], i) => <li key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div><b aria-hidden="true">↘</b></li>)}</ol>
        </div>
      </section>

      <section className="stories section" id="cases"><Label number="04">У КАЖДОГО СВОЙ МАРШРУТ</Label><div className="story-top"><span className="demo-label">ВЫМЫШЛЕННЫЕ ПРИМЕРЫ ДЛЯ МАКЕТА</span><div className="story-controls"><span className="mono">0{story + 1} / 03</span><button aria-label="Предыдущая история" onClick={() => setStory((story + 2) % 3)}>←</button><button aria-label="Следующая история" onClick={() => setStory((story + 1) % 3)}>→</button></div></div><div className="story-layout" key={story}><div className="story-main"><h2>{currentStory.title}</h2><blockquote>«{currentStory.quote}»</blockquote><p>{currentStory.person} <span>Москва</span></p></div><aside className="story-file"><span className="mono">ЛИЧНОЕ ДЕЛО / 0{story + 1}</span><div className="story-transition"><span>{currentStory.from}</span><Arrow /><strong>{currentStory.to}</strong></div><ol>{currentStory.steps.map(s => <li key={s}>{s}</li>)}</ol><span className="mono">СЦЕНАРИЙ, НЕ ОТЗЫВ КЛИЕНТА</span></aside></div></section>

      <section className="partners section" id="partners"><Label number="05">ОТКРЫТЫЕ УСЛОВИЯ</Label><div className="partners-layout"><h2>У работы<br />есть<br />исполнитель.</h2><div><p className="section-intro">Вы будете знать, кто обучает и кто подбирает вакансии. До выбора и оплаты.</p><div className="partner-line"><span className="mono">ШКОЛА</span><p>Программа, юридическое лицо,<br />лицензия и итоговый документ</p><Arrow diagonal /></div><div className="partner-line"><span className="mono">АГЕНТСТВО</span><p>Юридическое лицо, условия<br />и сроки сопровождения</p><Arrow diagonal /></div><p className="muted">Список партнёров готовится к публикации.</p></div></div></section>

      <section className="estimate section" id="price"><Label number="06">ИЗ ЧЕГО СКЛАДЫВАЕТСЯ СТОИМОСТЬ</Label><div className="estimate-title"><h2>ВСЁ<br />ПО СТРОКАМ.</h2><span className="estimate-plus" aria-hidden="true">+</span></div><div className="estimate-layout"><div className="estimate-note"><span className="demo-label">ПРИМЕР РАСЧЁТА</span><p>Три составляющие.<br />Одна понятная сумма.</p><span>Цены условные. Точный расчёт зависит от выбранной программы и партнёров.</span></div><div className="estimate-rows"><div><span>01 / Обучение в школе</span><strong>29 900 ₽</strong></div><div><span>02 / Работа агентства</span><strong>9 900 ₽</strong></div><div><span>03 / Вознаграждение ПАСС</span><strong>7 500 ₽</strong></div><div className="estimate-total"><span>ИТОГО</span><strong>47 300 <small>₽</small></strong></div></div></div></section>

      <section className="faq section" id="faq"><div className="faq-heading"><Label number="07">СПРОСИТЕ ПРЯМО</Label><h2>ЕСТЬ<br />ВОПРОС.</h2><span className="question-sign" aria-hidden="true">?</span></div><div className="faq-questions">{questions.map(([q, a], i) => <details key={q} open={i === 0 ? true : undefined}><summary><span className="mono">0{i + 1}</span><h3>{q}</h3><span className="faq-plus" aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>

      <section className="application section" id="request"><Label number="08">ТЕПЕРЬ ВАША ОЧЕРЕДЬ</Label><div className="application-layout"><div className="application-title"><h2>ДАВАЙТЕ<br />НАЧНЁМ.<Arrow diagonal /></h2><p>Расскажите немного о себе.<br />Подберём варианты под ваш<br />ритм жизни.</p><span className="mono">МОСКВА / ЗАЯВКА НА ПОДБОР</span></div><form className="application-form" onSubmit={e => { e.preventDefault(); if (step === 1) setStep(2); else setSubmitted(true) }}>
        <div className="form-heading"><span className="mono">АНКЕТА ЗНАКОМСТВА</span><span className="mono">{submitted ? '✓' : `0${step} / 02`}</span></div>
        {submitted ? <div className="form-result" role="status"><Arrow diagonal /><h3>Анкета заполнена.</h3><p>Это демонстрация формы. Данные не отправлены: приём заявок пока не подключён.</p><button type="button" className="text-action" onClick={() => { setSubmitted(false); setStep(1) }}>Вернуться к анкете ↗</button></div> : <>
          <p className="form-step-title">{step === 1 ? 'Какая работа вам ближе?' : 'Как с вами связаться?'}</p>
          {step === 1 ? <><label>Направление<select name="direction" value={form.direction} onChange={change} required><option value="" disabled>Выберите профессию</option>{professions.map(p => <option key={p.code}>{p.name}</option>)}<option>Пока не определился</option></select></label><label>Удобный график<select name="schedule" value={form.schedule} onChange={change} required><option value="" disabled>Выберите график</option><option>Полный день</option><option>Сменный</option><option>Неполный день</option><option>Совмещать с учёбой</option></select></label><label>Опыт<textarea name="experience" value={form.experience} onChange={change} placeholder="Можно просто написать «пока нет»" rows="2" required /></label></> : <><label>Имя<input name="name" autoComplete="given-name" value={form.name} onChange={change} placeholder="Как вас зовут" required /></label><label>Телефон<input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={change} pattern="[+0-9 ()\-]{10,20}" title="Укажите номер телефона: от 10 до 20 символов" placeholder="+7 999 000-00-00" required /></label><p className="form-selection">{form.direction} / {form.schedule}</p><label className="consent"><input type="checkbox" required /><span>Согласен на обработку данных. <button type="button" onClick={() => setDocument(documents[2])}>Условия</button></span></label></>}
          <button className="button form-submit" type="submit">{step === 1 ? 'Дальше — контакты' : 'Проверить анкету'} <Arrow /></button>{step === 2 && <button className="form-back" type="button" onClick={() => setStep(1)}>← Назад</button>}<p className="form-note">Демо-режим. Данные никуда не отправляются.</p>
        </>}
      </form></div></section>
      <section className="documents section" id="documents"><Label number="09">ДОКУМЕНТЫ</Label><div className="documents-layout"><h2>Ознакомиться<br />заранее.</h2><div>{documents.map((d, i) => <button key={d} onClick={() => setDocument(d)}><span className="mono">0{i + 1}</span><span>{d}</span><Arrow diagonal /></button>)}</div></div></section>
    </main>
    <footer className="footer"><div className="footer-top"><Brand /><p>ПОДБОР ШКОЛЫ.<br />КАДРОВОЕ СОПРОВОЖДЕНИЕ.<br />ВАШ ВХОД В ПРОФЕССИЮ.</p><a href="#top">НАВЕРХ ↑</a></div><div className="footer-bottom"><span>© ПАСС, 2026</span><p>Сервис-посредник. Обучение проводят школы-партнёры.<br />Демонстрационная версия сайта.</p><span>МОСКВА</span></div></footer>
    <a className="mobile-action" href="#request">Подобрать программу <Arrow /></a>
    {document && <DocumentModal title={document} onClose={() => setDocument(null)} />}
  </>
}
