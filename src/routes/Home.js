import React, { useState } from "react";
import { dbService } from "fbase";

const Home = () => {
    const [teweet, setTeweet] = useState("");
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
        </div>
    );
};

export default Home;
