export interface Files {
    entryPoint: {
        client: string;
        public: string;
        server: string;
    };
    lock: string;
    package: string;
}

const files: Files = {
    entryPoint: {
        client: "src/client/index.tsx",
        public: "public/index.html",
        server: "src/server/index.ts",
    },
    lock: "yarn.lock",
    package: "package.json",
};

export default files;
