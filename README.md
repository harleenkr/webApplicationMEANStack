MEAN Stack web application

# Dependencies

Run 'npm install -g @angular/cli' to install CLI using npm package manager.

Run 'ng new webApplicationMEANStack' to create the project.

Run 'ng serve' to build the application and serve it locally, the server automatically rebuilds the app and reloads the page when you change amy of the source files.

Download and install nodejs, npm, and mongodb.

Store the below mentioned two commands in Start_MongoDB.bat file -

cd C:\Program Files\MongoDB\Server\4.2\bin
mongod.exe --dbpath C:\Users\Prableen\mongo-data


Place Start_MongoDB.bat on desktop and click it to start the mongodb on localhost:27017 from terminal.

Run 'nodemon index.js from webApplicationMEANStack/backend' terminal to start the backend.

Run 'ng serve --port 4200' from terminal to start the frontEnd and hit 'http://localhost:4200/' on browser to start the application.


# FrontEnd

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# BackEnd

Navigate to `http://localhost:3030/ContactMEAN` to see list of contacts from MongoDB.

# Database

MongoDB database is used for storing all the contacts. Database name is - ContactsDB and Collection is - contacts. Postman can be used to test the APIs.