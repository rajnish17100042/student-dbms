-- table creation for student registration form  
CREATE TABLE `student-dbms`.`student_registration` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `phone` VARCHAR(13) NOT NULL , `address` TEXT NOT NULL , `city` VARCHAR(255) NOT NULL , `state` VARCHAR(255) NOT NULL , `pincode` INT(20) NOT NULL , `batch` VARCHAR(255) NOT NULL , `admission_date` VARCHAR(255) NOT NULL , `personal_mentor` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `registered_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`), UNIQUE (`email`)) ENGINE = InnoDB;


-- table creation for teacher registration 
CREATE TABLE `student-dbms`.`teacher_registration` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `phone` VARCHAR(13) NOT NULL , `address` TEXT NOT NULL , `city` VARCHAR(255) NOT NULL , `state` VARCHAR(255) NOT NULL , `pincode` VARCHAR(255) NOT NULL , `qualification` VARCHAR(255) NOT NULL , `experience` VARCHAR(255) NOT NULL , `joining_date` VARCHAR(255) NOT NULL , `salary` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `registered_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`), UNIQUE `email` (`email`)) ENGINE = InnoDB;


-- table creation for admin registration 
CREATE TABLE `student-dbms`.`admin_registration` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `phone` VARCHAR(255) NOT NULL , `address` TEXT NOT NULL , `city` VARCHAR(255) NOT NULL , `state` VARCHAR(255) NOT NULL , `pincode` VARCHAR(255) NOT NULL , `joining_date` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `registered_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`), UNIQUE `email` (`email`)) ENGINE = InnoDB;


-- table creation for notice 

CREATE TABLE `student-dbms`.`notice_board` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `group` VARCHAR(255) NOT NULL , `notice_date` VARCHAR(255) NOT NULL , `subject` VARCHAR(255) NOT NULL , `notice` TEXT NOT NULL , `issued_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB;


--table creation for career section
CREATE TABLE `student-dbms`.`career_section` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `phone` VARCHAR(13) NOT NULL , `qualification` VARCHAR(255) NOT NULL , `experience` VARCHAR(255) NOT NULL , `resume` VARCHAR(255) NOT NULL , `applied_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`), UNIQUE `email` (`email`)) ENGINE = InnoDB;