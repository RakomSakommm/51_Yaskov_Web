const wordsDatabase = {
    '🐱 Животные': [
        { word: 'КРОКОДИЛ', hint: 'Зелёный, зубастый, в реке живёт' },
        { word: 'БЕГЕМОТ', hint: 'Большой, толстый, в Африке живёт' },
        { word: 'ЖИРАФ', hint: 'Самый высокий на планете' },
        { word: 'НОСОРОГ', hint: 'У него на носу рог' },
        { word: 'ЛЕОПАРД', hint: 'Пятнистый хищник' }
    ],
    '🍎 Фрукты': [
        { word: 'АПЕЛЬСИН', hint: 'Оранжевый, круглый, кисло-сладкий' },
        { word: 'МАНДАРИН', hint: 'Новогодний фрукт' },
        { word: 'ГРАНАТ', hint: 'Внутри красные зёрнышки' },
        { word: 'АНАНАС', hint: 'Колючий снаружи, вкусный внутри' },
        { word: 'КОКОС', hint: 'Молоко внутри, волосатый снаружи' }
    ],
    '🏙️ Города России': [
        { word: 'САНКТПЕТЕРБУРГ', hint: 'Северная столица, Нева' },
        { word: 'ЕКАТЕРИНБУРГ', hint: 'Город на Урале' },
        { word: 'ВЛАДИВОСТОК', hint: 'Дальний Восток, море' },
        { word: 'КАЗАНЬ', hint: 'Столица Татарстана' },
        { word: 'НОВОСИБИРСК', hint: 'Самый большой в Сибири' }
    ],
    '🎬 Фильмы': [
        { word: 'ТЕРМИНАТОР', hint: 'I\'ll be back' },
        { word: 'АВАТАР', hint: 'Синие человечки на другой планете' },
        { word: 'МАТРИЦА', hint: 'Красная или синяя таблетка?' },
        { word: 'ГЛАДИАТОР', hint: 'Рим, Колизей, месть' },
        { word: 'ТИТАНИК', hint: 'Корабль, айсберг, любовь' }
    ],
    '🇷🇺 Русские писатели': [
        { word: 'ПУШКИН', hint: 'Солнце русской поэзии' },
        { word: 'ДОСТОЕВСКИЙ', hint: 'Преступление и наказание' },
        { word: 'ТОЛСТОЙ', hint: 'Война и мир' },
        { word: 'ГОГОЛЬ', hint: 'Мёртвые души, нос' },
        { word: 'ЧЕХОВ', hint: 'Вишнёвый сад, рассказы' }
    ]
};

let currentCategory = '';
let currentWord = '';
let currentHint = '';
let guessedLetters = [];
let attemptsLeft = 7;
let score = 0;
let wordsGuessedInSession = 0;

function chooseCategory() {
    const categories = Object.keys(wordsDatabase);
    let message = '📚 ВЫБЕРИ КАТЕГОРИЮ (введи номер):\n\n';
    
    categories.forEach((cat, index) => {
        message += `${index + 1}. ${cat}\n`;
    });
    
    message += `\n💰 Твой счёт: ${score}`;
    message += `\n📊 Слов отгадано: ${wordsGuessedInSession}`;
    
    let choice;
    while (true) {
        const input = prompt(message);
        if (input === null) {
            const confirmExit = confirm('🛑 Точно хочешь выйти из игры?');
            if (confirmExit) {
                return null;
            }
            continue;
        }
        
        choice = parseInt(input);
        
        if (isNaN(choice)) {
            alert('❌ Ошибка: Введи ЧИСЛО - номер категории!');
            continue;
        }
        
        if (choice < 1 || choice > categories.length) {
            alert(`❌ Ошибка: Введи число от 1 до ${categories.length}`);
            continue;
        }
        
        break;
    }
    
    return categories[choice - 1];
}

function selectRandomWord(category) {
    const words = wordsDatabase[category];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function getWordDisplay() {
    let display = '';
    let allGuessed = true;
    
    for (let char of currentWord) {
        if (guessedLetters.includes(char)) {
            display += char + ' ';
        } else {
            display += '_ ';
            allGuessed = false;
        }
    }
    
    return { display: display.trim(), allGuessed };
}

function checkFullWordGuess(input) {
    const userWord = input.toUpperCase().replace(/\s+/g, '');
    
    if (userWord === currentWord) {
        score += currentWord.length * 20;
        wordsGuessedInSession++;
        
        alert(`🔥 АБСОЛЮТНО ВЕРНО! Ты угадал слово целиком!\n💰 +${currentWord.length * 20} очков!\n🎉 Слово: "${currentWord}"`);
        return true;
    } else {
        attemptsLeft = 0;
        alert(`❌ Неверно! Это не "${input}". Игра окончена.`);
        return false;
    }
}

function startWordGame() {
    alert('🎮 Добро пожаловать в игру "ЭРУДИТ"!\n\nПравила:\n• Выбираешь категорию\n• Я загадываю слово\n• Угадываешь по буквам\n• 7 попыток на слово');
    
    let playing = true;
    
    while (playing) {
        const category = chooseCategory();
        if (!category) {
            playing = false;
            continue;
        }
        
        const wordData = selectRandomWord(category);
        currentWord = wordData.word;
        currentHint = wordData.hint;
        currentCategory = category;
        guessedLetters = [];
        attemptsLeft = 7;
        
        alert(`📖 Категория: ${category}\n💡 Подсказка: ${currentHint}\n\nЗагадано слово из ${currentWord.length} букв.\nУ тебя ${attemptsLeft} попыток!`);
        
        let roundActive = true;
        
        while (roundActive && attemptsLeft > 0) {
            const { display, allGuessed } = getWordDisplay();
            
            if (allGuessed) {
                score += currentWord.length * 10;
                wordsGuessedInSession++;
                
                alert(`🎉 ПОБЕДА! Ты угадал слово "${currentWord}"!\n+${currentWord.length * 10} очков!\n💰 Текущий счёт: ${score}\n📊 Слов отгадано: ${wordsGuessedInSession}`);
                
                roundActive = false;
                break;
            }
            
            let message = 
                `📖 Категория: ${currentCategory}\n` +
                `💡 Подсказка: ${currentHint}\n\n` +
                `🔤 Слово: ${display}\n` +
                `✏️ Угаданные буквы: ${guessedLetters.join(', ') || 'пока нет'}\n` +
                `❤️ Осталось попыток: ${attemptsLeft}\n` +
                `💰 Счёт: ${score}\n\n` +
                `Введи букву (или "выход"):`;
            
            const input = prompt(message);
            
            if (input === null) {
                const confirmExit = confirm('🛑 Точно хочешь выйти из игры?');
                if (confirmExit) {
                    alert(`👋 Игра завершена. Твой счёт: ${score}`);
                    playing = false;
                    roundActive = false;
                    break;
                }
                continue;
            }
            
            const lowerInput = input.toLowerCase().trim();
            
            if (lowerInput === 'выход') {
                const confirmExit = confirm('🛑 Точно хочешь выйти? Твой прогресс сохранится.');
                if (confirmExit) {
                    roundActive = false;
                    break;
                }
                continue;
            }

            if (lowerInput === '') {
                alert('❌ Ошибка: Ты ничего не ввёл!');
                continue;
            }

            if (lowerInput.length > 1) {
                const guessResult = checkFullWordGuess(lowerInput);
                if (guessResult) {
                    roundActive = false;
                    break;
                } else {
                    roundActive = false;
                    break;
                }
            }

            if (!lowerInput.match(/[а-яё]/i)) {
                alert('❌ Ошибка: Введи русскую букву!');
                continue;
            }

            const letter = lowerInput.toUpperCase();

            if (guessedLetters.includes(letter)) {
                alert(`⚠️ Буква "${letter}" уже была! Попробуй другую.`);
                continue;
            }

            if (currentWord.includes(letter)) {
                guessedLetters.push(letter);
                alert(`✅ Есть такая буква!`);
            } else {
                attemptsLeft--;
                alert(`❌ Нет такой буквы! Осталось попыток: ${attemptsLeft}`);
            }
        }
        
        if (attemptsLeft === 0) {
            alert(`😢 Ты не угадал слово. Это было: "${currentWord}"\n💰 Твой счёт: ${score}`);
            
            const playAgain = confirm('🔄 Хочешь попробовать ещё раз?');
            if (!playAgain) {
                playing = false;
            }
        }
        
        if (roundActive === false && attemptsLeft > 0) {
            const continueGame = confirm('🎯 Хочешь отгадать ещё одно слово?');
            if (!continueGame) {
                playing = false;
            }
        }
    }

    alert(`🏁 Игра завершена!\n💰 Итоговый счёт: ${score}\n📊 Слов отгадано: ${wordsGuessedInSession}\n\nСпасибо за игру!`);
    
    const statusElement = document.getElementById('game-status');
    if (statusElement) {
        statusElement.innerHTML = `Статус: Игра завершена. Счёт: ${score} 🎯`;
    }
}

function updateGameStatus(message, isSuccess = true) {
    const statusElement = document.getElementById('game-status');
    if (statusElement) {
        statusElement.innerHTML = `Статус: ${message}`;
        statusElement.style.backgroundColor = isSuccess ? 'rgba(39, 174, 96, 0.2)' : 'rgba(192, 57, 43, 0.2)';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-game-btn');
    const statusElement = document.getElementById('game-status');
    
    if (startButton) {
        startButton.addEventListener('click', function() {
            if (statusElement) {
                statusElement.innerHTML = 'Статус: Игра запущена! Смотри всплывающие окна...';
                statusElement.style.backgroundColor = 'rgba(241, 196, 15, 0.2)';
            }
            startWordGame();
        });
    }
});