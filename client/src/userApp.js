import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import React from 'react'

import NavBar from './components/UserNavbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './userpages/HomePage';
import SignUpPage from './userpages/SignUpPage';
import LoginPage from './userpages/LoginPage';
import AddCoursePage from './userpages/AddCoursePage';
import SingleCoursePage from './userpages/SingleCoursePage';
import MyProfilePage from './userpages/MyProfilePage';
import UserPage from './userpages/UserPage';
import AdminPage from './userpages/AdminPage';
import EnrolledCoursePage from './userpages/EnrolledCoursePage';
import CoursesPage from './userpages/CoursesPage';
import Footer from './components/Footer';
import EditCoursePage from './userpages/EditCoursePage';

const App = () => {
    return (
        <Router>
            <div style={{"minHeight":"61.1vh"}}>
                <NavBar/>
                <Switch>
                    <Route path="/add-course">
                        <AddCoursePage/>
                    </Route>
                    <Route path="/login">
                        <LoginPage/>
                    </Route>
                    <Route path="/signup">
                        <SignUpPage/>
                    </Route>
                    <Route path="/my-profile">
                        <MyProfilePage/>
                    </Route>
                    <Route path="/courses/:id">
                        <SingleCoursePage/>
                    </Route>
                    <Route path="/edit-course/:id">
                        <EditCoursePage/>
                    </Route>
                    <Route path="/enrolled/:course_id/:user_id">
                        <EnrolledCoursePage/>
                    </Route>
                    <Route path = "/category/:category">
                        <CoursesPage/>
                    </Route>
                    <Route path="/users/:id/:">
                        <UserPage/>
                    </Route>
                    <Route path="/users/:id">
                        <AdminPage/>
                    </Route>
                    <Route path="/">
                        <HomePage/>
                    </Route>
                </Switch>
            </div>
            <Footer/>
        </Router>
    )
}


export default App;
