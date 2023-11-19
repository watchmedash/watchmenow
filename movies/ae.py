import os
from bs4 import BeautifulSoup

# New code to replace the old <div>
new_code = '''
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; width: 80%; margin: 0 auto;">
<iframe src="https://streamtape.com/e/DjodOzg4X8hdWv/" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="true" allowtransparency="true" allow="autoplay" scrolling="no" frameborder="0"></iframe>
</div>
'''

# Iterate through files in the current directory
for filename in os.listdir():
    if filename.endswith(".html"):
        with open(filename, "r") as file:
            # Parse the HTML using BeautifulSoup
            soup = BeautifulSoup(file, "html.parser")

            # Find all <div> elements with class "video-container"
            video_containers = soup.find_all("div", class_="video-container")

            # Replace each found video container with the new code
            for container in video_containers:
                container.replace_with(BeautifulSoup(new_code, "html.parser"))

        # Save the modified HTML back to the file
        with open(filename, "w") as file:
            file.write(str(soup))
