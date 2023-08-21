// deno-lint-ignore-file
import React from 'react'
import './index.css'

interface LoginPortalProps {
    children: React.ReactNode
    text : string
}

export default function LoginPortal({ children, text }: LoginPortalProps) {
  return (
    <div className="login">
        <div className='loginText'>
            <h1 data-text={text}><span>{text}</span></h1>
        </div>
        <div className="childrenContainer">
        {children}
    </div>
    </div>
  )
}