import css from "./AppBar.module.css";
import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import Welcome from "../UserMenu/UserMenu";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export default function AppBar() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <div className={css.header}>
            <Navigation />
            {isLoggedIn ? <Welcome /> : <AuthNav />}
        </div>
    );
}
