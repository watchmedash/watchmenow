import os
import re

def remove_code_from_file(file_path, code_to_remove):
    with open(file_path, 'r') as file:
        content = file.read()

    # Use regular expression to remove the specified code
    updated_content = re.sub(code_to_remove, '', content, flags=re.DOTALL)

    with open(file_path, 'w') as file:
        file.write(updated_content)

def process_html_files(directory_path, code_to_remove):
    for filename in os.listdir(directory_path):
        if filename.endswith(".html"):
            file_path = os.path.join(directory_path, filename)
            remove_code_from_file(file_path, code_to_remove)
            print(f"Code removed from {filename}")

# Get the current working directory
current_directory = os.getcwd()

# Specify the code you want to remove
code_to_remove = r'<script type="text/javascript">.*?</script>'

# Use the current directory as the base path
process_html_files(current_directory, code_to_remove)
