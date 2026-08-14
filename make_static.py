from pathlib import Path
import html, re, shutil, urllib.parse, urllib.request

ROOT = Path(__file__).parent
OUT = ROOT.parent / "tilda-static"

def local_src(value: str) -> str:
    value = html.unescape(value)
    if value.startswith("/_next/image?"):
        value = urllib.parse.parse_qs(urllib.parse.urlsplit(value).query).get("url", [value])[0]
    return value[1:] if value.startswith("/assets/") else value

OUT.mkdir(parents=True, exist_ok=True)
shutil.copytree(ROOT / "public" / "assets", OUT / "assets", dirs_exist_ok=True)
request = urllib.request.Request("http://localhost:3013/", headers={"User-Agent": "Mozilla/5.0"})
source = urllib.request.urlopen(request, timeout=30).read().decode("utf-8")
start, end = source.find("<main"), source.find("</main>")
fragment = source[start:end + 7]
fragment = re.sub(r'\s(?:srcSet|srcset|sizes|fetchPriority|data-nimg)="[^"]*"', "", fragment)
fragment = re.sub(r'src="([^"]+)"', lambda m: f'src="{html.escape(local_src(m.group(1)), quote=True)}"', fragment)
fragment = fragment.replace('<form class="signup-form', '<form action="#" method="post" class="signup-form')
css = (ROOT / "app" / "globals.css").read_text(encoding="utf-8")
js = """document.addEventListener('DOMContentLoaded',()=>{const t=document.querySelector('.menu-toggle'),p=document.querySelector('.header-panel');if(t&&p){t.addEventListener('click',()=>{const o=p.classList.toggle('is-open');t.setAttribute('aria-expanded',String(o));const b=t.querySelector('b');if(b)b.textContent=o?'Закрыть':'Меню'});p.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>p.classList.remove('is-open')))}document.querySelectorAll('.signup-form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const b=f.querySelector('button');if(b)b.textContent='Заявка принята ✓'}))});"""
page = f'''<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Баня — школа рисования для детей</title><meta name="description" content="Школа рисования для детей 4–13 лет в Москве"><link rel="stylesheet" href="styles.css"></head><body>{fragment}<script src="script.js"></script></body></html>'''
block = f"<style>\n{css}\n</style>\n{fragment}\n<script>\n{js}\n</script>"
(OUT / "index.html").write_text(page, encoding="utf-8")
(OUT / "styles.css").write_text(css, encoding="utf-8")
(OUT / "script.js").write_text(js, encoding="utf-8")
(OUT / "tilda-html-block.html").write_text(block, encoding="utf-8")
(OUT / "README-TILDA.md").write_text("""# Детский лендинг «Баня» — комплект для Tilda

- `index.html` — автономная страница для проверки.
- `styles.css` — стили и адаптивность.
- `script.js` — мобильное меню и демонстрационная обработка форм.
- `tilda-html-block.html` — готовый код для блока T123.
- `assets/` — изображения и декоративные элементы.

Перед запуском в Tilda загрузите `assets` на доступный CDN и замените относительные пути `assets/` на публичный адрес. Формы подключите к Tilda Forms или CRM.
""", encoding="utf-8")
print(OUT)
