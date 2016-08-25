/**
 * @author: @AngularClass
 */
const {
  ContextReplacementPlugin,
  HotModuleReplacementPlugin,
  DefinePlugin,
  ProgressPlugin,
  DllReferencePlugin,

  optimize: {
    CommonsChunkPlugin,
    DedupePlugin
  }

} = require('webpack');
const { ConcatSource } = require('webpack-sources');
const { ForkCheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');
const AssetsPlugin = require('assets-webpack-plugin');
const path = require('path');
const fs = require('fs');

function root(__path = '.') {
  return path.join(__dirname, __path);
}

// type definition for WebpackConfig is defined in webpack.d.ts
function webpackConfig(options: EnvOptions = {}): WebpackConfig {

const API_HOST = '"http://localhost:3000"';
const PROD_API_HOST = '"http://cgi-she-server-d412b26a.6f78d14c.svc.dockerapp.io:8001"';
const GOOGLE_CLIENT_ID = '"584302945146-hf91k8glaa97agv0mbi5d61mm2kglkau.apps.googleusercontent.com"';
const FACEBOOK_CLIENT_ID = '"228791194154793"';

  const CONSTANTS = {
    ENV: JSON.stringify(options.ENV),
    HMR: options.HMR,
    PORT: 3001,
    HOST: 'localhost',
    HTTPS: false,
    API_HOST: options.ENV == 'development' ? API_HOST : PROD_API_HOST,
    GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID,
    FACEBOOK_CLIENT_ID: FACEBOOK_CLIENT_ID
  };
  const DLL = require(root('./src/dll'));
  const polyfills = DLL.polyfills(options);
  const rxjs = DLL.rxjs(options);

  return {
    cache: true,
    // devtool: 'hidden-source-map',
    devtool: 'source-map',
    // devtool: 'cheap-module-eval-source-map',

    entry: {
      main: [].concat(polyfills, './src/main.browser', rxjs)
    },

    output: {
      path: root('dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    },

    module: {
      // allowSyntheticDefaultImports for System.import
      preLoaders: [
        {
          test: /\.ts$/,
          loader: 'string-replace-loader',
          query: {
            search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
            replace: '$1.import($3).then(mod => mod.__esModule ? mod.default : mod)',
            flags: 'g'
          },
          include: [root('src')]
        },
      ],
      loaders: [
        // Support for .ts files.
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            '@angularclass/conventions-loader',
            '@angularclass/hmr-loader'
          ],
          exclude: [/\.(spec|e2e|d)\.ts$/],
          include: [root('./src')]
        },
        { test: /\.json$/, loader: 'json-loader', include: [root('./src')] },
        { test: /\.html/,  loader: 'raw-loader', include: [root('./src')] },
        { test: /\.css$/,  loader: 'raw-loader', include: [root('./src')] },
        { test: /.less$/, loader: 'raw-loader!less-loader', include: [root('./src')] },
      ]

    },


    plugins: [
      new AssetsPlugin({
        path: root('dist'),
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),
      new DllReferencePlugin({
        context: '.',
        manifest: getManifest('vendors'),
      }),
      new DllReferencePlugin({
        context: '.',
        manifest: getManifest('polyfills'),
      }),

      new TsConfigPathsPlugin(/* { tsconfig, compiler } */),
      new HotModuleReplacementPlugin(),
      new ForkCheckerPlugin(),
      new DefinePlugin(CONSTANTS),
      new ProgressPlugin({}),


    ],

    resolve: {
      extensions: ['', '.ts', '.js', '.json'],
      // unsafeCache: true
    },

    devServer: {
      setup: (app) => {
        // express middleware
        app.get('/', (req, res) => {
          res.sendFile(root('src/index.html'));
        });
        app.get('/dll/*', (req, res) => {
          var files = req.path.split('/');
          var chunk = files[files.length -1].replace('.js', '');
          res.sendFile(root('dist/dll/'+ getDllAssets(chunk)));
        });
      },
      compress: true,
      contentBase: './src',
      port: CONSTANTS.PORT,
      hot: CONSTANTS.HMR,
      inline: CONSTANTS.HMR,
      historyApiFallback: true,
      host: CONSTANTS.HOST,
      https: CONSTANTS.HTTPS
    },

    node: {
      global: 'window',
      process: true,
      Buffer: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false,
      clearTimeout: true,
      setTimeout: true
    }
  };
}


// Export
module.exports = webpackConfig;



// dll helpers
function getManifest(__path) {
  var __fs = fs || require('fs');
  var manifest = tryDll(() => JSON.parse(__fs.readFileSync(root('./dist/dll/' + __path + '-manifest.json'), 'utf8')
      // TODO(gdi2290): workaround until webpack fixes dll generation
        .replace(/}(.*[\n\r]\s*)}(.*[\n\r]\s*)}"activeExports": \[\]/, '')))
  return manifest;
}
function getDllAssets(chunk) {
  var assets =  tryDll(() => require(root('./dist/dll/webpack-assets.json')));
  return assets[chunk]['js']
}
function getAssets(chunk) {
  var assets =  tryDll(() => require(root('./dist/webpack-assets.json')));
  return assets[chunk]['js']
}
function tryDll(cb) {
  try {
    return cb()
  } catch(e) {
    console.info("Initializing `%s`...", "DLL files");
    var spawn: any = require('cross-spawn');
    spawn.sync("npm", ["run", "dll"], { stdio: "inherit" });
    return cb();
    // throw new Error('Please run `npm run dll` first before building or running the server');
  }
}
