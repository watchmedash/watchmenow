import os

def replace_url_in_file(file_path, old_url, new_url):
    with open(file_path, 'r', encoding='utf-8') as file:
        file_content = file.read()

    updated_content = file_content.replace(old_url, new_url)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(updated_content)

def replace_url_in_folder(folder_path, old_url, new_url):
    for filename in os.listdir(folder_path):
        if filename.endswith('.html'):
            file_path = os.path.join(folder_path, filename)
            replace_url_in_file(file_path, old_url, new_url)

if __name__ == "__main__":
    folder_path = os.getcwd()  # Get the current working directory
    old_url = "https://i.postimg.cc/NFcfvt3D/logo.webp"
    new_url = "https://i.postimg.cc/85H56CW3/logo-copy1.webp"

    replace_url_in_folder(folder_path, old_url, new_url)
    print("URLs replaced successfully.")
