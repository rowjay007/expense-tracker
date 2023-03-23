import { useRecoilValue } from "recoil";
import { taskListState } from "@/store/atoms";

const TaskList = () => {
  const tasks = useRecoilValue(taskListState);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <p>{task.title}</p>
          <p>{task.description}</p>
          <p>{task.completed ? "Completed" : "Incomplete"}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
