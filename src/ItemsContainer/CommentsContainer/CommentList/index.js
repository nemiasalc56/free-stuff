import React from 'react'
import { Card } from 'semantic-ui-react'

function CommentList(props) {

	// get all the comments from props
	const comment = props.commentList.map((comment) => {

		return(
			<Card key={comment.id}>
				<Card.Content>
					<p>{comment.comment}</p>
					<p>(By: {comment.author.first_name})</p>
					<p>(At: {comment.created_at})</p>
					<button onClick={()=>props.deleteComment(comment.id)}>Delete</button>
					
				</Card.Content>
			</Card>
			)
	})

	return(
		<div>
			{comment}
		</div>
		)
}




export default CommentList