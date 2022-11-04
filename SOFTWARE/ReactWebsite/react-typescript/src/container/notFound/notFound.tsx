import { StringResources as Res, translate as t } from "utils/language/languageResource";
import "./notFound.scss";

const NotFound = () => {
    return (
        <div className="not-found-center">
            <div className="not-found-center-text">
                <h1>404</h1>
                <h3>{t(Res.NotFound)}</h3>
            </div>
            <div className="not-found-center-container">
                <div className="not-found-center-container-ghost-copy">
                    <div className="one"></div>
                    <div className="two"></div>
                    <div className="three"></div>
                    <div className="four"></div>
                </div>
                <div className="not-found-center-container-ghost">
                    <div className="face">
                        <div className="eye"></div>
                        <div className="eye-right"></div>
                        <div className="mouth"></div>
                    </div>
                </div>
                <div className="shadow"></div>
            </div>
            <div className="not-found-center-bottom">
                <p>{t(Res.GhostStoleThisPage)}</p>
            </div>
        </div>
    );
};

export default NotFound;
