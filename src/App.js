import { useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Header, Sidebar, Chat, Modal, Login, Welcome } from "components";
import { auth } from "./firebase";
import { setuser } from "redux/ChatSlice";

function App() {
  const showChannelModal = useSelector(
    (state) => state.slackSlice.showChannelModal
  );
  const user = useSelector((state) => state.slackSlice.user);
  const dispatch = useDispatch();

  //retrive the user if a user already exits
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setuser({
            id: user.uid,
            name: user.displayName,
            image: user.photoURL,
          })
        );
      } else {
        dispatch(setuser(null));
      }
    });
  }, [dispatch]);

  return (
    <>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            {showChannelModal && <Modal />}
            <Header />
            <div className="app_body_container">
              <Sidebar />
              <Switch>
                <Route exact path="/room/:channelId">
                  <Chat />
                </Route>
                <Route exact path="/">
                  <Welcome />
                </Route>
              </Switch>
            </div>
          </>
        )}
      </Router>
    </>
  );
}

export default App;
