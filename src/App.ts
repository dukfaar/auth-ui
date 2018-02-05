import * as express from 'express'
import * as path from 'path'
import * as fs from 'fs'
import * as NodeCache from 'node-cache'

export class App {
	private expressApp
	private port = process.env.PORT || 3000

	private appCache = new NodeCache()

	public constructor() {
		this.expressApp = express()	

		this.expressApp.use('/bundle', express.static(path.join(__dirname, '..', 'bundle')))
		this.expressApp.use('/static', express.static(path.join(__dirname, '..', 'static')))
		this.expressApp.use('/images', express.static(path.join(__dirname, '..', 'images')))
		this.expressApp.use('/*', express.static(path.join(__dirname, '..', 'static')))		
	}
 
	public start() {
		this.loadRoutes()

		this.listen()
	}

	
	private loadRoutes():void {
		console.log('loading routes')

		console.log('done loading routes')
	}

	private listen(): void {
		this.expressApp
		.listen(this.port, (err) => {
			if (err) throw err

			return console.log(`server is listening on ${this.port}`)
		})
	}
}
