import React, { useState } from 'react';
import './taskRecording.css';

interface Task {
  type: string;
  name: string;
  duration: string;
  deadline: string;
  description: string;
}


const TaskRecording: React.FC = () => {
  const [taskType, setTaskType] = useState<string>("Egyszeri");
  const [taskName, setTaskName] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  
  const handleAddTask = () => {
    if (taskName.trim()) {
      setTasks([...tasks, {
        type: taskType,
        name: taskName,
        duration,
        deadline,
        description
      }]);
      setTaskName('');
      setDuration('');
      setDeadline('');
      setDescription('');
    }
  };

  return (
    <div className="task-recording-container-main">

      <div className="task-recording-container">
        <h1 className="task-recording-header">Feladat Hozzáadás</h1>
        <div className="task-recording-type">
          <label>
            <input
              type="radio"
              value="Egyszeri"
              checked={taskType === 'Egyszeri'}
              onChange={() => setTaskType('Egyszeri')}
            />
            Egyszeri
          </label>
          <label>
            <input
              type="radio"
              value="Ismétlődő"
              checked={taskType === 'Ismétlődő'}
              onChange={() => setTaskType('Ismétlődő')}
            />
            Ismétlődő
          </label>
        </div>

        <div className="task-recording-field">
          <label htmlFor="" className='task-recording-label-name'>Feladat neve</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Gipsz Jakap"
            className="task-recording-input"
          />
        </div>

        <div className="task-recording-field">
          <label htmlFor="" className='task-recording-label-name'>Időtartama</label>
          <input
            type="time"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Időtartam"
            className="task-recording-input"
          />
        </div>

        <div className="task-recording-field">
          <label htmlFor="" className='task-recording-label-name'>Határidő</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="Határidő"
            className="task-recording-input"
          />
        </div>

        <div className="task-recording-field">
          <label htmlFor="" className='task-recording-label-name'>Leírás</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ide tudod írni a leírást"
            className="task-recording-textarea"
          />
        </div>

        <button
          onClick={handleAddTask}
          className="task-recording-button"
        >
          Hozzáadás
        </button>

        <ul className="task-recording-list">
          {tasks.map((task, index) => (
            <li key={index} className="task-recording-item">
              <strong>Típus:</strong> {task.type} <br />
              <strong>Neve:</strong> {task.name} <br />
              <strong>Időtartama:</strong> {task.duration} <br />
              <strong>Határidő:</strong> {task.deadline} <br />
              <strong>Leírás:</strong> {task.description}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default TaskRecording;