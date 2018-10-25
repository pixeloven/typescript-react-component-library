// TODO need to generally just clean this up
export interface Files {
    entryPoint: {
        client: string;
        public: string;
        server: string;
    };
    lock: string;
    outputPattern: {
        css: string;
        cssChunk: string;
        js: string;
        jsChunk: string;
        jsServer: string;
    };
    package: string;
    tsConfig: string;
    tsLint: string;
}

const files: Files = {
    entryPoint: {
        client: "src/client/index.tsx",
        public: "public/index.html",
        server: "src/server/renderer.tsx",
    },
    lock: "yarn.lock",
    outputPattern: {
        css: "static/css/[name].css",
        cssChunk: "static/css/[name].[contenthash:8].css",
        // jsOutputFilePattern: "static/js/[name].[chunkhash:8].js",
        js: "static/js/[name].js",
        // TODO implement hashing and chunking again
        // jsChunkOutputFilePattern: "static/js/[name].[chunkhash:8].chunk.js",
        jsChunk: "static/js/[name].chunk.js",
        jsServer: "server.js",
    },
    package: "package.json",
    tsConfig: "tsconfig.json", // TODO should use the ENV to determine this instead of hard coding
    tsLint: "tslint.json",
};

export default files;
