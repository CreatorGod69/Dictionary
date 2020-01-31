const engWord = document.getElementById('eng'), // английское слово
    rusWord = document.getElementById('rus'), // руское слово
    inputs = document.getElementsByClassName('input'), // ввод данных
    addButton = document.getElementById('add-word-btn'), // кнопка
    table = document.getElementById('table'); // в этой таблице будут выводится сохраненные слова

let words, //массив с сохраненными словами
    btnsDelete; //кнопка удаления

/* Если массив не пустой, то локальный сервер превращает JSON в JS. */
localStorage.length < 1 ? words = [] :  words = JSON.parse(localStorage.getItem('words'))

/* Добавдение слов в таблицу */
const addWordToTable = index => {
    table.innerHTML += `
        <tr class="tr">
            <td class ="eng-word">${words[index].english}   -   </td>
            <td class ="rus-word">${words[index].russian} </td>
            <td>
                <button class="btn-delete"></button>
            </td>
        </tr>
    `
}

words.forEach((element, i) => {
    addWordToTable(i);
});

/* В эта функциия помогает проверяеть какой язык ввел пользователь. */
var isCyrillic = function (text) {
    return /[а-я]/i.test(text);
}

/*
Функиция коструктор для создания слов.
Данная фанкция создаст такой объект -
 
const words = {
    english: '',
    russian: ''
}
*/

function СreateWord (english, russian) {
    this.english = english;
    this.russian = russian;
}

/* Вешаем обработчик событий на кнопку. */
/* Данный код проверяет значения, которые ввел пользователь и
если он корректный, то слово добавляется в массив words. */ 

addButton.addEventListener('click', () => {
    if(
        engWord.value.length < 1 || 
        rusWord.value.length < 1 ||
        !isNaN(engWord.value) ||
        !isNaN(rusWord.value)
    ) {
        for(let key of inputs) {
            key.classList.add('error');
        }
    } else {
        for(let key of inputs) {
            key.classList.remove('error');
        }
        words.push(new СreateWord(engWord.value, rusWord.value));
        /* Обращаемся к локальному хранилищу браузера. */
        localStorage.setItem('words', JSON.stringify(words));
        addWordToTable(words.length -1);
        engWord.value = null;
        rusWord.value = null;
        addEventDelete();
    }
});

/* Удаление элемента */
const deleteWord = e => {
    const rowIndex = e.target.parentNode.parentNode.rowIndex;
    e.target.parentNode.parentNode.parentNode.remove();
    words.splice(rowIndex, 1);
    localStorage.removeItem('words');
    localStorage.setItem('words', JSON.stringify(words));
}

/* Код для удаления слов */
const addEventDelete = () => {
    if(words.length > 0) {
        btnsDelete = document.querySelectorAll('.btn-delete');
        for(let btn of btnsDelete) {
            btn.addEventListener('click', e => {
                deleteWord(e);
            })
        }

    }
}

addEventDelete();