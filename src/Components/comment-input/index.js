import React, {useContext, useState} from 'react'
import './style.css'
import { UserContext } from '../../contexts/user'
import { db } from '../../firebase';

export default function CommentInput({comments, id}) {

    const [comment, setComment] = useState("");
    const [user] = useContext(UserContext).user
    const [commentArray] = useState(comments ? comments : [])

const addComment  = () => {
    //add comment to the post info

    if(comment !== ""){


        commentArray.push({
            comment : comment,
            username : user.email.replace("@gmail.com", " ").toLowerCase(),
        });

        db.collection("posts").doc(id).update({
            comments : commentArray,
        }).then(function(){
            setComment("");
            console.log("comment added")
        }).catch(function(error){
            console.log(`Error in comments ${error}`)
        });
    }

   
}
    return (
        <div className = "commentInput">
            <textarea className = "commentInput-textarea" rows = "1" placeholder = "Write Comment here" value = {comment} onChange = {(e) => setComment(e.target.value)}></textarea>
            <button onClick = {addComment}  className = "commentInput-button">Post</button>
        </div>
    )
}
