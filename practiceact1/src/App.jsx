import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const addTask = () => {
    if (inputValue.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const deleteTask = (indexToDelete) => {
    const newTasks = tasks.filter((task, index) => index !== indexToDelete);
    setTasks(newTasks);   
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const pendingTasksCount = tasks.filter(task => !task.completed).length;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Cursor Lamp Effect */}
      <div 
        className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-10 blur-[80px] opacity-20 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ease-out"
        style={{
          left: cursorPosition.x - 150,
          top: cursorPosition.y - 150,
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-8 relative z-20">
        <div className="max-w-md mx-auto bg-gray-800/20 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-gray-700/50 shadow-blue-500/10 transition-all duration-300">
          <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">TaskMaster 🚀</h1>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Enter a task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-200 shadow-lg"
            />
            <button 
              onClick={addTask}
              className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
            >
              Add
            </button>
          </div>

          <div className="bg-gray-800/30 rounded-xl p-4 max-h-[400px] overflow-y-auto border border-gray-700/30 backdrop-blur-sm">
            <ul className="space-y-3">
              {tasks.length === 0 ? (
                <li className="text-center py-10 text-gray-400 italic">No tasks yet. Add your first task!</li>
              ) : (
                tasks.map((task, index) => (
                  <li 
                    key={task.id}
                    className={`flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600/50 transition-all duration-300 hover:border-blue-500/50 ${task.completed ? 'opacity-60' : ''} transform hover:scale-[1.02]`}
                  >
                    <div className="flex items-center space-x-3 flex-grow">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(index)}
                        className="w-5 h-5 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                      />
                      <span className={`${task.completed ? 'line-through text-gray-400' : 'text-white'} transition-all duration-200`}>
                        {task.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTask(index)}
                      className="px-3 py-1 bg-gradient-to-r from-red-600/50 to-red-700/50 hover:from-red-600 hover:to-red-700 rounded-lg text-sm transition-all duration-200 transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="mt-6 text-center text-gray-300 bg-gray-800/30 rounded-xl p-3 border border-gray-700/30 backdrop-blur-sm">
            <p className="font-medium">You have <span className="text-blue-400 font-bold">{pendingTasksCount}</span> pending task{pendingTasksCount !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default App
