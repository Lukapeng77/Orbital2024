import { atom } from "recoil";
import { isLoggedIn } from "../helpers/authHelper";

const userAtom = atom({
	key: "userAtom",
	default: isLoggedIn(),
});

export default userAtom;