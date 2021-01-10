import React from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { Auth } from "./components/Auth";
import { PrivateRoute } from "./components/PrivateRoute";
import { TableDetail } from "./components/TableDetail";
import { Endpoint } from "./components/Endpoint";
import { Welcome } from "./components/Welcome";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { AthenaNavBar } from "./components/AthenaNavBar";
import { Copyright } from "./components/Copyright";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	}
}));

export default function App() {
	const history = useHistory();
	const classes = useStyles();

	const handleLogout = () => {
		localStorage.removeItem('my-jwt');
		history.push("/");
	}

	return (
		<Container component="main">
			<div className={classes.paper}>
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
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
};
