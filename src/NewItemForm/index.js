import React, { Component } from 'react'
import { Button, Form, Grid, Segment, TextArea, Select } from 'semantic-ui-react'


class NewItemForm extends Component {
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

	// handle change
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	// handle submit
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.postItem(this.state)
	}

	render() {

		return(
			<div>
				<h2>NewItemForm</h2>

				<Grid className="center aligned">
					<Segment 
						style={{
							marginTop: '200px'
						}}
					>
						<Grid.Row>
							<h2>Post a Free Item</h2>
						</Grid.Row>
						<Form onSubmit={this.handleSubmit}>
	
								<div>
									<Form.Field>
									<Form.Input 
										label="Name"
										type="text" 
										name="name"
										value={this.state.name}
										onChange={this.handleChange}
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
										onChange={this.handleChange}
										placeholder="Address 1" />
								
									<Form.Input 
										label="Address 2" 
										type="text" 
										name="address_2"
										value={this.state.address_2}
										onChange={this.handleChange}
										placeholder="Address 2" />
								
									<Form.Input 
										label="City"
										type="text" 
										name="city"
										value={this.state.city}
										onChange={this.handleChange}
										placeholder="City" />
								
									<Form.Input 
										label="State" 
										type="text" 
										name="state"
										value={this.state.state}
										onChange={this.handleChange}
										placeholder="state" />
								
									<Form.Input 
										label="Zipcode"
										type="text" 
										name="zip_code"
										value={this.state.zip_code}
										onChange={this.handleChange}
										placeholder="Zipcode" />
								</Form.Group>

								<Form.Field>
									<Form.Input 
										label="Image"
										type="file" 
										name="picture"
										value={this.state.picture}
										onChange={this.handleChange}
										placeholder='Image' />
								</Form.Field>
								</div>


							<label>Description</label>
							<TextArea
								type="text"
								name="description"
								value={this.state.description}
								placeholder="Description"
								onChange={this.handleChange}
							/>
								

							<Button color="green" className="big" type='submit'>
								Post Free Item
							</Button>
							
						</Form>
					
					</Segment>
				</Grid>
			</div>
			)
	}
}





export default NewItemForm