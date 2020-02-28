## Free Stuff

This is an app where someone that has something that someone else might need or like it, but the owner doesn't want to sell it, they can just post it on the website and someone may actually like it or need.

The main idea behind this, is that there are many people that in their house might have many things that they don't need anymore, and they would like to give it someone. There are also many people needed everywhere, they don't have the money to buy some of the things that they need.

The same way people will have only one place that can go online and make sure that everything that they see there is for free.

Keep in mind that all the items in this site are for free for the user.

## How to use the app

* When you access to the site you can see all the posts.
* You can also see posts separated by diferent categories.
* When you click a post you will see all the information related to that post.
* If you wish to post an item, you must register or log in.
* If you wish to leave a comment, you must log in or register.

## Installation
```
$ create-react-app joke-app
```

## Tables


![alt text](https://i.imgur.com/HvRBgjA.png)

![alt text](https://i.imgur.com/ConrMcQ.png)

![alt text](https://i.imgur.com/2pHk4YQ.png)

![alt text](https://i.imgur.com/qa5zi7n.png)

## Wireframes
![alt text](https://i.imgur.com/Q27tIuk.png)
![alt text](https://i.imgur.com/pYKgXKL.png)
![alt text](https://i.imgur.com/crs22j3.png)
![alt text](https://i.imgur.com/2fZMtYh.png)
![alt text](https://i.imgur.com/nwqlQBV.png)
![alt text](https://i.imgur.com/lMihKbh.png)
![alt text](https://i.imgur.com/VYsh4l1.png)
![alt text](https://i.imgur.com/KOYfbfH.png)

## Models
```
class Address(Model):
	address_1 = CharField()
	address_2 = CharField()
	city = CharField()
	state = CharField()
	zip_code = CharField()
	lat = IntegerField()
	lng = IntegerField()


class User(UserMixin, Model):
	first_name = CharField()
	last_name = CharField()
	picture = CharField()
	email = CharField(unique=True)
	password = CharField()
	address = ForeignKeyField(Address, backref='address')


class Item(Model):
	name = CharField()
	picture = CharField()
	category = CharField()
	description = CharField()
	lat = IntegerField()
	lng = IntegerField()
	address_1 = CharField()
	address_2 = CharField()
	city = CharField()
	state = CharField()
	zip_code = CharField()
	owner = ForeignKeyField(User, backref='items', on_delete='CASCADE')
	created_at = DateTimeField(default=datetime.datetime.now)

class Comment(Model):
	comment = CharField()
	author = ForeignKeyField(User, backref='comments')
	item = ForeignKeyField(Item, backref='items', on_delete='CASCADE')
	created_at = DateTimeField(default=datetime.datetime.now)
```

## API routes

--Item

| HTTP method	| URL path			| Description	 |
| ------------- |:-----------------:| --------------:|
| GET 			| `/items` 			| list of items	 |
| GET 			| `/items/search` 	| list of items by category	 |
| GET 			| `/items/<id>`		| show one item  |
| POST			| `/items`			| create item 	 |
| PUT 			| `/items/<id>` 		| update an item |
| DELETE 		| `/items/<id>` 		| delete an item |


--User

| HTTP method	|	URL path		| Description		  |
| ------------- |:-----------------:| -------------------:|
| GET 			| /users/profile	| user profile		  |
| POST 			| /users/login 		| log user in 		  |
| GET 			| /users/logout 	| log user out 		  |
| POST 			| /users/register 	| register user 	  |
| PUT 			| /users/<id> 		| update user account |
| DELETE 		| /users/<id>		| delete the account  |


--Comment

| HTTP method	|	URL path		| Description		  |
| ------------- |:-----------------:| -------------------:|
| GET 			| `/comments/<item_id>`	| list the comments	for an item |
| POST 			| `/comments/<item_id>` 		| create a comment 	  |
| DELETE 		| `/comments/<id>` 	| delete a comment 	  |


## User Stories

* User can enter a name on the search bar if they want.
* User can can filter their research by category (Home, Music-Books, Sport, Electronic, etc...).
* User can click one of the post to see all the information about it.
* User will need their email and password to log in.
* User can register with their first name, last name, profile picure, email address, password and address (addr1, addr2, st/apt, city, state and zip code).
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
* GoogleMaps API


## Development process

* Feb 25th-27th, 
	- Auth complete api
	- Item complete api
	- Comment complete api
	- Auth Client C
	- Item CR Client


* Feb 28th - March 1st
	- CRUD items
	- CRUD user
	- Set up Cloudinary API
	- Set up GoogleMaps API
	- List items by category
	- Search






