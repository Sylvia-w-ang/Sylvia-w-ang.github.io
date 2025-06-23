document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('fortune-form');
    const resultBox = document.getElementById('fortune-response');

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
            const color = colorInput.value; // Direct color name from dropdown

            // Debug logging
            console.log('Selected color:', color);

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
                resultBox.innerHTML = fortune;
                
                // Track fortune telling event in Google Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'fortune_telling', {
                        'event_category': 'engagement',
                        'event_label': color,
                        'value': luckyNumber
                    });
                }
            }, 600);
        });
    }

    // Local fortune-telling function
    function getLocalFortune(name, birthday, color) {
        // Calculate a lucky number based on name
        const luckyNumber = name.split('').reduce((sum, c) => sum + c.charCodeAt(0), 0) % 9 + 1;
        
        // Create a more personalized spirit animal selection
        const nameSum = name.split('').reduce((sum, c) => sum + c.charCodeAt(0), 0);
        const birthdaySum = birthday.split('').reduce((sum, c) => sum + (parseInt(c) || 0), 0);
        const colorValue = color.length;
        
        // Combine all factors for more personalized spirit animal
        const totalValue = (nameSum + birthdaySum + colorValue) % 9;
        const finalSpiritNumber = totalValue === 0 ? 9 : totalValue;
        
        // Spirit animal based on personalized calculation
        const spiritAnimals = {
            1: { animal: 'Wolf', emoji: '🐺', title: 'PACK LEADER', meaning: 'Leadership and strong instincts guide your path. Trust your gut feelings and lead with confidence. Your natural authority draws others to follow your vision.' },
            2: { animal: 'Owl', emoji: '🦉', title: 'WISE SAGE', meaning: 'Wisdom and intuition are your greatest allies. Your deep insights help you see through deception. Share your knowledge with others who seek guidance.' },
            3: { animal: 'Butterfly', emoji: '🦋', title: 'TRANSFORMER', meaning: 'Transformation and change bring new opportunities. Embrace the beautiful evolution happening in your life. Your adaptability is your superpower.' },
            4: { animal: 'Bear', emoji: '🐻', title: 'PROTECTOR', meaning: 'Strength and protection surround your journey. Your steady presence provides comfort to others. Stand firm in your convictions and defend what matters.' },
            5: { animal: 'Eagle', emoji: '🦅', title: 'VISIONARY', meaning: 'Vision and freedom lift you to new heights. Your perspective sees the bigger picture. Soar above challenges and inspire others with your clarity.' },
            6: { animal: 'Dolphin', emoji: '🐬', title: 'JOY BRINGER', meaning: 'Joy and emotional intelligence flow through you. Your playful spirit brightens everyone\'s day. Connect with others through laughter and empathy.' },
            7: { animal: 'Lion', emoji: '🦁', title: 'COURAGEOUS HEART', meaning: 'Courage and inner strength lead your way. Your bravery inspires others to face their fears. Roar with confidence and claim your power.' },
            8: { animal: 'Fox', emoji: '🦊', title: 'CLEVER ADAPTER', meaning: 'Adaptability and cleverness serve you well. Your quick thinking helps you navigate any situation. Trust your instincts and stay one step ahead.' },
            9: { animal: 'Deer', emoji: '🦌', title: 'GENTLE GRACE', meaning: 'Gentleness and grace guide your interactions. Your peaceful nature creates harmony around you. Move through life with elegance and kindness.' }
        };
        
        const spiritAnimal = spiritAnimals[finalSpiritNumber];
        
        // Color meaning (English) - Enhanced with more distinct responses
        const colorMeaning = {
            'red': '🔥 FIRE ENERGY: Your passion burns bright! Take bold action today and trust your instincts. Great day for starting new projects or expressing your creativity.',
            'blue': '🌊 WATER WISDOM: Your mind is clear and focused. Perfect time for deep thinking, planning, or having important conversations. Trust your logical side.',
            'green': '🌱 GROWTH POWER: New opportunities are sprouting around you! Embrace change and try something you\'ve never done before. Nature will guide you.',
            'yellow': '☀️ SUNSHINE VIBES: Your positive energy is contagious! Spread joy to others and make new connections. Your optimism will attract good things.',
            'purple': '✨ MYSTICAL MAGIC: Your intuition is extra strong today. Trust your gut feelings and don\'t be afraid to show your unique personality.',
            'black': '🖤 DEEP WISDOM: Your quiet strength is your superpower. Take time to reflect and learn something new. Your depth will impress others.',
            'white': '🕊️ PURE HEART: Your kindness will make a difference today. Help someone in need and let your gentle spirit shine. Good karma is coming.',
            'orange': '🎨 CREATIVE SPARK: Your imagination is on fire! Express yourself through art, writing, or any creative outlet. Your ideas are valuable.',
            'magenta': '💕 LOVE VIBES: Your heart is open and ready for romance or deep connections. Share your feelings with someone special today.',
            'cyan': '🧘 PEACE FINDER: Your calm energy brings balance to chaos. Take time to relax and recharge. Your peaceful presence helps others.',
            'pink': '💖 SWEET CONNECTIONS: Your caring nature draws people to you. Reach out to friends or family and strengthen your relationships.',
            'brown': '🌳 EARTH STRENGTH: Your practical approach will solve problems today. Stay grounded and focused on what really matters.',
            'teal': '🦋 HARMONY SEEKER: Your balanced energy creates peace around you. Find harmony between work and play, logic and emotion.',
            'gray': '⚖️ WISE BALANCE: Your neutral perspective helps you see all sides. Take time to think before acting. Your wisdom guides you well.'
        };
        
        // Zodiac (English) with emojis and enhanced meanings
        let zodiac = '';
        let zodiacEmoji = '';
        let zodiacTitle = '';
        let zodiacMeaning = '';
        
        if (/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/.test(birthday)) {
            const [mm, dd] = birthday.split('/').map(Number);
            if ((mm === 1 && dd >= 20) || (mm === 2 && dd <= 18)) {
                zodiac = 'Aquarius'; zodiacEmoji = '♒'; zodiacTitle = 'INNOVATIVE REBEL'; 
                zodiacMeaning = 'Your unique perspective breaks conventional boundaries. Think outside the box and embrace your individuality. Your humanitarian spirit inspires positive change.';
            }
            else if ((mm === 2 && dd >= 19) || (mm === 3 && dd <= 20)) {
                zodiac = 'Pisces'; zodiacEmoji = '♓'; zodiacTitle = 'DREAMY MYSTIC'; 
                zodiacMeaning = 'Your intuitive nature connects you to deeper spiritual realms. Trust your dreams and artistic talents. Your compassion heals others\' emotional wounds.';
            }
            else if ((mm === 3 && dd >= 21) || (mm === 4 && dd <= 19)) {
                zodiac = 'Aries'; zodiacEmoji = '♈'; zodiacTitle = 'BOLD PIONEER'; 
                zodiacMeaning = 'Your fiery energy drives you to take action and lead the way. Channel your enthusiasm into new beginnings. Your courage inspires others to follow.';
            }
            else if ((mm === 4 && dd >= 20) || (mm === 5 && dd <= 20)) {
                zodiac = 'Taurus'; zodiacEmoji = '♉'; zodiacTitle = 'STEADFAST BUILDER'; 
                zodiacMeaning = 'Your determination and patience create lasting foundations. Trust in your ability to manifest your desires. Your loyalty and reliability are your greatest strengths.';
            }
            else if ((mm === 5 && dd >= 21) || (mm === 6 && dd <= 20)) {
                zodiac = 'Gemini'; zodiacEmoji = '♊'; zodiacTitle = 'VERSATILE COMMUNICATOR'; 
                zodiacMeaning = 'Your quick wit and adaptability make you a natural connector. Share your knowledge and embrace new experiences. Your curiosity leads to exciting discoveries.';
            }
            else if ((mm === 6 && dd >= 21) || (mm === 7 && dd <= 22)) {
                zodiac = 'Cancer'; zodiacEmoji = '♋'; zodiacTitle = 'NURTURING GUARDIAN'; 
                zodiacMeaning = 'Your emotional intelligence and protective nature create safe spaces for others. Trust your intuition and honor your feelings. Your caring heart is your superpower.';
            }
            else if ((mm === 7 && dd >= 23) || (mm === 8 && dd <= 22)) {
                zodiac = 'Leo'; zodiacEmoji = '♌'; zodiacTitle = 'RADIANT LEADER'; 
                zodiacMeaning = 'Your natural charisma and creativity light up any room. Share your talents generously and inspire others with your confidence. Your warmth attracts loyal friends.';
            }
            else if ((mm === 8 && dd >= 23) || (mm === 9 && dd <= 22)) {
                zodiac = 'Virgo'; zodiacEmoji = '♍'; zodiacTitle = 'PRECISE PERFECTIONIST'; 
                zodiacMeaning = 'Your attention to detail and analytical mind solve complex problems. Use your practical wisdom to help others. Your dedication to excellence is admirable.';
            }
            else if ((mm === 9 && dd >= 23) || (mm === 10 && dd <= 22)) {
                zodiac = 'Libra'; zodiacEmoji = '♎'; zodiacTitle = 'HARMONIOUS DIPLOMAT'; 
                zodiacMeaning = 'Your sense of balance and fairness creates peace in any situation. Trust your judgment and seek beauty in all things. Your grace brings harmony to relationships.';
            }
            else if ((mm === 10 && dd >= 23) || (mm === 11 && dd <= 21)) {
                zodiac = 'Scorpio'; zodiacEmoji = '♏'; zodiacTitle = 'INTENSE TRANSFORMER'; 
                zodiacMeaning = 'Your powerful intuition and emotional depth reveal hidden truths. Embrace transformation and trust your ability to heal. Your passion drives meaningful change.';
            }
            else if ((mm === 11 && dd >= 22) || (mm === 12 && dd <= 21)) {
                zodiac = 'Sagittarius'; zodiacEmoji = '♐'; zodiacTitle = 'ADVENTUROUS EXPLORER'; 
                zodiacMeaning = 'Your optimistic spirit and love of freedom lead you to exciting adventures. Share your wisdom and inspire others to expand their horizons. Your enthusiasm is contagious.';
            }
            else if ((mm === 12 && dd >= 22) || (mm === 1 && dd <= 19)) {
                zodiac = 'Capricorn'; zodiacEmoji = '♑'; zodiacTitle = 'AMBITIOUS ACHIEVER'; 
                zodiacMeaning = 'Your discipline and determination build lasting success. Trust your practical wisdom and climb steadily toward your goals. Your reliability earns deep respect.';
            }
        }
        
        let colorMsg = colorMeaning[color] || 'Today will be a smooth and peaceful day!';
        
        return `<div class="lucky-number">${name}, your lucky number is ${luckyNumber}</div>
                
                <div class="fortune-section">
                    <div class="fortune-title">${spiritAnimal.emoji} SPIRIT ANIMAL</div>
                    <div class="fortune-subtitle">${spiritAnimal.animal} - ${spiritAnimal.title}</div>
                    <div class="fortune-description">${spiritAnimal.meaning}</div>
                </div>
                
                ${zodiac ? `<div class="fortune-section">
                    <div class="fortune-title">${zodiacEmoji} ZODIAC INSIGHT</div>
                    <div class="fortune-subtitle">${zodiac} - ${zodiacTitle}</div>
                    <div class="fortune-description">${zodiacMeaning}</div>
                </div>` : ''}
                
                <div class="fortune-section">
                    <div class="fortune-title">🎨 COLOR GUIDANCE</div>
                    <div class="fortune-description">${colorMsg}</div>
                </div>`;
    }
});
