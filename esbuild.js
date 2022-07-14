const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");

const entryPoints = {
    app: "client/index.tsx",
    style: "client/style.scss",
};

const outdir = "dist";

const buildOptions = {
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir,
    entryPoints,
    plugins: [sassPlugin()],
};

if (process.argv.length < 3) {
    console.error("missing command");
    process.exit(1);
}

switch (process.argv[2]) {
    case "build":
        esbuild.build(buildOptions);
        break;

    case "watch":
        esbuild.build({
            ...buildOptions,
            watch: {
                onRebuild(err, result) {
                    if (err) console.error(err);
                    else console.log("rebuilt");
                }
            }
        }).then(() => console.log("watching..."));
        break;
}