import os
import fileinput

def replace_text_in_files(directory, old_text, new_text):
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            with fileinput.FileInput(filepath, inplace=True) as file:
                for line in file:
                    print(line.replace(old_text, new_text), end='')

# Replace the specified text in all HTML files in the current directory
replace_text_in_files('.', '<img class="chapter-image" src="https://i.postimg.cc/HW32Q2CM/WATCH-NOW-BANNER.gif" alt="Dashtoons">',
                       '''<a href="https://watchmenow.live/">
  <img class="chapter-image" src="https://i.postimg.cc/HW32Q2CM/WATCH-NOW-BANNER.gif" alt="Dashtoons">
</a>''')
