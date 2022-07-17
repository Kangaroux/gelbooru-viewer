import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";

import { store } from "..";
import { fetchTagAutocomplete } from "../api";
import { Tag } from "../types";
import { SuggestionList } from "./SuggestionList";

/**
 * The autocomplete fetch delay (in milliseconds). Adding a short delay before
 * making an API call for autocomplete results lets us cancel the request if
 * the user typed something during the delay. The longer the delay, the less
 * API calls are made, but the slower the autocomplete shows up.
 */
const fetchDelay = 200;

export const TagSearch = observer(() => {
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);
    const [suggestions, setSuggestions] = useState<Tag[]>([]);
    const [timeoutId, setTimeoutId] = useState(0);
    const [val, setVal] = useState("");
    const refContainer = useRef<HTMLDivElement>(null);

    // Removes any tags which are already selected from the suggestion list.
    const uniqueSuggestions = (() => {
        let s = val.length ? suggestions : store.mostPopularTags;
        s = [...s];

        for (const tag of store.tags) {
            const i = s.indexOf(tag);

            if (i !== -1) {
                s.splice(i, 1);
            }
        }

        return s;
    })();

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && val.length) {
            // Add the first suggestion if there is one, otherwise just add the tag as
            // a manually entered one.
            if (suggestions.length) {
                onPickSuggestion(suggestions[0]);
            } else {
                onPickSuggestion({ tag: val });
            }
        }
    };

    const onPickSuggestion = (tag: Tag) => {
        setVal("");
        store.addTag(tag);
    };

    // Hides the suggestion list when the user clicks outside of the container.
    // Using onBlur to check doesn't work since the blur event occurs before the
    // click event, which hides the list before the click is registered.
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const container = refContainer.current;

            if (!container || !e.target) {
                return;
            }

            if (!container.contains(e.target as HTMLElement)) {
                setSuggestionsVisible(false);
            }
        };

        window.addEventListener("click", onClick);
        return () => window.removeEventListener("click", onClick);
    }, []);

    // Fetch a new list of tag suggestions when the search input is changed.
    useEffect(() => {
        clearTimeout(timeoutId);

        if (!val.length) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            const resp = await fetchTagAutocomplete(val);
            setSuggestions(resp.suggestions);
        };

        setTimeoutId(setTimeout(fetchSuggestions, fetchDelay));

        return () => clearTimeout(timeoutId);
    }, [val]);

    return (
        <div ref={refContainer}>
            <input
                type="text"
                value={val}
                onFocus={() => setSuggestionsVisible(true)}
                onInput={(e) => setVal(e.currentTarget.value.trim())}
                onKeyDown={onKeyDown}
            />

            <div>
                {suggestionsVisible && (
                    <SuggestionList
                        onPick={onPickSuggestion}
                        tags={uniqueSuggestions}
                    />
                )}
            </div>
        </div>
    );
});
