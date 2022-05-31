import React, {useState, useEffect} from "react";
import { Grid } from 'semantic-ui-react';
import FridgeGallery from "../../components/FridgeGallery/FridgeGallery";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Map from "../../components/Maps/Map";
import * as fridgesAPI from "../../utils/fridgeApi";
import * as commentsAPI from "../../utils/commentApi";


export default function FridgesPage({user, location, locationError}) {
    const [fridges, setFridges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [comments, setComments] = useState([]);
    const [stock, setStock] = useState(false);

    const getFridges = async () => {
        try {
            const data = await fridgesAPI.getAll();
            // console.log(data.fridges)
            setFridges([...data.fridges]);
            setLoading(false);
        } catch(err) {
            console.log(err, 'getting fridges to render');
            setError(err);
        }
    }  

    useEffect(() => {
        getFridges();
    }, []);

    useEffect(() => {
        getFridges();
    }, [comments, stock])

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
        // console.log(state, "updateStock state")
        try {
            const data = await fridgesAPI.updateFridge(fridgeId, state);
            setStock(state.isStocked);
        } catch(err) {
            console.log(err, "error from updateStock")
            setError(err);
        }
    }
    const handleAddComment = async (fridgeId, comment) => {
        try {
            const data = await commentsAPI.create(fridgeId, comment);
            setComments([...comments, comment]);
        } catch(err) {
            console.log(err, 'from handleAddComment');
            setError(err);
        }
    }

    const handleDeleteComment = async (fridge, commentId) => {
        try {
            const data = await commentsAPI.deleteComment(commentId);
            const commentArray = await fridge.comments.filter(comment => comment._id !== commentId);
            setComments(commentArray);
        } catch(err) {
            console.log(err, 'from handleDeleteComment');
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
                    center={location}
                    locationError={locationError}
                />
            </Grid.Row>
            <Grid.Row>
                    <FridgeGallery 
                        fridges={fridges} 
                        removeFridge={removeFridge}
                        user={user}
                        loading={loading}
                        itemsPerRow={1}
                        updateStock={updateStock}
                        handleAddComment={handleAddComment}
                        handleDeleteComment={handleDeleteComment}
                    />
            </Grid.Row>
        </Grid>
    )
}