document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('fortune-form');
    const resultBox = document.getElementById('fortune-response');

    // Function to convert hex color to color name
    function getColorName(hexColor) {
        const colors = {
            '#ff0000': 'red',
            '#00ff00': 'green',
            '#0000ff': 'blue',
            '#ffff00': 'yellow',
            '#ff00ff': 'magenta',
            '#00ffff': 'cyan',
            '#ffa500': 'orange',
            '#800080': 'purple',
            '#008000': 'green',
            '#000000': 'black',
            '#ffffff': 'white'
        };
        return colors[hexColor.toLowerCase()] || 'blue';
    }

    // Function to validate birthday format
    function isValidBirthday(birthday) {
        const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
        return regex.test(birthday);
    }

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const birthdayInput = document.getElementById('birthday');
            const colorInput = document.getElementById('color');
            
            const name = nameInput.value.trim();
            const birthday = birthdayInput.value.trim();
            const colorHex = colorInput.value;
            const color = getColorName(colorHex);

            // Validate inputs
            if (!name) {
                resultBox.innerHTML = '<p style="color: #ff4444;">Please enter your name</p>';
                return;
            }

            if (!birthday) {
                resultBox.innerHTML = '<p style="color: #ff4444;">Please enter your birthday</p>';
                return;
            }

            if (!isValidBirthday(birthday)) {
                resultBox.innerHTML = '<p style="color: #ff4444;">Please enter birthday in MM/DD format (e.g., 12/25)</p>';
                return;
            }

            resultBox.innerHTML = '<p>Getting your fortune...</p>';

            // Use local JS fortune logic
            setTimeout(() => {
                const fortune = getLocalFortune(name, birthday, color);
                resultBox.innerHTML = `<p>${fortune}</p>`;
            }, 600);
        });
    }

    // Local fortune-telling function
    function getLocalFortune(name, birthday, color) {
        // Calculate a lucky number based on name
        const luckyNumber = name.split('').reduce((sum, c) => sum + c.charCodeAt(0), 0) % 9 + 1;
        // Color meaning (English)
        const colorMeaning = {
            'red': 'Passionate and energetic. Today is a great day to take initiative!',
            'blue': 'Calm and logical. Good for planning and reflection.',
            'green': 'Full of vitality. Try something new today.',
            'yellow': 'Cheerful and lively. Perfect for making new friends.',
            'purple': 'Mysterious and charming. Show your true self.',
            'black': 'Low-key and steady. A good day for learning.',
            'white': 'Pure and kind. Help others if you can.',
            'orange': 'Creative and imaginative. Let your ideas flow.',
            'magenta': 'Romantic and expressive. Share your feelings.',
            'cyan': 'Fresh and unique. Take time to relax.'
        };
        // Zodiac (English)
        let zodiac = '';
        if (/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/.test(birthday)) {
            const [mm, dd] = birthday.split('/').map(Number);
            if ((mm === 1 && dd >= 20) || (mm === 2 && dd <= 18)) zodiac = 'Aquarius';
            else if ((mm === 2 && dd >= 19) || (mm === 3 && dd <= 20)) zodiac = 'Pisces';
            else if ((mm === 3 && dd >= 21) || (mm === 4 && dd <= 19)) zodiac = 'Aries';
            else if ((mm === 4 && dd >= 20) || (mm === 5 && dd <= 20)) zodiac = 'Taurus';
            else if ((mm === 5 && dd >= 21) || (mm === 6 && dd <= 20)) zodiac = 'Gemini';
            else if ((mm === 6 && dd >= 21) || (mm === 7 && dd <= 22)) zodiac = 'Cancer';
            else if ((mm === 7 && dd >= 23) || (mm === 8 && dd <= 22)) zodiac = 'Leo';
            else if ((mm === 8 && dd >= 23) || (mm === 9 && dd <= 22)) zodiac = 'Virgo';
            else if ((mm === 9 && dd >= 23) || (mm === 10 && dd <= 22)) zodiac = 'Libra';
            else if ((mm === 10 && dd >= 23) || (mm === 11 && dd <= 21)) zodiac = 'Scorpio';
            else if ((mm === 11 && dd >= 22) || (mm === 12 && dd <= 21)) zodiac = 'Sagittarius';
            else if ((mm === 12 && dd >= 22) || (mm === 1 && dd <= 19)) zodiac = 'Capricorn';
                }
        let colorMsg = colorMeaning[color] || 'Today will be a smooth and peaceful day!';
        return `${name}, your lucky number is ${luckyNumber}.<br>Birthday: ${birthday} ${zodiac ? '(' + zodiac + ')' : ''}<br>Color advice: ${colorMsg}`;
    }
});
