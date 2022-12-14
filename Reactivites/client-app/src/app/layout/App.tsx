import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import { Route, Routes, useLocation } from 'react-router';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import TestErrors from '../../features/errors/TestErrors';
import ServerError from '../../features/errors/ServerError';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profile/ProfilePage';
import PrivateRoute from './PrivateRoute';
import RegisterSuccess from '../../features/users/RegisterSuccess';
import ConfirmEmail from '../../features/users/ConfirmEmail';

function App() {

  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      userStore.getFacebookLoginStatus().then(() => commonStore.setAppLoaded());

    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading...' />;

  return (
    <Fragment>
      {/* <ScrollRestoration/> */}
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Container style={{ marginTop: '7em' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route element={<Navbar />}>
            <Route path='/activities' element={<PrivateRoute children={<ActivityDashboard />} />} />
            <Route path='/activities/:id' element={<PrivateRoute children={<ActivityDetails />} />} />
            {/* {["/createActivity", "/manage/:id"].map((path) => {
              return (
                <Route key={location.key} path={path} element={<ActivityForm key={location.key} />} />
              );
            })} */}
            {["/createActivity", "/manage/:id"].map((path) => {
              return (
                <Route key={location.key} path={path} element={<PrivateRoute children={<ActivityForm key={location.key} />} />} />
              );
            })}
            <Route path='/profiles/:username' element={<PrivateRoute children={<ProfilePage />} />} />
            <Route path='/errors' element={<PrivateRoute children={<TestErrors />} />} />
            <Route path='/server-error' element={<PrivateRoute children={<ServerError />} />} />
            <Route path='/account/registerSuccess' element={<RegisterSuccess />}/>
            <Route path='/account/verifyEmail' element={<ConfirmEmail />}/>
            {/* <Route path='/not-found' element={<NotFound />} /> */}
          </Route>
        </Routes>
      </Container>
    </Fragment>
  );
}


export default observer(App);
