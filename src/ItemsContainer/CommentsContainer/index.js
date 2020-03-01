import React, { Component } from 'react'
import { Button, Grid, Segment, Form, Input } from 'semantic-ui-react'


class CommentContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			comment: '',
			commentList: []
		}
	}

	// allow user to type
	handleChange = (e) => {
		this.setState({
			comment: e.target.value
		})
	}

	handleSubmit = async (e)=> {
		e.preventDefault()
		// set up url with the item id
		const url = process.env.REACT_APP_API_URL + '/api/v1/comments/' + this.props.item.id

		try {
			const commentResponse = await fetch(url, {
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log(commentResponse);

			const commentJson = await commentResponse.json()
			console.log(commentJson);

		} catch(err) {
			console.error(err);
		}
	}


	render() {

		return(
			<div>
				<h2>Comment Container</h2>

				<Grid className="center aligned" >
					
					<Form onSubmit={this.handleSubmit}>
						<Form.Field>
							<Form.Input
								style={{width: "20em"}}
								type="text" 
								name="comment"
								value={this.state.comment}
								onChange={this.handleChange}
								placeholder='Leave comment' />
							<Button style={{width: "20em"}} color="green">Send</Button>
						</Form.Field>
					</Form>
					
				</Grid>
			</div>
			)
	}
}





export default CommentContainer