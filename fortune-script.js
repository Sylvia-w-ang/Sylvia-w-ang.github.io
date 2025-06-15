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
            
            const name = document.getElementById('name').value.trim();
            const birthday = document.getElementById('birthday').value.trim();
            const colorHex = document.getElementById('color').value;
            const color = getColorName(colorHex);

            console.log('Form submitted with:', { name, birthday, color }); // Debug log

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

            try {
                console.log('Sending request to server...'); // Debug log
                const response = await fetch('https://fortune-teller-imhi.onrender.com/api/fortune', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        birthday: birthday,
                        color: color,
                        hobby: 'creative expression'
                    })
                });

                console.log('Response received:', response); // Debug log
                const data = await response.json();
                console.log('Data:', data); // Debug log
                
                if (data.error) {
                    resultBox.innerHTML = `<p style="color: #ff4444;">${data.error}</p>`;
                } else {
                    const formattedResponse = data.feedback
                        .split('\n')
                        .map(line => `<p>${line}</p>`)
                        .join('');
                    resultBox.innerHTML = formattedResponse;
                }
            } catch (error) {
                console.error('Error:', error); // Debug log
                resultBox.innerHTML = '<p style="color: #ff4444;">Sorry, something went wrong. Please try again!</p>';
            }
        });
    }
});
