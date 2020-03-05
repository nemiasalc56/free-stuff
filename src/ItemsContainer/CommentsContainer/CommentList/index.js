import React from 'react'
import { Card, Button } from 'semantic-ui-react'

function CommentList(props) {

	// get all the comments from props
	const commentList = props.commentList
	console.log("props.user in CommentList >>>", props.user);
	console.log("CommentList >>", commentList);
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
			{comment}
		</div>
		)
}




export default CommentList