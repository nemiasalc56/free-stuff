## Free Stuff

This is an app where someone that has something that someone else might need or like it, but the owner doesn't want to sell it, they can just post it on the website and someone may actually like it or need.

The main idea behind this, is that there are many people that in their house might have many things that they don't need anymore, and they would like to give it someone. There are also many people needed everywhere, they don't have the money to buy some of the things that they need.

The same way people will have only one place that can go online and make sure that everything that they see there is for free.

Keep in mind that all the items in this site for free for the user.

## How to use the app

* When you access to the site you can see all the posts.
* You can also see posts separated by diferent categories.
* When you click a post you will see all the information related to that post.
* If you wish to post an item, you must register or log in.
* If you wish to leave a comment, you must log in or register.

## Tables


![alt text](https://i.imgur.com/dpxOAG9.png?1)

![alt text](https://i.imgur.com/pPIViIN.png?1)

![alt text](https://i.imgur.com/2pHk4YQ.png)

# Models
![alt text](https://i.imgur.com/Q27tIuk.png)
![alt text](https://i.imgur.com/ql4bm0i.png)
![alt text](https://i.imgur.com/crs22j3.png)
![alt text](https://i.imgur.com/2fZMtYh.png)
![alt text](https://i.imgur.com/nwqlQBV.png)
![alt text](https://i.imgur.com/lMihKbh.png)
![alt text](https://i.imgur.com/VYsh4l1.png)
![alt text](https://i.imgur.com/KOYfbfH.png)

## API routes

--Item

| HTTP method	| URL path			| Description	 |
| ------------- |:-----------------:| --------------:|
| GET 			| /items 			| list of items	 |
| GET 			| /items/<id>		| show one item  |
| POST			| /items			| create item 	 |
| PUT 			| /items/<id> 		| update an item |
| DELETE 		| /items/<id> 		| delete an item |


--User

| HTTP method	|	URL path		| Description		  |
| ------------- |:-----------------:| -------------------:|
| GET 			| /users			| user profile		  |
| POST 			| /users/login 		| log user in 		  |
| POST 			| /register 		| register user 	  |
| PUT 			| /users/<id> 		| update user account |
| DELETE 		| /users/<id>		| delete the account  |



## User Stories

* User can enter a name on the search bar if they want.
* User can can filter their research by category (Home, Music-Books, Sport, Electronic, etc...).
* User can click one of the post to see all the information about it.
* User will need their email and password to log in.
* User can register with their first name, last name, profile picure, email address, password and address (addr1, addr2, ste/apt, city, state and zip).
* User can leave a message on the item only if they are logged in.
* Registered users may post a free item by clicking make a post and fill out the form.
* User can delete their account by clicking delete account.
* User can edit their account by clicking edit account.


## Nice to have

* Allow user to upload more than one picture of the item.
* Add related items. I.e. when the user select the item that was posted, they will be able to see more items similar to that one.
* Add a drop down that let you search by location.
* Add sort by, i.e. Date (most recent)

## Technology used

* Flask
* React.js
* Sqlite -- Postgres
* Python
