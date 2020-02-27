import React, { Component } from 'react'
import NewItemForm from '../NewItemForm'



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
			// console.log(itemResponse);
			// 
			const itemJson = await itemResponse.json()

			}catch(err) {
			console.error(err);
		}
	}


	render() {
		return(
			<div>
				<h2>ItemsContainer</h2>
				<NewItemForm postItem={this.postItem}/>
			</div>
			)
	}
}



export default ItemsContainer