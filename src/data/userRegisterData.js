let userRegisterData = [];

// Получение данных из localStorage при инициализации
const storedData = localStorage.getItem("userRegisterData");
if (storedData) {
    userRegisterData = JSON.parse(storedData); // если данные есть, загрузим их
}

// Функция для добавления нового пользователя
const addUserData = (newData) => {
    userRegisterData.push(newData);
    localStorage.setItem("userRegisterData", JSON.stringify(userRegisterData)); // Обновляем данные в localStorage
};

// Функция для получения всех данных пользователей
const getUserRegisterData = () => {
    return userRegisterData;
};

// Экспортируем функции
export { addUserData, getUserRegisterData };