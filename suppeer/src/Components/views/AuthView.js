import { useRecoilValue } from "recoil";
import Login from "../Register&Login/Login";
import Registration from "../Register&Login/Registration";
import authScreenAtom from "../../atoms/authAtom";

const AuthView = () => {
	const authScreenState = useRecoilValue(authScreenAtom);

	return <>{authScreenState === "login" ? <Login /> : <Registration />}</>;
};

export default AuthView;