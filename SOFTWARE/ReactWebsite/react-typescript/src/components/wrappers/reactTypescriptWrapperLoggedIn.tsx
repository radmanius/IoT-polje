import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "redux/store/store";
import { UserLoggedInStateEnum } from "utils/enums";
import "./reactTypescriptWrapper.scss";
import { useEffect } from "react";
import { PATHS } from "utils/paths";

const ReactTypescriptWrapperLoggedIn = () => {
    const userState = useSelector((state: RootState) => state.reactTypescript.userState);
    const navigate = useNavigate();

    useEffect(() => {
        if (userState === UserLoggedInStateEnum.Unauthorized || userState === UserLoggedInStateEnum.Expired) {
            navigate(PATHS.Global.Login);
        }
    }, [userState]);

    if (userState === UserLoggedInStateEnum.Unauthorized || userState === UserLoggedInStateEnum.Expired) {
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

export default ReactTypescriptWrapperLoggedIn;
