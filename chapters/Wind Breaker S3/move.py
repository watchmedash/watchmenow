from bs4 import BeautifulSoup
import os

def move_script_tag(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    script_tag = soup.find('script', {'src': 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2412399424552673'})
    if script_tag:
        head_tag = soup.find('head')
        if head_tag:
            if not script_tag.parent == head_tag:
                script_tag.extract()
                head_tag.append(script_tag)
    return str(soup)

def process_html_file(file_path):
    with open(file_path, 'r') as file:
        html_content = file.read()

    modified_html = move_script_tag(html_content)

    with open(file_path, 'w') as file:
        file.write(modified_html)

def main():
    current_directory = os.getcwd()
    for filename in os.listdir(current_directory):
        if filename.endswith('.html'):
            file_path = os.path.join(current_directory, filename)
            process_html_file(file_path)
            print(f"Processed: {file_path}")

if __name__ == "__main__":
    main()
