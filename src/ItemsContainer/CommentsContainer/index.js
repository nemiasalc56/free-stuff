import React, { Component } from 'react'
import { Button, Grid, Form } from 'semantic-ui-react'
import CommentList from './CommentList'


class CommentContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			comment: '',
			commentList: []
		}
	}

	componentDidMount() {
		this.getComments()
	}

	// find the comments
	getComments = async () => {
		// set up url
		const url = process.env.REACT_APP_API_URL + '/api/v1/comments/' + this.props.item.id
 		
 		try {
			const getCommentsResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const getCommentsJson = await getCommentsResponse.json()
			
			if(getCommentsJson.status === 200) {
				this.setState({
					commentList: getCommentsJson.data
				})
			}

		} catch(err) {
			console.error(err);
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

			const commentJson = await commentResponse.json()

			if(commentJson.status === 200) {
				// this is so that we can see the comment that was added showing on the page
				const newCommentArray = this.state.commentList
				newCommentArray.push(commentJson.data)

				this.setState({
					commentList: newCommentArray,
					comment: ''
				})
			}

		} catch(err) {
			console.error(err);
		}
	}


	render() {

		return(
			<div>
				<CommentList commentList={this.state.commentList}/>

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