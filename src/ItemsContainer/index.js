import React, { Component } from 'react'
import NewItemForm from './NewItemForm'
import ItemList from './ItemList'
import ShowItemContainer from './ShowItemContainer'
import { Header } from 'semantic-ui-react'
import ProfileContainer from '../ProfileContainer'




class ItemsContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			items: [],
			NewItemForm: false,
			itemtoShowId: -1,
			itemListOpen: true,
			profileOpen: false
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
			console.log(itemsJson);

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
			

			this.setState({
				NewItemForm: false
			})
			}catch(err) {
			console.error(err);
		}
	}

	// switch item components off/on
	switcher = (action) => {
		if(action === "off"){
			this.setState({
				itemListOpen: false,
				profileOpen: false
			})	
		} else if(action === "all") {
			this.setState({
				itemListOpen: true,
				profileOpen: false
			})
		} else if(action === "profile") {
			this.setState({
				itemListOpen: false,
				itemtoShowId: -1,
				profileOpen: true
			})
		}
	}

	render() {
		console.log('props in ItemsContainer');
		console.log(this.props.user);
		return(
			<div>
				<h2 className="user-name-link" 
					onClick={()=>this.switcher("profile")}>
					{this.props.user.first_name}
				</h2>
				<div className="nav-container">
		    			<div className="nav-container2">
							<div className="nav">
								<p onClick={()=>this.switcher('all')}>All</p>
								<p>Electronics</p>
								<p>Collectibles & Art</p>
								<p>Home & Garden</p>
								<p>Clothing</p>
								<p>Sport</p>
								<p>Toys</p>
								<p>Music & Books</p>
								<p>Entertaitment</p>
								<p>Others</p>
							</div>		
		    			</div>		    				
		    	</div>
				
				{this.state.NewItemForm
					? <NewItemForm postItem={this.postItem}/>
					:null
				}
				{this.state.itemListOpen
					? <ItemList 
					items={this.state.items}
					getItemToShow={this.getItemToShow}
					/>
					: null
				}
				
				
				{this.state.itemtoShowId !== -1
					?
					<ShowItemContainer 
					item={this.state.items.find((item)=>item.id === this.state.itemtoShowId)}
					/>
					:null
				}

				{this.state.profileOpen
					? <ProfileContainer 
						user={this.props.user}
						switcher={this.switcher}
						/>
					: null
				}

			</div>
			)
	}
}



export default ItemsContainer