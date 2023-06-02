import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllTask = () => {
    const [task, setTask] = useState([])
    useEffect(() => {
        fetch('https://task-management-server-ashen.vercel.app/task')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTask(data)
            })
    }, [])
    const handleDelete = id => {
        fetch(`https://task-management-server-ashen.vercel.app/task/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    const remaining = task.filter(singleTask => singleTask._id !== id)
                    setTask(remaining)
                    Swal.fire('Deleted Success')
                }
            })
    }
    const handleUpdate = id => {
        fetch(`https://task-management-server-ashen.vercel.app/task/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'Complete' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    const remaining = task.filter(singleTask => singleTask._id !== id)
                    const updated = task.find(singleTask => singleTask._id == id)
                    updated.status = 'Complete'
                    const newTasks = [updated, ...remaining]
                    setTask(newTasks)
                    Swal.fire('Update Succuss')
                }
            })
    }
    return (
        <div>
            <div className="overflow-x-auto my-12">
                <table className="table">
                    <thead>
                        <tr className='text-white font-semibold text-lg'>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            task.map((singleTask, index) =>
                                <tr key={singleTask._id} className="bg-base-200">
                                    <th>{index + 1}</th>
                                    <td>{singleTask.title}</td>
                                    <td>{singleTask.description}</td>
                                    <td><button className='text-green-600' onClick={()=> handleUpdate(singleTask._id)}>{singleTask.status}</button></td>
                                    <td><button className='text-red-700 btn bg-red-200' onClick={() => handleDelete(singleTask._id)}><FaTrash></FaTrash></button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllTask;