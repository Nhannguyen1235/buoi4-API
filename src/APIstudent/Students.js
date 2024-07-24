import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import axios from "axios";

export default function Students() {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newValue, setNewValue] = useState("");
  const [name, setName] = useState("");
  const url = "https://66a07af87053166bcabb8822.mockapi.io/student";
  const flethAPI = () =>
    axios
      .get(url)
      .then(function (res) {
        setData(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  useEffect(() => {
    flethAPI();
    return () => {
      console.log("unmount");
    };
  }, []);
  const deleteStudent = (id) => {
    axios
      .delete(url + "/" + id)
      .then(function (res) {
        console.log("srudent deleted");
        setData(data.filter((item) => item.id !== id));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const addStudent = (Name) => {
    axios.post(url, { name: Name }).then(function (res) {
      console.log("Added student");
      setData([...data, { id: res.data.id, name: name }]);
    });
    setName("");
  };
  const handleChange = (event) => {
    setNewValue(event.target.value);
  };
  const handleDoubleClick = (id, name) => {
    setEditing(id);
    setNewValue(name);
  };
  const handleBlur = async (id) => {
    try {
      await axios.put(`${url}/${id}`, { name: newValue });
      setData(
        data.map((item) => (item.id === id ? { id, name: newValue } : item))
      );
      setEditing(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container text-center">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addStudent(name);
            setName("");
          }
        }}
        className="p-2"
        type="text"
        placeholder="Student Name"
      ></input>
      <h1>List Student</h1>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>
                {editing === item.id ? (
                  <input
                    type="text"
                    value={newValue}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleBlur(item.id)
                      }
                    }}
                  />
                ) : (
                  <span
                    onDoubleClick={() => handleDoubleClick(item.id, item.name)}
                  >
                    {item.name}
                  </span>
                )}
              </td>
              <td>
                <Button
                  onClick={() => deleteStudent(item.id)}
                  className="btn btn-danger m-3"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
