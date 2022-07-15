import React, { useEffect, useState } from "react";
import { fetchTagAutocomplete, Tag } from "./api";
import { TagSuggestion } from "./TagSuggestion";

/**
 * The autocomplete fetch delay (in milliseconds). Adding a short delay before
 * making an API call for autocomplete results lets us cancel the request if
 * the user typed something during the delay. The longer the delay, the less
 * API calls are made, but the slower the autocomplete shows up.
 */
const fetchDelay = 200;

export const TagSearch = () => {
    const [suggestions, setSuggestions] = useState<Tag[]>([]);
    const [timeoutId, setTimeoutId] = useState(0);
    const [val, setVal] = useState("");

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
    }, [val]);

    return (
        <div>
            <input type="text" value={val} onInput={onInput} />
            <li>
                {suggestions.map((s) => (
                    <ul>
                        <TagSuggestion tag={s} />
                    </ul>
                ))}
            </li>
        </div>
    );
};
