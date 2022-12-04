import { useDispatch } from "react-redux";

import { auth, provider } from "../../firebase";
import { setuser } from "redux/ChatSlice";
import * as s from "./style.module.css";

export default function Login() {
  const dispatch = useDispatch();

  const handleLogin = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) =>
        dispatch(
          setuser({
            id: user.uid,
            name: user.displayName,
            image: user.photoURL,
          })
        )
      )
      .catch((err) => alert(err.message));
  };

  return (
    <div className={s.Login_container}>
      <div className={s.login_wrap}>
        <img
          src="/assets/SlackLogo.png"
          alt="slack logo"
          className={s.login_logo}
        />
        <h3>Welcome to your digital HQ</h3>
        <p>Sign in to your #workspance</p>
        <button onClick={handleLogin} className={s.sign_in}>
          sign in with google
        </button>
      </div>
    </div>
  );
}
