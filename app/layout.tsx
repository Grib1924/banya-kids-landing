import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Баня — школа рисования для детей в Москве",
  description: "Самая смешная и научная школа рисования для детей 4–13 лет. Бесплатное пробное занятие в Чертаново и Свиблово.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
