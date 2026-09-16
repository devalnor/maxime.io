const frame = document.querySelector('iframe');
const names = { bloc: '01 — Une signature construite', ligne: '02 — Une signature qui tient la ligne' };
document.querySelectorAll('[data-variant]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.variant;
    document.querySelectorAll('.switch [data-variant]').forEach(other => other.setAttribute('aria-pressed', String(other.dataset.variant === key)));
    frame.src = `${key}.html`;
    document.querySelector('#open').href = `${key}.html`;
    document.querySelector('#context-title').textContent = names[key];
    if (button.classList.contains('view')) document.querySelector('#context').scrollIntoView();
  });
});
document.querySelectorAll('[data-size]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-size]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    frame.classList.toggle('mobile', button.dataset.size === 'mobile');
  });
});
document.querySelectorAll('.rationale').forEach(details => {
  details.addEventListener('toggle', () => { details.querySelector('summary span').textContent = details.open ? '−' : '+'; });
});
