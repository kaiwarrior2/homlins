import re

files = ['karl.html', 'leo.html', 'vitya.html', 'gallery.html', 'history.html']

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Добавляем {% load static %} в начало
    if '{% load static %}' not in content:
        content = '{% load static %}\n' + content
    
    # Заменяем href="style.css"
    content = re.sub(r'href="style\.css"', r'href="{% static \'style.css\' %}"', content)
    
    # Заменяем src="..." для изображений и скриптов
    content = re.sub(r'src="(img/[^"]+)"', r'src="{% static \'\1\' %}"', content)
    content = re.sub(r'src="(icn/[^"]+)"', r'src="{% static \'\1\' %}"', content)
    content = re.sub(r'src="(fonts/[^"]+)"', r'src="{% static \'\1\' %}"', content)
    content = re.sub(r'src="([^"]+\.js)"', r'src="{% static \'\1\' %}"', content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'OK {filename} обновлен')
