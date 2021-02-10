import React from 'react'
import { CreatePost, Navbar } from '../../Containers'
import Feed from '../../Containers/feed'
import './style.css'
export default function Home() {
    return (
        <div className = 'home'>
            <Navbar />'
            <CreatePost />
            <Feed />
        </div>
    )
}
