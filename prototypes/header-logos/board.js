const frame = document.querySelector('iframe');
document.querySelectorAll('[data-variant]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-variant]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    const path = `${button.dataset.variant}.html`;
    frame.src = path;
    document.querySelector('#open-preview').href = path;
    document.querySelector('#preview-title').textContent = button.querySelector('.option-label').textContent;
  });
});
document.querySelectorAll('[data-size]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-size]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    frame.classList.toggle('mobile', button.dataset.size === 'mobile');
  });
});
