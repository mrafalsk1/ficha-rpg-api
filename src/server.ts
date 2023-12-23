import app from './app'

class Server {
    public start() {

        app.listen(app.get('port'), () => {
            console.log(`Server is running on port ${app.get('port')}`)
        })
    }
}

const server = new Server()
server.start()