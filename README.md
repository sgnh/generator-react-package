# generator-react-package
A [Yeoman](http://yeoman.io) generator for simple [React](https://facebook.github.io/react/) packages.

## Usage
To transpile the source on the fly use:  
```bash
npm run dev
```

To build the package and make it ready for publishing to [npmjs.com](https://www.npmjs.com) run:  
 ```bash
 npm run build
 ```

Then the transpiled packaged can be published directly from the build directory:  
```bash
cd build
npm publish
```