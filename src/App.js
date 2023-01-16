import React, {useEffect, useState, useRef} from 'react';
import TodoTask from './components/TodoTask';
import { useIsMount } from "./components/useIsMount";


function compare( a, b ) {
  if ( a.status < b.status){
    return -1;
  }
  return 0;
}

function App() {
  const isMount = useIsMount();

  const [task, setTask] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  const [popup, setPopup] = useState(false);


  const taskTitle  = useRef(null);
  const taskStatus = useRef(null);

  useEffect(()=>{
    const storedArray = JSON.parse(localStorage.getItem('task'));
    if (storedArray) {
      setTask(storedArray);
    }
  },[])

  useEffect(() => {
    if(!isMount){
      localStorage.setItem('task', JSON.stringify(task));
    }
  }, [task]);

  const insertTodo = () => {
    if(isEdit){
      const updatedArray = task.map(obj => {
        if (obj.id === isEdit) {
          if(inputStatus != "") {
            return { ...obj, name: inputValue, status: inputStatus};
          }else{
            return;
          }
        }
        return obj;
      })
      setTask(updatedArray);
    }else{
      if(inputStatus != ""){
        setTask([...task, {"name": inputValue, "status": inputStatus, id: Date.now() + Math.random() }]);
      }else{
        return;
      }
    }

    setIsEdit(false);
    setPopup(false);
    setInputValue("");
    setInputStatus("");
  }

  const updateTodo = (id) => {
    setPopup(true);
    let updateTask = task.find(obj => obj.id === id);
    setInputValue(updateTask.name);
    setInputStatus(updateTask.status);

    setIsEdit(id);
  }

  const deleteTodo = (id) => {
    const updatedArray = task.filter(obj => obj.id !== id);
    setTask(updatedArray);
  }

  

  // console.log(task);
  return (
    <div className="flex flex-col w-screen h-screen bg-[#d6def1] ">

      {
        popup && (
            <div id="overlay" className="fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] h-full w-full backdrop-blur-md transition-all ease-in-out delay-200">
            <div className="h-full w-full flex flex-col items-center justify-center">

              <div id="overlay-close" onClick={()=>setPopup(false)}><i className="fa-solid fa-xmark text-4xl mb-4 cursor-pointer"></i></div>

              <div id="edit-form" className="flex-col p-5 rounded-2xl gap-4 w-[350px] h-[300px] justify-center items-center none bg-[#9c99d8] border-2 border-black">

                <div className="flex flex-col justify-around items-center gap-4 h-full">
                  <label for=""  className="mx-4 text-2xl text-white">Task Name</label>
                  <input id="edit-input" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder="Task Name" className="bg-slate-100 px-3 py-2 rounded-xl text-xl outline-none" type="text"/>
                
                  <label for="" className="mx-4 text-2xl text-white">Status</label>
                  <select id="edit-status" value={inputStatus} onChange={(e)=>setInputStatus(e.target.value)}  name="status" className="px-3 py-2 text-xl rounded-xl bg-slate-100" required>
                    <option value="" className="hidden px-4 py-3 rounded-lg bg-slate-100"></option>
                    <option value={0} className="px-4 py-3 rounded-lg bg-slate-100">To-do</option>
                    <option value={1} className="px-4 py-3 rounded-lg bg-slate-100">In-Progress</option>
                    <option value={2} className="px-4 py-3 rounded-lg bg-slate-100">Completed</option>
                  </select>
                  <button id="edit-task" onClick={insertTodo} className="py-2 px-4 m-auto rounded-md bg-[#5A55CA] text-xl text-white w-22">Add Todo</button>
                </div> 
              </div> 
            </div>
          </div>
        )
      }

      <div className="flex justify-center">
        <div className="md:w-[60%] w-[100%]  my-24 flex flex-col justify-around items-start bg-[#cccef0] rounded-3xl">
            <div className="justify-start gap-3 p-8">
              <h2 className="text-5xl font-semibold">Todo-List App</h2>
              <p className="inline-block text-2xl p-2 text-white bg-[#5A55CA] mt-5">Do it Now</p>
            </div>

            <div className="flex w-full gap-4 my-8 justify-end">
                <button id="add-task" onClick={()=>setPopup(true)} className="text-lg mr-4 py-3 px-[14px] border border-sky-500 text-sky-500 rounded-full cursor-pointer"><i className="fa-solid fa-plus"></i></button>
            </div>

            <section className="w-full">
              <table className="table-auto w-full rounded-xl">
                <thead className="border-b-2 border-black rounded-xl">
                  <tr>
                    <th className="text-2xl font-medium text-gray-900 px-3 py-4 text-center">Task</th>
                    <th className="text-2xl font-medium text-gray-900 px-3 py-4 text-center">Status</th>
                    <th className="text-2xl font-medium text-gray-900 px-3 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody id="todo-table" className="rounded-xl">
                  {
                    task.sort(compare).map((item)=>{
                       return (
                          <TodoTask key={item.id} id={item.id} statusCode={parseInt(item.status)} todoText={item.name} editTodo={updateTodo} deleteTodo={deleteTodo} />
                       )
                    })
                  }
                </tbody>
              </table>
            </section>
        </div>
      </div>
      
    </div>
  );
}

export default App;
