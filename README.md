# Feast Forward

This is the final project of the National Taiwan University Software Engineering course in the first semester of 2023.

If you have any problem running this application, please DM us or send an issue on github!

## Required Tools

- NodeJS 20.9
    - You can install it from [nodejs.org](https://nodejs.org/). If you want to manage multiple versions, you can use [node version manager](https://github.com/nvm-sh/nvm).
- Java 17
    - You can install it from [oracle](https://www.oracle.com/java/technologies/downloads/). If you want to manage multiple versions, you can adjust your `JAVA_HOME` or use [SDKMAN!](https://sdkman.io).
- MySQL 8.0.35
    - You can install [mySQL community Server](https://dev.mysql.com/downloads/mysql/).
- Google Cloud Platform (GCP)
- Google App Key

## Configuration and Setup

During the development phase, the frontend will operate on port 3000, the backend on 8080, and the MySQL database on 3306. You are free to modify these as needed.

### Frontend - ReactJs
The configuration for `frontend/src/services/apiConfig.json` needs to be adjusted as described below:

```json
{
    "API_URL": "http://localhost:8080/api"
}
```

This setup enables connection to the backend during the development phase. Modifications may be necessary for the testing and production phases.

### Database
Run `database/feastforward.sql` in MySQL database.

```sh
# please change `username` to your actual MySQL database username
mysql -u username -p < database/feastforward.sql
```

This file is responsible for generating a database named `feastforward` and preloading the essential tables and values required for the proper functioning of the backend.

### Backend - Google Cloud Platform (GCP)
We use Google Cloud Platform to store the files. Please do the following instruction.

1. login to you [GCP](https://console.cloud.google.com)
2. Apply for a new project, please copy and keep your **Project ID** for future purpose.
3. Apply for a Cloud Storage Bucket, please copy and keep your **Bucket Name** for future purpose.
4. Apply for a Service Account. In your service account -> Action -> Manage Key -> Create New Key. Please create and download a **json key** for this project.

All the information above will be used in backend configuration.

### Backend - Gmail
We use Google App Password to send email.

1. Go to your Google Account.
2. Select Security.
3. Under "Signing in to Google," select 2-Step Verification.
4. At the bottom of the page, select App passwords.
5. Enter a name that helps you remember where you’ll use the app password.
6. Select Generate.
7. To enter the app password, follow the instructions on your screen. 
8. The app password is the 16-character code that generates on your device.
9. Please copy and keep your app password.

### Backend - Spring Boot
1. Go to `backend/src/main/resouces` directory. 
2. Copy `application.properties.default` and rename it to `application-dev.properties`.
3. Put your Google Cloud json key file into this directory.
4. In `application-dev.properties`, please change the values in parentheses to your setting. You probably won't need to change other values.

```
### MySQL Properties
spring.datasource.username={database_username}
spring.datasource.password={database_password}

## Mail Properties
spring.mail.username={gmail_account}
spring.mail.password={16-character_app_password}

## File Properties
spring.cloud.gcp.project-id={gcp_project_id}
spring.cloud.gcp.credentials.location=classpath:{json_key_filename}
gcp.bucket.name={gcp_storage_bucket_name}
```

## Run This Project

After all these settings, you should finally able to run this porject!!!

Open 2 command line tools / terminals, both changed directory to this project directory, one for frontend and the other for backend.

### Frontend
1. choose one of the command line, and change directory to `frontend/`
2. use `npm install` to install all the necessary packages. (npm is a package manager for NodeJS.)
3. `npm start` to start the execution.
4. please open `http://localhost:3000` to see it.

These are all the command you need
```sh
cd frontend
npm install
npm start
``` 

### Backend
1. choose the other one of the command line, and change directory to `backend/`
2. use `./mvnw spring-boot:run` to run this project. (mvnw is maven script that help install the dependencies and run the project)

These are all the command you need
```sh
cd backend
./mvnw spring-boot:run
```

If `./mvnw` doesn't work for you, try install Maven and run `mvn spring-boot:run`
