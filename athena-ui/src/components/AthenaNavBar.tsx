import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Link, SvgIcon, Toolbar, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";

interface Props {
	handleLogout: () => void;
}

const useStyles = makeStyles((theme) => ({
	root: {
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export const AthenaNavBar: React.FC<Props> = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const { handleLogout } = props;

	return (
		<div className={ classes.root }>
			<AppBar position={ "static" }>
				<Toolbar variant={ "dense" }>
					<Typography variant="h6" className={ classes.title }>
						<Link underline={ "none" } color={ "inherit" } href={ "/" }>
							Issack John
						</Link>
					</Typography>
					{
						history.location.pathname !== "/auth"
							? (<Button variant="contained" color="primary"
								        startIcon={ <SvgIcon component={ ExitToApp }/> } onClick={ handleLogout }>
									Logout
								</Button>)
							: null
					}
				</Toolbar>
			</AppBar>
		</div>
	);
};
