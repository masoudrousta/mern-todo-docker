import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import TodosList from './components/TodosList'
import CreateTodo from './components/CreateTodo'
import EditTodo from './components/EditTodo'
import './App.css'
import logo from './logo.svg'

function App() {
  return (
    <Router>
      <div className='container'>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <a className='navbar-brand' href=''>
            <img src={logo} width='30' height='30' alt='logo' />
          </a>
          <Link to='/' className='navbar-brand'>
            MERN-Stack Todo App
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#myNavbar'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='myNavbar'>
            <ul className='navbar-nav mr-auto'>
              <li className='navbar-item'>
                <Link to='/' className='nav-link'>
                  Todos
                </Link>
              </li>
              <li className='navbar-item'>
                <Link to='/create' className='nav-link'>
                  Create Todo
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path='/' exact component={TodosList} />
          <Route path='/edit/:id' exact component={EditTodo} />
          <Route path='/create' exact component={CreateTodo} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
