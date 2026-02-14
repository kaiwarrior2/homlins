CREATE DATABASE IF NOT EXISTS homlins_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE homlins_db;

CREATE TABLE IF NOT EXISTS user_texts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    character_name VARCHAR(50) NOT NULL,
    text_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_character (character_name),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
