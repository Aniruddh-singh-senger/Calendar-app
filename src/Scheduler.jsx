import React from 'react'
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month,Agenda, } from '@syncfusion/ej2-react-schedule';

import { AppBar, Toolbar, makeStyles, Button } from '@material-ui/core'; 
import { Link } from 'react-router-dom';


import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const useStyle = makeStyles({
    component: {
        background: '#FFFFFF',
        color: 'black'
    },
    container: {
        justifyContent: 'center',
        '&  >*': {
            padding: 20,
            color: 'black',
            textDecoration: 'none'
        }
    }
})


function Scheduler() {
    const classes = useStyle();

    const history = useHistory();
    const { oktaAuth, authState } = useOktaAuth();

    if (!authState) return null;

    const login = async () => history.push('/login');
    
    const logout = async () => oktaAuth.signOut();

    const button = authState.isAuthenticated ? 
        <Button onClick={logout} style={{
            background: 'unset',
            border: 'none',
            fontSize: 17,
            textTransform: 'uppercase',
            fontFamily: 'Roboto',
            cursor: 'pointer',
            opacity: 0.8
        }}>Logout</Button> :
        <Button onClick={login}>Login</Button>;

    return (
        <div className='App'>
            <AppBar className={classes.component}>
            <Toolbar className={classes.container}>
               
                <Link>{button}</Link>
            </Toolbar>
        </AppBar>
        <div className='hero' style={{margin:'100px'}}>
            <ScheduleComponent currentView='Month'>
<Inject services={[Day, Week, WorkWeek, Month, Agenda]} />

            </ScheduleComponent>
            
        </div>
        </div>
    )
}
export default Scheduler;