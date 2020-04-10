
// provide setAttribute multiple attributes
export function setMultipleAttr(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key])
  }
}

export function timer(el) {
  const timer = {};
  
  timer.amount = 31;
  if (timer.amount > 0) {
    timer.ticker = setInterval(() => {
      timer.amount --;

      if (timer.amount <= 0) {
        clearInterval(timer.amount);
        timer.amount = 0;
        document.body.style.pointerEvents = 'none';
      }

      let secs = timer.amount;
      let mins = Math.floor(secs / 60);
      secs -= mins * 60;

      el.textContent = `${secs}`;


    }, 1000);
  }
}

