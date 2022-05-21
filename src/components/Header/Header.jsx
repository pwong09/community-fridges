import React from 'react';
import {Link} from "react-router-dom";
import { Header, Segment, Icon, Image} from 'semantic-ui-react';

export default function PageHeader({user, handleLogout}){

    return (
        <Segment clearing>
            {user ? 
                (
                <>
                <Header as='h2' floated='left' >
                    <Link to={`/${user?.username}`}> {/*  optional chaining */}
                        <Image avatar
                            src={user.photoUrl 
                            ? user.photoUrl 
                            : ""} 
                        />
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