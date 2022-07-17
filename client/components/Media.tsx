import { observer } from "mobx-react-lite";
import React from "react";
import { Post } from "../types";

interface Props {
    onLoad?: () => void;
    post: Post;
}

const Media = ({ onLoad, post }: Props) => {
    const height = post.hasSample ? post.sample.height : post.full.height;
    const width = post.hasSample ? post.sample.width : post.full.width;
    const url = post.hasSample ? post.sample.url : post.full.url;

    if (/\.(gif|jpg|jpeg|png)$/.test(url)) {
        return <img onLoad={onLoad} src={url} />;
    } else if (/\.(mp4|webm)$/.test(url)) {
        return (
            <video
                onLoad={onLoad}
                autoPlay={true}
                loop={true}
                muted={true}
                height={height}
                width={width}
                src={url}
            />
        );
    }

    console.warn("Unknown media type:", url);
    return null;
};

export default observer(Media);
