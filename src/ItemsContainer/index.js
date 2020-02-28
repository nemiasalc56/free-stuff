import React, { Component } from 'react'
import NewItemForm from '../NewItemForm'
import ItemList from '../ItemList'



class ItemsContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			items: []
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
			}catch(err) {
			console.error(err);
		}
	}


	render() {
		return(
			<div>
				<h2>ItemsContainer</h2>
				<NewItemForm postItem={this.postItem}/>
				<ItemList />
			</div>
			)
	}
}



export default ItemsContainer