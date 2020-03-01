import React, { Component } from 'react'




function CommentList(props) {

	// get all the comments from props
	console.log("props in ItemList");
	const comment = props.commentList.map((comment) => {

		return(
			<div key={comment.id}>
				<p>{comment.comment}. (By: {comment.author.first_name})</p>
			</div>
			)
	})

	return(
		<div>
			{comment}
		</div>
		)
}




export default CommentList