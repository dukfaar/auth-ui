const path = require('path')
const webpack = require('webpack')

const modulePaths = [
    path.join(__dirname, "node_modules"),
    path.join(__dirname, "static/js"),
    path.join(__dirname, "static/js/components"),      
    '/'   
]

function isExternal(module) {
    var context = module.context;
                
    if (typeof context !== 'string') {
        return false
    }
    
    return context.indexOf('node_modules') !== -1
}

module.exports = {
    entry: {
        app: './static/js/index.js'
    },
    output: {
        path: path.join(__dirname, 'bundle'),
        filename: '[name]-bundle.js'
    },
    resolveLoader: {
        modules: modulePaths
    },
    resolve: {
        modules: modulePaths
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'file-loader?name=fonts/[name].[ext]&publicPath=/bundle' }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: (module) => {
                return isExternal(module)
            }
        }),
        
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            minChunks: (module, count) => {
                return !isExternal(module) && count >= 2
            }
        }),

        new webpack.DefinePlugin({
            'API_GATEWAY_URL': JSON.stringify(process.env.API_GATEWAY_URL),
            'API_GATEWAY_WS': JSON.stringify(process.env.API_GATEWAY_WS),
            'CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
            'CLIENT_SECRET': JSON.stringify(process.env.CLIENT_SECRET)
        }),
        
        //new webpack.optimize.UglifyJsPlugin({})
    ]
  }