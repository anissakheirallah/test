import { Client } from "./client.model";
import { Commercial } from "./commercial.model";
import { Product } from "./product.model";
import { Service } from "./service.model";
import { User } from "./user.model";

export class Lead {

    id:number;
    user:User;
    commercial:Commercial;
    product:Product;
    client:Client;
    services:Array<Service>=[];

    constructor( user:User, commercial:Commercial, product:Product, client:Client){
        this.user = user;
        this.commercial = commercial;
        this.product = product;
        this.client = client;      
    }

}
