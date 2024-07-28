import os

# Directory containing your HTML files
directory = r'C:\Users\HP\Documents\GitHub\dashflix\movies'  # Replace with your actual directory path

# Line to be removed
line_to_remove = '<link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>\n'

def remove_font_links(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    lines = f.readlines()
                with open(filepath, 'w') as f:
                    for line in lines:
                        if line != line_to_remove:
                            f.write(line)

# Call the function to remove font links recursively
remove_font_links(directory)
