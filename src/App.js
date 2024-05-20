import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { tabs } from "./Tabs/tabs";

function App() {
  let [todolist, setTodolist] = useState([]);

  let [activeTabs, setActiveTabs] = useState(0);
  let [activeContent, setActiveContent] = useState(tabs[0].content);
  let changeData = (index) =>{
    setActiveTabs(index);
    setActiveContent(tabs[index].content); 
  }

  let saveToDoList = (event) => {
    let toname = event.target.toname.value;
    if (!todolist.includes(toname)) {
      let newtodolist = [...todolist, toname];
      setTodolist(newtodolist);
    } else {
      alert("To-Do already exists...");
    }

    event.preventDefault();
  };

  let list = todolist.map((value, index) => {
    return (
      <ToDoListItems
        value={value}
        key={index}
        indexNumber={index}
        todolist={todolist}
        setTodolist={setTodolist}
      />
    );
  });

  return (
    <div className="App">
      <div className="tabsOuter">
        <h1 style={{ textAlign: "left" }}>
          {" "}
          Resume Summary Experience and Education
        </h1>
        <ul>
          {tabs.map((tabsItems, index) => {
            return (
              <li>
                <button onClick={() => changeData(index)} className={activeTabs == index ? "activeButton" : ""}>{tabsItems.title}</button>
              </li>
            );
          })}
        </ul>
        <p>
          {activeContent}
        </p>
      </div>
      <h1> ToDo List</h1>
      <form onSubmit={saveToDoList}>
        <div className="inputforms">
          <div class="mb-3 inputbutton">
            <input
              type="text"
              name="toname"
              class="form-control"
              id="formGroupExampleInput"
              placeholder="Enter the task"
            />
            <button type="submit" class="btn btn-primary fw-bold">
              {" "}
              Save{" "}
            </button>
          </div>
        </div>
      </form>
      <div className="outerdiv">
        <ol class="list-group">{list}</ol>
      </div>
    </div>
  );
}

export default App;

function ToDoListItems({ value, indexNumber, todolist, setTodolist }) {
  let [status, setStatus] = useState(false);

  let deleteRow = () => {
    let finalList = todolist.filter((v, i) => i !== indexNumber);
    setTodolist(finalList);
  };

  let checkStatus = () => {
    setStatus(!status);
  };

  return (
    <li
      onClick={checkStatus}
      className={status ? "completed list-group-item" : "list-group-item"}
    >
      {indexNumber + 1} {value}
      <span onClick={deleteRow}>&times;</span>
    </li>
  );
}
