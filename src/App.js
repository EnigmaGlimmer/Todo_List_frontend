import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { AutoProvider } from './context/AuthContext';
import TodoList from './components/Todo/TodoList';

const App = () => {
 return (
  <AutoProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="todo" />} />
        <Route path='/todos' element={<TodoList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  </AutoProvider>
 )
};

export default App;