import React, { useState, useEffect } from "react";
import { dbService } from "fbase";

const Home = () => {
    const [nweets, setNweets] = useState([]);
    const getNweets = async () => {
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach((document) => {
            const nweetObject = {
                ...document.data(),
                id: document.id,
            };
            setNweets((prev) => [nweetObject, ...prev]);
        });
    };
    useEffect(() => {
        getNweets();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("teweets").add({
            teweet,
            createdAt: Date.now(),
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
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
