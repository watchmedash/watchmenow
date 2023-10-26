import os
import re

# Define a regular expression pattern to match and remove the specified script code
script_pattern_to_remove = re.compile(r'<script>\s*window\.yaContextCb\.push\(\(\)\s*=>\s*{\s*Ya\.Context\.AdvManager\.render\({\s*"blockId":\s*"R-A-2752621-1",\s*"renderTo":\s*"yandex_rtb_R-A-2752621-1"\s*}\)\s*}\)\s*</script>', re.DOTALL)

# Define a regular expression pattern to match and remove the specified comment and <div> element
comment_and_div_pattern_to_remove = re.compile(r'<!-- Yandex\.RTB R-A-2752621-1 -->\s*<div id="yandex_rtb_R-A-2752621-1">\s*</div>', re.DOTALL)

# Get the current directory (where the script is located)
current_directory = os.path.dirname(os.path.abspath(__file__))

# Get a list of HTML files in the current directory
html_files = [file for file in os.listdir(current_directory) if file.endswith(".html")]

# Loop through each HTML file
for filename in html_files:
    with open(os.path.join(current_directory, filename), "r", encoding="utf-8") as file:
        html_content = file.read()

    # Use regular expressions to remove the specified script code
    modified_html_content = script_pattern_to_remove.sub("", html_content)

    # Use regular expressions to remove the specified comment and <div> element
    modified_html_content = comment_and_div_pattern_to_remove.sub("", modified_html_content)

    # Save the modified HTML back to the file
    with open(os.path.join(current_directory, filename), "w", encoding="utf-8") as file:
        file.write(modified_html_content)

print("Specified script, comment, and <div> element removed from HTML files successfully.")
