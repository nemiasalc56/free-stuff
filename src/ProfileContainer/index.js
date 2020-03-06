import React, { Component } from 'react'
import { Grid, Image, Button, Select, Modal, Header, Icon } from 'semantic-ui-react'
import ItemList from '../ItemsContainer/ItemList'
import EditUserForm from './EditUserForm'
import './index.css'



class ProfileContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			user: '',
			myItems: [],
			userHasItems: false,
			EditUserFormOpend: false,
			deleteOpen: false,
			updated: false
		}
	}

	// 
	componentDidMount() {
		this.setState({user: this.props.user})
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
			if(updateAccountJson.status === 200) {

				// this is so that we can the item that was added showing on the page
				this.setState({
					updated: true,
					user: updateAccountJson.data
				})
			}
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
			this.setState({deleteOpen: true})
			
		} else if(value === "logout") {
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
			const deleteAccountResponse = await fetch(url, {
				credentials: 'include',
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const deleteAccountJson = await deleteAccountResponse.json()
			
			this.setState({deleteOpen: false})
			this.props.switcher("all")
			this.props.switchLoginStatus()

			
		}catch(err) {

		}
	}

	closeEditForm = () => {
		this.setState({
			EditUserFormOpend: false,
			user: this.props.user
		})
		if(this.props.user){}

	}



	render(){
		
		return(
			<div>	
				{!this.state.EditUserFormOpend
					?
					<div>
						<Grid>
							<Grid.Column width={8}>
								<Image
									id="profile-image"
									src={this.state.user.picture}
									size='medium'
								/>
						
							</Grid.Column>

							<Grid.Column id="user-profile-info" width={8} style={{
								textAlign: "center",
								alignSelf: "center"
							}}>
								<h1 id="user-name">{this.state.user.first_name} {this.state.user.last_name}</h1>
								<div>
									<Select 
										onChange={this.switcher}
										placeholder="Settings"
										style={{
											marginTop: '10px',
											height: '1vh',
											width: '40vw'
										}}
										options={[{key: 'se', value: 'settings', text: 'Settings'},
												{key: 'ed', value: 'edit', text: 'Edit Account'},
												{key: 'de', value: 'delete', text: 'Delete Account'},
												{key: 'lo', value: 'logout', text: 'Logout'}
												]}
									/>
								</div>
								<Button 
									id="profile-post-button" 
									style={{
										marginTop: '40px',
										height: '10vh',
										width: '40vw'
									}} onClick={this.makeAPost}
									>Post A Free Item</Button>
							</Grid.Column>
						</Grid>
						<Grid>
							{this.state.userHasItems
								?
								<ItemList 
								items={this.state.myItems}
								getItemToShow={this.props.getItemToShow}
								/>
								: <h1>You don't have items in this account</h1>
							}
						</Grid>
						<Modal open={this.state.deleteOpen}
								onClose={this.close}
							>
							<Header icon='trash' content='Delete Your Account' />
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
						    	<Button 
						    		onClick={this.deleteAccount}
						    		color='green'>
							        <Icon 
							        	name='checkmark'/> Yes
						      	</Button>
						    </Modal.Actions>
						</Modal>
					</div>

					:null
				}

				{this.state.EditUserFormOpend
					? <EditUserForm 
						user={this.state.user}
						updateAccount={this.updateAccount}
						closeEditForm={this.closeEditForm}
					/>
					:null
				}
			</div>
			)
	}
}



export default ProfileContainer