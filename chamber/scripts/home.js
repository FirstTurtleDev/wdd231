// ========== WEATHER API ==========
const WEATHER_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
const CITY = 'Santo Domingo Este';
const COUNTRY_CODE = 'DO';

async function getWeatherData() {
    console.log('🌤️ Fetching weather data...');

    // If no API key, use mock data
    if (WEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
        console.warn('⚠️ No API key found, using mock weather data');
        mockWeatherData();
        return;
    }

    try {
        // Get current weather
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY_CODE}&units=metric&appid=${WEATHER_API_KEY}`;
        const currentResponse = await fetch(currentUrl);

        if (!currentResponse.ok) {
            throw new Error('Weather data not available');
        }

        const currentData = await currentResponse.json();
        console.log('✅ Current weather data:', currentData);

        // Get forecast
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY_CODE}&units=metric&appid=${WEATHER_API_KEY}`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        console.log('✅ Forecast data:', forecastData);

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        console.error('❌ Error fetching weather:', error);
        mockWeatherData(); // Fallback to mock data
    }
}

function mockWeatherData() {
    console.log('📊 Using mock weather data');
    document.getElementById('current-temp').textContent = '28°C';
    document.getElementById('current-desc').textContent = 'Partly cloudy';

    const forecastContainer = document.getElementById('forecast');
    const days = ['Tomorrow', 'Day 2', 'Day 3'];
    const temps = [29, 27, 26];
    const descs = ['Sunny', 'Cloudy', 'Light rain'];

    forecastContainer.innerHTML = '';
    days.forEach((day, index) => {
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-day');
        forecastCard.innerHTML = `
            <div class="day-name">${day}</div>
            <div class="day-temp">${temps[index]}°C</div>
            <div class="day-desc">${descs[index]}</div>
        `;
        forecastContainer.appendChild(forecastCard);
    });
}

function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;

    document.getElementById('current-temp').textContent = `${temp}°C`;
    document.getElementById('current-desc').textContent = desc;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';

    // Get one forecast per day (every 8th item = 24 hours)
    const dailyForecasts = [];
    for (let i = 0; i < data.list.length && dailyForecasts.length < 3; i += 8) {
        dailyForecasts.push(data.list[i]);
    }

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        const desc = day.weather[0].description;

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-day');
        forecastCard.innerHTML = `
            <div class="day-name">${dayName}</div>
            <div class="day-temp">${temp}°C</div>
            <div class="day-desc">${desc}</div>
        `;

        forecastContainer.appendChild(forecastCard);
    });
}

// ========== MEMBER SPOTLIGHTS ==========
async function loadSpotlights() {
    console.log('💼 Loading member spotlights...');

    const spotlightsContainer = document.getElementById('spotlights');

    if (!spotlightsContainer) {
        console.error('❌ Spotlights container not found in HTML');
        return;
    }

    try {
        console.log('📡 Fetching members.json from: data/members.json');
        const response = await fetch('data/members.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const members = await response.json();
        console.log('✅ Members data loaded:', members);

        // Filter for gold (3) and silver (2) members only
        const qualifiedMembers = members.filter(member =>
            member.membershipLevel === 2 || member.membershipLevel === 3
        );
        console.log(`✅ Found ${qualifiedMembers.length} Gold/Silver members:`, qualifiedMembers);

        if (qualifiedMembers.length === 0) {
            console.warn('⚠️ No Gold or Silver members found!');
            spotlightsContainer.innerHTML = '<p>No spotlight members available at this time.</p>';
            return;
        }

        // Randomly select 2-3 members
        const numberOfSpotlights = Math.random() < 0.5 ? 2 : 3;
        const selectedMembers = getRandomMembers(qualifiedMembers, numberOfSpotlights);
        console.log(`✅ Selected ${selectedMembers.length} members for spotlight:`, selectedMembers);

        displaySpotlights(selectedMembers);

    } catch (error) {
        console.error('❌ Error loading spotlights:', error);
        console.error('Error details:', error.message);
        spotlightsContainer.innerHTML = `<p style="color: red;">Error: Unable to load member spotlights. Check console for details.</p>`;
    }
}

function getRandomMembers(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displaySpotlights(members) {
    console.log('🎨 Displaying spotlight cards...');
    const spotlightsContainer = document.getElementById('spotlights');
    spotlightsContainer.innerHTML = '';

    members.forEach((member, index) => {
        console.log(`Creating card ${index + 1}:`, member.name, '| Image:', member.image);

        const membershipLevel = member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member';
        const membershipClass = member.membershipLevel === 3 ? 'gold' : 'silver';

        const spotlightCard = document.createElement('div');
        spotlightCard.classList.add('spotlight-member');

        const address = member.address || `${member.name} Location`;
        const websiteDisplay = member.website.replace('https://', '').replace('http://', '');

        spotlightCard.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" class="spotlight-logo" onerror="console.error('❌ Image failed to load:', '${member.image}')">
            <h3>${member.name}</h3>
            <p class="spotlight-tagline">${member.tagline}</p>
            <div class="spotlight-info">
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${websiteDisplay}</a></p>
            </div>
            <span class="membership-badge ${membershipClass}">${membershipLevel}</span>
        `;

        spotlightsContainer.appendChild(spotlightCard);
    });

    console.log(`✅ ${members.length} spotlight cards displayed successfully!`);
}

// ========== INITIALIZE PAGE ==========
console.log('🚀 Initializing page...');

document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM Content Loaded');
    getWeatherData();
    loadSpotlights();
});

console.log('✅ home.js execution complete');