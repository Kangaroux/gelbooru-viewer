import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";

import { Post } from "../types";
import Media from "./Media";
import "./Post.scss";

// Posts within this distance of the viewport will be preloaded
const preloadDistance = "250px";

interface Props {
    post: Post;
}

const PostComponent = ({ post }: Props) => {
    const [loaded, setLoaded] = useState(false);
    const [observer, setObserver] = useState<IntersectionObserver>();

    const url = post.hasSample ? post.sample.url : post.full.url;

    // Create the lazy loading observer on mount. Posts are preloaded as
    // the placeholder element nears the edge of the screen.
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
                // Preload the post off screen so we can swap the element immediately.
                // This looks nicer and also prevents an issue where the sudden change
                // in element height causes a cascading effect of other images being
                // preloaded before they should be
                const img = new window.Image();
                img.onload = () => setLoaded(true);
                img.referrerPolicy = "no-referrer";
                img.src = url;
            }
        }, options);

        setObserver(viewportObserver);

        return () => observer?.disconnect();
    }, []);

    // Observe the footer element which tells us when we are close to
    // the bottom of the page
    const ref = useCallback(
        (el: HTMLElement | null) => {
            if (!observer || !el) {
                return;
            }

            observer.observe(el);
        },
        [observer]
    );

    return (
        <div className="post-container" ref={ref}>
            {loaded ? (
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
            ) : (
                <>
                    <div className="post-placeholder" />
                    <Media onLoad={() => setLoaded(true)} post={post} />
                </>
            )}
        </div>
    );
};

export default observer(PostComponent);
