const TicketList = require("./ticket-list");

class Sockets {
    constructor( io ){
        this.io = io;
        this.ticketList = new TicketList()
        this.socketsEvents()
    }

    socketsEvents(){
        this.io.on('connection', ( socket ) => {
            console.log("cliente conecado");

            socket.on("solicitar-ticket", (_, callback) => {
                const newTicket = this.ticketList.createTicket()
                callback(newTicket)
                this.io.emit("tickets-pendientes", this.ticketList.pendientes.length)
            })

            socket.on("siguiente-ticket", ({agente, escritorio}, callback) => {
                const myTicket = this.ticketList.asignarTicket(agente, escritorio)
                callback(myTicket)
                this.io.emit("ticket-asignado", this.ticketList.last13)
                this.io.emit("tickets-pendientes", this.ticketList.pendientes.length)
            })

        });
    }
}

module.exports = Sockets