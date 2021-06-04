import React, { useState, useContext, useEffect } from "react";
import { CredentialsContext } from "../App";
import { v4 as uuidv4 } from "uuid";
import { Pie } from 'react-chartjs-2';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [credentials] = useContext(CredentialsContext);
  const [total,setTotal] = useState("");
  const [complete,setComplete] = useState("");
  const [search,setSearch] = useState('');

  const persist = (newTodos) => {
    fetch(`http://localhost:4000/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(newTodos),
    }).then(() => {});
  };

  useEffect(() => {
    fetch(`http://localhost:4000/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => {
        setTodos(todos);
        setTotal(todos.length);
        var list = todos;
        var c=0;
        for(var i=0;i<list.length;i++)
        {
          if(list[i].checked)
          {
            c++;
          }
        }
        setComplete(c);
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    const newTodo = { id: uuidv4(), checked: false, text: todoText };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTotal(newTodos.length);
    setTodoText("");
    persist(newTodos);
  };

  const toggleTodo = (id) => {
    const newTodoList = [...todos];
    const todoItem = newTodoList.find((todo) => todo.id === id);
    todoItem.checked = !todoItem.checked;
    setTodos(newTodoList);
    var c=0;
    for(var i=0;i<newTodoList.length;i++)
    {
      if(newTodoList[i].checked)
      {
        c++;
      }
    }
    setComplete(c);
    persist(newTodoList);
  };


  const getTodo = todos.filter( todo => {
    return todo.text.toLowerCase().includes(search.toLowerCase())
  })

  const deleteTodo = (x,id) => {
    var list = todos;
    list.splice(x,1);
    setTodos([...list]);
    setTotal(list.length)
    var c=0;
    for(var i=0;i<list.length;i++)
    {
      if(list[i].checked)
      {
        c++;
      }
    }
    setComplete(c);
    fetch(`http://localhost:4000/deleteTodos/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      }
    }).then(() => {});

  }

  const updateTodo = (id) => {
    const newTodo = prompt("Update the task");

    var list = todos;
    for(var i=0;i<list.length;i++)
    {
      if(list[i].id === id)
      {
        list[i].text=newTodo;
      }
    }
    setTodos([...list]);
    const requestOptions = {
          method: 'POST',
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials.username}:${credentials.password}`,
           },
          body: JSON.stringify({newTodo})
      };
      fetch(`http://localhost:4000/update/${id}`, requestOptions)
          .then(response => response.json())
          .then(data => persist(todos));

  }


  return (
    <div>
      <div className="flex-container-div">
        <div className="flex-card-left">
          <h3>Task Completed: </h3>
          <h1>{complete}/{total}</h1>
        </div>
        <div className="flex-card-right">
          <Pie 
            data={{
              labels: ['Total Tasks','Completed Tasks'],
              datasets: [{
                data: [total,complete],
                backgroundColor: ['blue','green']
              }]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
            }}
            height='0%'
          />
        </div>
      </div>
      <br/><br/>
      <div className="flex-container">
        <div className="flex-item-left">
          <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex-item-right">
          <form onSubmit={addTodo}>
            <div>
            <input
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              type="text"
            ></input>&nbsp;&nbsp;
            <button type="submit" className="btn btn-primary btn-block" style={{width: '70px'}}>Add</button>
            </div>
          </form>
        </div>
      </div>
      <table className="tablediv" style={{margin:"auto",width:"700px",backgroundColor:"aliceblue"}}>
        <tbody>
        { todos.length!=0 && getTodo.map((todo,index) => (
        <tr key={todo.id}>
          <td style={{padding: "20px",fontSize: "19px",textAlign: "left"}}>
            <input
              checked={todo.checked}
              onChange={() => toggleTodo(todo.id)}
              type="checkbox"
            />&nbsp;&nbsp;
            <label>{todo.checked && <del>{todo.text}</del>}</label>
            <label>{!todo.checked && todo.text}</label>  
          </td>
          <td style={{padding: "20px",fontSize: "19px"}}>
            <button className="btn btn-primary btn-block" style={{width: '80px'}} onClick={() => deleteTodo(index,todo.id)}>Delete</button>&nbsp;&nbsp;
            <button className="btn btn-primary btn-block" style={{width: '50px'}} onClick={() => {updateTodo(todo.id)}}>Edit</button>
          </td>
        </tr>
      ))}
        </tbody>
      </table>
      <br />
    </div>
  );
}
