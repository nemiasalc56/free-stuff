import React, { Component } from 'react'
import { Button, Grid, Segment, Form, Input } from 'semantic-ui-react'


class CommentContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			comment: ''
		}
	}

	




	render() {

		return(
			<div>
				<h2>Comment Container</h2>

				<Grid className="center aligned" >

					
						<Form>
							<Form.Field>
								<Form.Input
									style={{width: "20em"}}
									type="text" 
									name="picture"
									value={this.state.comment}
									placeholder='Leave comment' />
							</Form.Field>
						</Form>
					
				</Grid>
			</div>
			)
	}
}





export default CommentContainer