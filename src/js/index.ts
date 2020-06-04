import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface ITransporter {
    id: number;
    lastbil: string;
    chaufførNavn: string;
    dato: string;
    antalKm: number;
    gennsmsnit: number;
}

let baseUrl: string = "https://restinmemoryeksempel2.azurewebsites.net/api/transporterTabs"
// let baseUrl: string = "http://localhost:5000/api/TransporterTabs"


new Vue({
    el: "#app",
    data: {
        transporters: [],
        errors: [],
        // errorMessage: "",
        formData: {
            id: 0,
            lastbil: "",
            chaufførNavn: "",
            dato: "",
            antalKm: 0,
            gennsmsnit: 0
        },
        addMessage: "",
        deleteId: 0,
        deleteMessage: ""
    },


    methods: {
        getAllTransporters() {
            console.log("getAllTransporters")
            axios.get<ITransporter[]>(baseUrl)
                .then((response: AxiosResponse<ITransporter[]>) => {
                    console.log(response.data)
                    this.transporters = response.data
                })

                .catch((error: AxiosError) => {
                    this.errorMessage = error.message
                })
            
        },

        deleteTransporter(deleteId: number) {
        let uri: string = baseUrl + "/" + deleteId
        axios.delete<void>(uri)
            .then((response: AxiosResponse<void>) => {
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllTransporters()
            })
            .catch((error: AxiosError) => {
                //this.deleteMessage = error.message
                alert(error.message)
            })
        },

        

        addTransporter() {

        let addIdElement: HTMLInputElement = <HTMLInputElement> document.getElementById("addId")
        let addLastbilElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addLastbil");
        let addChaufførElement: HTMLInputElement = <HTMLInputElement> document.getElementById("addChaufførNavn")
        let addDatoElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addDato");
        let addAntalKmElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addAntalKm");
        let addGennemsnitElement: HTMLInputElement = <HTMLInputElement> document.getElementById("addGennsmsnit");
        
        let myID: number = Number(addIdElement.value);
        let myLastbil: string = addLastbilElement.value;
        let myChauffør: string = addChaufførElement.value;
        let myDato: string = addDatoElement.value;
        let myAntalKm: number = Number(addAntalKmElement.value);
        let myGennemsnit: number = Number(addGennemsnitElement.value);
        // axios.post<ITransporter>(baseUrl, this.formData)
        axios.post<ITransporter>(baseUrl, { id: myID, lastbil: myLastbil, chaufførNavn: myChauffør, dato: myDato, antalKm: myAntalKm, gennsmsnit: myGennemsnit })
            .then((response: AxiosResponse) => {
                let message: string = "response " + response.status + " " + response.statusText
                this.addMessage = message
                this.getAllTransporters()
            })
            .catch((error: AxiosError) => {
                // this.addMessage = error.message
                alert(error.message)
            })
        }
    }
})
