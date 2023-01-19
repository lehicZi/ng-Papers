export interface Video{

    id: string
    title: string
    type: "FILM" | "SERIES"
    status: "TOADD" | "ADDED" | "TOSEE" | "SEEN"
    dispo : boolean
    
}