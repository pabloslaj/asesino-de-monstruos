new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
        rangoCura: [8, 20],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.saludJugador= 100
            this.saludMonstruo= 100
            this.turnos = []
            this.hayUnaPartidaEnJuego = true
        },
        atacar: function () {
            let danioJugador = this.calcularHeridas(this.rangoAtaque)
            this.saludMonstruo = this.saludMonstruo - danioJugador
            this.registrarEvento({ esJugador:true, text: "El jugador golpea al monstruo por: " + danioJugador })
            this.ataqueDelMonstruo()
        },

        ataqueEspecial: function () {
            let danioJugador = this.calcularHeridas(this.rangoAtaqueEspecial)
            this.saludMonstruo = this.saludMonstruo - danioJugador
            this.registrarEvento({ esJugador:true,text: "El jugador golpea duramente al monstruo por: " + danioJugador })
            this.ataqueDelMonstruo()
        },

        curar: function () {

            let vidaCurar = this.calcularHeridas(this.rangoCura)
            let danioMonstruo = this.calcularHeridas(this.rangoAtaqueDelMonstruo)

            this.saludJugador = this.saludJugador - danioMonstruo

            if (this.saludJugador + vidaCurar > 100) {
                this.saludJugador = 100
            } else {
                this.saludJugador = this.saludJugador + vidaCurar
            }

            this.registrarEvento({esJugador:true, text: "El Jugador se cura: " + vidaCurar })
            this.ataqueDelMonstruo()
        },

        registrarEvento(evento) {
            this.turnos.push(evento)
        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false
        },

        ataqueDelMonstruo: function () {
            let danioMonstruo = this.calcularHeridas(this.rangoAtaqueDelMonstruo)
            this.saludJugador = this.saludJugador - danioMonstruo
            this.registrarEvento({ esJugador:false,text: "El monstruo lastima al jugador en: " + danioMonstruo })
        },

        calcularHeridas: function (rango) {
            min = Math.ceil(rango[0]);
            max = Math.floor(rango[1]);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        verificarGanador: function () {
            if (this.getSalud(this.saludJugador) <= 0) {
                alert('Perdirste :(')
                this.saludJugador = 0 // se coloca directamente en 0 para que no aparezca valor negativo
                this.hayUnaPartidaEnJuego = false
            } else if (this.getSalud(this.saludMonstruo) <= 0) {
                alert('Ganaste! =D')
                this.saludMonstruo = 0 // se coloca directamente en 0 para que no aparezca valor negativo
                this.hayUnaPartidaEnJuego = false
            }
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});