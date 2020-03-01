import React, { Component } from 'react'
import { Grid, Image, Button, Select } from 'semantic-ui-react'
import ItemList from '../ItemsContainer/ItemList'
import EditUserForm from './EditUserForm'



class ProfileContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			user: this.props.user,
			myItems: [],
			userHasItems: false
		}
	}

	// 
	componentDidMount() {
		this.getUserItems()
	}

	// current user items
	getUserItems = async () => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/items/mine'
		// fetch url
		try {
			const userItemsResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			

			// get the data from the response
			const userItemsJson = await userItemsResponse.json()
			
			if(userItemsJson.status === 200){
				// store items in state
				this.setState({
					myItems: userItemsJson.data,
					userHasItems: true
				})
			}

		} catch(err) {
			console.error(err);
		}
	}

	// make a post
	makeAPost = ()=>{
		// it will use the switcher from props
		this.props.switcher("postItem")
	}

	// update user account
	updateAccount = (newAccountInfo) => {
		console.log("updateAccount method");
		console.log(newAccountInfo);
	}

	render(){
		return(
			<Grid>
					<Grid.Column width={8}>
						<Image
							src={this.state.user.picture}
							size='medium'
						/>
						
					</Grid.Column>

					<Grid.Column width={8}>
						<h1>{this.state.user.first_name} {this.state.user.last_name}</h1>
						<div>
							<Select placeholder="Account Settings"
								options={[{key: 'se', value: 'settings', text: 'Settings'},
									{key: 'ed', value: 'edit', text: 'Edit Account'},
									{key: 'de', value: 'delete', text: 'Delete Account'}]}
							/>
						</div>
						<Button onClick={this.makeAPost}>Make a Post</Button>
					</Grid.Column>

					{this.state.userHasItems
						?
						<ItemList 
						items={this.state.myItems}
						getItemToShow={this.props.getItemToShow}
						/>
						: <h1>You have not post a free item.</h1>
					}

					<EditUserForm 
						user={this.state.user}
						updateAccount={this.updateAccount}
					/>
			</Grid>
			)
	}
}



export default ProfileContainer