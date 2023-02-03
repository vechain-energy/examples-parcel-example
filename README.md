# Installation

Install parcel itself:

```shell
yarn add --dev parcel
```

Follow parcel tutorial to setup a react app:

* https://parceljs.org/recipes/react/

```shell
yarn add react react-dom @vechain/connex antd
yarn add --dev @types/react @types/react-dom
```


Config shortcuts in `package.json`:

```json
  "scripts": {
    "build": "parcel build src/index.html",
    "dev": "parcel serve src/index.html"
  }
```

# Scripts

* **`yarn dev`** for running a hot-reloading development version
* **`yarn build`** to build the static version in `./dist` 