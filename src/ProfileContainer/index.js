import React, { Component } from 'react'
import { Grid, Image, Button, Select, Modal, Header, Icon } from 'semantic-ui-react'
import ItemList from '../ItemsContainer/ItemList'
import EditUserForm from './EditUserForm'



class ProfileContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			user: this.props.user,
			myItems: [],
			userHasItems: false,
			EditUserFormOpend: false,
			deleteOpen: false
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
			this.setState({deleteOpen: true})
		} else if(value === "logout") {
			console.log(value);
			this.props.logout()
		}
	}
	// this is to close the modal when is open
	close = () => this.setState({ deleteOpen: false })

	// delete account method
	deleteAccount = async () => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/users/' + this.props.user.id
		try {
			// fetch url
			const deleteAccountResponse = fetch(url, {
				credentials: 'include',
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const deleteAccountJson = deleteAccountResponse.json()
			console.log("this is the deleteAccountJson");
			console.log(deleteAccountJson);
			this.setState({deleteOpen: false})
			this.props.switcher("all")
		}catch(err) {

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
												{key: 'de', value: 'delete', text: 'Delete Account'},
												{key: 'lo', value: 'logout', text: 'Logout'}
												]}
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
								: <h1>Delete the account</h1>
							}

							<Modal open={this.state.deleteOpen}
									onClose={this.close}
								>
								<Header icon='archive' content='Delete Your Account' />
								<Modal.Content>
							      <p>
							        Are you sure you want to delete your account?
							      </p>
							    </Modal.Content>
							    <Modal.Actions>
							      <Button 
							    	color='red'
							     	onClick={this.close}
							      	>
							        <Icon name='remove' /> No
							      </Button>
							      <Button color='green'>
							        <Icon 
							        	name='checkmark' 
							        	onClick={this.deleteAccount}
							        /> Yes
							      </Button>
							    </Modal.Actions>
							</Modal>
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