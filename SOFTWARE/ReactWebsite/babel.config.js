module.exports = api => {
    api.cache(false); // set cache as true/false

    return {
        presets: [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: "entry",
                    corejs: 3,
                },
            ],
            [
                "@babel/preset-react",
                {
                    runtime: "automatic",
                },
            ],
            "@babel/preset-typescript",
        ],
        // optional if you want to use local .babelrc files
        babelrcRoots: [".", "react-typescript/*"],
    };
};
