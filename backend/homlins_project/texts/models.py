from django.db import models

class UserText(models.Model):
    character_name = models.CharField(max_length=50, verbose_name='Персонаж')
    text_content = models.TextField(verbose_name='Текст')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    
    class Meta:
        verbose_name = 'Текст пользователя'
        verbose_name_plural = 'Тексты пользователей'
        ordering = ['-created_at']
    
    def __str__(self):
        return f'{self.character_name} - {self.created_at.strftime("%Y-%m-%d %H:%M")}'
