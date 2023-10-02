import React, { useEffect, useState } from "react";
import WithAuth from "../../../component/WithAuth";
import {
  todoDeleteService,
  todoListService,
} from "../../../services/todo.service.js";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import moment from "moment/moment";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoListMeta, setTodoListMeta] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    getTodoList();
  }, [page]);
  const getTodoList = async () => {
    const response = await todoListService(page);
    if (response.status === 200) {
      setTodoList(response.data.data.records);
      setTodoListMeta(response.data.data.meta);
    } else {
      toast.error(response.data.error?.message);
    }
  };
  const deleteTodo = async (id) => {
    const response = await todoDeleteService(id);
    if (response.status === 200) {
      toast.success(`Todo Deleted`);
      getTodoList();
    } else {
      toast.error(response.data.error?.message);
    }
  };
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title || "Untitled",
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Create Date",
      selector: (row) => moment(row.createdAt).format("DD-MM-YYYY"),
      sortable: true,
    },

    {
      name: "Status",
      cell: (row) => {
        if (row.isCompleted === false)
          return <span className="badge bg-danger">Incomplete</span>;
        if (row.isCompleted === true)
          return <span className="badge bg-success">Complete</span>;
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link to={`/dashboard/todos/edit/${row.uuid}`}>Edit</Link> &nbsp;
          &nbsp;
          <Link
            to={`#`}
            onClick={() => {
              deleteTodo(row.uuid);
            }}
          >
            Delete
          </Link>
        </>
      ),
    },
  ];
  return (
    <div>
      <h2>Todo list</h2>
      <Link to={`/dashboard/todos/add`}>Add Todo</Link>
      <DataTable
        columns={columns}
        data={todoList}
        pagination
        paginationServer
        paginationTotalRows={todoListMeta.totalRecords}
        paginationPerPage={15}
        paginationComponentOptions={{
          noRowsPerPage: true,
        }}
        onChangePage={(page) => setPage(page)}
      />
    </div>
  );
};

const WithAuthTodoList = WithAuth(TodoList);

export default WithAuthTodoList;
