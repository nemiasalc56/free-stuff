import React from 'react'
import { Button, Grid, Image } from 'semantic-ui-react'
import './index.css'
import CommentsContainer from '../CommentsContainer'
import MapContainer from './MapContainer'


function ShowItemContainer(props){
	
	return(
		<div>
			<h2>ShowItemContainer</h2>
			<Grid>
				<Grid.Column width={8}>
					<Image
						src={props.item.picture}
					/>
					{props.user.id===props.item.owner.id
						? <div>
							<Button onClick={()=>props.itemToEdit(props.item.id)}>Edit</Button>
							<Button 
								color="red"
								onClick={()=>props.deleteItem(props.item.id)}
							>Delete</Button>
						</div>
						: null
					}
					<div width={8} className="map-container">
						<MapContainer 
							lat={Number(props.item.lat)}
							lng={Number(props.item.lng)}
						/>
					</div>
						
				</Grid.Column>
				<Grid.Column width={8}>
					<h1>{props.item.name}</h1>

					<div className="addres-container">
						<p>{props.item.address_1}, apt/unit {props.item.address_2}, {props.item.city}, {props.item.state}, {props.item.zipcode}</p>					
						
					</div>
					<div className="description-container">
						<p>{props.item.description}</p>
					</div>

					<div width={8}>
						<div width={9} className="comment-container">
							<h2>Comments on this item</h2>
							<CommentsContainer item={props.item}/>
						</div>	
					</div>

				</Grid.Column>
			</Grid>
		</div>
		)
	
}




export default ShowItemContainer