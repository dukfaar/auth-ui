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
        app: './static/js/index.js',
        login: ['./static/js/redux/login/actions.js', './static/js/redux/login/reducer.js']
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
            { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'file-loader?name=fonts/[name].[ext]' }
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
        
        //new webpack.optimize.UglifyJsPlugin({})
    ]
  }