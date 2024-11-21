import re
import os

# Path to the Lookism.txt file
file_path = 'Lookism.txt'

# Directory where the HTML files are located
html_dir = 'chapters/Lookism/'

# Function to extract chapter number from URL
def extract_chapter_number(url):
    match = re.search(r'Lookism/(\d+)-\d+\.png', url)
    return match.group(1) if match else None

# Function to update HTML file
def update_html_file(chapter_number, image_range):
    # Generate file name based on chapter number
    file_name = f"chapter{int(chapter_number):04}.html"
    file_path = os.path.join(html_dir, file_name)

    if not os.path.exists(file_path):
        print(f"File {file_name} does not exist.")
        return

    # Read the HTML file
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Generate the new image URLs based on the image range
    base_url = 'https://official.lowee.us/manga/Lookism/'
    images = []
    start, end = map(int, image_range.split('-'))
    for i in range(start, end + 1):
        image_url = f"{base_url}{chapter_number}-{i:03}.png"
        images.append(f'<img class="chapter-image" src="{image_url}" alt="Dashtoons {i}"/>')

    # Update the HTML content with the new images
    new_content = re.sub(r'<!-- Generated list of images from \d+-\d+ -->', '<!-- Generated list of images from {0}-{1} -->'.format(start, end), content)
    new_content = re.sub(r'(<div id="content">.*?</div>)', '<div id="content">\n' + '\n'.join(images) + '\n</div>', new_content, flags=re.DOTALL)

    # Write the updated content back to the HTML file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(new_content)

# Read URLs from the file and update corresponding HTML files
with open(file_path, 'r') as file:
    for line in file:
        line = line.strip()
        if line:
            chapter_number = extract_chapter_number(line)
            if chapter_number:
                image_range = line.split('/')[-1].split('.')[0].split('-')[1]
                update_html_file(chapter_number, image_range)
            else:
                print(f"Could not extract chapter number from URL: {line}")
