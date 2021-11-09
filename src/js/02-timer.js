// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.disabled = true
let interval = null
let selectedDate = null

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        
      if (selectedDates[0].getTime() <= Date.now()) {
          startBtn.disabled = true
            Notiflix.Notify.failure('Please choose a date in the future')
        } else {
            startBtn.disabled = false
            selectedDate = selectedDates[0].getTime();
        }
    
         console.log(selectedDates[0]);
  },
};

flatpickr(inputEl, options);

startBtn.addEventListener('click', () => {
    inputEl.disabled = true
    startBtn.disabled = true
    
    interval = setInterval(() => {
        const date = Date.now();
        const distance = selectedDate - date
        const result = convertMs(distance)
    
        if ( distance<1000) {
            clearInterval(interval);
            Notiflix.Notify.info(
               'The time before the sale is over. We are waiting for you in our store "GOIT" 🎉',
           );
        inputEl.disabled = false;
        startBtn.disabled = false;
        }

        daysEl.textContent = result.days;
        hoursEl.textContent = result.hours;
        minutesEl.textContent = result.minutes;
        secondsEl.textContent = result.seconds;

    }, 1000)
})
function pad(value) {
  return String(value).padStart(2, '0');
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}