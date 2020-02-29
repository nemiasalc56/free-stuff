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
						<Select 
							options={[{key: 'se', value: 'settings', text: 'Settings'},
								{key: 'ed', value: 'edit', text: 'Edit Account'},
								{key: 'de', value: 'delete', text: 'Delete Account'}]}
						/>
					</div>
				</Grid.Column>
			</Grid>
			)
	}
}



export default ProfileContainer