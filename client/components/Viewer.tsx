import { observer } from "mobx-react-lite";
import React from "react";
import { store } from "..";

export const Viewer = observer(() => {
    return (
        <div>
            {store.posts.slice(0, 5).map((p) => (
                <div>
                    <img referrerPolicy="no-referrer" src={p.sample.url} />
                </div>
            ))}
        </div>
    );
});
