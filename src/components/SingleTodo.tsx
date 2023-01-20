import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import styled from "styled-components";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiCheckCircle } from "react-icons/fi";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.text);

  /* function to check task or uncheck */
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  /* function to delete task */
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  /* function to edit task */
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <SingleTaskWrapper
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              ref={inputRef}
              onBlur={() => setEdit(false)}
            />
          ) : todo.isDone ? (
            <StrikedTaskText>{todo.text}</StrikedTaskText>
          ) : (
            <SingleTaskText>{todo.text}</SingleTaskText>
          )}

          <div>
            <Icons
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <TbEdit />
            </Icons>
            <Icons onClick={() => handleDelete(todo.id)}>
              <RiDeleteBin5Line />
            </Icons>
            <Icons onClick={() => handleDone(todo.id)}>
              <FiCheckCircle />
            </Icons>
          </div>
        </SingleTaskWrapper>
      )}
    </Draggable>
  );
};

export default SingleTodo;

// styles
const SingleTaskWrapper = styled.form`
  display: flex;
  border-radius: 5px;
  padding: 20px;
  margin-top: 15px;
  background-color: #e2b13c;
  flex-wrap: wrap;
  transition: 0.2s;
  :hover {
    box-shadow: 0 0 5px black;
    transform: scale(1.03);
  }
`;
const SingleTaskText = styled.span`
  flex: 1;
  padding: 5px;
  border: none;
  font-size: 20px;
`;
const StrikedTaskText = styled.s`
  flex: 1;
  padding: 5px;
  border: none;
  font-size: 20px;
`;
const Icons = styled.span`
  margin-left: 10px;
  font-size: 25px;
  cursor: pointer;
`;
