import './Button.css'
import React from 'react'

// 버튼 상태 추가하기
interface ButtonProps {
    text: string,
    onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <>
            <button onClick={onClick}>{text}</button>
        </>
    )
}

export default Button;