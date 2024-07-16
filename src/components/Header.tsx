import React, { ReactNode } from "react";
import "./Header.css";

interface HeaderProps {
    title: string;
    leftChild: ReactNode,
    rightChild: ReactNode
}

const Header: React.FC<HeaderProps> = ({ title, leftChild, rightChild }) => {
    return <header className="Header">
        <div>{title}</div>
        <div>{leftChild}</div>
        <div>{rightChild}</div>
    </header>;
};

export default Header;
