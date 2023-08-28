import './App.css';

import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Login from './newComponents/pages/Login'
import { createBrowserHistory } from 'history';
import BaseContainer from './newContainers/baseContainer';

import { pageNames } from './utils/constants';


const history = createBrowserHistory()

function App() {
  return (
    <div className="App">
        <BrowserRouter history={history}>
          <Routes>   
              <Route path='/admin/allBooks' element={<BaseContainer pageName={pageNames.ADMIN_HOME} />}/>
              <Route path='/admin/issueRequests' element={<BaseContainer pageName={pageNames.ISSUE_REQUESTS}/>}/>
              <Route path='/homepage' element={<BaseContainer pageName={pageNames.USER_HOME}/>}/>
              <Route path='/MyBooks' element={<BaseContainer pageName={pageNames.MY_BOOKS}/>}/>
              <Route path='/myWishList' element={<BaseContainer pageName={pageNames.MY_WISHLIST}/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/' element={<Login/>}/>   
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;


//Not required 
