import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

formEl.addEventListener('submit', (event)=>{
  event.preventDefault();

  let delay = Number(formEl[0].value);
  let step = Number(formEl[1].value);
  let amount = Number(formEl[2].value);
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
    delay += step;
  }
});
