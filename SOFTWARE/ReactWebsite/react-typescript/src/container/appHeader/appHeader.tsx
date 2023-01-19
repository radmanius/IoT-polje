import { Link } from "react-router-dom";
import "./appHeader.scss";
import { getHeaderItems, ISimpleHeaderItems } from "./headerNavigationItems";

const AppHeader = () => {
    const headerItems: ISimpleHeaderItems[] = getHeaderItems() ?? [];
    const start = (
        <Link
            to="/"
            aria-label="Početak headera ikona"
        >
            <div>
                <i className="fa fa-house-signal header-icon"></i>
            </div>
        </Link>
    );
    const end = (
        <span>
            <Link
                to="/"
                aria-label="Kraj headera ikona"
            >
                <div>
                    <i className="fa fa-house-signal header-icon"></i>
                </div>
            </Link>{" "}
        </span>
    );
    return (
        <div className="app-header">
            <div className="menubar">
                {start}
                <nav className="header-content">
                    {headerItems.map(item => {
                        return (
                            <div key={item.link}>
                                <Link
                                    className="menu-item"
                                    to={item.link}
                                    aria-label={item.label}
                                >
                                    <span>{item.label}</span>
                                </Link>
                            </div>
                        );
                    })}
                </nav>
                {end}
            </div>
        </div>
    );
};

export default AppHeader;
