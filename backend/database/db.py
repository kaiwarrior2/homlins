import mysql.connector
from mysql.connector import Error

class Database:
    def __init__(self):
        self.host = 'localhost'
        self.user = 'root'
        self.password = ''  # Укажите ваш пароль
        self.database = 'homlins_db'
        
    def get_connection(self):
        try:
            connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database,
                charset='utf8mb4'
            )
            return connection
        except Error as e:
            print(f"Ошибка подключения к MySQL: {e}")
            return None
    
    def save_text(self, character_name, text_content):
        connection = self.get_connection()
        if connection:
            try:
                cursor = connection.cursor()
                query = "INSERT INTO user_texts (character_name, text_content) VALUES (%s, %s)"
                cursor.execute(query, (character_name, text_content))
                connection.commit()
                return cursor.lastrowid
            except Error as e:
                print(f"Ошибка сохранения: {e}")
                return None
            finally:
                cursor.close()
                connection.close()
        return None
    
    def get_all_texts(self):
        connection = self.get_connection()
        if connection:
            try:
                cursor = connection.cursor(dictionary=True)
                cursor.execute("SELECT * FROM user_texts ORDER BY created_at DESC")
                return cursor.fetchall()
            except Error as e:
                print(f"Ошибка получения данных: {e}")
                return []
            finally:
                cursor.close()
                connection.close()
        return []
