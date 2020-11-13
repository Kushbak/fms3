// Обязательное поле
export const required = (value) => {
    if (value) return undefined

    return 'Обязательное поле'
}

// Для установления максимального кол-ва символов
export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength) return `Максимальное количество ${maxLength} символов`

    return undefined
}

// Для установления минимального кол-ва символов 
export const minLengthCreator = (minLength) => (value) => {
    if (value && value.length < minLength) return `Минимальное количество ${minLength} символов`

    return undefined
}

// Только латинские буквы и цифры
export const latinLetters = (value) => {  
    if (/[^a-z 0-9]/ig.test(value)) return 'Только латинские буквы'  
}

// Только кириллические буквы и цифры
export const cirillicLetters = (value) => { 
    if (/[^а-яё 0-9]/ig.test(value)) return 'Только кириллические буквы' 
}
 
// Валидация электронной почты
export const emailValid = (value) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) && !!value) {
        return 'Неправильо введен email'
    }
}

// Проверка на идентичность поле "Пароль" и "Подтвердить пароль" 
export const regMatchInput = (input, allInputs) => input === allInputs.password ? undefined : 'Пароль не совпадает'

// Проверка на правильность введения старого пароля
export const checkOldPass = (oldPassword) => (value) => {
    if (value !== oldPassword) return `Неправильно введен пароль`

    return undefined
} 

// Проверка нового пароля на совпадаение со старым
export const newCannotBeOld = (input, allInputs) => input !== allInputs.oldPassword ? undefined : 'Новый пароль не может совпадать со старым'