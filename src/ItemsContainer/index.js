import React, { Component } from 'react'
import NewItemForm from '../NewItemForm'
import ItemList from '../ItemList'
import { Header } from 'semantic-ui-react'



class ItemsContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			items: [],
			NewItemForm: false
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
		return(
			<div>
				<h2>ItemsContainer</h2>
				{this.state.NewItemForm
					? <NewItemForm postItem={this.postItem}/>
					:null
				}
				
				<ItemList items={this.state.items}/>
			</div>
			)
	}
}



export default ItemsContainer