
function startCountdown(countdownID, bannerID) {
    let countdownTime = 2; // 10 seconds
    let countdownDisplay = document.getElementById(countdownID);

    countdownDisplay.innerText = countdownTime; // Display initial countdown value

    let countdownInterval = setInterval(function() {
        countdownTime--;
        countdownDisplay.innerText = countdownTime;

        if (countdownTime <= 0) {
            clearInterval(countdownInterval); // Stop the countdown
            document.getElementById(bannerID).style.display = "none"; // Hide the specific banner
        }
    }, 1000); // 1000ms = 1 second
}




document.addEventListener('DOMContentLoaded', (event) => {
  const itemList = [
    "Meg 2 The Trench",
    "Wrong Turn",
    "Wrong Turn 2 Dead End",
    "Wrong Turn 3 Left for Dead",
    "Wrong Turn 4 Bloody Beginnings",
    "Wrong Turn 5 Bloodlines",
    "Wrong Turn 6 Last Resort",
    "Wrong Turn 2021",
    "Past Lives",
    "Hacksaw Ridge",
    "Sugapa",
    "Doraemon the Movie - Nobitas Sky Utopia",
    "The First Slam Dunk",
    "Suki",
    "One Piece Film Red",
    "Puppy Love",
    "The Communion Girl",
    "The Fast and the Furious - Tokyo Drift",
    "Kevin Hart Reality Check",
    "Jimmy O Yang Guess How Much",
    "No Hard Feelings",
    "Escape Room Tournament of Champions",
    "Black Widow",
    "Birds of Prey",
    "Justice League Dark Apokolips War",
    "Jujutsu Kaisen 0",
    "The Batman",
    "The Forever Purge",
    "Hitman's Wife's Bodyguard",
    "Frozen II",
    "Angel Has Fallen",
    "The Invisible Man",
    "Anna",
"A Quiet Place Part II",
"Antman and the Wasp Quantumania",
"F9 The Fast Saga",
"65",
"Jungle Cruise",
"Ready or Not",
"Mulan",
"Jumanji The Next Level",
"Don't Breathe 2",
"Free Guy",
"Bad Boys for Life",
    "Elemental",
    "Heart of Stone",
"Zom 100 - bucket list of the dead",
"SpongeBob SquarePants Presents The Tidal Zone",
    "1917",
    "I Am Rage",
    "The Collective",
    "The Three Musketeers D Artagnan",
    "Hidden Strike",
    "Insidious - The Red Door",
"365 Days This Day",
"Army of the Dead",
"Army of Thieves",
"As Certain as Death",
"Asteroid City",
"Avatar The Way of Water",
"Batman - Soul of the Dragon",
"Batman - The Doom That Came to Gotham",
"Batman and Superman - Battle of the Super Sons",
"Beast",
"Bird Box Barcelona",
"Black Adam",
"Black Clover Sword of the Wizard King",
"Bullet Train",
"Call Her King",
"Chaos Walking",
"Cocaine Bear",
"DC League of Super - Pets",
"Death on the Nile",
"Demon Slayer the Movie - Mugen Train",
"Doctor Strange in the Multiverse of Madness",
"Dog",
"Dune",
"Dungeons & Dragons - Honor Among Thieves",
"El Camino - A Breaking Bad Movie",
"Enola Holmes 2",
"Eternals",
"Extraction 2",
"Fantastic Beasts - The Secrets of Dumbledore",
"Fast & Furious Presents - Hobbs & Shaw",
"Fast X",
"Firestarter",
"Fullmetal Alchemist - The Final Alchemy",
"Ghosted",
"Glass Onion - A Knives Out Mystery",
"God Is a Bullet",
"Godzilla vs Kong",
"Goodbye, Don Glees!",
"Guardians of the Galaxy Volume 3",
"Halloween Kills",
"Home Sweet Home Alone",
"Hotel Transylvania - Transformania",
"Injustice",
"John Wick Chapter 4",
"Joker",
"Jurassic World Dominion",
"Justice League x RWBY - Super Heroes & Huntsmen, Part One",
"Justice League-Warworld",
"Justice Society - World War II",
"Knights of the Zodiac",
"Lightyear",
"Luck",
"Me Time",
"Mighty Morphin Power Rangers Once & Always",
"Minions - The Rise of Gru",
"Morbius",
"Mortal Kombat",
"Nimona",
"No Time to Die",
"Nobody",
"Nope",
"Operation Fortune - Ruse de Guerre",
"Orphan - First Kill",
"Pinocchio",
"Pokémon Detective Pikachu",
"Prey",
"Quicksand",
"Raya and the Last Dragon",
"Red Notice",
"Renfield",
"Resident Evil - Death Island",
"Resident Evil - Welcome to Raccoon City",
"Ruby Gillman  Teenage Kraken",
"Samaritan",
"scream 6",
"Shang-Chi and the Legend of the Ten Rings",
"Shazam! Fury of the Gods",
"Sisu",
"Sonic the Hedgehog 2",
"Spider-Man - No Way Home",
"Spider-Man Across the Spider-Verse",
"Terminator - Dark Fate",
"Texas Chainsaw Massacre",
"The Addams Family 2",
"The Black Demon",
"The Blackening",
"The Conjuring - The Devil Made Me Do It",
"The Croods - A New Age",
"The Flash",
"The Gray Man",
"The Lion King",
"The Little Mermaid",
"The Lost City",
"The Machine",
"The Matrix Resurrections",
"The Mitchells vs The Machines",
"The Northman",
"The Out-Laws",
"The Secret Life of Pets 2",
"The Super Mario Bros Movie",
"Thor - Love and Thunder",
"Tom Clancys Without Remorse",
"Top Gun - Maverick",
"Toy Story 4",
"Transformers - Rise of the Beasts",
"Turning Red",
"Uncharted",
"Venom- Let There Be Carnage",
"Violent Night",
"Weathering With You",
"Werewolf by Night",
"Wonder Woman - Bloodlines",
"Wrath of Man",
"Zack Snyders Justice League",

  ];
  function performSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const searchTerm = searchInput.value.toLowerCase();
    searchResults.innerHTML = "";

    if (searchTerm.trim() === "") {
      searchResults.style.display = "none";
    } else {
      const filteredItems = itemList.filter((item) =>
        item.toLowerCase().includes(searchTerm)
      );
      if (filteredItems.length === 0) {
        searchResults.innerHTML = "<p>No results found.</p>";
      } else {
        displayItemList(filteredItems, searchResults);
      }
      searchResults.style.display = "block";
    }
  }
  function displayItemList(items, container) {
    const ul = document.createElement("ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = item;
      link.href = `../movies/${encodeURIComponent(item)}.html`;
      li.appendChild(link);
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", performSearch);
  const searchResults = document.getElementById("searchResults");
  searchResults.style.display = "none";
});
