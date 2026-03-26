const TODOS_API = "https://jsonplaceholder.typicode.com/todos";

async function loadTodos() {
    const listEl = document.getElementById('todos-list');
    const stateEl = document.getElementById('todos-state');

    listEl.innerHTML = '<div class="loading-spinner">⏳ Загрузка задач...</div>';
    stateEl.innerHTML = '';
    
    try {
        const response = await fetch(`${TODOS_API}?_limit=3`);
        if (!response.ok) throw new Error('Ошибка загрузки');
        const todos = await response.json();
        
        renderTodos(todos);
        showResult('todos', `✅ Загружено ${todos.length} задач`, false);
    } catch (error) {
        listEl.innerHTML = '<div class="error-state">❌ Не удалось загрузить задачи</div>';
        showResult('todos', `❌ Ошибка: ${error.message}`, true);
    }
}

function renderTodos(todos) {
    const listEl = document.getElementById('todos-list');
    if (todos.length === 0) {
        listEl.innerHTML = '<div class="empty-state">✨ Нет задач для отображения</div>';
        return;
    }
    
    const html = todos.map(todo => `
        <div class="todo-item">
            <div class="todo-status ${todo.completed ? 'completed' : 'pending'}">
                ${todo.completed ? '✅' : '⭕'}
            </div>
            <div class="todo-title">${escapeHtml(todo.title)}</div>
            <div class="todo-id">ID: ${todo.id}</div>
        </div>
    `).join('');
    
    listEl.innerHTML = html;
}

async function createTodoAPI(title, completed) {
    if (!title) {
        showResult('todos', '❌ Введите название задачи', true);
        return;
    }
    
    const resultEl = document.getElementById('todos-result');
    resultEl.innerHTML = '⏳ Отправка POST-запроса...';
    resultEl.style.background = '#fef9c3';
    
    try {
        const response = await fetch(TODOS_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, completed: completed || false, userId: 1 })
        });
        
        if (!response.ok) throw new Error('Ошибка создания');
        const result = await response.json();
        showResult('todos', `✅ POST успешен! Создана задача "${title}" (ID: ${result.id})`, false);
        loadTodos();
        document.getElementById('create-todo-form').reset();
    } catch (error) {
        showResult('todos', `❌ Ошибка: ${error.message}`, true);
    }
}

async function updateTodoAPI(id, title, completed) {
    if (!id || !title) {
        showResult('todos', '❌ Введите ID и название задачи', true);
        return;
    }
    
    const resultEl = document.getElementById('todos-result');
    resultEl.innerHTML = '⏳ Отправка PUT-запроса...';
    resultEl.style.background = '#fef9c3';
    
    try {
        const response = await fetch(`${TODOS_API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, title, completed: completed || false, userId: 1 })
        });
        
        if (!response.ok) throw new Error('Ошибка обновления');
        await response.json();
        showResult('todos', `✅ PUT успешен! Задача #${id} обновлена`, false);
        loadTodos();
        document.getElementById('update-todo-form').reset();
    } catch (error) {
        showResult('todos', `❌ Ошибка: ${error.message}`, true);
    }
}

async function deleteTodoAPI(id) {
    if (!id) {
        showResult('todos', '❌ Введите ID задачи', true);
        return;
    }
    
    const resultEl = document.getElementById('todos-result');
    resultEl.innerHTML = '⏳ Отправка DELETE-запроса...';
    resultEl.style.background = '#fef9c3';
    
    try {
        const response = await fetch(`${TODOS_API}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Ошибка удаления');
        showResult('todos', `✅ DELETE успешен! Задача #${id} удалена`, false);
        loadTodos();
        document.getElementById('delete-todo-form').reset();
    } catch (error) {
        showResult('todos', `❌ Ошибка: ${error.message}`, true);
    }
}

const USERS_API = "https://jsonplaceholder.typicode.com/users";

async function loadUsers() {
    const listEl = document.getElementById('users-list');
    const stateEl = document.getElementById('users-state');

    listEl.innerHTML = '<div class="loading-spinner">⏳ Загрузка пользователей...</div>';
    stateEl.innerHTML = '';
    
    try {
        const response = await fetch(USERS_API);
        if (!response.ok) throw new Error('Ошибка загрузки');
        const users = await response.json();
        
        renderUsers(users);
        showResult('users', `✅ Загружено ${users.length} пользователей`, false);
    } catch (error) {
        listEl.innerHTML = '<div class="error-state">❌ Не удалось загрузить пользователей</div>';
        showResult('users', `❌ Ошибка: ${error.message}`, true);
    }
}

function renderUsers(users) {
    const listEl = document.getElementById('users-list');
    if (users.length === 0) {
        listEl.innerHTML = '<div class="empty-state">👤 Нет пользователей для отображения</div>';
        return;
    }
    
    const html = users.map(user => `
        <div class="user-card">
            <div class="user-name">👤 ${escapeHtml(user.name)}</div>
            <div class="user-info">📧 ${escapeHtml(user.email)}</div>
            <div class="user-info">📱 ${escapeHtml(user.phone)}</div>
            <div class="user-info">🏢 ${escapeHtml(user.company?.name || '—')}</div>
            <div class="user-info">📍 ${escapeHtml(user.address?.city || '—')}</div>
            <div class="user-id">ID: ${user.id}</div>
        </div>
    `).join('');
    
    listEl.innerHTML = html;
}

async function createUserAPI(name, email, phone) {
    if (!name || !email) {
        showResult('users', '❌ Введите имя и email', true);
        return;
    }
    
    const resultEl = document.getElementById('users-result');
    resultEl.innerHTML = '⏳ Отправка POST-запроса...';
    resultEl.style.background = '#fef9c3';
    
    try {
        const response = await fetch(USERS_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone: phone || "+7 999 123-45-67" })
        });
        
        if (!response.ok) throw new Error('Ошибка создания');
        const result = await response.json();
        showResult('users', `✅ POST успешен! Создан пользователь "${name}" (ID: ${result.id})`, false);
        loadUsers();
        document.getElementById('create-user-form').reset();
    } catch (error) {
        showResult('users', `❌ Ошибка: ${error.message}`, true);
    }
}

async function updateUserAPI(id, name, email) {
    if (!id || !name) {
        showResult('users', '❌ Введите ID и имя', true);
        return;
    }
    
    const resultEl = document.getElementById('users-result');
    resultEl.innerHTML = '⏳ Отправка PUT-запроса...';
    resultEl.style.background = '#fef9c3';
    
    try {
        const response = await fetch(`${USERS_API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name, email })
        });
        
        if (!response.ok) throw new Error('Ошибка обновления');
        await response.json();
        showResult('users', `✅ PUT успешен! Пользователь #${id} обновлён`, false);
        loadUsers();
        document.getElementById('update-user-form').reset();
    } catch (error) {
        showResult('users', `❌ Ошибка: ${error.message}`, true);
    }
}

async function deleteUserAPI(id) {
    if (!id) {
        showResult('users', '❌ Введите ID пользователя', true);
        return;
    }
    
    const resultEl = document.getElementById('users-result');
    
    resultEl.innerHTML = '⏳ Отправка DELETE-запроса...';
    resultEl.style.background = '#fef9c3';
    
    try {
        const response = await fetch(`${USERS_API}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Ошибка удаления');
        showResult('users', `✅ DELETE успешен! Пользователь #${id} удалён`, false);
        loadUsers();
        document.getElementById('delete-user-form').reset();
    } catch (error) {
        showResult('users', `❌ Ошибка: ${error.message}`, true);
    }
}

const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

const cities = [
    { name: "Москва", lat: 55.7558, lon: 37.6176 },
    { name: "Санкт-Петербург", lat: 59.9343, lon: 30.3351 },
    { name: "Казань", lat: 55.7961, lon: 49.1064 },
    { name: "Новосибирск", lat: 55.0084, lon: 82.9357 },
    { name: "Екатеринбург", lat: 56.8389, lon: 60.6057 },
    { name: "Сочи", lat: 43.5855, lon: 39.7231 }
];

async function loadWeather(cityName, lat, lon) {
    const resultEl = document.getElementById('weather-info');
    const stateEl = document.getElementById('weather-state');

    resultEl.innerHTML = '<div class="loading-spinner">⏳ Загрузка погоды...</div>';
    stateEl.innerHTML = '';
    
    try {
        const url = `${WEATHER_API}?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m&timezone=auto`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ошибка загрузки');
        const data = await response.json();
        
        renderWeather(cityName, data);
        showResult('weather', `✅ Погода в ${cityName} загружена`, false);
    } catch (error) {
        resultEl.innerHTML = '<div class="error-state">❌ Не удалось загрузить погоду</div>';
        showResult('weather', `❌ Ошибка: ${error.message}`, true);
    }
}

function renderWeather(cityName, data) {
    const resultEl = document.getElementById('weather-info');
    
    const temp = data.current?.temperature_2m;
    const wind = data.current?.wind_speed_10m;
    const humidity = data.current?.relative_humidity_2m;
    
    let weatherIcon = "☀️";
    if (temp < -10) weatherIcon = "❄️";
    else if (temp < 0) weatherIcon = "❄️";
    else if (temp < 10) weatherIcon = "🌥️";
    else if (temp < 20) weatherIcon = "🌤️";
    else if (temp < 30) weatherIcon = "☀️";
    else weatherIcon = "🔥";
    
    resultEl.innerHTML = `
        <div class="weather-card">
            <div class="weather-city">${weatherIcon} ${escapeHtml(cityName)}</div>
            <div class="weather-temp">${temp !== undefined ? temp + '°C' : '—'}</div>
            <div class="weather-details">
                <div>💨 Ветер: ${wind !== undefined ? wind + ' км/ч' : '—'}</div>
                <div>💧 Влажность: ${humidity !== undefined ? humidity + '%' : '—'}</div>
            </div>
        </div>
    `;
}

function showResult(elementId, message, isError = false) {
    const resultEl = document.getElementById(`${elementId}-result`);
    if (resultEl) {
        resultEl.innerHTML = message;
        resultEl.style.background = isError ? '#fee2e2' : '#dcfce7';
        resultEl.style.borderLeft = `4px solid ${isError ? '#ef4444' : '#10b981'}`;
        setTimeout(() => {
            if (resultEl.innerHTML === message) {
                resultEl.style.background = '#f8fafc';
                resultEl.style.borderLeft = '4px solid #2563eb';
            }
        }, 3000);
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function switchPanel(apiId) {
    document.querySelectorAll('.panel').forEach(panel => {
        panel.classList.remove('active-panel');
    });
    document.getElementById(`${apiId}-panel`).classList.add('active-panel');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.dataset.api === apiId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    if (apiId === 'todos') loadTodos();
    if (apiId === 'users') loadUsers();
}

window.deleteTodoAPI = deleteTodoAPI;
window.deleteUserAPI = deleteUserAPI;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchPanel(btn.dataset.api));
    });
    document.getElementById('load-todos')?.addEventListener('click', loadTodos);
    document.getElementById('create-todo-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        createTodoAPI(
            document.getElementById('todo-title').value,
            document.getElementById('todo-completed').checked
        );
    });
    document.getElementById('update-todo-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        updateTodoAPI(
            document.getElementById('update-todo-id').value,
            document.getElementById('update-todo-title').value,
            document.getElementById('update-todo-completed').checked
        );
    });
    document.getElementById('delete-todo-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        deleteTodoAPI(document.getElementById('delete-todo-id').value);
    });

    document.getElementById('load-users')?.addEventListener('click', loadUsers);
    document.getElementById('create-user-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        createUserAPI(
            document.getElementById('user-name').value,
            document.getElementById('user-email').value,
            document.getElementById('user-phone').value
        );
    });
    document.getElementById('update-user-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        updateUserAPI(
            document.getElementById('update-user-id').value,
            document.getElementById('update-user-name').value,
            document.getElementById('update-user-email').value
        );
    });
    document.getElementById('delete-user-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        deleteUserAPI(document.getElementById('delete-user-id').value);
    });
    
    const citySelect = document.getElementById('weather-city');
    if (citySelect) {
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = `${city.lat},${city.lon},${city.name}`;
            option.textContent = city.name;
            citySelect.appendChild(option);
        });
        
        document.getElementById('load-weather')?.addEventListener('click', () => {
            const selected = citySelect.value;
            if (selected) {
                const [lat, lon, name] = selected.split(',');
                loadWeather(name, parseFloat(lat), parseFloat(lon));
            }
        });
    }
    
    switchPanel('todos');
});