export interface User {
    uid?: string,
    email?: string,
    password?: string,
    prenom?:string,
    nom?:string,
    naissance?:Date,
    age?:number,
    sexe?: string,
    activity?:string,
    langues?:[any],
    //CONTACT
    rue?:string,
    rueNo?:string,
    ville?:string,
    canton?:string,
    npa?:string,
    telephone?: number
}