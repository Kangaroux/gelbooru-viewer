import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
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

export const Search = observer(() => {
    const [focused, setFocused] = useState(false);
    const [suggestions, setSuggestions] = useState<Tag[]>([]);
    const [timeoutId, setTimeoutId] = useState(0);
    const [val, setVal] = useState("");

    const showSuggestions = !!(focused || suggestions.length);

    const onInput = async (e: React.FormEvent<HTMLInputElement>) => {
        const cleaned = e.currentTarget.value.trim();

        setVal(cleaned);
        clearTimeout(timeoutId);

        if (!cleaned.length) {
            setSuggestions([]);
        }
    };

    useEffect(() => {
        if (!val.length) {
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
        <div>
            <input
                type="text"
                value={val}
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
                onInput={onInput}
            />

            {showSuggestions && (
                <SuggestionList
                    tags={val.length ? suggestions : store.mostPopularTags}
                />
            )}
        </div>
    );
});
