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
			userHasItems: false,
			EditUserFormOpend: false
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
	updateAccount = async (newAccountInfo) => {

		// setup url with the user id
		const url = process.env.REACT_APP_API_URL + '/api/v1/users/' + this.props.user.id

		try {
			// fetch the url
			const updateAccountResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(newAccountInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const updateAccountJson = await updateAccountResponse.json()

		} catch(err) {
			console.error(err);
		}
	}

	// this is so that we can use the options from the dropdown
	switcher = (e, { value }) => {
		
		if(value === "edit") {
			this.setState({
				EditUserFormOpend: true
			})
		} else if(value === "delete") {
			console.log(value);
		}
	}

	cancelEdit = () => {
		this.setState({EditUserFormOpend: false})
	}

	render(){
		
		return(
			<div>	
					{!this.state.EditUserFormOpend
						?
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
									<Select 
										onChange={this.switcher}
										placeholder="Account Settings"
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
						</Grid>

						:null
					}

					{this.state.EditUserFormOpend
						? <EditUserForm 
							user={this.state.user}
							updateAccount={this.updateAccount}
							cancelEdit={this.cancelEdit}
						/>
						:null
					}
			</div>
			)
	}
}



export default ProfileContainer