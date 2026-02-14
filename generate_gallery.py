import os

photos = []
for file in os.listdir('img'):
    if file.endswith('.jpg'):
        photos.append(file)

photos.sort()

html = ''
for i, photo in enumerate(photos, 1):
    html += f'''            <div class="gallery-item" onclick="openModal('img/{photo}')">
                <img src="img/{photo}" alt="Фото {i}">
            </div>
'''

with open('gallery_items.txt', 'w', encoding='utf-8') as f:
    f.write(html)

print(f'Создано {len(photos)} элементов галереи')
