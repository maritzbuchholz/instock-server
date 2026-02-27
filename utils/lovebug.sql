DROP DATABASE IF EXISTS `lovebug`;

CREATE DATABASE `lovebug`;

USE `lovebug`;

CREATE TABLE `users` (
    `user_id` varchar(36) NOT NULL DEFAULT (UUID()),
    `name` varchar(255) DEFAULT NULL,
    `age` int DEFAULT NULL,
    `education` int DEFAULT NULL,
    `location` varchar(255) DEFAULT NULL,
    `career_field` varchar(255) DEFAULT NULL,
    `career_ambition` int DEFAULT NULL,
    `openness` float DEFAULT NULL,
    `extraversion` float DEFAULT NULL,
    `agreeableness` float DEFAULT NULL,
    `conscientiousness` float DEFAULT NULL,
    `chronotype` varchar(50) DEFAULT NULL,
    `spontaneity` int DEFAULT NULL,
    `love_language` varchar(100) DEFAULT NULL,
    `emotional_expressiveness` int DEFAULT NULL,
    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `matches` (
    `match_id` varchar(36) NOT NULL DEFAULT (UUID()),
    `user_a_id` varchar(50) NOT NULL,
    `user_b_id` varchar(50) NOT NULL,
    `compatibility_score` float DEFAULT NULL,
    `is_compatible` boolean DEFAULT NULL,
    `relationship_longevity_months` int DEFAULT NULL,
    PRIMARY KEY (`match_id`),
    FOREIGN KEY (`user_a_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_b_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (`name`, `age`, `education`, `location`, `career_field`, `career_ambition`, `openness`, `extraversion`, `agreeableness`, `conscientiousness`, `chronotype`, `spontaneity`, `love_language`, `emotional_expressiveness`) VALUES ('Liam', 46, 3, 'Suburban', 'Healthcare', 0.23, 0.67, 0.78, 0.32, 0.49, 'Night Owl', 5, 'Quality Time', 7),('Sophia', 42, 4, 'Urban', 'Tech', 0.61, 0.67, 0.50, 0.20, 0.19, 'Early Bird', 3, 'Quality Time', 7),('Ethan', 25, 4, 'Rural', 'Marketing', 0.59, 0.33, 0.87, 0.64, 0.82, 'Night Owl', 8, 'Physical Touch', 5),('Isabella', 28, 5, 'Urban', 'Engineering', 0.84, 0.30, 0.49, 0.43, 0.84, 'Early Bird', 4, 'Physical Touch', 8);

INSERT INTO `matches` (`user_a_id`, `user_b_id`, `compatibility_score`, `is_compatible`, `relationship_longevity_months`)VALUES ((SELECT user_id FROM users WHERE name = 'Liam'),(SELECT user_id FROM users WHERE name = 'Sophia'),43.5, 0, 60),((SELECT user_id FROM users WHERE name = 'Ethan'),(SELECT user_id FROM users WHERE name = 'Isabella'),74.3, 1, 84);