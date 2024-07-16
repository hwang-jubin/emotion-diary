import Header from "../components/Header";
import { useState } from "react";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useContext } from "react";
import { DiaryStateContext } from "../App";
import { DataType } from "../type";

// Button , DiaryList, Header

interface HeaderProps {
    title: string;
    leftChild: React.ReactNode;
    rightChild?: React.ReactNode;
}

const getMonthlyData = (pivotDate: Date, data: DataType[]) => {
    // 해당 월의 1일 0시 00분 00초
    const beginTime = new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth(),
        1, 0, 0, 0).getTime();

    // 다음 달의 1일 0시 00분 00초
    const endTime = new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth() + 1,
        1, 0, 0, 0).getTime();

    const filteredData = data.filter(
        (item) => beginTime <= item.createdDate && item.createdDate < endTime
    );

    return filteredData;
}


const Home: React.FC = () => {

    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());

    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    }

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    }

    //pivotData 변경시에 Home 컴포넌트가 다시 호출되면서 해당 월의 테이터가 업데이트

    const monthlyData = getMonthlyData(pivotDate, data);

    console.log(monthlyData);

    return (
        <div>
            <Header
                title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
                leftChild={<Button text={'<'} onClick={onDecreaseMonth} />}
                rightChild={<Button text={'>'} onClick={onIncreaseMonth} />} />
            <DiaryList />
        </div>

    )
}

export default Home;