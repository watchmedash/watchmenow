from bs4 import BeautifulSoup
import os

# Define the HTML to insert
html_to_insert = '<div class="button-container"><a href="../contact.html" class="watch-now-bur">Report Error!</a></div>'

# Get a list of HTML files in the current directory
html_files = [file for file in os.listdir() if file.endswith('.html')]

# Loop through each HTML file
for file_name in html_files:
    with open(file_name, 'r') as file:
        # Parse the HTML content
        soup = BeautifulSoup(file, 'html.parser')

        # Find the target element to insert the new HTML after
        target_element = soup.find('div', class_='sharethis-inline-reaction-buttons')

        # Check if the target element is found
        if target_element:
            # Create the new HTML element
            new_element = BeautifulSoup(html_to_insert, 'html.parser')

            # Insert the new element after the target element
            target_element.insert_after(new_element)

            # Save the modified HTML back to the file
            with open(file_name, 'w') as output_file:
                output_file.write(str(soup))
                print(f"Added 'Report Error' button to {file_name}")
        else:
            print(f"No target element found in {file_name}. 'Report Error' button not added.")
