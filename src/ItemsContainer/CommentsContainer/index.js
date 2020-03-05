import React, { Component } from 'react'
import { Button, Grid, Form, Segment } from 'semantic-ui-react'
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
		if(this.state.comment !== '') {
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
	}

	// delete a comment
	deleteComment = async (commentToDeleteId) => {
		// set up our url
		const url = process.env.REACT_APP_API_URL + '/api/v1/comments/' + commentToDeleteId
		
		const deleteCommentResponse = await fetch(url, {
			credentials: 'include',
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const deleteCommentJson = await deleteCommentResponse.json()
		
		// remove the item from my array of comments in state
		if(deleteCommentJson.status === 200) {
			const commentList = this.state.commentList
			let index = 0
			// find the comment that was delete in state
			for(let i = 0; i < commentList.length; i++) {
				if(commentList[i].id === commentToDeleteId){
					index = i
				}
			}
			// remove the comment with that index from state
			commentList.splice(index, 1)
			this.setState({commentList: commentList})
			this.getComments()
		}
	}


	render() {
		
		return(
			<div>
				<Grid  className="center aligned scroll">
					<div id="comment-list-container">
						<CommentList 
							commentList={this.state.commentList}
							deleteComment={this.deleteComment}
							loggedIn={this.props.loggedIn}
							user={this.props.user}
						/>
						
					</div>
					
				</Grid>

				<Grid  className="center aligned" id="comment-form">
					{this.props.loggedIn
						?
						<Segment>
							<Form onSubmit={this.handleSubmit}>
								<Form.Field>
									<Form.Input
										style={{width: "30em"}}
										type="text" 
										name="comment"
										value={this.state.comment}
										onChange={this.handleChange}
										placeholder='Leave comment' />
									<Button style={{width: "30em"}} color="green">Send</Button>
								</Form.Field>
							</Form>
							
						</Segment>			

						:null
					}
					
				</Grid>
			</div>
			)
	}
}





export default CommentContainer