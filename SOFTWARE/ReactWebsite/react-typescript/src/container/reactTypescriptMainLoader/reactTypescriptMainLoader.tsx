import { useSelector } from "react-redux";
import classNames from "classnames";
import Lottie from "react-lottie-player";
import lottieJson from "utils/lottie/loader.json";
import "./reactTypescriptMainLoader.scss";

export interface ReactTypescriptMainLoaderProps {
    displayLoaderSelector: any;
}

export function ReactTypescriptMainLoader(props: ReactTypescriptMainLoaderProps) {
    const isLoading = useSelector((state: any) => props.displayLoaderSelector(state));
    return (
        <div
            className={classNames("react-typescript__loader", {
                show: isLoading.length > 0,
            })}
        >
            <Lottie
                loop={isLoading.length > 0}
                animationData={lottieJson}
                play
            />
        </div>
    );
}

export default ReactTypescriptMainLoader;
