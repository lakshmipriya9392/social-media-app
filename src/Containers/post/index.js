import React, { useContext } from 'react'
import { Comment } from '../../Components';
import './style.css';
import { storage, db } from '../../firebase';
import CommentInput from '../../Components/comment-input';
import { UserContext } from '../../contexts/user';
// import{  UserContext } from '../../contexts/user'

export default function Post({profileUrl, username, id, photoURL, caption, comments}) {

    const [user, setUser] = useContext(UserContext).user;

const deletePost = () => {
    // This function will delete the image from firebase storage

    //get ref to the image we like to delete
    var imageRef = storage.refFromURL(photoURL);

    //deleting the image
    imageRef.delete().then(function() {
        console.log("Image is deleted successfully")
    }).catch(function(error){
        console.log(`Error.${error}`)
    })
// delete the post info from the firebase firestore

    db.collection("posts").doc(id).delete().then(function(){
        console.log("Post info is deleted successfully")
    }).catch(function(error){
        console.log(`Error of post info.${error}`)
    })

}

    return (
        <div className = "post">
            <div className = "post__header">
           <div className = "post__headerLeft">
           <img className = "post__profilePic" src = {profileUrl} alt = "profilePic" />
            <p style = {{marginLeft : "8px", paddingTop : "8px"}}>{username}</p>
           </div>
            <button onClick = {deletePost} className = "post__delete" >Delete</button>
            </div>
            <div className = "post__center">
                <img className = "post__photoURL" src = {photoURL} alt = "postedImage" />
            </div>
            <div className = "post__caption">
                <p className = "post__captionUsername">{username}</p>
                <p className = "post__captionContent">{caption}</p>
            </div>

            

           {comments ? (
               comments.map((comment) => (
                   <Comment username = {comment.username} caption = {comment.comment} />
               ))
           ) : (
               <></>
           )}
           {user ? <CommentInput comments = {comments} id = {id} /> : <></>}
        </div>
    )
}
