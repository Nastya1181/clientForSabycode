import { useDispatch, useSelector } from "react-redux/es/exports";
import { setUserName, selectAccessToken, setAccessToken } from "../redux/features/authentication/authenticationSlice";
import { useLogoutMutation } from "../redux/api/sabycodeApi";
import { useEffect } from "react";

export default function LogOutButton(props) {
  const [logout, { isSuccess: isLoggedOut }] = useLogoutMutation();
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    if (isLoggedOut) {
      dispatch(setAccessToken(""));
      dispatch(setUserName(""));
     /*  localStorage.removeItem("accessToken");
      localStorage.removeItem("userName"); */
    }
  }, [isLoggedOut]);

  async function handleSignOut(event) {
    if (accessToken) {
      await logout().unwrap();
    }
    else {
      dispatch(setUserName(""));
  /*     localStorage.removeItem("userName"); */
    }
  }

  return <button onClick={(e) => handleSignOut(e)}>Выйти</button>;
}
