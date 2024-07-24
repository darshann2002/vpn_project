// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Gridtable from '../user-details/grid-view';
import Gridviwe from '../user-details/grid-view';
import styles from './app.module.css'
import NxWelcome from './nx-welcome';
import UserGrid from '../user-details/user-detatils-form'
// import MyComponent from './Basic-layout/layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './app-routes';


export function App() {
  return (
    <>
    <div>
      <AppRoutes/>
    </div>
    
    </>
  );
}

export default App;
