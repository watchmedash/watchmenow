let chapters = [
    {
        title: 'Chapter 1: The Other Side of Sam',
        text: `In the bustling city, amid towering skyscrapers and incessant traffic, lived Sam. A trained mechanical engineer, he had been relegated to the humble job of a computer technician due to the ruthless tide of life. Dreams of revolutionizing the engineering world lay dormant as he navigated through his days in a dusty computer repair shop.

The personal front was equally uninviting. His long-term girlfriend had traded him for a wealthier suitor, leaving him with the bitter sting of betrayal. However, amidst the turmoil, he discovered solace in an unexpected place - the world of chemistry, sparked by his fascination with the television series Breaking Bad.

Despite the hardships, Sam held on to the little joys of life. The humble tuna sandwich held a special place in his heart. After a hard day's work, nothing brought him more pleasure than savouring a tuna sandwich by his apartment window, lost in his thoughts.

One day, on a whim, Sam purchased a lottery ticket. He tucked it into his drawer and thought no more about it, swept back into the mundane rhythm of his life.

An ordinary day at work took a turn for the extraordinary when Sam experienced an intense electric shock. The world around him faded into nothingness, leaving him in a world of darkness. Fear gripped him as he lost consciousness.

When he opened his eyes, he found himself in an unfamiliar setting. The mundane computer shop was replaced with a room straight out of a medieval fantasy, adorned with rich tapestries and the smell of old parchment. His usual work attire had been replaced by the clothes of a nobleman.

The stark differences between this world and his own didn't escape Sam. It felt as if he had been thrust into another existence. Amidst the grandeur and unfamiliarity, a pang of longing hit him. He found himself missing the simplicity of his old life. The familiar hum of computers, the smell of a fresh tuna sandwich, even his chemistry experiments. He wondered, in a world like this, would he ever taste a tuna sandwich again?

Just as he was getting lost in his thoughts, a man dressed in the attire of a servant entered the room carrying a tray of food. He bowed and addressed him as Master Dash. It was then that Sam realized, in this world, he wasn't Sam. He was Dash Vassemont, the seventh son of the noble family Vassemont, in the fantastical world of Ostarynn.` // Include the full text here
    },
    {
        title: 'Chapter 2: Title',
        text: '...'
    },
    // Add more chapters as needed
];

let currentChapter = 0;

function displayChapter() {
    document.getElementById('chapterTitle').innerText = chapters[currentChapter].title;
    document.getElementById('chapterText').innerText = chapters[currentChapter].text;

    // Manage visibility of 'Previous' button
    if(currentChapter === 0) {
        document.getElementById('prevButton').style.display = 'none';
    } else {
        document.getElementById('prevButton').style.display = 'inline-block';
    }

    // Manage visibility of 'Next' button
    if(currentChapter === chapters.length - 1) {
        document.getElementById('nextButton').style.display = 'none';
    } else {
        document.getElementById('nextButton').style.display = 'inline-block';
    }
}

function nextChapter() {
    if (currentChapter < chapters.length - 1) {
        currentChapter++;
        displayChapter();
    }
}

function prevChapter() {
    if (currentChapter > 0) {
        currentChapter--;
        displayChapter();
    }
}

// Call displayChapter function initially to display the first chapter
window.onload = displayChapter;
