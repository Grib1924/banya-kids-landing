"use client";

import { FormEvent, useState } from "react";

export default function SignupForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }
  return (
    <form className={`signup-form ${compact ? "compact" : ""}`} onSubmit={submit}>
      <label><span>Ваше имя</span><input name="name" autoComplete="name" placeholder="Как к вам обращаться?" required /></label>
      <label><span>Телефон</span><input name="phone" autoComplete="tel" inputMode="tel" placeholder="+7 999 000-00-00" required /></label>
      <button type="submit">{sent ? "Заявка принята ✓" : "Записаться бесплатно"}</button>
      <small>Нажимая кнопку, вы соглашаетесь с <a href="https://v-bane.com/privacy" target="_blank">политикой конфиденциальности</a>.</small>
      {sent && <p className="success" role="status">Спасибо! Для рабочей версии на Tilda подключим форму к вашей CRM.</p>}
    </form>
  );
}
