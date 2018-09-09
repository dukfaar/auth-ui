const path = require('path')
const webpack = require('webpack')

const modulePaths = [
    path.join(__dirname, "node_modules"),
    path.join(__dirname, "static/js"),
    path.join(__dirname, "static/js/components"),      
    '/'   
]

function isProduction() {
    return process.env.NODE_ENV === 'production'
}

module.exports = {
    mode:  isProduction() ? 'production' : 'development',
    target: 'web',
    devServer: {
        contentBase: './static'
    },
    entry: {
        app: './static/js/index.js'
    },
    output: {
        path: path.join(__dirname, 'bundle'),
        filename: '[name].js'
    },
    resolveLoader: {
        modules: modulePaths
    },
    resolve: {
        modules: modulePaths
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader'  },
            { test: /\.jsx$/, loader: 'babel-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'file-loader?name=fonts/[name].[ext]&publicPath=/bundle' }
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
    plugins: [
        new webpack.DefinePlugin({
            'API_GATEWAY_URL': JSON.stringify(process.env.API_GATEWAY_URL),
            'API_GATEWAY_WS': JSON.stringify(process.env.API_GATEWAY_WS),
            'CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
            'CLIENT_SECRET': JSON.stringify(process.env.CLIENT_SECRET)
        }),
        
        //new webpack.optimize.UglifyJsPlugin({})
    ]
  }