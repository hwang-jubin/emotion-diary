import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import NotFound from './pages/NotFound';
import Edit from './pages/Edit';
import { useEffect, useReducer, useRef, createContext } from 'react';
import { DataType } from "./type";

type actionType = 'CREATE' | 'DELETE' | 'UPDATE';

interface Action {
  type: actionType,
  data: Partial<DataType>
}

//state: data에 들어있는 그대로
//action: dispatch로부터 넘긴 값
const reducer = (state: DataType[], action: Action) => {
  let nextState: DataType[];

  switch (action.type) {
    case "CREATE": {
      nextState = [action.data as DataType, ...state];
      break
    }
    case "DELETE": {
      nextState = state.filter((item) => item.id !== action.data.id)
      break
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        item.id === action.data.id ? action.data as DataType : item)
      break;
    }
    default:
      nextState = state;
  }
  return nextState;
}

// onCreate, onDelete, onUpdate 함수의 타입 정의
type OnCreateType = (createdDate: number, emotionId: number, content: string) => void;
type OnDeleteType = (id: number) => void;
type OnUpdateType = (id: number, createdDate: number, emotionId: number, content: string) => void;


// Context 생성
export const DiaryStateContext = createContext<DataType[]>([]);
export const DiaryDispatchContext = createContext<{ onCreate: OnCreateType, onDelete: OnDeleteType, onUpdate: OnUpdateType }>({
  onCreate: () => { },
  onDelete: () => { },
  onUpdate: () => { },
});



function App() {

  const [data, dispatch] = useReducer(reducer, [] as DataType[]);
  const idRef = useRef(0);

  //새 일기 추가
  const onCreate = (createdDate: number, emotionId: number, content: string) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  }

  // 일기 삭제
  const onDelete = (id: number) => {
    dispatch({
      type: "DELETE",
      data: { id },
    });
  };

  //일기 업데이트
  const onUpdate = (id: number, createdDate: number, emotionId: number, content: string) => {
    dispatch({
      type: "UPDATE",
      data: {
        id, createdDate, emotionId, content
      }
    })
  }

  // 10개의 mock 데이터 생성
  useEffect(() => {
    const mockData: DataType = {
      id: 1,
      createdDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1).getTime(),
      emotionId: 1,
      content: "일기"
    };
    dispatch(
      { type: 'CREATE', data: mockData as Partial<DataType> }); // 초기 데이터로 설정
  }, []);

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onDelete, onUpdate }}>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}
export default App;
