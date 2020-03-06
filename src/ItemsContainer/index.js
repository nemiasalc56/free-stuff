import React, { Component } from 'react'
import NewItemForm from './NewItemForm'
import ItemList from './ItemList'
import ShowItemContainer from './ShowItemContainer'
import ProfileContainer from '../ProfileContainer'
import EditItemForm from './EditItemForm'


class ItemsContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			items: [],
			NewItemForm: false,
			itemtoShowId: -1,
			itemListOpen: true,
			profileOpen: false,
			itemToEditId: -1
		}
	}


	componentDidMount() {
		this.getItems()
	}


	// get get all the items
	getItems = async () => {
		// get the url from our enviroment variable
		const url = process.env.REACT_APP_API_URL + '/api/v1/items/'
		try {
			// fetch url
			const itemsResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			
			// convert data to json
			const itemsJson = await itemsResponse.json()

			if(itemsJson.status === 200) {
				this.setState({
					items: itemsJson.data
				})
			}
		}catch(err) {
			console.error(err);
		}

	}

	// get item to show
	getItemToShow = (itemId) => {
		this.setState({
			itemtoShowId: itemId,
		})

		// switch item list off
		this.switcher("off")
	}



	// post items
	postItem = async (itemInfo) => {

		// get the url
		const url = process.env.REACT_APP_API_URL + '/api/v1/items/'

		try {
			// fetch our url
			const itemResponse = await fetch(url, {
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify(itemInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			// 
			const itemJson = await itemResponse.json()

			if(itemJson.status === 200){
				// this is so that we can the item that was added showing on the page
				const newItemsArray = this.state.items
				newItemsArray.push(itemJson.data)

				this.setState({
					items: newItemsArray,
				})

				this.switcher("all")
			}

			}catch(err) {
			console.error(err);
		}
	}

	// switch item components off/on
	switcher = (action) => {
		if(action === "off"){
			this.setState({
				itemListOpen: false,
				profileOpen: false,
				NewItemForm: false,
				itemToEditId: -1

			})	
		} else if(action === "all") {
			this.setState({
				itemListOpen: true,
				profileOpen: false,
				NewItemForm: false,
				itemToEditId: -1,
				itemtoShowId: -1
			})
			this.getItems()
		} else if(action === "profile") {
			this.setState({
				itemListOpen: false,
				itemtoShowId: -1,
				profileOpen: true,
				NewItemForm: false,
				itemToEditId: -1
			})
		} else if(action === "postItem"){
			this.setState({
				itemListOpen: false,
				itemtoShowId: -1,
				profileOpen: false,
				NewItemForm: true,
				itemToEditId: -1
			})
		}
	}

	// get item to edit
	getItemToEdit = (itemToEditId) => {

		this.setState({
			itemListOpen: false,
			itemtoShowId: -1,
			profileOpen: false,
			NewItemForm: false,
			itemToEditId: itemToEditId,
			foundItemByCategory: true
		})
	}

	// update item method
	updateItem = async (itemInfo) =>{
		
		const url = process.env.REACT_APP_API_URL + '/api/v1/items/' + this.state.itemToEditId

		try {
			const updateItemResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(itemInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			
			const updateItemJson = await updateItemResponse.json()
			if(updateItemJson.status === 200){
				// reflect changes on the screen
				const newItemsArray = this.state.items.map((item)=>{
					// we want to return everything with the updated item
					if(item.id===this.state.itemToEditId){
						return updateItemJson.data
					} else{
						return item
					}
				})

				this.setState({
					items: newItemsArray,
					itemListOpen: true,
					profileOpen: false,
					NewItemForm: false,
					itemToEditId: -1
				})
			}
		} catch(err){
			console.error(err);
		}
	}

	// delete item
	deleteItem = async (itemToDeleteId) =>{

		// get the url
		const url = process.env.REACT_APP_API_URL + '/api/v1/items/' + itemToDeleteId
		try {
			// fetch url
			const deleteItemResponse = await fetch(url, {
				credentials: 'include',
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const deleteItemJson = await deleteItemResponse.json()

			// remove the item from my array of items in state
			if(deleteItemJson.status === 200) {
				const items = this.state.items
				let index = 0
				// find the item that was delete in state
				for(let i = 0; i < items.length; i++) {
					if(items[i].id === itemToDeleteId){
						index = i
					}
				}

				// remove the item with that index from state
				items.splice(index, 1)
				this.switcher("all")
				this.setState({items: items})
			}


		} catch(err) {
			console.error(err);
		}
	}

	// get items by category
	itemsByCategory = async (category) =>{
		// get url
		const url = process.env.REACT_APP_API_URL + '/api/v1/items/' + category +'/category'

		try {
			// fetch url
			const categoryResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const categoryJson = await categoryResponse.json()
			
			if(categoryJson.status === 200) {
				this.setState({
					items: categoryJson.data,
					itemListOpen: true,
					profileOpen: false,
					NewItemForm: false,
					itemToEditId: -1,
					itemtoShowId: -1
				})

			} else {
				console.log("there is no items in this category");
				this.setState({foundItemByCategory: false})
			}
		} catch(err) {
			console.error(err);
		}
	}

	render() {
	
		return(
			<div id="main-contianer">
				<h2 className="user-name-link" 
					onClick={()=>this.switcher("profile")}>
					{this.props.user.first_name}
				</h2>
				<div className="nav-container">
		    			<div className="nav-container2">
							<div className="nav">
								<p onClick={()=>this.switcher('all')}>All</p>
								<p onClick={()=>this.itemsByCategory('electronics')}>Electronics</p>
								<p onClick={()=>this.itemsByCategory('collectibles_and_art')}>Collectibles & Art</p>
								<p onClick={()=>this.itemsByCategory('home_and_garden')}>Home & Garden</p>
								<p onClick={()=>this.itemsByCategory('clothing')}>Clothing</p>
								<p onClick={()=>this.itemsByCategory('sport')}>Sport</p>
								<p onClick={()=>this.itemsByCategory('toys')}>Toys</p>
								<p onClick={()=>this.itemsByCategory('music_and_books')}>Music & Books</p>
								<p onClick={()=>this.itemsByCategory('entertaiment')}>Entertaitment</p>
								<p onClick={()=>this.itemsByCategory('others')}>Others</p>
							</div>		
		    			</div>		    				
		    	</div>
				
				{this.state.NewItemForm
					? <NewItemForm 
					postItem={this.postItem}
					user={this.props.user}/>
					:null
				}
				{this.state.itemListOpen
					? <ItemList 
						items={this.props.itemSearch.length === 0 ? this.state.items : this.props.itemSearch}
						getItemToShow={this.getItemToShow}

					/>
					: null
				}
				
				
				{this.state.itemtoShowId !== -1
					?
					<ShowItemContainer
						item={this.state.items.find((item)=>item.id === this.state.itemtoShowId)}
						user={this.props.user}
						itemToEdit={this.getItemToEdit}
						deleteItem={this.deleteItem}
						loggedIn={this.props.loggedIn}
					/>
					: null
				}

				{this.state.profileOpen
					? <ProfileContainer 
						user={this.props.user}
						switcher={this.switcher}
						getItemToShow={this.getItemToShow}
						logout={this.props.logout}
						/>
					: null
				}

				{this.state.itemToEditId !== -1
					? <EditItemForm 
						itemToEdit={this.state.items.find((item)=>item.id === this.state.itemToEditId)}
						updateItem={this.updateItem}
					/>
					:null
				}

			</div>
			)
	}
}



export default ItemsContainer