import os

# Get the current directory where the script is located
script_dir = os.path.dirname(os.path.abspath(__file__))

# Iterate through all HTML files in the current directory
for filename in os.listdir(script_dir):
    if filename.endswith(".html"):
        file_path = os.path.join(script_dir, filename)
        with open(file_path, "r") as file:
            content = file.read()

        # Check if the attribute is already present in the <body> tag
        if 'oncontextmenu="return false;"' not in content:
            # Add the attribute to the <body> tag
            content = content.replace("<body>", '<body oncontextmenu="return false;">')

            # Write the modified content back to the file
            with open(file_path, "w") as file:
                file.write(content)

print("Done! Attribute added to all HTML files in the current directory.")
