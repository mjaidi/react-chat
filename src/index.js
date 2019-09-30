import ReactDOM from "react-dom";
import "stylesheets/index.scss";
import * as serviceWorker from "./serviceWorker";
import { makeMainRoutes } from "./routes";

const routes = makeMainRoutes();
ReactDOM.render(routes, document.getElementById("root"));
serviceWorker.unregister();
