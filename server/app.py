import json

from flask import Flask, render_template, request, Response

from . import gelbooru as gb

app = Flask(
    __name__,
    static_url_path="/static",
    static_folder="dist",
    template_folder=".",
)


def json_response(data: dict, status=200, *args, **kwargs):
    return Response(json.dumps(data), status, *args, **kwargs)


def message_response(message: str, *args, **kwargs):
    return json_response({"message": message}, *args, **kwargs)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/tag-autocomplete")
def tag_autocomplete():
    """
    Returns a list of tag autocomplete suggestions.

    Method: GET
    Params:
        q: The tag name to autocomplete
    Responses:
        200: A list of up to 20 tag suggestions (excluding deprecated tags)
        400: Error response if the q param is blank or missing
    Schema:
        {
            "suggestions": [
                {
                    "count": 123,
                    "tag": "autocomplete suggestion",
                    "type": "artist" | "copyright" | "character" | "general" | "metadata",
                }
            ]
        }
    """
    q = request.args.get("q")

    if not q:
        return message_response(
            "Required query param 'q' is blank or missing.",
            status=400,
        )

    data = gb.get_tag_autocomplete_suggestions(q)
    suggestions = []

    for tag in data.get("tag", []):
        tag_type = gb.map_tag_type(tag["type"])

        if tag_type == gb.TagType.Deprecated:
            continue

        suggestions.append(
            {
                "count": tag["count"],
                "tag": tag["name"],
                "type": tag_type.value,
            }
        )

    return json_response({"suggestions": suggestions})
