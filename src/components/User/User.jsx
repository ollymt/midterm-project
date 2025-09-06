import { useState } from 'react'
import './User.css'

export default function User({ name, username, pfp }) {
    return (
        <div className='user-cont'>
            <div className='pfp-cont'>
                <img src={pfp} />
            </div>
            <div className='user-name-cont'>
                <h1 className='user-list-disp-name'>{name}</h1>
                <h2 className='user-list-username'>{username}</h2>
            </div>
            <div className='user-chevron-cont'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>
        </div>
    )
}