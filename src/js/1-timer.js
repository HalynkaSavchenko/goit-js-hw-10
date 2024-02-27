// імпорт бібліотек
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

// створення змінних
const startButton = document.querySelector('[data-start]');
const timerFieldDays = document.querySelector('[data-days]');
const timerFieldHours = document.querySelector('[data-hours]');
const timerFieldMinutes = document.querySelector('[data-minutes]');
const timerFieldSeconds = document.querySelector('[data-seconds]');
const input = document.querySelector('#datetime-picker');

startButton.disabled = true;

let userSelectedDate = null;

// створення об"єкту опцій для FP
const options = {
  enableTime: true,
  time_24hr: true, 
  defaultDate: new Date(),
  minuteIncrement: 1,
  weekNumbers: true,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
    startButton.disabled = true;
    iziToast.error({
      title: '',
      message: 'Please choose a date in the future',
      position: 'topRight',
      maxWidth: '302px',
      backgroundColor: '#ef4040',
      messageColor: '#ffffff',
      theme: 'dark',
    });
    } else {
      userSelectedDate = selectedDates[0];
      startButton.disabled = false
      }
  
    console.log(selectedDates[0]);
  },
};

// Створення об"єкту FP
const fp = flatpickr("#datetime-picker", options);

// слухач на инпут
input.addEventListener('click', () => {
  fp.open();
})

// функція convertMs, де ms — різниця між кінцевою і поточною датою в мілісекундах.
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
  return { days, hours, minutes, seconds };
};

// Функція Форматування часу
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

// функція оновлення таймеру
function updateTimer({ days, hours, minutes, seconds }) {
  timerFieldDays.textContent = addLeadingZero(days);
  timerFieldHours.textContent = addLeadingZero(hours);
  timerFieldMinutes.textContent = addLeadingZero(minutes);
  timerFieldSeconds.textContent = addLeadingZero(seconds);
};

// слухач на кнопку
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  input.disabled = true;

  const  timerId = setInterval(() => {
    const count = userSelectedDate - Date.now();
      
    if (count >= 0) {
      updateTimer(convertMs(count));
    } else {
      clearInterval(timerId);
      input.disabled = false;
    }
  }, 1000);
});


 














