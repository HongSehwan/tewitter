import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Teweet from "components/Teweet";

const Home = ({ userObj }) => {
    const [teweet, setTeweet] = useState("");
    const [teweets, setTeweets] = useState([]);
    useEffect(() => {
        dbService.collection("teweets").onSnapshot((snapshot) => {
            const teweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTeweets(teweetArray);
        });
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("teweets").add({
            text: teweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setTeweet("");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setTeweet(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={teweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="teweet" />
            </form>
            <div>
                {teweets.map((teweet) => (
                    <Teweet key={teweet.id} teweetObj={teweet} isOwner={teweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};

export default Home;
