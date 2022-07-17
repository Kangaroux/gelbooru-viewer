import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";

import { Post } from "../types";
import Media from "./Media";
import "./Post.scss";

// Posts within this distance of the viewport will be preloaded
const preloadDistance = "500px";

interface Props {
    container: HTMLElement;
    post: Post;
}

const PostComponent = ({ container, post }: Props) => {
    const [loaded, setLoaded] = useState(false);
    const [ready, setReady] = useState(false);
    const [observer, setObserver] = useState<IntersectionObserver>();

    // When the container is scrolled near the edge of the screen, set the
    // post as ready.
    useEffect(() => {
        const options: IntersectionObserverInit = {
            root: container,
            rootMargin: preloadDistance,
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

    /*
    Initially, the post isn't ready or loaded, so we render a placeholder.

    When the post is (or close to) being visible, create the Media component
    and hide it.

    Once the Media component is finished loading, then we can display it.
    */
    if (!ready && !loaded) {
        inner = <div className="post-placeholder" />;
    } else if (ready && !loaded) {
        inner = (
            <>
                <div className="post-placeholder" />
                <div style={{ display: "none" }}>
                    <Media onLoad={() => setLoaded(true)} post={post} />
                </div>
            </>
        );
    } else {
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
    }

    return (
        <div className="post-container" ref={ref}>
            {inner}
        </div>
    );
};

export default observer(PostComponent);
