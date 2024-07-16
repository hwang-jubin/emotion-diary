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
  data: DataType
}

//state: data에 들어있는 그대로
//action: dispatch로부터 넘긴 값
const reducer = (state: DataType[], action: Action) => {
  let nextState: DataType[];

  switch (action.type) {
    case "CREATE": {
      nextState = [action.data, ...state];
      break
    }
    default:
      nextState = state;
  }
  return nextState;
}


function App() {

  const [data, dispatch] = useReducer(reducer, [] as DataType[]);
  const idRef = useRef(0);

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

  const DiaryDataContext = createContext(data);
  const DiaryDispatchContext = createContext(onCreate);

  return (
    <>
      <DiaryDataContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={onCreate}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </DiaryDispatchContext.Provider>
      </DiaryDataContext.Provider>
    </>
  );
}
export default App;
