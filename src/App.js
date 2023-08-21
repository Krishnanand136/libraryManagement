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

const history = createBrowserHistory()

function App() {
  return (
    <div className="App">
        <BrowserRouter history={history}>
          <Routes>
              <Route path='/homepage' element={
                  <>
                    <NavBar pageName={"All Books"}/>
                    <HomePage/>
                  </>
                }
              />

              <Route path='/wishlist' element={
                  <>
                    <NavBar pageName={"All Books"}/>
                    <WishList/>
                  </>
                }
              />

              <Route path='/myBooks'element={
                  <>
                    <NavBar pageName={"My Books"}/>
                    <MyBooks/>
                  </>
                }
              />

              <Route path='/admin' element={
                  <>
                    <AdminNavBar pageName={"All Books"}/>
                    <Admin/>
                  </>
                }
              />

              <Route path='/issueRequests' element={
                  <>
                   <AdminNavBar pageName={"Issue Requests"}/>
                   <IssueBooks/>
                  </>
                }
              />
              
              <Route path='/login' element={<Login/>}/>
              <Route path='/' element={<Login/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
