import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import NotFound from './pages/NotFound';
import Edit from './pages/Edit';
import { useState, useReducer, useRef, createContext } from 'react';



interface DataType {
  id: number,
  createdDate: string,
  emotionId: number,
  content: string
}
type actionType = 'CREATE' | 'DELETE' | 'UPDATE';

interface Action {
  type: string,
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


function App() {

  const [data, dispatch] = useReducer(reducer, [] as DataType[]);
  const idRef = useRef(0);

  //새 일기 추가
  const onCreate = (createdDate: string, emotionId: number, content: string) => {
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
  const onUpdate = (id: number, createdDate: string, emotionId: number, content: string) => {
    dispatch({
      type: "UPDATE",
      data: {
        id, createdDate, emotionId, content
      }

    })

  }

  const DiaryDataContext = createContext(data);
  const DiaryDispatchContext = createContext<{ onCreate: typeof onCreate, onDelete: typeof onDelete, onUpdate: typeof onUpdate }>({ onCreate, onDelete, onUpdate });

  return (
    <>
      <DiaryDataContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onDelete, onUpdate }}>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </DiaryDispatchContext.Provider>
      </DiaryDataContext.Provider>
    </>
  );
}
export default App;
