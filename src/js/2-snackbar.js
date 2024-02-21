import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";



const form = document.querySelector(".form");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const delay = document.querySelector("[name=delay]").value;
  const state = document.querySelector("[name=state]:checked").value;

  const notificationPromise = new Promise((resolve, reject) => {
    if (state === "fulfilled") {
      setTimeout(() => resolve(delay), delay);
    } else {
      setTimeout(() => reject(delay), delay);
    }
  });

  notificationPromise.then((delay) => {
    iziToast.success({
      title: '✅',
      message: `Fulfilled promise in ${delay}ms`,
      messageColor: '#FFFFFF',
      backgroundColor: '#59A10D',
      icon: '',
      close: false,
      position: 'topRight',
});
  }).catch((delay) => {
     iziToast.success({
       title: '❌',
       message: `Rejected promise in ${delay}ms`,
       messageColor: '#FFFFFF',
       backgroundColor: '#B51B1B',
       icon: '',
       close: false,
       position: 'topRight',
});
  });
});
