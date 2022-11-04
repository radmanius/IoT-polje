import { ReactPlugin } from "@microsoft/applicationinsights-react-js";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { createBrowserHistory } from "history";

const reactPlugin = new ReactPlugin();
const history = createBrowserHistory();
const ai = new ApplicationInsights({
    config: {
        instrumentationKey: process.env.REACT_APP_KEY,
        extensions: [reactPlugin],
        extensionConfig: {
            [reactPlugin.identifier]: { history: history },
        },
        enableCorsCorrelation: true,
    },
});
ai.loadAppInsights();

export { reactPlugin, ai };
