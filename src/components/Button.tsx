import './Button.css'
import React from 'react'

//왼쪽 함수, 오른쪽 함수, 들어가는 텍스트. Header에서 다 만들어진 Button 객체를 내려주면 됨
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