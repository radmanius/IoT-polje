import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "redux/store";
import { UserLoggedInStateEnum } from "utils/enums";
import "./reactTypescriptWrapper.scss";
import { useEffect } from "react";
import { PATHS } from "utils/paths";

const ReactTypescriptWrapperNonLoggedIn = () => {
    const userState = useSelector((state: RootState) => state.reactTypescript.userState);
    const navigate = useNavigate();

    useEffect(() => {
        if (userState === UserLoggedInStateEnum.LoggedIn) {
            navigate(PATHS.Global.Home);
        }
    }, [userState]);

    if (userState === UserLoggedInStateEnum.LoggedIn) {
        return <></>;
    }

    return (
        <div>
            <div className="react-typescript__wrapper">
                <Outlet />
            </div>
        </div>
    );
};

export default ReactTypescriptWrapperNonLoggedIn;
