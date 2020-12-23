module.exports = {
	// tell webpack to run babel on every file it runs throught
	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [
						['env', { target: { browser: ['last 2 versions'] }}],
						'stage-0',
						'react'
					]
				}
			}
		]
		
	}
}
