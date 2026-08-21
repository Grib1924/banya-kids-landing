"use client";

import { ChangeEvent, FormEvent, useState } from "react";

function formatRussianPhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  if (!digits.startsWith("7")) digits = `7${digits}`;
  digits = digits.slice(0, 11);
  const local = digits.slice(1);
  let result = "+7";
  if (local.length) result += ` (${local.slice(0, 3)}`;
  if (local.length >= 3) result += ")";
  if (local.length > 3) result += ` ${local.slice(3, 6)}`;
  if (local.length > 6) result += `-${local.slice(6, 8)}`;
  if (local.length > 8) result += `-${local.slice(8, 10)}`;
  return result;
}

export default function SignupForm({ compact = false, variant = "trial" }: { compact?: boolean; variant?: "trial" | "consultation" }) {
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("+7");
  const isConsultation = variant === "consultation";
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }
  return (
    <form className={`signup-form ${compact ? "compact" : ""}`} onSubmit={submit} data-form-type={variant}>
      <input type="hidden" name="lead_type" value={variant} />
      <input type="hidden" name="form_name" value={isConsultation ? "Детская посадка — консультация" : "Детская посадка — пробное занятие"} />
      <label><span>Ваше имя</span><input name="name" autoComplete="name" placeholder="Как к вам обращаться?" required /></label>
      <label><span>Телефон</span><input name="phone" autoComplete="tel" inputMode="tel" placeholder="+7 (999) 999-99-99" value={phone} onChange={(event: ChangeEvent<HTMLInputElement>) => setPhone(formatRussianPhone(event.target.value))} pattern="\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}" maxLength={18} title="Введите российский номер в формате +7 (999) 999-99-99" required /></label>
      <button type="submit">{sent ? "Заявка принята ✓" : isConsultation ? "Получить консультацию" : "Записаться бесплатно"}</button>
      <small>Нажимая кнопку, вы соглашаетесь с <a href="https://v-bane.com/privacy" target="_blank">политикой конфиденциальности</a>.</small>
      {sent && <div className="form-success-popup" role="dialog" aria-modal="true" aria-labelledby="form-success-title"><div className="form-success-popup__card"><button type="button" className="form-success-popup__close" aria-label="Закрыть" onClick={() => setSent(false)}>×</button><h2 id="form-success-title">заявка отправлена</h2><p>Спасибо! Мы скоро свяжемся с вами.</p><button type="button" onClick={() => setSent(false)}>Хорошо</button></div></div>}
    </form>
  );
}
