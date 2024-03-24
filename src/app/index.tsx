import GlobalStyle from "../shared/globalStyles";
import { withProviders } from "./providers";
import Routing from "../pages";
import Header from "../widgets/common/header";
import { useGetUserMutation } from "../features/auth/authService";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { setUser } from "../features/auth/authSlice";
import { Wrapper } from "./styled";

function App() {
  const dispatch = useAppDispatch();
  const [getUser, { data: getUserData, isSuccess: isGetUserSuccess }] =
    useGetUserMutation();

  useEffect(() => {
    try {
      (async () => {
        await getUser();
      })();
    } catch (e) {
      console.log(`auth > getUserError: ${e}`);
    }
  }, []);

  useEffect(() => {
    if (isGetUserSuccess) {
      try {
        dispatch(setUser(getUserData!));
      } catch (e) {
        console.log(`auth > setUserError: ${e}`);
      }
    }
  }, [isGetUserSuccess]);

  return (
    <Wrapper>
      <GlobalStyle />
      <Header />
      <Routing />
    </Wrapper>
  );
}

export default withProviders(App);
