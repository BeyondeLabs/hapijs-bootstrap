CREATE TABLE user(
  id int primary key auto_increment,
  name varchar(100),
  email varchar(200),
  username varchar(100),
  date_created timestamp default current_timestamp
);
