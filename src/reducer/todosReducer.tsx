import { ReactNode, ReducerAction } from "react";

// todosReducer.tsx
export const ACTIONS = {
	ADD_TASK: "ADD_TASK",
	DELETE_TASK: "DELETE_TASK",
	EDIT_TASK: "EDIT_TASK",
	TOGGLE_DONE: "TOGGLE_DONE",
};

interface ReducerTypes{
  tasks: ReactNode;
  action: ReducerAction<any>;
}

export function taskReducer(tasks, action) {
  // [tasks] is consider as states and doesn't accept the {Mutation}
	switch (action.type) {
		case ACTIONS.ADD_TASK:
			return [...tasks, action.payload];
		case ACTIONS.DELETE_TASK:
			return tasks.filter((task) => task.id !== action.payload.id);
		case ACTIONS.EDIT_TASK:
			return tasks.map((task) =>
				task.id === action.payload.id ? { ...task, ...action.payload } : task
			);
		case ACTIONS.TOGGLE_DONE:
      return tasks.map((task) =>
        // here we [avoid mutation by using spread operator {...object} ]
				task.id === action.payload.id ? { ...task, isDone: !task.isDone } : task
			);
		default:
			return tasks;
	}
}

// ----------------------------------------------------------
// export default function todosReducer(currentState, action) {
//   console.log(currentState);
// 	switch (action.type) {
// 		case "add-todo": {
// 			const tmpTasks = [...currentState];
// 			tmpTasks.push(action.payload.task);

// 			localStorage.setItem("todos", JSON.stringify(tmpTasks));
// 			return tmpTasks;
// 		}

//     case "delete-todo": {
//       const updatedTodos = currentState.filter((task) => {
//         console.log(action.payload.id);
//         return task.id != action.payload.id;
//       });
//       localStorage.setItem("todos", JSON.stringify(updatedTodos));
//       return updatedTodos;
//     }

// 		case "complete-todo": {
// 			const targetTask = currentState.find(
// 				(task) => task.id?.toString() === action.payload.todoId.toString()
//       );
//       console.log(targetTask);
// 			// action.payload.isDone = !action.payload.isDone;
// 			const updatedTodos = currentState.map((task) => {
// 				if (targetTask.id == task.id) {
// 					return targetTask;
// 				}
// 				return task;
// 			});
// 			// make the change also to localStorage:
// 			localStorage.setItem("todos", JSON.stringify(updatedTodos));
// 			return updatedTodos;
// 		}

// 		default:
// 			throw Error("Type is not defined", action.type);
// 	}
// }
