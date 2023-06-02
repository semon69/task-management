import React from 'react';
import Swal from 'sweetalert2';

const AddTask = () => {
    const handleAdd = event => {
        event.preventDefault()
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const status = form.status.value;
        const newItem = { title, description, status }
        console.log(newItem);
        fetch('https://task-management-server-ashen.vercel.app/task', {
            method:"POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newItem)

        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                Swal.fire('Task Added Successfully')
                form.reset()
            }
        })

    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200 my-12">
                <div className="hero-content flex-col">

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleAdd} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text"  name='title' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <input type="text"  name='description' className="input input-bordered" />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Status</span>
                                </label>
                                <input type="text" defaultValue={'Incomplete'} placeholder="status" name='status' className="input input-bordered" />

                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Add" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTask;