import React from 'react'
import { Card } from 'semantic-ui-react'



function ItemList(props) {

	// get all the items from props
	// const items
	const item = props.items.map((item) => {

		return(
			<Card key={item.id} onClick={()=> props.getItemToShow(item.id)}>

				<img
					alt="text"
					id="item-image"
					src={item.picture}
					size='medium'
					style={{
						width: "100%",
						height: "50vh"
						}}
					target='_blank'
				/>
				<Card.Content>
					<Card.Header key={item.id}>
						{item.name}
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