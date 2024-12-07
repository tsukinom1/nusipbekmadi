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




const scriptURL = 'https://script.google.com/macros/s/AKfycbxMdZRERVaCv4j3MaVahQLZYDuea6ceuvS10J27Mf9iuIJFBbO1YIKIHlKX1mq2fcT4/exec'
const form = document.getElementById('promoForm');

form.addEventListener('submit', e => {
    e.preventDefault(); // Отключаем стандартную отправку формы

    const name = document.getElementById('name').value.trim();
    let number = document.getElementById('number').value.replace(/\D/g, ""); // Удаляем все символы, кроме цифр
    const errorElement = document.getElementById('error');
    const successElement = document.getElementById('success');

    // Проверка на пустые поля
    if (!name || !number) {
        errorElement.textContent = "Барлық өрістерді толтырыңыз!";
        errorElement.style.display = 'block';
        setTimeout(() => errorElement.style.display = 'none', 5000);
        return;
    }

    // Проверка номера: 11 символов и начинается с 8
    if (number.length !== 11 || !number.startsWith("8")) {
        errorElement.textContent = "Нөмеріңізді дұрыс жазуды сұраймыз!";
        errorElement.style.display = 'block';
        setTimeout(() => errorElement.style.display = 'none', 5000);
        return;
    }

    // Отправка данных в Google Sheets
    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
    })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                console.log('Успешно!', data);
                successElement.textContent = "Тіркелу сәтті өтті! Сізді WhatsApp-қа аударудамыз";
                successElement.style.display = 'block';
                setTimeout(() => {
                    window.location.href = "https://chat.whatsapp.com/JK3gdtp8Dyp7WHeqvMObmy";
                }, 2000);
            } else {
                console.error('Ошибка:', data.message);
                errorElement.textContent = data.message || "Произошла ошибка!";
                errorElement.style.display = 'block';
                setTimeout(() => errorElement.style.display = 'none', 5000);
            }
        })
        .catch(error => {
            console.error('Ошибка!', error.message);
            errorElement.textContent = "Произошла ошибка при отправке данных.";
            errorElement.style.display = 'block';
            setTimeout(() => errorElement.style.display = 'none', 5000);
        });
});
