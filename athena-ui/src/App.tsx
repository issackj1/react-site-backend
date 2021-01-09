import React from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { Auth } from "./components/Auth";
import { PrivateRoute } from "./components/PrivateRoute";
import { TableDetail } from "./components/TableDetail";
import { Endpoint } from "./components/Endpoint";
import { Welcome } from "./components/Welcome";


export default function App() {
	const history = useHistory();

	const handleLogout = () => {
		localStorage.removeItem('my-jwt');
		history.push("/athena");
	}

	return (
		<Router basename={ process.env.PUBLIC_URL }>
			<Switch>
				<Route path={ "/athena/auth" } component={ Auth }/>
				<PrivateRoute handleLogout={ handleLogout }
				              path={ "/athena/:name/detail/:productId" } component={ TableDetail }/>
				<PrivateRoute handleLogout={ handleLogout } path={ "/athena/:name" }
				              component={ Endpoint }/>
				<PrivateRoute handleLogout={ handleLogout } path={ "/" } component={ Welcome }/>
			</Switch>
		</Router>
	);
};
