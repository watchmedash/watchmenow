import os
from bs4 import BeautifulSoup

def add_codes_to_file(file_path, code_above_head):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    soup = BeautifulSoup(content, 'html.parser')

    # Add code above </head>
    head_tag = soup.find('head')
    if head_tag:
        new_code_above_head = BeautifulSoup(code_above_head, 'html.parser')
        head_tag.insert_before(new_code_above_head)

    # Update the file with the modified content
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(str(soup))

def process_html_files(directory_path, code_above_head):
    for filename in os.listdir(directory_path):
        if filename.endswith(".html"):
            file_path = os.path.join(directory_path, filename)
            add_codes_to_file(file_path, code_above_head)
            print(f"Codes added to {filename}")

# Get the current working directory
current_directory = os.getcwd()

# Specify the code you want to add above </head>
code_above_head = '''
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2412399424552673"
     crossorigin="anonymous"></script>
'''

# Use the current directory as the base path
process_html_files(current_directory, code_above_head)
