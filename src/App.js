import './App.css';

import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import { createBrowserHistory } from 'history';
import HomePage from './components/HomePage';
import WishList from './components/WishList';
import Admin from './components/Admin';
import IssueBooks from './components/IssueBooks';
import MyBooks from './components/MyBooks';
import AdminNavBar from './components/AdminNavBar';
import NavBar from './components/NavBar'
import Footer from './components/footer';
import PageContainer from './components/page-container'
import BaseContainer from './newContainers/baseContainer';

import { pageNames } from './utils/constants';


const history = createBrowserHistory()

function App() {
  return (
    <div className="App">
        <BrowserRouter history={history}>
          <Routes>   
              <Route path='/admin/allBooks' element={<BaseContainer pageName={pageNames.ADMIN_HOME} />}/>
              <Route path='/admin/issueRequests' element={<BaseContainer pageName={pageNames.ISSUE_REQUESTS} />}/>

              <Route path='/login' element={<Login/>}/>
              <Route path='/' element={<Login/>}/>
          </Routes>
        </BrowserRouter>
    </div>

  );
}

export default App;
