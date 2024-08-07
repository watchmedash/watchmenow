from bs4 import BeautifulSoup
import os

# Function to remove specified HTML elements from HTML file
def remove_html_elements(html_file):
    with open(html_file, 'r') as file:
        content = file.read()

    soup = BeautifulSoup(content, 'html.parser')

    # Find all div elements with class 'terra'
    divs_to_remove = soup.find_all('div', class_='terra')

    for div_to_remove in divs_to_remove:
        script_tag = div_to_remove.find('script', type='text/javascript')
        if (
            script_tag
            and 'perilastronaut.com' in script_tag.get('src', '')
            and "'key' : '934ec5b41bf950cb7d7b784fb2bcc1d8'" in str(div_to_remove)
        ):
            div_to_remove.extract()

    # Save the modified content back to the file
    with open(html_file, 'w') as file:
        file.write(str(soup))

# Get the path to the directory containing the script and HTML files
script_directory = os.path.dirname(os.path.abspath(__file__))
html_files_directory = script_directory

# Loop through each HTML file in the directory
for filename in os.listdir(html_files_directory):
    if filename.endswith('.html'):
        html_file_path = os.path.join(html_files_directory, filename)
        remove_html_elements(html_file_path)

print("HTML elements removal complete.")
