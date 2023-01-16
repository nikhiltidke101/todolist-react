import React from 'react'

const status = ["To-Do", "In-Progress", "Completed"];

const TodoTask = ({id, statusCode, todoText, editTodo, deleteTodo}) => {
    // console.log(id, statusCode, todoText);
  return (
    <tr className='border-b bg-slate-100'>
        <td className='text-xl text-gray-900 font-light whitespace-nowrap text-center'>
            {todoText}
        </td>
        <td className='text-center'>
            {
                statusCode === 0 ? (
                    <span className='text-xl font-light px-6 py-4 whitespace-nowrap border-2 rounded-2xl text-red-500 border-red-500'>
                        {status[statusCode]}
                    </span>
                ) : statusCode === 1 ? (
                    <span className='text-xl font-light px-6 py-4 whitespace-nowrap border-2 rounded-2xl text-yellow-500 border-yellow-500'>
                        {status[statusCode]}
                    </span>
                ) : (
                    <span className='text-xl font-light px-6 py-4 whitespace-nowrap border-2 rounded-2xl text-sky-500 border-sky-500'>
                        {status[statusCode]}
                    </span>
                )
            }
        </td>
        <td className='flex flex-wrap gap-4 justify-center items-center h-auto font-light whitespace-nowrap text-center text-xl p-10'>
            <i onClick={() => editTodo(id)} className='fa-solid fa-pen-to-square px-6 py-4 border border-sky-500 text-sky-500 cursor-pointer rounded-lg edit h-14'></i>
            <i onClick={() => deleteTodo(id)} className='fa-solid fa-trash px-6 py-4 border border-slate-500 text-slate-500 cursor-pointer rounded-lg delete h-14'></i>
        </td>
    </tr>
  )
}

export default TodoTask;
