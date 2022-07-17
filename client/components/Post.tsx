import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";

import { Post } from "../types";
import Media from "./Media";
import "./Post.scss";

// Posts within this distance of the viewport will be preloaded
const preloadDistance = "500px";

interface Props {
    post: Post;
}

const PostComponent = ({ post }: Props) => {
    const [loaded, setLoaded] = useState(false);
    const [ready, setReady] = useState(false);
    const [observer, setObserver] = useState<IntersectionObserver>();

    // When the container is scrolled near the edge of the screen, set the
    // post as ready.
    useEffect(() => {
        const options: IntersectionObserverInit = {
            rootMargin: preloadDistance + " 0px",
        };

        const viewportObserver = new IntersectionObserver((entries) => {
            if (!entries.length) {
                return;
            }

            const e = entries[0];

            if (e.isIntersecting) {
                setReady(true);
                viewportObserver.disconnect();
            }
        }, options);

        setObserver(viewportObserver);

        return () => observer?.disconnect();
    }, []);

    // Observe the container once it's rendered so we can track it.
    const ref = useCallback(
        (el: HTMLElement | null) => {
            if (!observer || !el) {
                return;
            }

            observer.observe(el);
        },
        [observer]
    );

    let inner;

    if (ready) {
        if (loaded) {
            inner = (
                <div className="post">
                    <Media post={post} />
                    <div className="post-overlay">
                        <a
                            href={`https://gelbooru.com/index.php?page=post&s=view&id=${post.id}`}
                            target="_blank"
                        >
                            View on Gelbooru
                        </a>
                    </div>
                </div>
            );
        } else {
            inner = (
                <>
                    <div className="post-placeholder" />
                    {/*
                    Preload the post by creating an invisible element on the page. Once the
                    post is ready to be displayed, loaded will be set to true.
                    */}
                    <div style={{ display: "none" }}>
                        <Media onLoad={() => setLoaded(true)} post={post} />
                    </div>
                </>
            );
        }
    }

    return (
        <div className="post-container" ref={ref}>
            {inner}
        </div>
    );
};

export default observer(PostComponent);
