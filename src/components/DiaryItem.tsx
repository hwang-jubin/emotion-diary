import { DataType } from '../type';
import './DiaryItem.css';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { getEmotionImage } from '../util/get-emotion-image';

interface dataProps {
    data: DataType
}


const DiaryItem: React.FC<dataProps> = ({ data }) => {

    const nav = useNavigate();


    return <div className='DiaryItem'>
        <div
            onClick={() => nav(`/diary/${data.id}`)}
            className={`img_section img_section_${data.emotionId}`}
        >
            <img src={getEmotionImage(data.emotionId)} />
        </div>
        <div onClick={() => nav(`/diary/${data.id}`)} className="info_section">
            <div className='created_date'>
                {new Date(data.createdDate).toLocaleDateString()}
            </div>
            <div className='content'>{data.content}</div>
        </div>
        <div className='button_section'>
            <Button onClick={() => nav(`/edit/${data.id}`)} text="수정하기"></Button>
        </div>
    </div>
}

export default DiaryItem;