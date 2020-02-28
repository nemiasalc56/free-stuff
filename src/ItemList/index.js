import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'



function ItemList(props) {

	// get all the items from props
	console.log("props in ItemList");
	const item = props.items.map((item) => {

		return(
			<Card key={item.id}>
				<Image
						    src={item.picture}
						    as='a'
						    size='medium'
						    href='http://localhost:3000'
						    target='_blank'
						    wrapped ui={false}
						  />
				<Card.Content>
					<Card.Header key={item.id}>
						
						{item.name}
					</Card.Header>
				</Card.Content>
			</Card>
			)
	})

	return(
		<div>
			<h2>ItemList</h2>
			<Card.Group itemsPerRow={3}>
				{item}
			</Card.Group>
		</div>
		)
}




export default ItemList