const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

const modulePaths = [
    path.join(__dirname, "node_modules"),
    path.join(__dirname, "src"),
    path.join(__dirname, "src/components"),      
    '/'   
]

function isProduction() {
    return process.env.NODE_ENV === 'production'
}

function getDefinePlugin() {
    return new webpack.DefinePlugin({
        'API_GATEWAY_URL': JSON.stringify(process.env.API_GATEWAY_URL),
        'API_GATEWAY_WS': JSON.stringify(process.env.API_GATEWAY_WS),
        'CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
        'CLIENT_SECRET': JSON.stringify(process.env.CLIENT_SECRET)
    })
}

function getUglifyPlugin() {
    return new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: { 
            ecma: 8,
            compress: {
                drop_console: true,
                unsafe_proto: true,
            },
            output: {
                comments: false,
                beautify: false,
            }
        }
    })
}

function getWorkboxPlugin() {
    return new WorkboxPlugin.GenerateSW({
        runtimeCaching: [
            {
                urlPattern: /.*/,
                handler: 'networkFirst'
            }
        ]
    })
}

function getProductionPlugins() {
    return [
        getDefinePlugin(),
        getUglifyPlugin(),
        getWorkboxPlugin(),
    ]
}

function getDevPlugins() {
    return [
        getDefinePlugin(),
        getWorkboxPlugin()
    ]
}

module.exports = {
    mode:  isProduction() ? 'production' : 'development',
    target: 'web',
    devServer: {
        contentBase: './static',
        historyApiFallback: true
    },
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'bundle'),
        filename: '[name].js'
    },
    resolveLoader: {
        modules: modulePaths
    },
    resolve: {
        modules: modulePaths,
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader'  },
            { test: /\.jsx$/, loader: 'babel-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'file-loader?name=fonts/[name].[ext]&publicPath=/' }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    },
    plugins: isProduction() ? getProductionPlugins() : getDevPlugins()
  }