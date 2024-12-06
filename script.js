function startCountdown() {
    const targetHour = 19;
    const targetMinute = 50;

    function updateTimer() {
        const now = new Date();
        const target = new Date();
        target.setHours(targetHour, targetMinute, 0, 0);

        if (now > target) {
            // Если текущая дата уже позже 19:50, переключаем на следующий день
            target.setDate(target.getDate() + 1);
        }

        const diff = target - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

startCountdown();

//header
const monthsInKazakh = [
    "қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым",
    "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан"
];
const courseTime = "19:50"; // Время окончания дня курса

const updateDate = () => {
    const now = new Date();
    const utcOffset = 5; // UTC+5
    const localDate = new Date(now.getTime() + utcOffset * 60 * 60 * 1000);

    const hours = localDate.getUTCHours();
    const minutes = localDate.getUTCMinutes();

    if (hours > 19 || (hours === 19 && minutes >= 50)) {
        localDate.setUTCDate(localDate.getUTCDate() + 1);
    }

    const day = localDate.getUTCDate();
    const monthIndex = localDate.getUTCMonth();

    document.querySelector('.day').textContent = day;
    document.querySelector('.month').textContent = monthsInKazakh[monthIndex];
};

setInterval(updateDate, 1000); // Обновляем дату каждую секунду
updateDate(); // Инициализируем сразу


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

// Обработка отправки формы
document.getElementById('promoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const errorElement = document.getElementById('error');
    const successElement = document.getElementById('success');

    // Проверка на пустые поля
    if (!name || !number) {
        errorElement.textContent = "Барлық өрістерді толтырыңыз!";
        errorElement.style.display = 'block';
        setTimeout(() => errorElement.style.display = 'none', 5000); // Скрыть ошибку через 5 секунд
        return;
    }

    // Регулярное выражение для валидации номера
    const phoneRegex = /^8\d{10}$/;
    if (!phoneRegex.test(number)) {
        errorElement.textContent = "Номер форматы: 8xxxxxxxxxx";
        errorElement.style.display = 'block';
        setTimeout(() => errorElement.style.display = 'none', 5000); // Скрыть ошибку через 5 секунд
        return;
    }

    try {
        // Имитируем успешное сохранение
        successElement.textContent = "Тіркелу сәтті өтті! Сізді WhatsApp-қа жібереміз.";
        successElement.style.display = 'block';
        setTimeout(() => {
            window.location.href = "https://chat.whatsapp.com/JK3gdtp8Dyp7WHeqvMObmy";
        }, 2000);

        // Очистить форму
    } catch (e) {
        console.error("Ошибка при добавлении данных: ", e);
        errorElement.textContent = "Произошла ошибка при сохранении данных.";
        errorElement.style.display = 'block';
        setTimeout(() => errorElement.style.display = 'none', 5000); // Скрыть ошибку через 5 секунд
    }
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbzZPRDIvXpGG0qrWP_638WiAJKxe1OjTTb44ox8ZCMuFH1RgU3Dy_bK4QCm-WtVb7tB/exec'
const form = document.getElementById('promoForm');

form.addEventListener('submit', e => {
    e.preventDefault(); // Отключаем стандартную отправку формы

    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
    })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                console.log('Успешно!', data);
                successElement.textContent = "Тіркелу сәтті өтті!";
                successElement.style.display = 'block';
            } else {
                console.error('Ошибка:', data.message);
                errorElement.textContent = data.message;
                errorElement.style.display = 'block';
            }
        })
        .catch(error => console.error('Ошибка!', error.message));
});

