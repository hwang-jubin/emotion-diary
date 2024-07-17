import './DiaryList.css';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { DataType } from '../type';
import { useState } from 'react';
import DiaryItem from './DiaryItem';

interface DiaryListProps {
    monthlyData: DataType[];
}


const DiaryList: React.FC<DiaryListProps> = ({ monthlyData }) => {

    const nav = useNavigate();
    const [sortType, setSortType] = useState<string>("latest");

    const onChangeSortedType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortType(e.target.value)
    }


    const getSortedData = (): DataType[] => {
        return monthlyData.sort((a, b) => {
            if (sortType === "oldest") {
                return Number(a.createdDate) - Number(b.createdDate);
            } else {
                return Number(b.createdDate) - Number(a.createdDate);
            }
        });
    }

    const sortedData = getSortedData();

    return (
        <div className="DiaryList">
            <div className="menu_bar">
                <select onChange={(e) => onChangeSortedType}>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된 순</option>
                </select>
                <Button text="새 일기 쓰기" onClick={() => nav('/new')} />
            </div>
            <div className="list_wrapper">
                {sortedData.map((item) => (
                    <DiaryItem key={item.id} data={item} />
                ))}
            </div>
        </div>
    );
};

export default DiaryList;
