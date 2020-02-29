import React, { Component } from 'react'
import { Button, Form, Grid, Segment, TextArea, Select } from 'semantic-ui-react'


class EditItemForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			description: '',
			picture: '',
			category: '',
			address_1: '',
			address_2: '',
			city: '',
			state: '',
			zip_code: '',
			options: this.getOptions()
		}
	}



	// options for our category
	getOptions = () => {
		const categoryOptions = [
			{ key: 'el', value: 'electronics', text: 'Electronics' },
			{ key: 'ca', value: 'collectibles_art', text: 'Collectibles & Art' },
			{ key: 'hg', value: 'home_garden', text: 'Home & Garden' },
			{ key: 'cl', value: 'clothing', text: 'Clothing' },
			{ key: 'sp', value: 'sport', text: 'Sport' },
			{ key: 'to', value: 'toys', text: 'Toys' },
			{ key: 'mb', value: 'music_books', text: 'Music & Books' },
			{ key: 'en', value: 'entertaiment', text: 'Entertaiment' },
			{ key: 'ot', value: 'other', text: 'Other' }
		]
		return categoryOptions
	}

	render() {

		return(
			<div>
				<Grid className="center aligned">
					<Segment 
						style={{
							marginTop: '200px'
						}}
					>
						<Grid.Row>
							<h2>Edit this item</h2>
						</Grid.Row>
						<Form onSubmit={this.handleSubmit}>
	
								<div>
									<Form.Field>
									<Form.Input 
										label="Name"
										type="text" 
										name="name"
										value={this.state.name}
										placeholder="Name" />
									
								</Form.Field>
								<Form.Field>
								<label>Category</label>
								<Select 
									placeholder='Select a category' 
									options={this.state.options}
									onChange={(e, { value }) => this.setState({category: value})} 

								/>
							</Form.Field>
								<Form.Group>
									
									<Form.Input 
										label="Address 1"
										type="text" 
										name="address_1"
										value={this.state.address_1}
										placeholder="Address 1" />
								
									<Form.Input 
										label="Address 2" 
										type="text" 
										name="address_2"
										value={this.state.address_2}
										placeholder="Address 2" />
								
									<Form.Input 
										label="City"
										type="text" 
										name="city"
										value={this.state.city}
										placeholder="City" />
								
									<Form.Input 
										label="State" 
										type="text" 
										name="state"
										value={this.state.state}
										placeholder="state" />
								
									<Form.Input 
										label="Zipcode"
										type="text" 
										name="zip_code"
										value={this.state.zip_code}
										placeholder="Zipcode" />
								</Form.Group>

								<Form.Field>
									<Form.Input 
										label="Image"
										type="text" 
										name="picture"
										value={this.state.picture}
										placeholder='Image' />
								</Form.Field>
								</div>


							<label>Description</label>
							<TextArea
								type="text"
								name="description"
								value={this.state.description}
								placeholder="Description"
							/>
								

							<Button color="green" className="big" type='submit'>
								Update
							</Button>
							
						</Form>
					
					</Segment>
				</Grid>
			</div>
			)
	}
}





export default EditItemForm