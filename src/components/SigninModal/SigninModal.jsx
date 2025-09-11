import React, { useEffect, useState } from "react"
import { useFakeAuth } from "../../contexts/FakeAuthContext"
import User from "../User/User"
import Button from "../Button/Button"
import './SigninModal.css'

export default function SigninModal({ isOpen, onClose }) {
    const { signIn } = useFakeAuth()
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [passVisible, setPassVisible] = useState(false)

    if (!isOpen) return null

    const handleSignIn = () => {
        signIn({ username, password })
        setUsername("")
        setPassword("")
        setPassVisible(false)
        onClose()
    }

    const handleClose = () => {
        setUsername("")
        setPassword("")
        setPassVisible(false)
        onClose()
    }

    return (
        <div className="modal-backdrop" onClick={handleClose}>
            <div className="modal-cont" style={{ width: "500px" }} onClick={e => e.stopPropagation()}>
                <h1 className="modal-title">Continue to STUDYSPOT</h1>

                <input
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="signin-modal-input"
                />

                <div className="pw-input-cont">
                    <input
                        placeholder="Password"
                        type={passVisible ? "text" : "password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="signin-modal-input"
                    />
                    <Button onClick={() => {setPassVisible(!passVisible)}} variant={passVisible ? "primary" : "secondary"} able="enabled" children={<p className="icon-only-p">👁️</p>} extraClass="square" tooltip={passVisible ? "Hide password" : "Show password"}/>
                </div>

                <div className="signin-modal-bttn-cont">
                    <Button onClick={handleSignIn} variant="primary" able={(username && password) ? "enabled" : "disabled"}>
                        <b>🔑 Sign-in</b>
                    </Button>
                    <Button onClick={handleClose} variant="secondary">
                        ❌ Cancel
                    </Button>
                </div>
            </div>
        </div>
    )
}
