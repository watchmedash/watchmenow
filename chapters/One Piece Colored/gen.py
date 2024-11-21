import os

# Template for the HTML file
template = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet"/>
<link href="https://i.postimg.cc/NM4kLqv2/favicon.png" rel="icon" type="image/png"/>
<link href="../../style.css" rel="stylesheet"/>
<title>Chapter {chapter_number} - One Piece Colored</title>
<script type='text/javascript' src='https://platform-api.sharethis.com/js/sharethis.js#property=66c597e8260e03001afdc214&product=sop' async='async'></script>
</head>
<body>
<header>
<nav>
<div class="logo-title-container">
<div class="logo-container">
<img alt="Dashtoons Logo" src="https://i.postimg.cc/1tzJpjzn/Dash-Toons.png"/>
</div>
<div class="nav-title">
<h1>Dashtoons</h1>
<p>Comics Gateway</p>
</div></div>
<div class="nav-links">
<ul>
<li><a href="../../index.html"><i class="fas fa-home"></i> Home</a></li>
</ul>
</div>
</nav>
</header>

<div class="container">
<div class="image-container"><h1>Chapter {chapter_number}</h1></div>
<div id="chapters">
<ul class="chapter-list">
<li><a href="../../chapters/One Piece Colored/chapter{prev_chapter}.html">Prev</a></li>
<li><a href="../../chapters/One Piece Colored/chapter{next_chapter}.html">Next</a></li>
<li><a href="../../chapters/One Piece Colored.html"><i class="fas fa-bars"></i> Title</a></li>
<li><div class="dropdown" id="chapterDropdown">
<button class="dropbtn">Chapters ▼</button>
<div class="dropdown-content" id="dynamicChapterList">
</div>
</div></li>
</ul>
</div>
</div>
<div id="content">
<!-- Generated list of images from 000{chapter_num_padded}-001 to 000{chapter_num_padded}-107 -->
<script>
        const container = document.createElement('div');
        container.id = 'image-container';
        document.body.appendChild(container);

        const baseUrl = 'https://scans-hot.leanbox.us/manga/One-Piece-Digital-Colored-Comics/';

        for (let i = 1; i <= 107; i++) {{
            const imageUrl = `${{baseUrl}}{chapter_num_padded}-${{i.toString().padStart(3, '0')}}.png`;
            const altText = `Dashtoons ${{i}}`;

            const img = document.createElement('img');
            img.className = 'chapter-image';
            img.src = imageUrl;
            img.alt = altText;
            container.appendChild(img);
        }}
    </script>
<script>
    document.addEventListener("DOMContentLoaded", function () {{
        var chapterListPath = "../../chapters/One Piece Colored.html";

        // Get the dropdown and list elements
        var dynamicChapterList = document.getElementById("dynamicChapterList");
        var staticChapterList = document.getElementById("staticChapterList");

        // Fetch the HTML content of the other page
        fetch(chapterListPath)
            .then(response => response.text())
            .then(html => {{
                // Create a temporary element to parse the HTML
                var tempDiv = document.createElement("div");
                tempDiv.innerHTML = html;

                // Extract the chapter list
                var chapterList = tempDiv.querySelector(".chapter-list").innerHTML;

                // Modify the links to add "../" (three times in this case)
                chapterList = chapterList.replace(/href="\.\.\//g, 'href="../../');

                // Insert the content into the respective containers
                dynamicChapterList.innerHTML = chapterList;
                staticChapterList.innerHTML = chapterList;
            }})
            .catch(error => console.error("Error fetching chapter list:", error));
    }});
    </script>
<img alt="Dashtoons" class="chapter-image" src="https://i.postimg.cc/wBNdfBt9/dashflixgif.gif"/>
<!--<img class="chapter-image" src="dash" alt="Dashtoons">-->
</div>
<img alt="Dashtoons" class="chapter-image" src="https://i.postimg.cc/wBNdfBt9/dashflixgif.gif"/>
<div class="sharethis-inline-share-buttons"></div>
<div class="container">
<div id="chapters">
<ul class="chapter-list">
<li><a href="../../chapters/One Piece Colored/chapter{prev_chapter}.html">Prev</a></li>
<li><a href="../../chapters/One Piece Colored/chapter{next_chapter}.html">Next</a></li>
<li><a href="../../chapters/One Piece Colored.html"><i class="fas fa-bars"></i> Title</a></li>
</ul>
</div>
</div>
<!-- -->

<footer>
<nav class="footer-nav">
<div class="social-icons">
<a class="social-icon" href="https://perilastronaut.com/ig3edi6zr?key=64ee28d30430f6d5d5a59dadca80b270"><i class="fab fa-instagram"></i></a>
<a class="social-icon" href="https://perilastronaut.com/ig3edi6zr?key=64ee28d30430f6d5d5a59dadca80b270"><i class="fab fa-youtube"></i></a>
<a class="social-icon" href="https://perilastronaut.com/ig3edi6zr?key=64ee28d30430f6d5d5a59dadca80b270"><i class="fab fa-facebook"></i></a>
<a class="social-icon" href="https://perilastronaut.com/ig3edi6zr?key=64ee28d30430f6d5d5a59dadca80b270"><i class="fab fa-twitter"></i></a>
</div>
</nav>
<p class="copyright">Dashtoons 2024. All rights reserved.</p>
</footer>
<button id="goToTopBtn">Go to Top</button>
<script>
  // Get the button
  var mybutton = document.getElementById("goToTopBtn");

  window.onscroll = function() {{
    scrollFunction();
  }};

  function scrollFunction() {{
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {{
      mybutton.style.display = "block";
    }} else {{
      mybutton.style.display = "none";
    }}
  }}

  mybutton.onclick = function() {{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }};
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="../../homepage.js"></script>
</body>
</html>
"""

# Generate the HTML files
for chapter in range(2, 1125):
    chapter_number = chapter
    prev_chapter = chapter - 1
    next_chapter = chapter + 1

    # Pad the chapter number to match the format
    chapter_num_padded = str(chapter_number).zfill(4)

    # Replace placeholders with actual values
    html_content = template.format(
        chapter_number=chapter_number,
        prev_chapter=prev_chapter,
        next_chapter=next_chapter,
        chapter_num_padded=chapter_num_padded
    )

    # Define the file name
    file_name = f"chapter{chapter_number}.html"

    # Write the file
    with open(file_name, "w", encoding="utf-8") as file:
        file.write(html_content)

    print(f"Generated {file_name}")
