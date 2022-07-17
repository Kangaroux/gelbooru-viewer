import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Post } from "../types";

interface Props {
    onLoad?: () => void;
    post: Post;
}

const Media = ({ onLoad, post }: Props) => {
    const [src, setSrc] = useState("");

    const height = post.hasSample ? post.sample.height : post.full.height;
    const width = post.hasSample ? post.sample.width : post.full.width;
    const url = post.hasSample ? post.sample.url : post.full.url;

    // This is such an unbelievably shit workaround to React rendering the component
    // multiple times and causing Firefox to vomit NS_BINDING_ABORTED errors in the
    // network tab.
    useEffect(() => {
        setSrc(url);
    }, []);

    if (/\.(gif|jpg|jpeg|png)$/.test(url)) {
        return <img onLoad={onLoad} src={src} />;
    } else if (/\.(mp4|webm)$/.test(url)) {
        return (
            <video
                onLoad={onLoad}
                autoPlay={true}
                loop={true}
                muted={true}
                height={height}
                width={width}
                src={src}
            />
        );
    }

    console.warn("Unknown media type:", url);
    return null;
};

export default observer(Media);
