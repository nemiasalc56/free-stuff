import React, { Component } from 'react'
import { Button, Grid, Segment, TextArea } from 'semantic-ui-react'


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

				<Grid className="center aligned">
					<Segment>
						
					</Segment>
				</Grid>
			</div>
			)
	}
}





export default CommentContainer