import React,{useState,useEffect,Component} from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { CookiesProvider, withCookies} from 'react-cookie'
import Loadable from 'react-loadable';
import API from './api/api';
import { ToastProvider } from 'react-toast-notifications'
// loading main style
import "./App.css";

// is Loading page
import Loading from './interfaces/Loading';

// loading interfaces
const LoginLoad = Loadable({
  loader: () => import('./interfaces/Login'),
  loading: Loading,
});
const LeftMenuLoad = Loadable({
  loader: () => import('./helpers/LeftMenu'),
  loading: Loading,
});
const DashboardRoute = Loadable({
  loader: () => import('./helpers/DashboardRoute'),
  loading: Loading,
});

function AppRouter() {

  const [user, setUser] = useState(-1);

  useEffect(() => {
    // first we check if employee is logged in
    const isLogedIn = async () => {
      setUser(await API.isLogin());
    };
    isLogedIn();
  }, []);
  if(!user && user!=-1){
    return <div><Route path="/login" component={(props) => <LoginLoad setUser={setUser} {...props}  />}  /><Redirect to={"/login"} /></div>;
  }
 
  return (
      <div>
        <div className={"left-menu"}>
          <LeftMenuLoad user={user} setUser={setUser} />
        </div>

        <div className={"right-menu"}>
          <Switch>
            <Route path="/" component={(props) => <DashboardRoute user={user} {...props} isAuthed={true} />} />
          </Switch>
        </div>
      </div>
  );
}




class App extends Component {
 
  render() {
    return (
      <CookiesProvider>
        <BrowserRouter>
          <ToastProvider placement="bottom-center">
            <AppRouter/>
          </ToastProvider>

        </BrowserRouter>
      </CookiesProvider>
    );
  }
}

export default withCookies(App);
