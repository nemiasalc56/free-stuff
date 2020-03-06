import React from 'react'
import { Card, Button } from 'semantic-ui-react'

function CommentList(props) {

	// get all the comments from props
	const commentList = props.commentList
	
	const comment = commentList.map((comment) => {
		
		return(
			<Card key={comment.id} style={{width: "30em"}}>
				<Card.Content >
					<p>{comment.comment}</p>
					<p>By: {comment.author.first_name}</p>
					<p>At: {comment.created_at}</p>
					{props.user.id === comment.author.id | props.user.id === comment.item.owner.id
						?
						<Button basic color="red" onClick={()=>props.deleteComment(comment.id)}>Delete</Button>

						:null
					}
					
				</Card.Content>
			</Card>
			)
	})

	return(
		<div>
			{commentList.length > 0
				? comment
				: 
				<div id="leave-comment">
					<h1>You can leave a comment here</h1>
				</div>
			}
		</div>
		)
}




export default CommentList