export default class Chat {
    constructor(config) {
        this.config = config;

        this.socket = new WebSocket('wss://fep-app.herokuapp.com/');

        this.socket.onopen = () => {
            this.send(this.config.name, 'connected', 'Connected') 
        };
        
        this.socket.onclose = () => {
            this.send(this.config.name, 'disconnected', 'Disconnected')
        };
        
        this.socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            this.config.onMessage(data);
        }
    }

    send(name, type = 'message', message) {
        this.socket.send(JSON.stringify({ name, type, message }));
    }
}