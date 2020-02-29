import React, { Component } from 'react'
import { Grid, Image, Button, Select } from 'semantic-ui-react'


class ProfileContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			user: this.props.user,
			myItems: []
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
			console.log("this is userItemsResponse");
			console.log(userItemsResponse);
		} catch(err) {
			console.error(err);
		}
	}

	render(){
		console.log("this is profile");
		console.log(this.state.user);
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
					<Button>Make a Post</Button>
				</Grid.Column>

			</Grid>
			)
	}
}



export default ProfileContainer