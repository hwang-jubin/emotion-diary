import Header from "../components/Header";
import { useState } from "react";
import Button from "../components/Button";


// Button , DiaryList, Header

interface HeaderProps {
    title: string;
    leftChild: React.ReactNode;
    rightChild?: React.ReactNode;
}


const Home: React.FC = () => {

    const [pivotDate, setPivotDate] = useState(new Date());

    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    }

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    }

    console.log(pivotDate);

    return (
        <div>
            <Header
                title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
                leftChild={<Button text={'<'} onClick={onDecreaseMonth} />}
                rightChild={<Button text={'>'} onClick={onIncreaseMonth} />} />
        </div>)
}

export default Home;