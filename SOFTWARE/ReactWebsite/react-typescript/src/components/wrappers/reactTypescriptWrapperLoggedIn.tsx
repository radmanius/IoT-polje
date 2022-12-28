import { Outlet } from "react-router-dom";

const ReactTypescriptWrapperLoggedIn = () => {
    return (
        <div>
            <div className="react-typescript__wrapper">
                <Outlet />
            </div>
        </div>
    );
};

export default ReactTypescriptWrapperLoggedIn;
