import os
import re

# Directory where the script is located (same folder as HTML files)
script_directory = os.path.dirname(os.path.abspath(__file__))

# Define the search pattern for the link to be replaced
search_pattern = r'src="https://i.postimg.cc/nz8nqZhx/favicon\.png"'

# Define the replacement string
replacement_string = 'href="https://i.postimg.cc/nz8nqZhx/favicon.png"'

def replace_links_in_file(file_path):
    with open(file_path, 'r') as file:
        html_content = file.read()

    # Replace all occurrences of the search pattern with the replacement string
    updated_html_content = re.sub(search_pattern, replacement_string, html_content)

    with open(file_path, 'w') as file:
        file.write(updated_html_content)

# Iterate through HTML files in the script directory
for filename in os.listdir(script_directory):
    if filename.endswith('.html'):
        file_path = os.path.join(script_directory, filename)
        replace_links_in_file(file_path)

print("Links replaced in HTML files in the script directory.")
