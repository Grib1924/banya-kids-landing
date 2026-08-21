from pathlib import Path
import html, re, shutil, urllib.parse, urllib.request

ROOT = Path(__file__).parent
OUT = ROOT.parent / "tilda-static"
ASSET_BASE = "https://grib1924.github.io/banya-kids-landing/assets/"
TILDA_RECEIVERS = "9268311331,3404863814"

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
fragment_tilda = fragment.replace('src="assets/', f'src="{ASSET_BASE}')
fragment_tilda = fragment_tilda.replace('action="#" method="post" class="signup-form', 'action="" method="POST" data-formactiontype="2" data-inputbox=".signup-form label" class="signup-form t-form js-form-proccess')
fragment_tilda = fragment_tilda.replace('name="form_name"', 'name="tildaspec-formname"')
fragment_tilda = fragment_tilda.replace('name="name"', 'name="Name" data-tilda-rule="name"')
fragment_tilda = fragment_tilda.replace('name="phone"', 'name="Phone" data-tilda-rule="phone" inputmode="tel" autocomplete="tel" placeholder="+7 (999) 999-99-99" maxlength="18" pattern="\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}" title="Введите российский номер в формате +7 (999) 999-99-99"')
fragment_tilda = re.sub(
    r'(<form[^>]*class="signup-form t-form js-form-proccess[^>]*>)',
    rf'\1<input type="hidden" name="tildaspec-receivers" value="{TILDA_RECEIVERS}"/>',
    fragment_tilda,
)
css_tilda = css.replace("url('/assets/", f"url('{ASSET_BASE}").replace('url("/assets/', f'url("{ASSET_BASE}')
tilda_js = """document.addEventListener('DOMContentLoaded',()=>{const t=document.querySelector('.menu-toggle'),p=document.querySelector('.header-panel');if(t&&p){t.addEventListener('click',()=>{const o=p.classList.toggle('is-open');t.setAttribute('aria-expanded',String(o));const b=t.querySelector('b');if(b)b.textContent=o?'Закрыть':'Меню'});p.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>p.classList.remove('is-open')))}const formatPhone=value=>{let d=value.replace(/\\D/g,'');if(d.startsWith('8'))d='7'+d.slice(1);if(!d.startsWith('7'))d='7'+d;d=d.slice(0,11);const n=d.slice(1);let r='+7';if(n.length)r+=' ('+n.slice(0,3);if(n.length>=3)r+=')';if(n.length>3)r+=' '+n.slice(3,6);if(n.length>6)r+='-'+n.slice(6,8);if(n.length>8)r+='-'+n.slice(8,10);return r};document.querySelectorAll('.signup-form input[name="Phone"]').forEach(i=>{i.value=i.value?formatPhone(i.value):'+7';i.addEventListener('input',()=>{i.value=formatPhone(i.value)});i.addEventListener('blur',()=>{i.setCustomValidity(/^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$/.test(i.value)?'':'Введите полный российский номер')})});document.addEventListener('click',e=>{const close=e.target.closest('[data-success-close]');if(close)document.querySelector('.form-success-popup')?.remove();const a=e.target.closest('a');if(!a||typeof ym!=='function')return;if(a.href.startsWith('tel:'))ym(55849627,'reachGoal','kids_phone_click');if(a.href.includes('wa.me'))ym(55849627,'reachGoal','kids_messenger_click')});const showSuccess=()=>{document.querySelector('.form-success-popup')?.remove();document.body.insertAdjacentHTML('beforeend','<div class="form-success-popup" role="dialog" aria-modal="true" aria-labelledby="form-success-title"><div class="form-success-popup__card"><button type="button" class="form-success-popup__close" data-success-close aria-label="Закрыть">×</button><h2 id="form-success-title">заявка отправлена</h2><p>Спасибо! Мы скоро свяжемся с вами.</p><button type="button" data-success-close>Хорошо</button></div></div>')};if(window.jQuery){jQuery(document).on('tildaform:aftersuccess',function(e){const f=e.target||e.currentTarget;if(f&&f.matches&&f.matches('.signup-form')){if(typeof ym==='function')ym(55849627,'reachGoal','kids_form_submit');const b=f.querySelector('button');if(b)b.textContent='Заявка принята ✓';showSuccess()}})}});"""
page = f'''<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Баня — школа рисования для детей</title><meta name="description" content="Школа рисования для детей 4–13 лет в Москве"><link rel="stylesheet" href="styles.css"></head><body>{fragment}<script src="script.js"></script></body></html>'''
block = f"<style>\n{css_tilda}\n</style>\n{fragment_tilda}\n<script>\n{tilda_js}\n</script>"
(OUT / "index.html").write_text(page, encoding="utf-8")
(OUT / "styles.css").write_text(css, encoding="utf-8")
(OUT / "script.js").write_text(js, encoding="utf-8")
(OUT / "tilda-html-block.html").write_text(block, encoding="utf-8")
(OUT / "README-TILDA.md").write_text("""# Детский лендинг «Баня» — комплект для Tilda

- `index.html` — автономная страница для проверки.
- `styles.css` — стили и адаптивность.
- `script.js` — мобильное меню и демонстрационная обработка форм.
- `tilda-html-block.html` — готовый код для блока T123 с абсолютными адресами изображений.
- `assets/` — изображения и декоративные элементы.

Формы в блоке T123 подключены к amoCRM и webhook Roistat проекта «БАНЯ». События Метрики: `kids_form_submit`, `kids_phone_click`, `kids_messenger_click`.
""", encoding="utf-8")
print(OUT)
