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
	postItem = (itemInfo) => {
		console.log(itemInfo);
	}


	render() {
		return(
			<div>
				<h2>ItemsContainer</h2>
				<NewItemForm />
			</div>
			)
	}
}



export default ItemsContainer