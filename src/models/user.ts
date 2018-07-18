export interface User {
    uid?: string,
    email?: string,
    password?: string,
    prenom?:string,
    nom?:string,
    naissance?:Date,
    sexe?: string,
    //CONTACT
    rue?:string,
    rueNo?:string,
    ville?:string,
    canton?:string,
    npa?:string,
    telephone?: number
}