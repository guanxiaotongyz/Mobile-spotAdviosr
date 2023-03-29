# Mobile-spotAdvisor

- **Group**: 3
- **Members**:
  - Xiaotong Guan <guan.xiao@northeastern.edu>
  - Yudong Yang	<yang.yud@northeastern.edu>
  - Yongxiang Chen <chen.yongx@northeastern.edu>

## Install dependencies
In order to install, clone this repository and run:
> npm install  

Set up .env file
> apiKey= "AIzaSyBxZT_sAXN4MCFKm1wr7wcuQNCI52ji4S4"
> authDomain= "practice-crud-c3bb8.firebaseapp.com"
> projectId= "practice-crud-c3bb8"
> storageBucket= "practice-crud-c3bb8.appspot.com"
> messagingSenderId= "449014434573"
> appId= "1:449014434573:web:1d318b45795850735b7e44"


This was made with Expo, so you need it to run. To do it, run:
> npm start  
 //OR  
> npm expo start --tunnel


## Structure of the App
### 1. Home page
- show users the spots already in the firebase.

<img src="https://github.com/guanxiaotongyz/Mobile-spotAdviosr/blob/dev_iter_update_delete_basic/pictures/Home.png" height="300" alt="loginpage"/>


### 2. Add the spot page
- allow users to add the spot

<img src="https://github.com/guanxiaotongyz/Mobile-spotAdviosr/blob/dev_iter_update_delete_basic/pictures/AddSpot.png" height="300" alt="loginpage"/>

  
### 3. Spot details page
- allow user to see the details of the spot, including the picture and reviews
- allow user to write the reviews

<img src="https://github.com/guanxiaotongyz/Mobile-spotAdviosr/blob/dev_iter_update_delete_basic/pictures/SpotDetails.png"/>
  
### 4. Edit review page
- allow users to edit reviews.

<img src="https://github.com/guanxiaotongyz/Mobile-spotAdviosr/blob/dev_iter_update_delete_basic/pictures/EditReview.png"  height="300" alt="loginpage"/>

  
## Iterations
### Iteration 1
In the first iteration, we have done these work below:
- Establish Navigation and the basis of CRUD operations to Firestore: 
- C: create the data for spots, reviews and rates
- R: rea the data like spots, reviews and rates
- U: update the data like reviews and rates
- D: delete the data like reviews and rates
- Write the screen for the basic function
- 

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



