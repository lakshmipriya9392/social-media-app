import React, { useState, useContext } from 'react'
import SignIn from '../../Components/signIn'
import { UserContext } from '../../contexts/user'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import makeid from '../../helper/functions';
import { db, storage } from '../../firebase'
import './style.css'
import  firebase from 'firebase';
export default function CreatePost() {

    const [user] = useContext(UserContext).user
    const [caption, setCaption] = useState("")
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        setImage(e.target.files[0]);

        let selectedImage = URL.createObjectURL(e.target.files[0]);

       let imagePreview = document.getElementById('imagePreview')
        
       imagePreview.src = selectedImage;
       imagePreview.style.display = 'block' 

    }

    const handleUpload = () => {
        if(image){
            var imageName = makeid(10);
            var uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);
            uploadTask.on("state_changed", (snapshot) => {
                // progress like 1%, 2%, 3%.....

                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            }, (error) => {
                console.log(error);
            }, () => {
                // get downloadUrl and upload the post info

                storage.ref("images").child(`${imageName}.jpg`).getDownloadURL()
                .then((imageURL) => {
                    db.collection('posts').add({
                        timeStamp : firebase.firestore.FieldValue.serverTimestamp(),
                        caption : caption,
                        photoUrl : imageURL,
                        username : user.email.replace("@gmail.com", " "),
                        profileUrl : user.photoURL  
                    })
                });

                setCaption("");
                setProgress(0);
                setImage(null);

                document.getElementById('imagePreview').style.display = "none"
            })
        }
    }

    return (
        <div className = 'createPost'>
        { user ? (
            <div className = "createPost-loggedIn">
            <p>Create Post</p>
        <div className = "createPost-loggedInCenter">
            <textarea className = "createpost-textarea"   rows = "3" placeholder = "Enter Caption here.." value = {caption} onChange = {(e) => setCaption(e.target.value)}></textarea>
        </div>
        <div className = "createPost-imagePreview">
            <img id = "imagePreview" alt = "imagePreview" />
        </div>

            <div className = "createPost-bottom">
            <div className = "createPost-imageUpload">
        <label htmlFor = "fileInput">
        <AddAPhotoIcon style = {{cursor : 'pointer', fontSize : "20px"}} />
        </label>
        
            <input id = "fileInput" type = "file" accept = "image/*" onChange = {handleChange} />
        </div>
            <button className = "createPost-uploadBtn" onClick = {handleUpload} style = {{ color : caption ? "#000" : "lightgrey"}} > {`Upload ${progress !== 0 ? progress : "" }`} </button>
            </div>
            </div>
        
         ) : <div><SignIn />
            <p className = "postcomment">to Post & Comment</p></div> }
            
        </div>
    )
}
