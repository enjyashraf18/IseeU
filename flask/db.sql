CREATE TABLE users_table (
    uid serial primary key ,
    name character varying(200) NOT NULL,
    email character varying(200) UNIQUE NOT NULL,
    password character varying(200) not null ,
    facebook character varying(200),
    instagram character varying(200),
    gender character varying(200) not null ,
    age integer not null
);

CREATE TABLE posts_table (
    pid serial primary key ,
    title character varying(100) NOT NULL,
    date_posted date DEFAULT CURRENT_DATE NOT NULL,
    content character varying(300) NOT NULL,
    user_id integer
);

ALTER TABLE posts_table
ADD FOREIGN KEY (user_id) REFERENCES users_table (uid)
