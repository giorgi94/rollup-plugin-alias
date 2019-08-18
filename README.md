# rollup-plugin-alias

This plugin allow to define aliases and extensions like in webpack.



## Installation
```
$ npm install git+https://github.com/giorgi94/rollup-plugin-alias.git
```

## Usage
```javascript
// rollup.config.js
import alias from 'rollup-plugin-alias';

export default {
    input: './src/index.js',
    plugins: [
        alias({
            entry: {
                "@": path.join(__dirname, "src"),
                "~": path.join(__dirname, "assets"),
            },
            extensions: [".js", ".svelte", ".styl"]
        })
    ],
};
```

An optional `extensions` array with file extensions can be provided to omit extension in import, for example

```javascript
// original
import "~/stylus/main";
import { split } from "@/utils"

// transforms to
import "{path to assets}/stylus/main.styl";
import { split } from "{path to src}/utils/index.js"
```

If path doesn't start with alias entry, then source is not transformed and default action takes place.
