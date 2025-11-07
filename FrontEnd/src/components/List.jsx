import { useEffect, useState, Fragment } from "react"
import { Link } from "react-router-dom";
import '../style/list.css'

export default function List() {
    const [taskData, setTaskData] = useState();
    const [selectedTask, setSelectedTask] = useState([]);
    useEffect(() => {
        getListData();
    }, [])
    const getListData = async () => {
        let list = await fetch("http://localhost:3000/tasks",{
            credentials: 'include'
        });
        list = await list.json();
        if (list.success) {
            setTaskData(list.result);
        }else{
            alert("Try after some time");
        }
    }

    const deleteTask = async(id)=>{
        let item = await fetch("http://localhost:3000/delete/"+id,{
            method: "delete",
            credentials: 'include'
        })
        item = await item.json();
        if (item.success) {
            getListData();
        }
        else{
            alert("Try after some time");
        }
    }

    const selectAll = (event) =>{
        if (event.target.checked) {
            let items = taskData.map((item)=> item._id);
            setSelectedTask(items);
        } else{
            setSelectedTask([]);
        }
    }

    const selectSingleTask = (id)=>{
        if (selectedTask.includes(id)) {
            let items = selectedTask.filter((item)=> item!==id);
            setSelectedTask([items]);
        }else{
            setSelectedTask([id,...selectedTask]);
        }
    }

    const deleteMultiple = async()=>{
        let item = await fetch("http://localhost:3000/delete-multiple",{
            credentials: 'include',
            method: "delete",
            body: JSON.stringify(selectedTask),
            headers:{
                "Content-Type": "application/json"
            }
        });
        item = await item.json();
        if (item.success) {
            getListData();
        }
        else{
            alert("Try after some time");
        }
    }

    return (
        <div className="list-container">
            <h1>To Do List</h1>
            <button onClick={deleteMultiple} className="delete-item delete-multiple">Delete</button>
            <ul className="task-list">
                <li className="list-header"><input onChange={selectAll} type="checkbox" name="" id="" /></li>
                <li className="list-header">S.No</li>
                <li className="list-header">Title</li>
                <li className="list-header">Description</li>
                <li className="list-header">Action</li>
            

            {
                taskData && taskData.map((item, index) => (
                    <Fragment key={item._id}>
                        <li className="list-item"><input checked={selectedTask.includes(item._id)} onChange={()=>selectSingleTask(item._id)} type="checkbox" name="" id="" /></li>
                        <li className="list-item">{index + 1}</li>
                        <li className="list-item">{item.title}</li>
                        <li className="list-item">{item.description}</li>
                        <li className="list-item"><button onClick={()=>deleteTask(item._id)} className="delete-item">Delete</button>
                        <Link className="update-item" to={"update/"+item._id}>Update</Link>
                        </li>
                        </Fragment>
                ))
            }
            </ul>
        </div>
    )
}