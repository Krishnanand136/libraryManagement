import './App.css';

import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import { createBrowserHistory } from 'history';
import BaseContainer from './newContainers/baseContainer';

import { pageNames, userTypes } from './utils/constants';


const history = createBrowserHistory()

function App() {
  return (
    <div className="App">
        <BrowserRouter history={history}>
          <Routes>   
              <Route path='/admin/allBooks' element={<BaseContainer pageName={pageNames.ADMIN_HOME} userType={userTypes.ADMIN}/>}/>
              <Route path='/admin/issueRequests' element={<BaseContainer pageName={pageNames.ISSUE_REQUESTS} userType={userTypes.ADMIN}/>}/>
              <Route path='/homepage' element={<BaseContainer pageName={pageNames.USER_HOME} userType={userTypes.USER}/>}/>
              <Route path='/MyBooks' element={<BaseContainer pageName={pageNames.MY_BOOKS} userType={userTypes.USER}/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/' element={<Login/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
