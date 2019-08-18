const fs = require("fs");
const path = require("path");


const isFile = (p) => {
    try {
        return fs.statSync(p).isFile();
    } catch (e) {
        return false;
    }
};

const isDirectory = (p) => {
    try {
        return fs.statSync(p).isDirectory();
    } catch (e) {
        return false;
    }
};

function alias({ entry = {}, extensions = [".js"] }) {

    const entryKeys = Object.keys(entry);

    if (!entryKeys.length) {
        return {
            resolveId: () => null,
        };
    }

    return {
        name: "alias",
        resolveId(source) {

            const key = entryKeys.find(key => source.startsWith(key));

            if (!key || !source) {
                return null;
            }

            source = source.replace(key, entry[key]);

            if (isFile(source)) {
                return source;
            }

            if (isDirectory(source)) {
                return path.join(source, "index.js");
            }

            const filepaths = extensions.map(ext => source + ext);

            for (let fpath of filepaths) {
                if (isFile(fpath)) {
                    return fpath;
                }
            }

            return source;
        },
    };
}


module.exports = alias;