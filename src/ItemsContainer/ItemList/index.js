import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"



function ItemList(props) {

	// get all the items from props
	console.log("props in ItemList");
	const item = props.items.map((item) => {

		return(
			<Card key={item.id}>

				<Image
					src={item.picture}
					size='medium'
					target='_blank'
					wrapped ui={false}
				/>
				<Card.Content>
					<Card.Header key={item.id}>
						<Link to='/show' onClick={()=> props.getItemToShow(item.id)}>
							{item.name}	
						</Link>
					</Card.Header>
					<Card.Meta>
        				<span className='city'>{item.city}, {item.state}</span>
      				</Card.Meta>
				</Card.Content>
			</Card>
			)
	})

	return(
		<div className="item-list-container">
			
			<Card.Group itemsPerRow={3}>
				{item}
			</Card.Group>
		</div>
		)
}




export default ItemList