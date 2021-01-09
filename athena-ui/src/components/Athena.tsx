import React from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import { Welcome } from "./Welcome";
import { Grid } from "@material-ui/core";
import { Auth } from "./Auth";
import { PrivateRoute } from "./PrivateRoute";
import { Endpoint } from "./Endpoint";
import { TableDetail } from "./TableDetail";
import { AthenaNavBar } from "./AthenaNavBar";

interface Props {
}

export const Athena: React.FC<Props> = (props) => {

	const history = useHistory();

	const handleLogout = () => {
		localStorage.removeItem('my-jwt');
		history.push("/athena");
	}

	return (
		<Grid>
			<Grid item xs={ 12 } sm={ 12 }>
				<AthenaNavBar handleLogout={handleLogout}/>
			</Grid>
			<Grid item xs={ 12 } sm={ 12 }>
				<Switch>
					<Route path={ "/athena/auth" } component={ Auth }/>
					<PrivateRoute handleLogout={ handleLogout }
					              path={ "/athena/:name/detail/:productId" } component={ TableDetail }/>
					<PrivateRoute handleLogout={ handleLogout } path={ "/athena/:name" }
					              component={ Endpoint }/>
					<PrivateRoute handleLogout={ handleLogout } path={ "/" } component={ Welcome }/>
				</Switch>
			</Grid>
		</Grid>
	);
};
