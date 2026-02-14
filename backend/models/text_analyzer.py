import torch
import torch.nn as nn
from transformers import AutoTokenizer, AutoModel

class TextAnalysisModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.bert = AutoModel.from_pretrained('cointegrated/rubert-tiny2')
        self.dropout = nn.Dropout(0.3)
        self.quality_head = nn.Linear(312, 1)
        self.toxicity_head = nn.Linear(312, 1)
        
    def forward(self, input_ids, attention_mask):
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        pooled = outputs.last_hidden_state[:, 0]
        pooled = self.dropout(pooled)
        
        quality_score = torch.sigmoid(self.quality_head(pooled))
        toxicity_score = torch.sigmoid(self.toxicity_head(pooled))
        
        return quality_score, toxicity_score

class TextAnalyzer:
    def __init__(self):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.tokenizer = AutoTokenizer.from_pretrained('cointegrated/rubert-tiny2')
        self.model = TextAnalysisModel().to(self.device)
        self.model.eval()
        
    def analyze(self, text):
        inputs = self.tokenizer(text, return_tensors='pt', truncation=True, 
                               max_length=512, padding=True)
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        
        with torch.no_grad():
            quality, toxicity = self.model(**inputs)
            
        return {
            'quality_score': float(quality[0]) * 100,
            'toxicity_score': float(toxicity[0]) * 100,
            'is_appropriate': float(toxicity[0]) < 0.3
        }
