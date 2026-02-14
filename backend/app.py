from flask import Flask, request, jsonify
from flask_cors import CORS
from models.text_analyzer import TextAnalyzer
import re

app = Flask(__name__)
CORS(app)

analyzer = TextAnalyzer()

def analyze_text_structure(text):
    sentences = [s.strip() for s in re.split(r'[.!?]+', text) if s.strip()]
    words = text.split()
    
    descriptive_words = ['красивый', 'маленький', 'большой', 'добрый', 'мудрый', 
                        'веселый', 'яркий', 'тихий', 'старый', 'молодой', 
                        'милый', 'умный', 'смелый', 'храбрый', 'сильный']
    
    has_descriptive = any(word in text.lower() for word in descriptive_words)
    
    score = 0
    feedback = []
    
    if len(sentences) >= 8:
        score += 40
        feedback.append(f'✓ Достаточное количество предложений ({len(sentences)})')
    elif len(sentences) >= 1:
        score += 20
        feedback.append(f'⚠ Мало предложений ({len(sentences)}). Рекомендуется: 8+')
    else:
        feedback.append('❌ Нет предложений')
    
    if has_descriptive:
        score += 30
        feedback.append('✓ Использованы описательные прилагательные')
    else:
        feedback.append('⚠ Добавьте больше описательных прилагательных')
    
    if len(words) >= 100:
        score += 30
        feedback.append(f'✓ Достаточный объем текста ({len(words)} слов)')
    elif len(words) >= 1:
        score += 15
        feedback.append(f'⚠ Мало слов ({len(words)}). Рекомендуется: 100+')
    else:
        feedback.append('❌ Нет текста')
    
    return {'score': score, 'feedback': feedback}

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json
    text = data.get('text', '')
    character = data.get('character', '')
    
    if not text:
        return jsonify({'error': 'Текст не предоставлен'}), 400
    
    structure_analysis = analyze_text_structure(text)
    neural_analysis = analyzer.analyze(text)
    
    final_score = (structure_analysis['score'] + neural_analysis['quality_score']) / 2
    
    return jsonify({
        'score': round(final_score),
        'structure': structure_analysis,
        'neural': neural_analysis,
        'character': character
    })

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
