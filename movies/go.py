from bs4 import BeautifulSoup
import os

# Function to remove all occurrences of div with class "terra" and their contents from HTML file
def remove_terra_divs(file_path):
    with open(file_path, "r") as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, "html.parser")
    terras = soup.find_all("div", class_="terra")
    for terra in terras:
        terra.decompose()

    with open(file_path, "w") as f:
        f.write(str(soup))

# Function to process all HTML files in the directory where the script is located
def process_html_files_in_current_directory():
    current_directory = os.path.dirname(os.path.abspath(__file__))
    for filename in os.listdir(current_directory):
        if filename.endswith(".html"):
            file_path = os.path.join(current_directory, filename)
            remove_terra_divs(file_path)
            print(f"Processed: {file_path}")

# Process HTML files in the directory where the script is located
process_html_files_in_current_directory()
