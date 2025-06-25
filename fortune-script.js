document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('fortune-form');
    const resultBox = document.getElementById('fortune-response');

    // Function to validate birthday format
    function isValidBirthday(birthday) {
        const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
        return regex.test(birthday);
    }

    // Function to validate birth year
    function isValidBirthYear(year) {
        const currentYear = new Date().getFullYear();
        return year >= 1900 && year <= currentYear && year.toString().length === 4;
    }

    // Function to get Chinese zodiac animal
    function getChineseZodiac(year) {
        const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
        const emojis = ['🐀', '🐂', '🐅', '🐇', '🐉', '🐍', '🐎', '🐐', '🐒', '🐓', '🐕', '🐖'];
        const index = (year - 1900) % 12;
        return { animal: animals[index], emoji: emojis[index] };
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const birthdayInput = document.getElementById('birthday');
            const birthyearInput = document.getElementById('birthyear');
            const colorInput = document.getElementById('color');
            const emojiPicker = document.getElementById('emoji-oracle-picker');
            
            const name = nameInput.value.trim();
            const birthday = birthdayInput.value.trim();
            const birthyear = birthyearInput.value.trim();
            const color = colorInput.value; // Direct color name from dropdown
            const emoji = emojiPicker ? emojiPicker.value : '';

            // Debug logging
            console.log('Selected color:', color);
            console.log('Selected emoji:', emoji);

            // Validate inputs
            if (!name) {
                resultBox.innerHTML = '<p style="color: #ff4444; text-shadow: none;">Please enter your name</p>';
                return;
            }

            if (!birthday) {
                resultBox.innerHTML = '<p style="color: #ff4444; text-shadow: none;">Please enter your birthday</p>';
                return;
            }

            if (!isValidBirthday(birthday)) {
                resultBox.innerHTML = '<p style="color: #ff4444; text-shadow: none;">Please enter birthday in MM/DD format (e.g., 12/25)</p>';
                return;
            }

            if (!birthyear) {
                resultBox.innerHTML = '<p style="color: #ff4444; text-shadow: none;">Please enter your birth year</p>';
                return;
            }

            if (!isValidBirthYear(birthyear)) {
                resultBox.innerHTML = '<p style="color: #ff4444; text-shadow: none;">Please enter a valid birth year (1900-present)</p>';
                return;
            }

            if (!emoji) {
                resultBox.innerHTML = '<p style="color: #ff4444; text-shadow: none;">Please select an emoji for the oracle</p>';
                return;
            }

            resultBox.innerHTML = '<p>Getting your fortune...</p>';

            // Use local JS fortune logic
            setTimeout(() => {
                const fortune = getLocalFortune(name, birthday, birthyear, color, emoji);
                resultBox.innerHTML = fortune;
            }, 600);
        });
    }

    // Local fortune-telling function
    function getLocalFortune(name, birthday, birthyear, color, emoji) {
        // Calculate a lucky number based on name
        const luckyNumber = name.split('').reduce((sum, c) => sum + c.charCodeAt(0), 0) % 9 + 1;
        
        // Create a more personalized spirit animal selection
        const nameSum = name.split('').reduce((sum, c) => sum + c.charCodeAt(0), 0);
        const birthdaySum = birthday.split('').reduce((sum, c) => sum + (parseInt(c) || 0), 0);
        const birthyearSum = birthyear.split('').reduce((sum, c) => sum + (parseInt(c) || 0), 0);
        const colorValue = color.length;
        
        // Combine all factors for more personalized spirit animal
        const totalValue = (nameSum + birthdaySum + birthyearSum + colorValue) % 9;
        const finalSpiritNumber = totalValue === 0 ? 9 : totalValue;
        
        // Spirit animal based on personalized calculation
        const spiritAnimals = {
            1: { animal: 'Wolf', emoji: '🐺', title: 'PACK LEADER', meaning: 'You naturally take charge in group situations. Do you agree? Share a time when you stepped up to lead something!' },
            2: { animal: 'Owl', emoji: '🦉', title: 'WISE SAGE', meaning: 'You\'re good at giving advice and seeing through problems. What\'s the best advice you\'ve ever given someone?' },
            3: { animal: 'Butterfly', emoji: '🦋', title: 'TRANSFORMER', meaning: 'You adapt well to change and new situations. Tell us about a big change you handled well!' },
            4: { animal: 'Bear', emoji: '🐻', title: 'PROTECTOR', meaning: 'You look out for others and stand up for what\'s right. Share a time when you protected or defended someone!' },
            5: { animal: 'Eagle', emoji: '🦅', title: 'VISIONARY', meaning: 'You see the big picture and help others understand complex situations. How do you help friends see different perspectives?' },
            6: { animal: 'Dolphin', emoji: '🐬', title: 'JOY BRINGER', meaning: 'You make people laugh and feel happy. What\'s your favorite way to cheer someone up?' },
            7: { animal: 'Lion', emoji: '🦁', title: 'COURAGEOUS HEART', meaning: 'You\'re brave and face challenges head-on. Tell us about a time when you had to be courageous!' },
            8: { animal: 'Fox', emoji: '🦊', title: 'CLEVER ADAPTER', meaning: 'You\'re quick-thinking and good at solving problems. Share a clever solution you came up with!' },
            9: { animal: 'Deer', emoji: '🦌', title: 'GENTLE GRACE', meaning: 'You\'re kind and create harmony in groups. How do you help people get along better?' }
        };
        
        const spiritAnimal = spiritAnimals[finalSpiritNumber];
        
        // Get Chinese zodiac based on birth year
        const chineseZodiac = getChineseZodiac(parseInt(birthyear));
        
        // Chinese zodiac meanings with discussion prompts
        const chineseZodiacMeanings = {
            'Rat': 'You\'re resourceful and quick-witted. How do you handle unexpected challenges? Share a time when you had to think on your feet!',
            'Ox': 'You\'re reliable and determined. What\'s something you\'ve worked hard to achieve? Tell us about your persistence!',
            'Tiger': 'You\'re brave and competitive. What\'s a challenge you faced with courage? Share your boldest moment!',
            'Rabbit': 'You\'re gentle and diplomatic. How do you handle conflicts with friends? Tell us about your peacemaking skills!',
            'Dragon': 'You\'re confident and ambitious. What\'s a big goal you\'re working toward? Share your dreams!',
            'Snake': 'You\'re wise and intuitive. When has your gut feeling been right? Tell us about your instincts!',
            'Horse': 'You\'re energetic and adventurous. What\'s the most exciting thing you\'ve done recently? Share your adventures!',
            'Goat': 'You\'re creative and kind. What\'s your favorite way to express yourself? Tell us about your artistic side!',
            'Monkey': 'You\'re clever and playful. How do you solve problems creatively? Share a clever solution you came up with!',
            'Rooster': 'You\'re organized and confident. What\'s something you\'re really good at? Tell us about your talents!',
            'Dog': 'You\'re loyal and honest. Who\'s someone you\'re always there for? Share about your loyalty!',
            'Pig': 'You\'re generous and optimistic. How do you help others feel better? Tell us about your kindness!'
        };
        
        // Color meaning (English) - Discussion-focused for student engagement
        const colorMeaning = {
            'red': '🔥 FIRE ENERGY: You tend to be passionate and take action quickly. Do you agree? Share a time when your passion drove you to do something amazing!',
            'blue': '🌊 WATER WISDOM: You prefer to think things through before acting. Is this true for you? Tell us about a time when careful planning paid off!',
            'green': '🌱 GROWTH MINDSET: You love trying new things and learning. What\'s something new you\'ve tried recently? Share your experience with the group!',
            'yellow': '☀️ SUNSHINE VIBES: Your positive energy brightens others\' days. How do you cheer up friends when they\'re feeling down?',
            'purple': '✨ MYSTICAL MAGIC: You trust your intuition and have unique perspectives. Share a time when your gut feeling was right!',
            'black': '🖤 DEEP THINKER: You prefer meaningful conversations over small talk. What\'s a topic you love discussing with friends?',
            'white': '🕊️ PURE HEART: You naturally want to help others. Tell us about a time when you helped someone and how it made you feel!',
            'orange': '🎨 CREATIVE SPARK: You love expressing yourself through art, music, or ideas. What\'s your favorite way to be creative?',
            'magenta': '💕 LOVE VIBES: You\'re very caring and value close relationships. Who\'s someone important in your life and why?',
            'cyan': '🧘 PEACE FINDER: You bring calm energy to stressful situations. How do you help others feel more relaxed?',
            'pink': '💖 SWEET CONNECTIONS: You\'re great at making friends and keeping relationships strong. What\'s your secret to being a good friend?',
            'brown': '🌳 EARTH STRENGTH: You\'re practical and reliable. What\'s something you\'re responsible for that others count on you for?',
            'teal': '🦋 HARMONY SEEKER: You help people get along and find balance. Share a time when you helped resolve a conflict!',
            'gray': '⚖️ WISE BALANCE: You see all sides of situations before making decisions. How do you handle difficult choices?'
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
        let chineseZodiacMsg = chineseZodiacMeanings[chineseZodiac.animal];
        
        let fortuneHtml = `<div class="lucky-number">${name}, your lucky number is ${luckyNumber}</div>
                
                <div class="fortune-section">
                    <div class="fortune-title">${spiritAnimal.emoji} SPIRIT ANIMAL</div>
                    <div class="fortune-subtitle">${spiritAnimal.animal} - ${spiritAnimal.title}</div>
                    <div class="fortune-description">${spiritAnimal.meaning}</div>
                </div>
                
                <div class="fortune-section">
                    <div class="fortune-title">${chineseZodiac.emoji} CHINESE ZODIAC</div>
                    <div class="fortune-subtitle">${chineseZodiac.animal} - ${birthyear}</div>
                    <div class="fortune-description">${chineseZodiacMsg}</div>
                </div>
                
                ${zodiac ? `<div class="fortune-section">
                    <div class="fortune-title">${zodiacEmoji} WESTERN ZODIAC</div>
                    <div class="fortune-subtitle">${zodiac} - ${zodiacTitle}</div>
                    <div class="fortune-description">${zodiacMeaning}</div>
                </div>` : ''}
                
                <div class="fortune-section">
                    <div class="fortune-title">🎨 COLOR GUIDANCE</div>
                    <div class="fortune-description">${colorMsg}</div>
                </div>`;
        // Add emoji oracle card if selected
        if (emojiOracleFortunes[emoji]) {
            const f = emojiOracleFortunes[emoji];
            fortuneHtml += `<div class=\"fortune-section\">
                <div class=\"fortune-title\">${emoji} ${f.title}</div>
                <div class=\"fortune-description\">${f.fortune}</div>
                <div class=\"fortune-description\" style=\"margin-top:0.5rem;\">${f.prompt}</div>
            </div>`;
        }
        return fortuneHtml;
    }

    // Emoji Oracle logic
    const emojiOracleFortunes = {
        "🌈": {
            title: "Rainbow",
            fortune: "You bring color and hope to every group!",
            prompt: "What's something that always brightens your day?"
        },
        "🎨": {
            title: "Palette",
            fortune: "You're creative and love expressing yourself.",
            prompt: "What's your favorite way to be creative?"
        },
        "🎲": {
            title: "Dice",
            fortune: "You're adventurous and love surprises.",
            prompt: "What's the most spontaneous thing you've ever done?"
        },
        "🎈": {
            title: "Balloon",
            fortune: "You lift others' spirits.",
            prompt: "What's a small thing that makes you happy?"
        },
        "🧩": {
            title: "Puzzle Piece",
            fortune: "You're a problem solver and love challenges.",
            prompt: "What's a puzzle or riddle you've solved recently?"
        },
        "📚": {
            title: "Books",
            fortune: "You love stories and learning new things.",
            prompt: "What's a book or story you'd recommend?"
        },
        "🏖️": {
            title: "Beach",
            fortune: "You know how to relax and enjoy the moment.",
            prompt: "What's your dream vacation spot?"
        },
        "🕹️": {
            title: "Joystick",
            fortune: "You're playful and love games.",
            prompt: "What's your favorite game to play with friends?"
        },
        "🧭": {
            title: "Compass",
            fortune: "You help others find their way.",
            prompt: "What's a good piece of advice you've received?"
        },
        "🎤": {
            title: "Microphone",
            fortune: "You have a voice that should be heard.",
            prompt: "What's a song you love to sing or listen to?"
        },
        "🧁": {
            title: "Cupcake",
            fortune: "You make life sweeter for those around you.",
            prompt: "What's your favorite treat?"
        },
        "🪁": {
            title: "Kite",
            fortune: "You're free-spirited and love the outdoors.",
            prompt: "What's your favorite outdoor activity?"
        },
        "🕯️": {
            title: "Candle",
            fortune: "You bring warmth and light to others.",
            prompt: "What's something that makes you feel cozy?"
        },
        "🧳": {
            title: "Suitcase",
            fortune: "You're always ready for a new adventure.",
            prompt: "Where would you travel if you could go anywhere?"
        },
        "🧦": {
            title: "Socks",
            fortune: "You're quirky and fun!",
            prompt: "What's the silliest thing you own?"
        }
    };

    const emojiPicker = document.getElementById('emoji-oracle-picker');
    const emojiResult = document.getElementById('emoji-oracle-result');
    if (emojiPicker && emojiResult) {
        emojiPicker.addEventListener('change', function() {
            const val = emojiPicker.value;
            if (emojiOracleFortunes[val]) {
                const f = emojiOracleFortunes[val];
                emojiResult.innerHTML = `<div class="fortune-section">
                    <div class="fortune-title" style="font-size:2rem;">${val} ${f.title}</div>
                    <div class="fortune-description">${f.fortune}</div>
                    <div class="fortune-description" style="margin-top:0.5rem;">${f.prompt}</div>
                </div>`;
            } else {
                emojiResult.innerHTML = '';
            }
        });
    }
});
