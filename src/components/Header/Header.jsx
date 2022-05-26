import React from 'react';
import {Link} from "react-router-dom";
import { Header, Segment, Icon, Image} from 'semantic-ui-react';
import {Icon as Icon2} from "@iconify/react"

export default function PageHeader({user, handleLogout}){

    return (
        <Segment clearing>
            {user ? 
                (
                <>
                <Header as='h2' floated='left' >
                    <Link to="/">
                        <Image avatar
                            src={user.photoUrl 
                            ? user.photoUrl 
                            : ""} 
                        />
                    </Link>
                    <Link to={`/addfridge`}>
                        <Icon.Group>
                        <Icon2 icon="cil:fridge" />
                        <Icon corner name='add' />
                        </Icon.Group>
                    </Link>
                </Header>
                <Header as='h2' floated='right'>
                    <Link to="/"><Icon link={true} name='home'/></Link>
                    <Link to="" onClick={handleLogout}>Logout</Link>
                </Header>
                </>
                ) : 
                <Header textAlign='justified'>
                    <Link to="/login">Login </Link> 
                    <Link to="/signup"> Signup</Link>
                </Header>
                }
            </Segment>
    )
}