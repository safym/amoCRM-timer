// DOM элементы
const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Константа - максимальное число секунд для таймера (сутки, так как по заданию формат hh:mm:ss)
const MAX_SECONDS = 86400;

// Получить функцию, которая анимирует таймер
const createTimerAnimator = () => {
  let timeoutlId;

  return (seconds) => {
    // Возврат если введенное значение меньше 0, равно 0 или пустое
    if (!seconds) {
      alert("Введите количество секунд больше 0");
      return;
    }

    // Возврат если введенное значение секунд  больше или равно 86400 (больше суток)
    if (seconds >= MAX_SECONDS) {
      alert(
        `Введенное значение таймера больше суток, введите количество секунд меньше ${86400}`
      );
      return;
    }

    // Сбросить таймаут если таймаут уже запущен
    if (timeoutlId) clearTimeout(timeoutlId);

    // Уставновить таймаут с задержкой 0 для мгновенного запуска
    // и запускать вложенные таймауты через секунду для отсчета таймера
    timeoutlId = setTimeout(function tick() {
      timerEl.innerHTML = getFormattedSeconds(seconds);

      timeoutlId = setTimeout(tick, 1000);

      if (seconds === 0) {
        clearTimeout(timeoutlId);
      }

      seconds--;
    }, 0);
  };
};

// Создать анимированный таймер
const animateTimer = createTimerAnimator();

// Добавить EventListener для input
inputEl.addEventListener("input", () => {
  inputEl.value = getOnlyNumber(inputEl.value);
});

// Добавить EventListener для button
buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});

// Получить только числа из строки
const getOnlyNumber = (string) => {
  return string.replace(/[^0-9.]/g, "");
};

// Получить отформатированную строку таймера (формат hh:mm:ss)
const getFormattedSeconds = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds / 60) % 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};
