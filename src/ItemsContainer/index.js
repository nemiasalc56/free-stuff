import React, { Component } from 'react'
import NewItemForm from './NewItemForm'
import ItemList from './ItemList'
import ShowItemContainer from './ShowItemContainer'
import { Header } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import ProfileContainer from '../ProfileContainer'




class ItemsContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			items: [],
			NewItemForm: false,
			itemtoShowId: -1,
			itemListOpen: false
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
			console.log("this is itemsResponse");
			console.log(itemsResponse);
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
		console.log("Trying to show an item");
		this.setState({itemtoShowId: itemId})
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
			console.log(itemJson);

			this.setState({
				NewItemForm: false
			})
			}catch(err) {
			console.error(err);
		}
	}

	


	render() {
		console.log(this.props);
		return(
			<div>

				<Router>
					{this.props.user.loggedIn
						?<Link to='/profile'><h3 className="user-name-link">{this.props.user.user.first_name}</h3></Link>
						:null
					}
					
					<div className="nav-container">
		    			<div className="nav-container2">
							<div className="nav">
								<Link to='/all' onClick={()=>this.setState({itemListOpen:true})}>
									<p>All</p>
								</Link>
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
					<Switch>
						<Route path='/new'>
							{this.state.NewItemForm
								? <NewItemForm postItem={this.postItem}/>
								:null
							}
							
						</Route>
						
						<Route path='/all'>
							{this.state.itemListOpen
								?<ItemList 
									items={this.state.items}
									getItemToShow={this.getItemToShow}
								/>
								:null
							}
							
						</Route>

						<Route path='/show'>
							{this.state.itemtoShowId !== -1
								?
								<ShowItemContainer 
								item={this.state.items.find((item)=>item.id === this.state.itemtoShowId)}
								/>
								:null
							}
							
						</Route>

						<Route path='/profile'>
		      				<ProfileContainer user={this.props.user.user}/>	
		      			</Route>
			
						
					</Switch>
					
					
				</Router>
				
			</div>
			)
	}
}



export default ItemsContainer