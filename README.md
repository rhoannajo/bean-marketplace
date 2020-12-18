# How to Run Bean Marketplace at localhost port 3000

1. Database - Run MongoDb on default port

2. Backend - Run RestServer.java @ final-project-bean/back_end/src/main/java/RestServer.java
    
    If you get "Error opening socket" in the console, use your terminal to kill the process on port 1299
         Example On MacOs:
            1. in terminal enter "lsof -i tcp:1299"
            2. Check the PID of procces then enter "kill -9 <PID>"
            3. Now you can run the backend following step 2


3. Frontend - follow instructions below

## Navigate to final-project-bean/front_end then:

### First Time
enter "npm i" in the terminal

### To Run
enter "npm start" to run the frontend

Now you're good to go, navigate to http://localhost:3000 in your browser and post, edit, view, and delete listings.

### Additional Features
  1. Added a timestamp for each listing, says either posted or edited to let the users know if the listing was edited and timestamp was updated.
  2. Added individual listing pages, clicking on a listing in the feed page will take you to a new page with only that listing.
  3. Each listing has an image to depict the type of clothing posted.
