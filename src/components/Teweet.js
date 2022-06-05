import React, { useState } from "react";
import { dbService } from "fbase";

const Teweet = ({ teweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newTeweet, setNewTeweet] = useState(teweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this teweet?");
        if (ok) {
            await dbService.doc(`teweets/${teweetObj.id}`).delete();
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`teweets/${teweetObj.id}`).update({
            text: newTeweet,
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewTeweet(value);
    };
    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Edit your nweet" value={newTeweet} required onChange={onChange} />
                        <input type="submit" value="Update Nweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{teweetObj.text}</h4>
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Teweet;
