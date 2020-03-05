import React from 'react'
import { Button, Grid, Image } from 'semantic-ui-react'
import './index.css'
import CommentsContainer from '../CommentsContainer'
import MapContainer from './MapContainer'


function ShowItemContainer(props){
	console.log(props);
	return(
		<div>
			<div>
				<Grid>
					<Grid.Column width={8}>
						<Image
							id="show-page-image"
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
							
					</Grid.Column>
					<Grid.Column width={8} style={{alignSelf:"center"}}>
						<div id="item-name">
							<h1>{props.item.name}</h1>
							<div className="addres-container">
								<p>{props.item.address_1} {props.item.address_2} {props.item.city} {props.item.state} {props.item.zip_code}</p>
							</div>
						
							<p>{props.item.description}</p>
						</div>


					</Grid.Column>
				</Grid>
					
				<Grid>
					<Grid.Column width={8}>
						<div width={8}>
							<MapContainer 
								lat={Number(props.item.lat)}
								lng={Number(props.item.lng)}
							/>
						</div>
						
					</Grid.Column>
					
					<Grid.Column width={8}>
						<div width={8}>
							<div>
								<CommentsContainer 
									item={props.item}
									user={props.user}
									loggedIn={props.loggedIn}
								/>
							</div>	
						</div>
						
					</Grid.Column>

				</Grid>
			</div>
		</div>
		)
	
}




export default ShowItemContainer