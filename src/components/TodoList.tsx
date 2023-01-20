import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <Container>
      <Droppable droppableId="TodosList">
        {(provided) => (
          <TodoListDiv ref={provided.innerRef} {...provided.droppableProps}>
            <TodoListHeading>Active Tasks</TodoListHeading>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={todos}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </TodoListDiv>
        )}
      </Droppable>
      <Droppable droppableId="TodoCompletedList">
        {(provided) => (
          <CompletedTodoListDiv
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <TodoListHeading>Completed Tasks</TodoListHeading>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={completedTodos}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </CompletedTodoListDiv>
        )}
      </Droppable>
    </Container>
  );
};

export default TodoList;

// styles
const Container = styled.div`
  display: flex;
  width: 95%;
  margin-top: 10px;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const TodoListDiv = styled.div`
  display: flex;
  width: 47.5%;
  flex-direction: column;
  padding: 15px;
  border-radius: 5px;
  background-color: rgb(50, 195, 205);
  @media (max-width: 1100px) {
    width: 45%;
  }
  @media (max-width: 700px) {
    width: 90%;
    margin-bottom: 10px;
  }
`;
const CompletedTodoListDiv = styled(TodoListDiv)`
  background-color: rgb(235, 103, 80);
`;
const TodoListHeading = styled.span`
  font-size: 30px;
  color: white;
`;
