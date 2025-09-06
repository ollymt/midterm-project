import React from "react"
import './SigninModal.css'

export default function SigninModal({ isOpen, onClose, children, width = "500px" }) {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-cont"
        style={{ width }}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {children}
      </div>
    </div>
  )
}
