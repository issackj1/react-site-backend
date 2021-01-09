import React from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { Auth } from "./components/Auth";
import { PrivateRoute } from "./components/PrivateRoute";
import { TableDetail } from "./components/TableDetail";
import { Endpoint } from "./components/Endpoint";
import { Welcome } from "./components/Welcome";
import { Grid } from "@material-ui/core";
import { AthenaNavBar } from "./components/AthenaNavBar";


export default function App() {
	const history = useHistory();

	const handleLogout = () => {
		localStorage.removeItem('my-jwt');
		history.push("/");
	}

	return (
		<Grid>
			<Router basename={ process.env.PUBLIC_URL }>
				<Grid item xs={ 12 } sm={ 12 }>
					<AthenaNavBar handleLogout={ handleLogout }/>
				</Grid>
				<Switch>
					<Route path={ "/auth" } component={ Auth }/>
					<PrivateRoute handleLogout={ handleLogout }
					              path={ "/:name/detail/:productId" } component={ TableDetail }/>
					<PrivateRoute handleLogout={ handleLogout } path={ "/athena/:name" }
					              component={ Endpoint }/>
					<PrivateRoute handleLogout={ handleLogout } path={ "/" } component={ Welcome }/>
				</Switch>
			</Router>
		</Grid>
	);
};
