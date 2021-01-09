import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Athena } from "./components/Athena";


export default function App() {
	return (
		<Router basename={ process.env.PUBLIC_URL }>
			<Switch>
				<Route path={ "/athena" } component={ Athena }/>
			</Switch>
		</Router>
	);
};
