const Ticket = require("./ticket");

class TicketList {
    constructor(){
        this.lastNumber = 0;
        this.pendientes = [];
        this.asignados = [];
    }

    get nextNumber(){
        this.lastNumber++;
        return this.lastNumber;
    }

    get last13(){
        return this.asignados.slice(0, 13)
    }

    createTicket(){
        const newticket = new Ticket(this.nextNumber());
        this.pendientes.push(newticket);
        return newticket;
    }

    asignarTicket(agente, escritorio){
        if(this.pendientes.length === 0) return null

        const nextTicket = this.pendientes.shift()
        nextTicket.agente = agente
        nextTicket.escritorio = escritorio
        this.asignados.unshift(nextTicket)
    }
}

module.exports = TicketList;