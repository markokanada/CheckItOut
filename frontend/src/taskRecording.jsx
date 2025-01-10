import React, { useState } from 'react';

const TaskRecording = () => {
  const [taskType, setTaskType] = useState('Egyszeri');
  const [taskName, setTaskName] = useState('');
  const [duration, setDuration] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);

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
    <div>
      <div>
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

      <div>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="nev"
        />
      </div>

      <div>
        <input
          type="time"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="ido"
        />
      </div>

      <div>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder="hatar"
        />
      </div>

      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="leír" />
      </div>

      <button
        onClick={handleAddTask}>
        Hozza
      </button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} >
            {task.type} <br />
            {task.name} <br />
            {task.duration} <br />
            {task.deadline} <br />
            {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};






export default TaskRecording;