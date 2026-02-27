DROP DATABASE IF EXISTS `lovebug`;

CREATE DATABASE `lovebug`;

USE `lovebug`;

CREATE TABLE `match` (
    `match_id` varchar(50) NOT NULL,
    
    `a_age` int DEFAULT NULL,
    `a_education` int DEFAULT NULL,
    `a_location` varchar(255) DEFAULT NULL,
    `a_career_field` varchar(255) DEFAULT NULL,
    `a_career_ambition` int DEFAULT NULL,
    `a_openness` float DEFAULT NULL,
    `a_extraversion` float DEFAULT NULL,
    `a_agreeableness` float DEFAULT NULL,
    `a_conscientiousness` float DEFAULT NULL,
    `a_chronotype` varchar(50) DEFAULT NULL,
    `a_spontaneity` int DEFAULT NULL,
    `a_love_language` varchar(100) DEFAULT NULL,
    `a_emotional_expressiveness` int DEFAULT NULL,
    
    `b_age` int DEFAULT NULL,
    `b_education` int DEFAULT NULL,
    `b_location` varchar(255) DEFAULT NULL,
    `b_career_field` varchar(255) DEFAULT NULL,
    `b_career_ambition` int DEFAULT NULL,
    `b_openness` float DEFAULT NULL,
    `b_extraversion` float DEFAULT NULL,
    `b_agreeableness` float DEFAULT NULL,
    `b_conscientiousness` float DEFAULT NULL,
    `b_chronotype` varchar(50) DEFAULT NULL,
    `b_spontaneity` int DEFAULT NULL,
    `b_love_language` varchar(100) DEFAULT NULL,
    `b_emotional_expressiveness` int DEFAULT NULL,
    
    `compatibility_score` float DEFAULT NULL,
    `compatible` boolean DEFAULT NULL,
    `relationship_longevity_months` int DEFAULT NULL,

    PRIMARY KEY (`match_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `match` (`match_id`, `a_age`, `a_location`, `a_career_field`, `b_age`, `b_location`, `b_career_field`, `compatibility_score`, `compatible`) VALUES ('match_001', 25, 'Urban', 'Technology', 27, 'Urban', 'Healthcare', 0.89, 1),('match_002', 31, 'Suburban', 'Education', 29, 'Urban', 'Finance', 0.45, 0),('match_003', 22, 'Rural', 'Art', 24, 'Suburban', 'Technology', 0.72, 1);