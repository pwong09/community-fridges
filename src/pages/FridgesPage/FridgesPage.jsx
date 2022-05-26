import React, {useState, useEffect} from "react";
import { Grid } from 'semantic-ui-react';
import FridgeGallery from "../../components/FridgeGallery/FridgeGallery";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Map from "../../components/Maps/Map";
import * as fridgesAPI from "../../utils/fridgeApi";
import * as commentsAPI from "../../utils/commentsApi";

export default function FridgesPage({user}) {
    const [fridges, setFridges] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getFridges = async () => {
        try {
            const data = await fridgesAPI.getAll();
            setFridges([...data.fridges]);
            setLoading(false);
        } catch(err) {
            console.log(err, 'getting fridges to render');
            setError(err);
        }
    }  

    useEffect(() => {
        getFridges();
    }, [])

    const removeFridge = async (fridgeId) => {
        try {
            const data = await fridgesAPI.removeFridge(fridgeId);
            const fridgeArray = await fridges.filter(fridge => fridge._id !== fridgeId);
            setFridges(fridgeArray);
        } catch(err) {
            console.log(err, "error from removeFridge")
            setError(err);
        }
    }

    const updateStock = async (fridgeId, state) => {
        try {
            const data = await fridgesAPI.updateFridge(fridgeId, state);
            getFridges();
        } catch(err) {
            console.log(err, "error from updateStock")
            setError(err);
        }
    }

    const handleNewComment = (fridgeId, comment) => {
        try {
            const data = commentsAPI.addComment(fridgeId, comment);
            setComments([...comments, comment]);
            // some sort of rendering
        } catch(err) {
            console.log(err, "error from newComment");
            setError(err);
        }
    }

    const removeComment = async (commentId) => {
        try {
            const data = await commentsAPI.removeComment(commentId);
            const commentsArray = await comments.filter(comment => comment._id !== commentId);
            setComments([commentsArray])
        } catch(err) {
            console.log(err, "error for removeComment");
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
        <Grid centered>
            <Grid.Row>
                <Map 
                    fridges={fridges}
                />
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <FridgeGallery 
                        fridges={fridges} 
                        removeFridge={removeFridge}
                        user={user}
                        loading={loading}
                        itemsPerRow={2}
                        updateStock={updateStock}
                        handleNewComment={handleNewComment}
                        removeComment={removeComment}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}