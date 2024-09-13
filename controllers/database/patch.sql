CREATE TABLE Classe (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    classe_id INT,
    cerated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (classe_id) REFERENCES Classe(id) ON DELETE CASCADE
);

CREATE TABLE Formateur (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    date_de_naissance DATE,
    specialite VARCHAR(255),
    adresse VARCHAR(255),
    cerated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL 
);

CREATE TABLE Apprenants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    date_de_naissance DATE,
    date_inscription DATE,
    adresse VARCHAR(255),
    classe_id INT,
    cerated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (classe_id) REFERENCES Classe(id) ON DELETE CASCADE
);

CREATE TABLE Sujet (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title varchar(100),
    description text ,
    parent_id INT NULL,
    formateur_id INT,
    cerated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (parent_id) REFERENCES Sujet(id) ON DELETE SET NULL,  
    FOREIGN KEY (formateur_id) REFERENCES Formateur(id) ON DELETE CASCADE  
);

CREATE TABLE Niveau (
    id INT PRIMARY KEY AUTO_INCREMENT,
    niveau VARCHAR(255),
    description TEXT,
    max INT,
    min INT,
    cerated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE Test (
    id INT PRIMARY KEY AUTO_INCREMENT,
    score_validation INT,
    limit_tentative INT,
    total_points INT,
    cerated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE Passage (
    id INT PRIMARY KEY AUTO_INCREMENT,
    remarque TEXT,
    score INT,
    date TIMESTAMP,
    raison TEXT,
    isValider BOOLEAN,
    test_id INT,
    apprenant_id INT,
    cerated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (test_id) REFERENCES Test(id) ON DELETE CASCADE,
    FOREIGN KEY (apprenant_id) REFERENCES Apprenants(id) ON DELETE CASCADE
);

CREATE TABLE Question (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('QSM', 'QSU', 'QDirect'),
    question TEXT,
    points INT,
    nbr_reponse INT,
    sujet_id INT,
    niveau_id INT,
    cerated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (sujet_id) REFERENCES Sujet(id) ON DELETE CASCADE,
    FOREIGN KEY (niveau_id) REFERENCES Niveau(id) ON DELETE CASCADE
);

CREATE TABLE Reponse (
    id INT PRIMARY KEY AUTO_INCREMENT,
    reponse TEXT,
    is_correct BOOLEAN,
    question_id INT,
    cerated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (question_id) REFERENCES Question(id) ON DELETE CASCADE
);

CREATE TABLE Media (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('Image', 'Video', 'Figure', 'sons'),
    path TEXT,
    question_id INT,
    cerated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (question_id) REFERENCES Question(id) ON DELETE CASCADE
);

CREATE TABLE Question_reponse (
    question_id INT,
    reponse_id INT,
    passage_id INT,
    isCorrect BOOLEAN,
    cerated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (question_id, reponse_id, passage_id),
    FOREIGN KEY (question_id) REFERENCES Question(id) ON DELETE CASCADE,
    FOREIGN KEY (passage_id) REFERENCES Passage(id) ON DELETE CASCADE,
    FOREIGN KEY (reponse_id) REFERENCES Reponse(id) ON DELETE CASCADE
);
