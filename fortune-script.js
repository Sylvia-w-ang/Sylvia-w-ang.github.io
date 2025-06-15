   document.addEventListener('DOMContentLoaded', function() {
       const form = document.querySelector('form');
       const resultBox = document.querySelector('.result-box');

       form.addEventListener('submit', async function(e) {
           e.preventDefault();
           
           const name = document.getElementById('name').value;
           const birthday = document.getElementById('birthday').value;
           const color = document.getElementById('color').value;

           if (!name || !birthday || !color) {
               resultBox.innerHTML = '<p style="color: #ff4444;">Please fill in all fields</p>';
               return;
           }

           resultBox.innerHTML = '<p>Getting your fortune...</p>';

           try {
               // Replace this with your Render URL
               const response = await fetch('https://fortune-teller-imhi.onrender.com', {
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

               const data = await response.json();
               
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
               resultBox.innerHTML = '<p style="color: #ff4444;">Sorry, something went wrong. Please try again!</p>';
           }
       });
   });
