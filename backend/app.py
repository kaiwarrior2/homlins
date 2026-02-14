from flask import Flask, request, jsonify
from flask_cors import CORS
from database.db import Database

app = Flask(__name__)
CORS(app)
db = Database()

@app.route('/api/save-text', methods=['POST'])
def save_text():
    data = request.json
    character = data.get('character', '')
    text = data.get('text', '')
    
    if not character or not text:
        return jsonify({'error': 'Не указан персонаж или текст'}), 400
    
    text_id = db.save_text(character, text)
    
    if text_id:
        return jsonify({'success': True, 'id': text_id})
    else:
        return jsonify({'error': 'Ошибка сохранения'}), 500

@app.route('/api/get-texts', methods=['GET'])
def get_texts():
    texts = db.get_all_texts()
    return jsonify({'texts': texts})

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
