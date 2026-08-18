import Image from "next/image";
import SignupForm from "./SignupForm";
import SiteHeader from "./SiteHeader";

const facts = [
  ["2", "филиала в Москве и более 1000 учеников"],
  ["★", "наши ученики ежегодно участвуют в выставках — и побеждают"],
  ["✓", "у нас есть лицензия на образовательную деятельность"],
  ["∞", "по единому абонементу можно ходить на все направления"],
];

const reasons = [
  "мы не учим по шаблону, а объясняем правила рисования простыми и смешными словами :)",
  "придерживаемся принципа нескучного академизма: учим понимать форму, объём и композицию в интересных для ребёнка заданиях",
  "наши ученики регулярно участвуют в выставках и становятся призёрами всероссийских и международных конкурсов",
  "в бане никто не останется без заботы: администраторы посушат варежки ребёнка, покормят его обедом или развлекут играми, если вы задерживаетесь",
  "всё организовано так, чтобы маленькие художники сами бежали на занятия — скорее придётся уговаривать их пойти домой",
  "единый абонемент на все направления — ходите по удобному графику и сочетайте занятия; списываем их только после посещения",
];

const directions = [
  {
    title: "рисование и скульптура",
    age: "для детей 4–10 лет",
    image: "/assets/drawing.jpeg",
    tags: ["1 час", "материалы включены", "мини-группы 4–5, 6–8 и 8–10 лет"],
    text: "На рисовании изучаем художественные инструменты и понятия, учимся создавать объём, смешивать любой цвет без грязи и составлять сложные объекты из простых. На скульптуре изучаем форму, лепим из пластилина с каркасами фигуры животных и людей, природные и интерьерные композиции.",
    note: "На каждом занятии получаются уникальные работы — каждый может выразить себя в творчестве.",
  },
  {
    title: "комикс и иллюстрация",
    age: "для детей 8–13 лет",
    image: "/assets/sculpture.jpeg",
    tags: ["1 час — 8–10 лет", "2 часа — 11–13 лет", "материалы включены"],
    text: "Придумываем новые образы привычным предметам, своих персонажей и целые сюжеты, изучаем принципы стилизации и утрирования, учимся находить собственный уникальный стиль. Работаем маркерами, красками и в смешанных техниках.",
    note: "Идеально дополняет академическое рисование и подходит ребятам, которые увлекаются аниме.",
  },
  {
    title: "рисунок и живопись",
    age: "для детей 11–13 лет",
    image: "/assets/teen.jpg",
    tags: ["2 часа", "рисунок", "живопись и композиция"],
    text: "Изучаем основы рисунка, живописи и композиции, учимся анализировать натуру и рисовать осознанно. Рассуждаем, какие приёмы помогают создавать объём и настроение, показывать текстуры и управлять вниманием зрителя. Рисуем натюрморты, пейзажи, архитектуру, интерьеры, а иногда даже портреты.",
    note: "Взяли лучшее из программ художественных школ и добавили смешинку, чтобы подросткам было интересно :)",
  },
];

const teachers = [
  ["/assets/teacher-1.jpeg", "Помогу не бояться чистого листа и найти собственное решение — даже если сначала кажется, что «не получится» :)"],
  ["/assets/teacher-2.jpeg", "Не исправляю работу за ученика. Задаю вопросы и показываю приёмы, чтобы ребёнок сам понял, как сделать лучше."],
  ["/assets/teacher-3.jpeg", "На занятии можно пробовать, ошибаться, смеяться и снова пробовать. Именно так появляется настоящая самостоятельность."],
];

const steps = [
  "Вы выбираете удобное время из расписания",
  "Мы подбираем группу по возрасту и навыкам",
  "Ребёнок занимается вместе с ровесниками под чутким руководством педагога",
  "После занятия вы получаете обратную связь",
  "Если вам всё понравилось — выбираете абонемент и становитесь частью сообщества творчественных!",
];

const faq = [
  ["А что, если ребёнок никогда не рисовал?", "Это отличный повод начать. Мы принимаем новичков, подбираем группу по возрасту и навыкам и объясняем базовые принципы простыми словами — без требования что-то уметь заранее."],
  ["Можно ли присоединиться в середине года?", "Да. Программы устроены так, чтобы к группе можно было присоединиться в течение года. Администратор подберёт подходящий уровень и время."],
  ["Нужно ли покупать материалы и какие?", "Для ребят 4–10 лет все материалы входят в стоимость. Для старших групп администратор заранее пришлёт короткий список того, что понадобится."],
  ["Что делать, если пропустили занятие?", "Предупредите администратора. Мы отмечаем только фактические посещения и не списываем занятие в случае пропуска, пока действует абонемент."],
  ["Как распределяются дети по группам?", "По возрасту и навыкам: 4–5, 6–8, 8–10 и 11–13 лет. После заявки уточним опыт ребёнка и предложим подходящую группу."],
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-photo">
          <img className="hero-image hero-image-desktop" src="/assets/hero-happy-desktop.jpg" alt="Ученица школы «Баня» показывает свою работу" />
          <img className="hero-image hero-image-mobile" src="/assets/hero-happy-mobile.jpg" alt="Ученики школы «Баня» показывают свои работы" />
          <span className="photo-sticker">понимать, а не срисовывать</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">школа рисования «баня»</p>
          <h1>самая смешная <span>(и научная!)</span> школа рисования</h1>
          <p className="hero-age">для детей 4–13 лет в Москве</p>
          <div className="hero-points">
            <p>учим понимать правила, а не срисовывать</p>
            <p>объясняем принципы рисования понятными словами, чтобы ваш ребёнок смог сам нарисовать всё, что придумает</p>
          </div>
          <a className="primary-button" href="#trial">Записаться на бесплатное пробное занятие</a>
        </div>
        <Image className="hero-doodle" src="/assets/loop-arrow.png" alt="" width={120} height={120} />
      </section>

      <section className="early-locations" aria-label="Филиалы школы рисования Баня">
        <div className="early-locations-intro">
          <p className="eyebrow">два филиала в Москве</p>
          <h2>выберите тот, что ближе</h2>
        </div>
        <a className="early-location-card" href="https://yandex.ru/maps/?text=Москва%2C%20Снежная%2017к2" target="_blank" rel="noreferrer">
          <span>на севере · 4 минуты от метро</span>
          <strong>Свиблово</strong>
          <p>ул. Снежная, 17к2</p>
          <b>Открыть карту ↗</b>
        </a>
        <a className="early-location-card pink" href="https://yandex.ru/maps/?text=Москва%2C%20Северное%20Чертаново%201к1" target="_blank" rel="noreferrer">
          <span>на юге · 7 минут от метро</span>
          <strong>Чертаново</strong>
          <p>мкр Северное Чертаново, 1к1</p>
          <b>Открыть карту ↗</b>
        </a>
      </section>

      <section className="facts" aria-label="Коротко о школе">
        {facts.map(([mark, text]) => (
          <article className="fact" key={text}>
            <span className="fact-mark">{mark}</span>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="why section" id="about">
        <div className="section-heading">
          <p className="eyebrow">забота + академическая база</p>
          <h2>почему нас так любят родители</h2>
        </div>
        <div className="why-layout">
          <div className="why-photo">
            <Image src="/assets/care.jpeg" alt="Педагог занимается с детьми в мастерской" fill sizes="(max-width: 900px) 100vw, 42vw" />
            <span className="bubble">здесь можно быть собой</span>
          </div>
          <ol className="reason-list">
            {reasons.map((reason, i) => <li key={reason}><span>{String(i + 1).padStart(2, "0")}</span><p>{reason}</p></li>)}
          </ol>
        </div>
        <p className="manifesto">Наша цель — научить замечать, анализировать, вдохновляться. <strong>А умение красиво рисовать — просто побочный эффект :)</strong></p>
      </section>

      <section className="directions section" id="directions">
        <div className="section-heading split-heading">
          <div><p className="eyebrow">единый абонемент</p><h2>наши направления</h2></div>
          <p>Не выбирайте, а сочетайте в одном абонементе разные направления</p>
        </div>
        <div className="direction-list">
          {directions.map((item, i) => (
            <article className="direction-card" key={item.title}>
              <div className="direction-photo">
                <Image src={item.image} alt={`${item.title} в мастерской Баня`} fill sizes="(max-width: 900px) 100vw, 44vw" />
                <span className="direction-index">0{i + 1}</span>
              </div>
              <div className="direction-copy">
                <p className="direction-age">{item.age}</p>
                <h3>{item.title}</h3>
                <div className="tag-row">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                <p>{item.text}</p>
                <p className="direction-note">{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="trial-band" id="trial">
        <div>
          <p className="eyebrow light">первое знакомство</p>
          <h2>попробуйте любое направление бесплатно</h2>
          <p>Оставьте телефон — администратор напишет вам и подберёт группу.</p>
        </div>
        <SignupForm />
      </section>

      <section className="teachers section" id="teachers">
        <div className="section-heading split-heading">
          <div><p className="eyebrow">рядом, когда нужно</p><h2>наши учителя</h2></div>
          <p>Мы не рисуем за ученика, а помогаем ему увидеть закономерность, попробовать и найти собственное решение.</p>
        </div>
        <div className="teacher-grid">
          {teachers.map(([image, quote], i) => (
            <article className="teacher-card" key={image}>
              <div className="teacher-photo"><Image src={image} alt={`Педагог мастерской на занятии ${i + 1}`} fill sizes="(max-width: 700px) 100vw, 33vw" /></div>
              <p>{quote}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reviews section" id="reviews">
        <div className="section-heading"><p className="eyebrow light">говорят лучше нас</p><h2>что говорят родители</h2></div>
        <div className="review-track">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <figure key={i}><Image src={`/assets/review-${i}.png`} alt={`Отзыв родителя о мастерской Баня ${i}`} width={420} height={620} /></figure>
          ))}
        </div>
      </section>

      <section className="steps section" id="how">
        <div className="section-heading"><p className="eyebrow">никакого экзамена</p><h2>как проходит бесплатное пробное занятие</h2></div>
        <ol className="step-grid">
          {steps.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, "0")}</span><p>{step}</p></li>)}
        </ol>
        <div className="inline-trial consultation-card">
          <div className="consultation-copy">
            <p className="eyebrow">поможем разобраться</p>
            <h3>есть вопрос</h3>
            <p>Оставьте номер — администратор свяжется с вами, расскажет о программах и поможет выбрать подходящую группу.</p>
          </div>
          <SignupForm compact variant="consultation" />
        </div>
      </section>

      <section className="prices section" id="prices">
        <div className="section-heading split-heading">
          <div><p className="eyebrow">единый абонемент</p><h2>цены</h2></div>
          <p>Занимайтесь по удобному графику — мы не привязываем вас к одной и той же группе.</p>
        </div>
        <div className="price-benefits">
          <span>занятия списываем только после посещения</span>
          <span>для 4–10 лет материалы включены</span>
          <span>можно получить налоговый вычет</span>
          <span>после пробного занятия скидка 10%</span>
        </div>
        <div className="price-grid">
          <article className="price-card pink">
            <p className="price-kicker">4–10 лет · 1 час</p><h3>рисование + скульптура</h3>
            <div className="price-row"><span>разовое</span><b>1 500 ₽</b></div>
            <div className="price-row"><span>4 занятия · 5 недель</span><b>5 600 ₽</b></div>
            <div className="price-row"><span>8 занятий · 2,5 месяца</span><b>10 500 ₽</b></div>
            <div className="price-row"><span>16 занятий · 5 месяцев</span><b>18 000 ₽</b></div>
          </article>
          <article className="price-card blue">
            <p className="price-kicker">8–13 лет · 2 часа</p><h3>рисунок + живопись + комикс</h3>
            <div className="price-row"><span>разовое</span><b>2 200 ₽</b></div>
            <div className="price-row"><span>4 занятия · 5 недель</span><b>8 600 ₽</b></div>
            <div className="price-row"><span>8 занятий · 2,5 месяца</span><b>16 000 ₽</b></div>
            <div className="price-row"><span>16 занятий · 5 месяцев</span><b>29 000 ₽</b></div>
          </article>
        </div>
        <div className="price-form"><h3>первое занятие — бесплатно</h3><SignupForm compact /></div>
      </section>

      <section className="faq section" id="faq">
        <div className="section-heading"><p className="eyebrow">спросить — нормально</p><h2>частые вопросы</h2></div>
        <div className="faq-list">
          {faq.map(([question, answer], i) => (
            <details key={question} open={i === 0}>
              <summary><span>{question}</span><b>+</b></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer id="contacts">
        <div className="footer-top">
          <div><Image src="/assets/logo.png" alt="Баня" width={150} height={100} /><h2>ждём в гости</h2><a href="tel:+79953012903">+7 (995) 301-29-03</a><a href="mailto:pismo.v.banu@gmail.com">pismo.v.banu@gmail.com</a></div>
          <div className="address-list">
            <article><span>на севере</span><h3>свиблово</h3><p>ул. Снежная, 17к2<br />4 минуты от метро</p><a href="https://yandex.ru/maps/?text=Москва%2C%20Снежная%2017к2" target="_blank">открыть карту ↗</a></article>
            <article><span>на юге</span><h3>чертаново</h3><p>мкр Северное Чертаново, 1к1<br />7 минут от метро</p><a href="https://yandex.ru/maps/?text=Москва%2C%20Северное%20Чертаново%201к1" target="_blank">открыть карту ↗</a></article>
          </div>
        </div>
        <div className="maps">
          <iframe title="Карта филиала в Свиблово" src="https://yandex.ru/map-widget/v1/?mode=search&text=Москва%2C%20Снежная%2017к2&z=15" loading="lazy" />
          <iframe title="Карта филиала в Чертаново" src="https://yandex.ru/map-widget/v1/?mode=search&text=Москва%2C%20Северное%20Чертаново%201к1&z=15" loading="lazy" />
        </div>
        <div className="footer-bottom"><span>© школа рисования «баня», 2019–2026</span><a href="https://v-bane.com/privacy" target="_blank">политика конфиденциальности</a></div>
      </footer>
    </main>
  );
}
