function startCountdown() {
    const targetHour = 20; // Час целевого времени
    const targetMinute = 0; // Минуты целевого времени

    function updateTimer() {
        const now = new Date();
        const target = new Date();

        // Устанавливаем целевое время
        target.setHours(targetHour, targetMinute, 0, 0);

        // Если текущее время позже 20:00, переключаемся на следующий день
        if (now > target) {
            target.setDate(target.getDate() + 1);
        }

        const diff = target - now; // Разница в миллисекундах
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Обновляем DOM
        document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
    }

    // Инициализация таймера
    updateTimer();
    setInterval(updateTimer, 1000); // Обновляем каждую секунду
}

startCountdown();

// Дата и месяц в заголовке
const monthsInKazakh = [
    "қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым",
    "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан"
];

function updateDate() {
    const now = new Date();
    const utcOffset = 5; // UTC+5
    const localDate = new Date(now.getTime() + utcOffset * 60 * 60 * 1000);

    const day = localDate.getUTCDate();
    const monthIndex = localDate.getUTCMonth();

    // Обновляем элементы DOM с датой и месяцем
    document.querySelector('.day').textContent = day;
    document.querySelector('.month').textContent = monthsInKazakh[monthIndex];
}

// Обновляем дату каждую секунду
setInterval(updateDate, 1000);
updateDate();


//promo
function openModal() {
    document.getElementById('modal').style.display = 'flex';
}

// Закрытие модального окна
function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    document.getElementById('success').style.display = 'none';
}
// Маска для номера телефона
document.getElementById('number').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ""); // Удаляем все нечисловые символы

    // Ограничиваем длину до 11 символов
    if (value.length > 11) {
        value = value.substring(0, 11);
    }

    // Форматируем номер: "8 747 777 7777"
    if (value.length > 1) {
        value = value[0] + " " + value.substring(1);
    }
    if (value.length > 5) {
        value = value.substring(0, 5) + " " + value.substring(5);
    }
    if (value.length > 9) {
        value = value.substring(0, 9) + " " + value.substring(9);
    }

    // Устанавливаем отформатированное значение
    e.target.value = value;
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbyS2BIDsubytv0e3sIX3XyWctYaDSVqDkHsmc2aTpMFjkS5euGXRjybatzw5ayTONnw/exec'; // Замените на ваш URL Web App
const form = document.getElementById('promoForm');

// Обработчик отправки формы
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Отключаем стандартную отправку формы

    const name = document.getElementById('name').value.trim();
    let number = document.getElementById('number').value.replace(/\D/g, ""); // Удаляем все нечисловые символы
    const errorElement = document.getElementById('error');
    const successElement = document.getElementById('success');
    const loadingElement = document.getElementById('loading');

    errorElement.style.display = 'none';
    successElement.style.display = 'none';

    // Проверка ввода
    if (!name || !number) {
        errorElement.textContent = "Барлық өрістерді толтырыңыз!";
        errorElement.style.display = 'block';
        return;
    }

    if (number.length !== 11 || !number.startsWith("8")) {
        errorElement.textContent = "Нөмеріңізді дұрыс жазуды сұраймыз! (8 777 777 77 77)";
        errorElement.style.display = 'block';
        return;
    }

    // Показать индикатор загрузки
    loadingElement.style.display = 'block';

    // Подготовка данных для отправки
    const formData = new URLSearchParams(new FormData(form)).toString(); // Форматируем данные в application/x-www-form-urlencoded

    fetch(scriptURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP ақауы: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            loadingElement.style.display = 'none';

            if (data.result === 'success') {
                successElement.textContent = "Тіркелу сәтті өтті! Сізді WhatsApp-қа аударудамыз";
                successElement.style.display = 'block';
                setTimeout(() => {
                    window.location.href = "https://chat.whatsapp.com/JK3gdtp8Dyp7WHeqvMObmy";
                }, 1000);
                form.reset(); // Очистка формы
            } else {
                throw new Error(data.message || "Серверде қателік орын алды");
            }
        })
        .catch((error) => {
            loadingElement.style.display = 'none';
            errorElement.textContent = `Қателік: ${error.message}`;
            errorElement.style.display = 'block';
        });
});





