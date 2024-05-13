const scheduleData = `[
    {
        "name": "Йога",
        "time": "10:00",
        "max": 15,
        "current": 10
    },
    {
        "name": "Силовая тренировка",
        "time": "12:00",
        "max": 20,
        "current": 18
    },
    {
        "name": "Плавание",
        "time": "14:00",
        "max": 10,
        "current": 5
    },
    {
        "name": "Танцы",
        "time": "16:00",
        "max": 15,
        "current": 12
    }
]`;

const schedule = JSON.parse(scheduleData);

const scheduleElement = document.getElementById("schedule");

schedule.forEach(lesson => {
    const lessonElement = document.createElement("div");
    lessonElement.classList.add("lesson");

    const nameElement = document.createElement("h2");
    nameElement.textContent = lesson.name;
    lessonElement.appendChild(nameElement);

    const timeElement = document.createElement("p");
    timeElement.textContent = `Время: ${lesson.time}`;
    lessonElement.appendChild(timeElement);

    const maxElement = document.createElement("p");
    maxElement.textContent = `Макс. участников: ${lesson.max}`;
    lessonElement.appendChild(maxElement);

    const currentElement = document.createElement("p");
    currentElement.textContent = `Текущее количество: ${lesson.current}`;
    lessonElement.appendChild(currentElement);

    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Записаться";
    buttonElement.addEventListener("click", () => {
        if (lesson.current < lesson.max) {
            lesson.current++;
            currentElement.textContent = `Текущее количество: ${lesson.current}`;
            if (lesson.current === lesson.max) {
                buttonElement.disabled = true;
                cancelButtonElement.disabled = false;
            }
            updateSchedule(lesson); // Обновление данных в реальном времени
        } else {
            alert("Максимальное количество участников уже достигнуто.");
        }
    });
    lessonElement.appendChild(buttonElement);

    const cancelButtonElement = document.createElement("button");
    cancelButtonElement.textContent = "Отменить запись";
    cancelButtonElement.disabled = true;
    cancelButtonElement.addEventListener("click", () => {
        if (lesson.current > 0) {
            lesson.current--;
            currentElement.textContent = `Текущее количество: ${lesson.current}`;
            if (lesson.current < lesson.max) {
                buttonElement.disabled = false;
                cancelButtonElement.disabled = true;
            }
            updateSchedule(lesson); // Обновление данных в реальном времени
        } else {
            alert("Запись на занятие отсутствует.");
        }
    });
    lessonElement.appendChild(cancelButtonElement);

    scheduleElement.appendChild(lessonElement);
});

function updateSchedule(updatedLesson) {
    const lessonIndex = schedule.findIndex(lesson => lesson.name === updatedLesson.name);
    if (lessonIndex !== -1) {
        schedule[lessonIndex] = updatedLesson;
        const lessonElement = scheduleElement.querySelector(`.lesson h2:contains("${updatedLesson.name}")`).parentElement;
        lessonElement.querySelector("p:last-child").textContent = `Текущее количество: ${updatedLesson.current}`;
        const buttonElement = lessonElement.querySelector("button:first-child");
        const cancelButtonElement = lessonElement.querySelector("button:last-child");
        if (updatedLesson.current === updatedLesson.max) {
            buttonElement.disabled = true;
            cancelButtonElement.disabled = false;
        } else if (updatedLesson.current === 0) {
            buttonElement.disabled = false;
            cancelButtonElement.disabled = true;
        } else {
            buttonElement.disabled = false;
            cancelButtonElement.disabled = false;
        }
    }
}

// Функция для обновления данных на сервере
function updateServer(updatedLesson) {
    // Реализуйте здесь логику отправки запроса на сервер
    // для обновления данных о занятии
    console.log("Обновление данных на сервере:", updatedLesson);
}

// Вызываем функцию updateServer() после каждого обновления данных
function updateScheduleAndServer(updatedLesson) {
    updateSchedule(updatedLesson);
    updateServer(updatedLesson);
}