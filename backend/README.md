## Maven Plugins

- Make sure Maven is installed on your PATH
- For mac, you can use Homebrew to install Maven as `brew install maven`

## Prerequisites

- Copy backend/src/main/resources/application.properties.default
- Rename it as application-dev.properties
- Enter your MySQL personal info in application.properties

```
mysql -h localhost -u <username> <password>
create database <db-name>
connect <db-name>
```

- Insert Role entries into MySQL as follows:

```
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
```

## Run backend program

```
mvn spring-boot:run
```
