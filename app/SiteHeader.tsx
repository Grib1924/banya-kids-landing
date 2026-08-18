"use client";

import Image from "next/image";
import { useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Баня — на главную" onClick={close}>
        <Image src="/assets/logo.png" alt="Баня" width={128} height={92} priority />
      </a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-menu" onClick={() => setOpen(!open)}>
        <span /><span /><span /><b>{open ? "Закрыть" : "Меню"}</b>
      </button>
      <div className={`header-panel ${open ? "is-open" : ""}`} id="main-menu">
        <nav aria-label="Основная навигация">
          <a href="#about" onClick={close}>о нас</a>
          <a href="#directions" onClick={close}>направления</a>
          <a href="#teachers" onClick={close}>учителя</a>
          <a href="#reviews" onClick={close}>отзывы</a>
          <a href="#prices" onClick={close}>цены</a>
          <a href="#faq" onClick={close}>вопросы</a>
          <a href="#contacts" onClick={close}>контакты</a>
        </nav>
        <div className="header-actions">
          <a className="contact-button call" href="tel:+79953012903" aria-label="Позвонить в школу рисования Баня">Позвонить</a>
          <a className="contact-button message" href="https://wa.me/79953012903" target="_blank" rel="noreferrer" aria-label="Написать в WhatsApp">Написать</a>
          <a className="mini-cta" href="#trial" onClick={close}>Пробное бесплатно</a>
        </div>
      </div>
    </header>
  );
}
