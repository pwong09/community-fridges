import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Grid, Header} from "semantic-ui-react";
import FridgeForm from "../../components/AddFridgeForm/AddFridgeForm";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import * as fridgesAPI from "../../utils/fridgeApi";

export default function FridgeFormPage({user}) {
    const navigate = useNavigate();
    const [fridges, setFridges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAddFridge = async (fridge) => {
        try {
            setLoading(true);
            const data = await fridgesAPI.create(fridge);
            navigate("/");
        } catch(err) {
            console.log(err, 'from handleAddFridge');
            setError(err);
        }
    }

    if (error) {
        return (
            <>
                <ErrorMessage error={error} />
            </>
        )
    }

    if (loading) {
        return (
            <>
                <Loading />
            </>
        )
    }

    return (
        <>
            <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 500 }}>
                    <Header as="h2" color="blue" textAlign="center">
                        Add a Fridge!
                    </Header>
                    <FridgeForm handleAddFridge={handleAddFridge}/>
                </Grid.Column>
            </Grid>
        </>
    )

}