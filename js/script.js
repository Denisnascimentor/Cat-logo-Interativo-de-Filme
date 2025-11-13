//dropdown do bortão de fitro
document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.select-wrapper');
  const trigger = wrapper.querySelector('.select-trigger');
  const options = wrapper.querySelector('.options');
  const allOptions = wrapper.querySelectorAll('.option');

  trigger.addEventListener('click', () => {
    options.classList.toggle('open');
  });

  allOptions.forEach(option => {
    option.addEventListener('click', () => {

      trigger.textContent = option.textContent; 

      options.classList.remove('open'); 
      
    });
  });

  window.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      options.classList.remove('open');
    }
  });
});
