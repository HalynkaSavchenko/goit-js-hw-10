
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector('[data-start]');
const timerFieldDays = document.querySelector('[data-days]');
const timerFieldHours = document.querySelector('[data-hours]');
const timerFieldMinutes = document.querySelector('[data-minutes]');
const timerFieldSeconds = document.querySelector('[data-seconds]');
const input = document.querySelector('#datetime-picker')
startButton.disabled = true
let userSelectedDate = null

const options = {
  enableTime: true,
  time_24hr: true, 
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

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

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
};

function onTimerStart() {
  const selectedDate = fp.selectedDates[0];

  userSelectedDate = setInterval(() => {
    const startTime = new Date();
    const count = selectedDate - startTime;
      startButton.disabled = true;
      input.disabled = true;

    if (count < 0) {
      clearInterval(timerId);
      return;
    }
    updateTimer(convertMs(count));
  }, 1000);
};

function updateTimer({ days, hours, minutes, seconds }) {
  timerFieldDays.textContent = addLeadingZero(days);
  timerFieldHours.textContent = addLeadingZero(hours);
  timerFieldMinutes.textContent = addLeadingZero(minutes);
  timerFieldSeconds.textContent = addLeadingZero(seconds);
};

const fp = flatpickr("#datetime-picker", {
    options,
    onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] - currentDate < 0) {
        startButton.disabled = true;
        iziToast.error({
          title: '',
          message: 'Please choose a date in the future',
            position: 'topRight',
            maxWidth: '302px',
            backgroundColor: '#ef4040',
            messageColor: '#ffffff',
          
        })
    } else {
        startButton.disabled = false
    }
    
  }
});

startButton.addEventListener('click', onTimerStart);

