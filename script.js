// SCROLL SYSTEM=========================================
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section'); // All sections
  let currentSectionIndex = 0; // Tracks the current section index
  let isCooldown = false; // Cooldown flag to prevent double scrolls

  // Scroll to a specific section
  function scrollToSection(index) {
    const targetPosition = sections[index].offsetTop; // Position of the target section
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }

  // Handle scroll event
  function handleScroll(event) {
    if (isCooldown) return; // Prevent triggering during cooldown

    // Determine scroll direction
    if (event.deltaY > 0) {
      // Scrolling down
      if (currentSectionIndex < sections.length - 1) {
        currentSectionIndex++;
        scrollToSection(currentSectionIndex); // Align first
        startCooldown(); // Start cooldown only after aligning
      }
    } else if (event.deltaY < 0) {
      // Scrolling up
      if (currentSectionIndex > 0) {
        currentSectionIndex--;
        scrollToSection(currentSectionIndex); // Align first
        startCooldown(); // Start cooldown only after aligning
      }
    }
  }

  // Start cooldown function
  function startCooldown() {
    isCooldown = true;
    setTimeout(() => {
      isCooldown = false; // Cooldown ends after 800ms
    }, 800); // Adjust duration as needed
  }

  // Add the scroll event listener
  window.addEventListener('wheel', handleScroll);
});



// MUTE AUDIO======================================
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle-sound');
  const soundIcon = document.getElementById('sound-icon');
  
  // Get all audio elements
  const audioElements = document.querySelectorAll('audio');
  
  // State to track sound status
  let isMuted = false;

  // Function to toggle sound
  function toggleSound() {
    isMuted = !isMuted;

    // Update mute state for all audio elements
    audioElements.forEach(audio => {
      audio.muted = isMuted;
    });

    // Change the button icon based on the sound state
    soundIcon.src = isMuted ? 'sound_off.svg' : 'sound_on.svg';
    soundIcon.alt = isMuted ? 'Sound Off' : 'Sound On';
  }

  // Attach click event to the button
  toggleButton.addEventListener('click', toggleSound);
});



// SCROLL BUTTON===================================
document.addEventListener('DOMContentLoaded', () => {
  const scrollButton = document.getElementById('scroll-button');
  const sections = document.querySelectorAll('.section');

  scrollButton.addEventListener('click', () => {
    const currentScroll = window.scrollY;
    const viewportHeight = window.innerHeight;

    // Find the next section to scroll into view
    for (let section of sections) {
      const sectionTop = section.offsetTop;
      if (sectionTop > currentScroll) {
        window.scrollTo({
          top: sectionTop,
          behavior: 'smooth' // Smooth scrolling effect
        });
        break;
      }
    }
  });
});


// AUDIO==========================================
// MDGA===========================================

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.mdga.section'); // Select the section
  const audio = document.getElementById('mdga-audio'); // Select the audio element
  let timer = null; // Timer to track 1 second visibility
  let isUserInteracted = false; // Track if the user has interacted

  // Set up event listener for user interaction
  document.addEventListener('click', () => {
    isUserInteracted = true;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Section is visible, start a 1-second timer
        console.log('Section is visible');
        timer = setTimeout(() => {
          if (isUserInteracted && audio.paused) {
            audio.play()
              .then(() => console.log('Audio started playing'))
              .catch((error) => console.error('Audio play error:', error));
          }
        }, 500);
      } else {
        // Section is not visible, clear the timer and pause audio
        console.log('Section is not visible');
        clearTimeout(timer);
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of the section is visible
  });

  observer.observe(section); // Observe the section
});


document.addEventListener('DOMContentLoaded', function() {
  const lyricsContainer = document.getElementById('mdga-liric');
  const audio = document.getElementById('mdga-audio');
  
  const lyricsData = [
    { start: 0, end: 2, text: 'Я больше никому не верю'},
    { start: 2, end: 3.5, text: 'Бомжи учат меня жизни'},
    { start: 3.5, end: 5.5, text: 'Рабов учат в универах, а (Да)'},
    { start: 5.5, end: 7, text: 'Я большое ничего не знаю'},
    { start: 7, end: 8, text: 'Если спросишь, все пиздят'},
    { start: 8, end: 10, text: 'А я хотя бы сомневаюсь (Да)'},
    { start: 10, end: 12, text: 'Зато нас хуй чем удивишь'},
    { start: 12, end: 13, text: 'И если с Марса прилетят'},
    { start: 13, end: 15, text: 'Мы скажем: Пусть! Хоть будет движ! (Будет движ)'},
    { start: 15, end: 17, text: 'Цветёт Москва, горит Париж'},
    { start: 17, end: 18, text: 'Кому не похуй, что ты ешь'},
    { start: 18, end: 20, text: 'Ты — это то, что ты творишь'},
    { start: 20, end: 22, text: 'Если бы я столько тратил'},
    { start: 22, end: 25, text: 'Сколько было потерь сколько было потерь'},
    { start: 25, end: 30, text: 'Но у судьбы другие планы, братик сколько ты не потей'},
    { start: 30, end: 32, text: 'За окном целый год некстати'},
    { start: 32, end: 35, text: 'Напоминает апрель а это значит теперь'},
    { start: 35, end: 37, text: 'Время разобраться, братик'},
    { start: 37, end: 100, text: 'Это последняя дверь'},
    { start: 10000, end: 10000, text: '...'},

    ];

   // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('mdga-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('mdga-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function for smooth scrolling to lyric line
  function scrollToLyric(offsetTop) {
    lyricsContainer.scrollTo({
      top: offsetTop - (lyricsContainer.clientHeight / 4),
      behavior: 'smooth'
    });
  }

  displayLyrics();
});




// PERVYI===========================================

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.pervyi.section'); // Select the section
  const audio = document.getElementById('pervyi-audio'); // Select the audio element
  let timer = null; // Timer to track 1 second visibility
  let isUserInteracted = false; // Track if the user has interacted

  // Set up event listener for user interaction
  document.addEventListener('click', () => {
    isUserInteracted = true;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Section is visible, start a 1-second timer
        console.log('Section is visible');
        timer = setTimeout(() => {
          if (isUserInteracted && audio.paused) {
            audio.play()
              .then(() => console.log('Audio started playing'))
              .catch((error) => console.error('Audio play error:', error));
          }
        }, 500);
      } else {
        // Section is not visible, clear the timer and pause audio
        console.log('Section is not visible');
        clearTimeout(timer);
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of the section is visible
  });

  observer.observe(section); // Observe the section
});


document.addEventListener('DOMContentLoaded', function() {
  const lyricsContainer = document.getElementById('pervyi-liric');
  const audio = document.getElementById('pervyi-audio');

  const lyricsData = [
    { start: 0, end: 6, text: 'Эй, мне снятся горы, но я где-то на краю (На краю)'},
    { start: 6, end: 8, text: 'Я падаю и больше не встаю '},
    { start: 8, end: 11, text: 'Никто не ждёт, судьба не шепчет: «I love you»'},
    { start: 11, end: 14, text: 'И только коршуны поют'},
    { start: 14, end: 18, text: 'Воу-воу, ветер задует в спину'},
    { start: 18, end: 21, text: 'С кем обогну вершину, делю наполовину'},
    { start: 21, end: 24, text: 'Воу-воу, ветер задует в спину'},
    { start: 24, end: 28, text: 'Если найду причину, остановлю лавину'},
    { start: 28, end: 31, text: 'Во-о-о-о, остановлю лавину'},
    { start: 31, end: 50, text: 'Во-о-о-о, выстрел адреналина'},
    { start: 10000, end: 10000, text: '...'},

    ];

   // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('pervyi-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('pervyi-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function for smooth scrolling to lyric line
  function scrollToLyric(offsetTop) {
    lyricsContainer.scrollTo({
      top: offsetTop - (lyricsContainer.clientHeight / 4),
      behavior: 'smooth'
    });
  }

  displayLyrics();
});




// OSADKI===========================================

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.osadki.section'); // Select the section
  const audio = document.getElementById('osadki-audio'); // Select the audio element
  let timer = null; // Timer to track 1 second visibility
  let isUserInteracted = false; // Track if the user has interacted

  // Set up event listener for user interaction
  document.addEventListener('click', () => {
    isUserInteracted = true;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Section is visible, start a 1-second timer
        console.log('Section is visible');
        timer = setTimeout(() => {
          if (isUserInteracted && audio.paused) {
            audio.play()
              .then(() => console.log('Audio started playing'))
              .catch((error) => console.error('Audio play error:', error));
          }
        }, 500);
      } else {
        // Section is not visible, clear the timer and pause audio
        console.log('Section is not visible');
        clearTimeout(timer);
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of the section is visible
  });

  observer.observe(section); // Observe the section
});


document.addEventListener('DOMContentLoaded', function() {
  const lyricsContainer = document.getElementById('osadki-liric');
  const audio = document.getElementById('osadki-audio');

  const lyricsData = [

    { start: 0, end: 3, text: 'Дай мне минуту; всё, что хочешь, раздобуду'},
    { start: 3, end: 6, text: 'Быстро нарисую — мистер любит амплитуду'},
    { start: 6, end: 9, text: 'Месть — это крудо, моё любимое блюдо (На)'},
    { start: 9, end: 12, text: 'Со мной кукла Вуду, а с ней молодой ублюдок'},
    { start: 12, end: 15, text: 'Грязь трое суток: у меня пустой желудок (Н-на)'},
    { start: 15, end: 18, text: 'Я устал от муток, правда, больше не могу так'},
    { start: 18, end: 22, text: 'Но все мои кенты тогда опять меня осудят (Да)'},
    { start: 22, end: 40, text: '«Братья до конца» — я не ебу, где эти люди'},
    { start: 10000, end: 10000, text: '...'},

    ];

   // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('osadki-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('osadki-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function for smooth scrolling to lyric line
  function scrollToLyric(offsetTop) {
    lyricsContainer.scrollTo({
      top: offsetTop - (lyricsContainer.clientHeight / 4),
      behavior: 'smooth'
    });
  }

  displayLyrics();
});



// KORNI===========================================

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.korni.section'); // Select the section
  const audio = document.getElementById('korni-audio'); // Select the audio element
  let timer = null; // Timer to track 1 second visibility
  let isUserInteracted = false; // Track if the user has interacted

  // Set up event listener for user interaction
  document.addEventListener('click', () => {
    isUserInteracted = true;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Section is visible, start a 1-second timer
        console.log('Section is visible');
        timer = setTimeout(() => {
          if (isUserInteracted && audio.paused) {
            audio.play()
              .then(() => console.log('Audio started playing'))
              .catch((error) => console.error('Audio play error:', error));
          }
        }, 500);
      } else {
        // Section is not visible, clear the timer and pause audio
        console.log('Section is not visible');
        clearTimeout(timer);
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of the section is visible
  });

  observer.observe(section); // Observe the section
});


document.addEventListener('DOMContentLoaded', function() {
  const lyricsContainer = document.getElementById('korni-liric');
  const audio = document.getElementById('korni-audio');

  const lyricsData = [
    { start: 0, end: 2.5, text: 'Я сижу на крыше, слышу свой любимый город'},
    { start: 2.5, end: 5, text: 'Слышу, как он перемалывает сильных и толковых (Да)'},
    { start: 5, end: 8, text: 'Я гостеприимный, кто-то скажет: не все дома'},
    { start: 8, end: 10, text: 'Но мои друзья внутри, тут меньше старых и нет новых (Да)'},
    { start: 10, end: 12, text: 'Танцы на краю, автопилот, самоконтроль'},
    { start: 12, end: 15, text: 'Я живу все девять жизней, а, как будто Леопольд, эй'},
    { start: 15, end: 17, text: 'Допишу альбом, решу с дистрой, потом destroy'},
    { start: 17, end: 20, text: 'И я снова всё разрушу, чтобы позже сказать: «Строй», е'},
    { start: 20, end: 23, text: 'Они встречают по кроссовкам, татуировкам'},
    { start: 23, end: 25, text: 'Их и без кепок так же просто наебать'},
    { start: 25, end: 28, text: 'Тут марафон — это не гонка: двигаюсь громко'},
    { start: 28, end: 30, text: 'Скажи, кто ты, а не кому можешь набрать'},
    { start: 30, end: 33, text: 'Тут только братья шарят контакт'},
    { start: 33, end: 35.5, text: 'Только брать и жать до конца'},
    { start: 35.5, end: 38, text: 'И, если я забуду корни, ты мне напомни'},
    { start: 38, end: 50, text: 'Кем были раньше и кем мы хотели стать'},
    { start: 10000, end: 10000, text: '...'},

    ];

   // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('korni-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('korni-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function for smooth scrolling to lyric line
  function scrollToLyric(offsetTop) {
    lyricsContainer.scrollTo({
      top: offsetTop - (lyricsContainer.clientHeight / 4),
      behavior: 'smooth'
    });
  }

  displayLyrics();
});



// NIZKIE TEMPERATURY===========================================

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.temper.section'); // Select the section
  const audio = document.getElementById('temper-audio'); // Select the audio element
  let timer = null; // Timer to track 1 second visibility
  let isUserInteracted = false; // Track if the user has interacted

  // Set up event listener for user interaction
  document.addEventListener('click', () => {
    isUserInteracted = true;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Section is visible, start a 1-second timer
        console.log('Section is visible');
        timer = setTimeout(() => {
          if (isUserInteracted && audio.paused) {
            audio.play()
              .then(() => console.log('Audio started playing'))
              .catch((error) => console.error('Audio play error:', error));
          }
        }, 500);
      } else {
        // Section is not visible, clear the timer and pause audio
        console.log('Section is not visible');
        clearTimeout(timer);
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of the section is visible
  });

  observer.observe(section); // Observe the section
});


document.addEventListener('DOMContentLoaded', function() {
  const lyricsContainer = document.getElementById('temper-liric');
  const audio = document.getElementById('temper-audio');

  const lyricsData = [
    { start: 1, end: 3, text: 'Я не говорю о себе'},
{ start: 3, end: 5, text: 'Я не помогу семье'},
{ start: 5, end: 6, text: 'Если я в тепле'},
{ start: 6, end: 8, text: 'Не переборю семь бед'},
{ start: 8, end: 10, text: 'Не переварю их всех'},
{ start: 10, end: 11, text: 'Если я в тепле'},
{ start: 11, end: 13, text: 'Они горят в тени'},
{ start: 13, end: 14, text: 'Они говорят: "Вернись"'},
{ start: 14, end: 16, text: 'Где сияем мы'},
{ start: 16, end: 18.5, text: 'Они говорят: "Вернись"'},
{ start: 18.5, end: 21, text: 'Я не хочу обратно вниз'},
{ start: 21, end: 23, text: 'Низкие температуры'},
{ start: 23, end: 25, text: 'Сделал кэш с клавиатуры — взял аппаратуру, е'},
{ start: 25, end: 27, text: 'Низкие вибрации'},
{ start: 27, end: 30, text: 'Я читаю в Neumann с дешёвым эффектом рации'},
{ start: 30, end: 32, text: 'М, да, лихие времена'},
{ start: 32, end: 35, text: 'Да, мы дети 90-х, значит, дети навсегда'},
{ start: 35, end: 37, text: 'Заносило в поворотах — я вырулил, но беда'},
{ start: 37, end: 10000, text: 'У меня столько вопросов и один из них — семья'},
{ start: 10000, end: 10000, text: '...'},

    ];

   // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('temper-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('temper-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function for smooth scrolling to lyric line
  function scrollToLyric(offsetTop) {
    lyricsContainer.scrollTo({
      top: offsetTop - (lyricsContainer.clientHeight / 4),
      behavior: 'smooth'
    });
  }

  displayLyrics();
});




// KOLYBELNYAA===========================================

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.kolyb.section'); // Select the section
  const audio = document.getElementById('kolyb-audio'); // Select the audio element
  let timer = null; // Timer to track 1 second visibility
  let isUserInteracted = false; // Track if the user has interacted

  // Set up event listener for user interaction
  document.addEventListener('click', () => {
    isUserInteracted = true;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Section is visible, start a 1-second timer
        console.log('Section is visible');
        timer = setTimeout(() => {
          if (isUserInteracted && audio.paused) {
            audio.play()
              .then(() => console.log('Audio started playing'))
              .catch((error) => console.error('Audio play error:', error));
          }
        }, 500);
      } else {
        // Section is not visible, clear the timer and pause audio
        console.log('Section is not visible');
        clearTimeout(timer);
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of the section is visible
  });

  observer.observe(section); // Observe the section
});


document.addEventListener('DOMContentLoaded', function() {
  const lyricsContainer = document.getElementById('kolyb-liric');
  const audio = document.getElementById('kolyb-audio');

  const lyricsData = [
    { start: 0, end: 2, text: 'В небе догорят огни'},
  { start: 2, end: 5, text: 'Закрывай глаза и спи'},
  { start: 5, end: 7, text: 'Самый лучший день'},
  { start: 7, end: 10, text: 'Опять тебе приснится'},
  { start: 10, end: 13, text: 'Знаю: не тебе пока'},
  { start: 13, end: 16, text: 'Звёзды светят с потолка'},
  { start: 16, end: 18, text: 'Все игрушки спят'},
  { start: 18, end: 21, text: 'Ну а тебе не спится'},
  { start: 21, end: 24, text: 'В этом идеальном мире, где никто не идеален'},
  { start: 24, end: 27, text: 'Я не могу укрыться от холода в одеяле'},
  { start: 27, end: 29, text: 'Мои мечты разбиты осколками: они ранят'},
  { start: 29, end: 32, text: 'И сколько я не пытаюсь, я всё равно просыпаюсь'},
  { start: 32, end: 35, text: 'В этом идеальном мире, где никто не идеален'},
  { start: 35, end: 38, text: 'Где люди, как машины, разобраны на детали'},
  { start: 38, end: 41, text: 'И тысячами причины надолго это оставить'},
  { start: 41, end: 10000, text: 'Но сколько я не пытаюсь, я всё равно просыпаюсь (Йо) '},
  { start: 10000, end: 10000, text: '...'},

    ];

   // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('kolyb-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('kolyb-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function for smooth scrolling to lyric line
  function scrollToLyric(offsetTop) {
    lyricsContainer.scrollTo({
      top: offsetTop - (lyricsContainer.clientHeight / 4),
      behavior: 'smooth'
    });
  }

  displayLyrics();
});





//  SCZASTLIVAYA PESNYA===========================================

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.sczast.section'); // Select the section
  const audio = document.getElementById('sczast-audio'); // Select the audio element
  let timer = null; // Timer to track 1 second visibility
  let isUserInteracted = false; // Track if the user has interacted

  // Set up event listener for user interaction
  document.addEventListener('click', () => {
    isUserInteracted = true;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Section is visible, start a 1-second timer
        console.log('Section is visible');
        timer = setTimeout(() => {
          if (isUserInteracted && audio.paused) {
            audio.play()
              .then(() => console.log('Audio started playing'))
              .catch((error) => console.error('Audio play error:', error));
          }
        }, 500);
      } else {
        // Section is not visible, clear the timer and pause audio
        console.log('Section is not visible');
        clearTimeout(timer);
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of the section is visible
  });

  observer.observe(section); // Observe the section
});


document.addEventListener('DOMContentLoaded', function() {
  const lyricsContainer = document.getElementById('sczast-liric');
  const audio = document.getElementById('sczast-audio');

  const lyricsData = [
    { start: 0, end: 3, text: 'Если бы я был с тобой честен'},
    { start: 3, end: 5, text: 'Ты бы не хотела вернуться'},
    { start: 5, end: 8, text: 'Но самые счастливые песни'},
    { start: 8, end: 10, text: 'Пишут несчастные люди'},
    { start: 10, end: 12, text: 'Если бы я был с тобой честен'},
    { start: 12, end: 15, text: 'Ты бы не хотела вернуться'},
    { start: 15, end: 17, text: 'Но самые красивые песни'},
    { start: 17, end: 20, text: 'Пишут ужасные люди'},
    { start: 20, end: 21, text: 'Сложно, но да'},
    { start: 21, end: 23, text: 'Жизнь по сути проста'},
    { start: 23, end: 24, text: 'Цени каждый день'},
    { start: 24, end: 25, text: 'Ведь, каждый не навсегда'},
    { start: 25, end: 26, text: 'Кто-то, но уже другой'},
    { start: 26, end: 28, text: 'Наденет твою бейсболку'},
    { start: 28, end: 29, text: 'И кто там сделал больше'},
    { start: 29, end: 30, text: 'Больше в этом нет толка'},
    { start: 30, end: 32, text: 'Дом, на который так копил — поменяют'},
    { start: 32, end: 35, text: 'Окна с виду те же, но картина — другая'},
    { start: 35, end: 37, text: 'И пусть все вокруг кричит тебе: чудес не бывает'},
    { start: 37, end: 39, text: 'Но чудес не бывает, где никто не мечтает'},
    { start: 39, end: 42, text: 'Если не хватает сил и вдруг невыносимо грустно'},
    { start: 42, end: 44, text: 'Послушай эту песню, я совру, что я вернулся'},
    { start: 44, end: 47, text: 'Но не забывай о ней, когда вокруг станет тепло'},
    { start: 47, end: 48, text: 'Ведь после бури всегда солнце'},
    { start: 48, end: 49, text: 'Просто выгляни в окно'},
    { start: 49, end: 60, text: 'Если бы я был с тобой честен...'},
    { start: 10000, end: 10000, text: '...'},

    ];

   // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('sczast-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('sczast-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function for smooth scrolling to lyric line
  function scrollToLyric(offsetTop) {
    lyricsContainer.scrollTo({
      top: offsetTop - (lyricsContainer.clientHeight / 4),
      behavior: 'smooth'
    });
  }

  displayLyrics();
});




//  STARYE DRUZIA===========================================

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.stary.section'); // Select the section
  const audio = document.getElementById('stary-audio'); // Select the audio element
  let timer = null; // Timer to track 1 second visibility
  let isUserInteracted = false; // Track if the user has interacted

  // Set up event listener for user interaction
  document.addEventListener('click', () => {
    isUserInteracted = true;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Section is visible, start a 1-second timer
        console.log('Section is visible');
        timer = setTimeout(() => {
          if (isUserInteracted && audio.paused) {
            audio.play()
              .then(() => console.log('Audio started playing'))
              .catch((error) => console.error('Audio play error:', error));
          }
        }, 500);
      } else {
        // Section is not visible, clear the timer and pause audio
        console.log('Section is not visible');
        clearTimeout(timer);
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of the section is visible
  });

  observer.observe(section); // Observe the section
});


document.addEventListener('DOMContentLoaded', function() {
  const lyricsContainer = document.getElementById('stary-liric');
  const audio = document.getElementById('stary-audio');

  const lyricsData = [
    { start: 0, end: 4, text: 'Буду вспоминать постоянно'},
    { start: 4, end: 7, text: 'И в толпе искать вас по взглядам'},
    { start: 7, end: 10, text: 'И даже если на расстоянии'},
    { start: 10, end: 14, text: 'Они будут навсегда рядом'},
    { start: 14, end: 17, text: 'И я напевал в тишине о тебе'},
    { start: 17, end: 20, text: 'Ливень подыграл в темноте на стекле'},
    { start: 20, end: 24, text: 'Если бы я всё знал, что сказать не успел'},
    { start: 24, end: 27, text: 'Я бы не опоздал, но тебя уже нет'},
    { start: 27, end: 34, text: 'Но тебя уже не-е-ет, но тебя уже нет'},
    { start: 34, end: 10000, text: 'Но тебя уже не-е-ет, но тебя уже нет'},
    { start: 10000, end: 10000, text: '...'},

    ];

   // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('stary-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('stary-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function for smooth scrolling to lyric line
  function scrollToLyric(offsetTop) {
    lyricsContainer.scrollTo({
      top: offsetTop - (lyricsContainer.clientHeight / 4),
      behavior: 'smooth'
    });
  }

  displayLyrics();
});



//  SVOE MESTO===========================================

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.mesto.section'); // Select the section
  const audio = document.getElementById('mesto-audio'); // Select the audio element
  let timer = null; // Timer to track 1 second visibility
  let isUserInteracted = false; // Track if the user has interacted

  // Set up event listener for user interaction
  document.addEventListener('click', () => {
    isUserInteracted = true;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Section is visible, start a 1-second timer
        console.log('Section is visible');
        timer = setTimeout(() => {
          if (isUserInteracted && audio.paused) {
            audio.play()
              .then(() => console.log('Audio started playing'))
              .catch((error) => console.error('Audio play error:', error));
          }
        }, 500);
      } else {
        // Section is not visible, clear the timer and pause audio
        console.log('Section is not visible');
        clearTimeout(timer);
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of the section is visible
  });

  observer.observe(section); // Observe the section
});


document.addEventListener('DOMContentLoaded', function() {
  const lyricsContainer = document.getElementById('mesto-liric');
  const audio = document.getElementById('mesto-audio');

  const lyricsData = [
    { start: 0, end: 4, text: 'Сколько пришлось пройти, чтобы свое найти'},
  { start: 4, end: 8, text: 'Пестрыми лентами вьются пути как гребаный серпантин'},
  { start: 8, end: 11, text: 'Кругом толпы людей, но ты с миром, по сути, один на один'},
  { start: 11, end: 15, text: 'Дьявол даст право на ошибку, но вряд ли Бог простит'},
  { start: 15, end: 18, text: 'Он нажимает курок. На старт, внимание, Go'},
  { start: 18, end: 22, text: 'Лучше беги со всех ног, если жизнь дорога'},
  { start: 22, end: 26, text: 'Из миллиарда дорог через туман и песок'},
  { start: 26, end: 29, text: 'Тебя домой приведет лишь одна'},
  { start: 29, end: 31, text: 'Дохнет планктон, отравило зато'},
  { start: 31, end: 34, text: 'Экзистенциальное хтонь, эффект домино'},
  { start: 34, end: 35, text: 'У них только пара вальтов'},
  { start: 35, end: 37, text: 'У меня — 21'},
  { start: 37, end: 39, text: 'Петля на повтор, строки сольются в поток'},
  { start: 39, end: 41, text: 'Не знаю куда он течет, но знаю одно'},
  { start: 41, end: 43, text: 'Если не я, то кто?'},
  { start: 43, end: 48, text: 'Я когда-нибудь найду'},
  { start: 48, end: 50, text: 'На Земле свое место'},
  { start: 50, end: 55, text: 'Даже, если я пойду ко дну'},
  { start: 55, end: 10000, text: 'Я вернусь в небе новым рассветом'},
  { start: 10000, end: 10000, text: '...'},

    ];

   // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('mesto-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('mesto-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function for smooth scrolling to lyric line
  function scrollToLyric(offsetTop) {
    lyricsContainer.scrollTo({
      top: offsetTop - (lyricsContainer.clientHeight / 4),
      behavior: 'smooth'
    });
  }

  displayLyrics();
});



//  ECONOMY===========================================

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.economy.section'); // Select the section
  const audio = document.getElementById('economy-audio'); // Select the audio element
  let timer = null; // Timer to track 1 second visibility
  let isUserInteracted = false; // Track if the user has interacted

  // Set up event listener for user interaction
  document.addEventListener('click', () => {
    isUserInteracted = true;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Section is visible, start a 1-second timer
        console.log('Section is visible');
        timer = setTimeout(() => {
          if (isUserInteracted && audio.paused) {
            audio.play()
              .then(() => console.log('Audio started playing'))
              .catch((error) => console.error('Audio play error:', error));
          }
        }, 500);
      } else {
        // Section is not visible, clear the timer and pause audio
        console.log('Section is not visible');
        clearTimeout(timer);
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of the section is visible
  });

  observer.observe(section); // Observe the section
});


document.addEventListener('DOMContentLoaded', function() {
  const lyricsContainer = document.getElementById('economy-liric');
  const audio = document.getElementById('economy-audio');

  const lyricsData = [
    { start: 0, end: 4, text: 'Я люблю, когда в квартире чисто'},
    { start: 4, end: 7, text: 'Не люблю куда-то торопиться'},
    { start: 7, end: 9, text: 'Мимо всех приятельских амбиций'},
    { start: 9, end: 13, text: 'Не нужны друзья по переписке и близко'},
    { start: 13, end: 17, text: 'Делал грязь — молюсь перед иконами'},
    { start: 17, end: 20, text: 'Чтобы больше не летать в economy'},
    { start: 20, end: 22, text: 'Чтоб проблемы не были огромными'},
    { start: 22, end: 26, text: 'И чтобы навсегда меня запомнили артистом'},
    { start: 26, end: 30, text: 'Делал грязь — молюсь перед иконами'},
    { start: 30, end: 33, text: 'Чтобы больше не летать в economy'},
    { start: 33, end: 36, text: 'Чтоб проблемы не были огромными'},
    { start: 36, end: 40, text: 'И чтобы навсегда меня запомнили артистом'},
    { start: 40, end: 43, text: 'Теперь, когда вы увидели, что эти события помогли вам вырасти,'},
    { start: 43, end: 47, text: 'Скажите, Марк: если бы у вас была возможность всё изменить, '},
    { start: 47, end: 10000, text: 'Как вы считаете, стали бы вы счастливее?'},
    { start: 10000, end: 10000, text: '...'},

    ];

   // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('economy-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function to display lyrics
  function displayLyrics() {
    lyricsContainer.innerHTML = '';
    lyricsData.forEach(line => {
      const lyricLine = document.createElement('div');
      lyricLine.classList.add('economy-line');
      lyricLine.textContent = line.text;
      lyricsContainer.appendChild(lyricLine);

      // Highlight active line based on current audio time
      audio.addEventListener('timeupdate', function() {
        if (audio.currentTime >= line.start && audio.currentTime <= line.end) {
          lyricLine.classList.add('active');
          scrollToLyric(lyricLine.offsetTop);
        } else {
          lyricLine.classList.remove('active');
        }
      });
    });
  }

  // Function for smooth scrolling to lyric line
  function scrollToLyric(offsetTop) {
    lyricsContainer.scrollTo({
      top: offsetTop - (lyricsContainer.clientHeight / 4),
      behavior: 'smooth'
    });
  }

  displayLyrics();
});
