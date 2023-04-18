# Mobile-spotAdvisor

- **Group**: 8
- **Members**:
  - Xiaotong Guan <guan.xiao@northeastern.edu>
  - Yudong Yang    <yang.yud@northeastern.edu>
  - Yongxiang Chen <chen.yongx@northeastern.edu>

## Install dependencies
In order to install, clone this repository and run:
> npm install  

Set up .env file
> apiKey =  "AIzaSyD9lpNVN22HxNO0xnP33Z8kmKyyqAGuzOg"
authDomain = "trip-advisor-curd.firebaseapp.com"
projectId = "trip-advisor-curd"
storageBucket =  "trip-advisor-curd.appspot.com"
messagingSenderId = "843970286871"
appId =  "1:843970286871:web:6d6a6dc2cfa5e3087d1352"
mapKey = "AIzaSyAUqj-MaSuFP8gaFozOAQB5Ri_Zogz9YnA"


This was made with Expo, so you need it to run. To do it, run:
> npm start  
 //OR  
> npm expo start --tunnel


## Structure of the App
### 1. Signin or Signup page
- Users have to lognin to review all the spots written by other users.
- If users don't have an account, users can just sign up for one.

<img src="https://github.com/guanxiaotongyz/Mobile-spotAdviosr/blob/main/pictures/Login.png" height="300" alt="loginpage"/>

<img src="https://github.com/guanxiaotongyz/Mobile-spotAdviosr/blob/main/pictures/Signup.png" height="300" alt="signuppage"/>



### 2. Home page
- Show users the spots already in the firebase written by other users.

<img src="https://github.com/guanxiaotongyz/Mobile-spotAdviosr/blob/main/pictures/Home.png" height="300" alt="homepage"/>


### 2. Add the spot page
- Allow users to add the spot

<img src="https://github.com/guanxiaotongyz/Mobile-spotAdviosr/blob/main/pictures/AddSpot.png" height="300" alt="addspotpage"/>

  
### 3. Spot details page
- Allow user to see the details of the spot, including the picture and reviews
- Allow user to write the reviews
- After pressing the spots on the home page

<img src="https://github.com/guanxiaotongyz/Mobile-spotAdviosr/blob/main/pictures/SpotDetails.png" height="300" alt="spotdetailspage"/>
  
### 4. Edit review page
- allow users to edit reviews.

<img src="https://github.com/guanxiaotongyz/Mobile-spotAdviosr/blob/dev_iter_update_delete_basic/pictures/EditReview.png" height="300" alt="editreviewpage"/>

### 5. Nearby spots page
- Show the users of spots in the same city based on their location after getting the access.
- Can also use maker to see the other city spots

<img src="https://github.com/guanxiaotongyz/Mobile-spotAdviosr/blob/main/pictures/Location.png" height="300" alt="nearbypage"/>
<img src="https://github.com/guanxiaotongyz/Mobile-spotAdviosr/blob/main/pictures/Locationmaker.png" height="300" alt="nearbymakerpage"/>

### 6. Favorite page
- Show the users of spots they add favorite tags.

<img src="https://github.com/guanxiaotongyz/Mobile-spotAdviosr/blob/main/pictures/Favorite.png" height="300" alt="favoritepage"/>

### 7. Profile
- Show the user's information.

<img src="https://github.com/guanxiaotongyz/Mobile-spotAdviosr/blob/main/pictures/Profile.png" height="300" alt="profileimage"/>

### 8. Notification
- Remind user to add their fist spot to share after signup.
- Reming user to check other user's reviews after usrer add spot.


<img src="https://github.com/guanxiaotongyz/Mobile-spotAdviosr/blob/main/pictures/Notification.jpeg" height="300" alt="notifacationpage"/>
<img src="https://github.com/guanxiaotongyz/Mobile-spotAdviosr/blob/main/pictures/Notifacation2.jpeg" height="300" alt="notifacationpage"/>





  
## Iterations
### Iteration 1
In the first iteration, we have done these work below:
- Establish Navigation and the basis of CRUD operations to Firestore: 
- C: create the data for spots, reviews and rates
- R: rea the data like spots, reviews and rates
- U: update the data like reviews and rates
- D: delete the data like reviews and rates
- Write the screen for the basic function

### Xiaotong Guan
1. implement the screens : Addspot, Allspots, EditReview
2. implement the components : Mybutton, PressableButton
3. implement the firebase function for Creat and Read

### Yudong Yang

1. implement the screens:FavoriteSpots,Main,NearbySpots
2. implement the components : ReviewList
3. implement the firebase function for Update

### Yongxiang Chen

1. implement the screens :SpotDetails,UserProfile
2. implement the components : Spotlist
3. implement the firebase function for Delete


### Iteration 2
In the second iteration, we have done these work below:
- Authentication Build 
- Build three collections, which is spots, reviews and user
- Schedule and send two meaningful local notifications
- Build an interface to an external Web API (weather API base on city name)
- Build an interface to an external Web API (City Name API base on location information)
- Complete the "my favorite" feature, which each user can collect their favorite spots
- Build camera manager and image picker manager, which user can update the image for spots based on
- Implement the nearby function, where user can use their location to check the spots in the same city.



### Xiaotong Guan
1. implement the Authentication : user have to log in with their email and password
2. implement the Notification : After add spots.
3. implement the interface to an external Web API (weather API base on city name)

### Yudong Yang

1. implement the function of favorite spots, and fix the bug that it can't update aftere deleting
2. Update the components : spotlist for the reason there is some more extra information stored in the firebase
3. Update the firebase function for Update

### Yongxiang Chen

1. implement the screens : nearbyspots
2. Build an interface to an external Web API (City Name API base on location information)
3. Build camera manager and image picker manager, which user can update the image for spots based on

### Iteration 3
In the third iteration, we have done these work below:
- Fix the bugs: Addspots
- Add the location function marker
- Update the notification way
- Update the UI style

### Xiaotong Guan
1. Fix the image cache in the Addspots.js
2. Update the notification way

### Yudong Yang

1. Update the UI style

### Yongxiang Chen
1. Update the location function maker usage
