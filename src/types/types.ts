export type ContactInfo={
    id:number;
    firstName:string;
    lastName:string;
    image?:string;
    phone:string;
    email:string;
    birthday?:Date;
    city?:string;
    street?:string;
    company?:string;
    position?:string;
    category:string;
    createdAt:Date;
    updatedAt:Date;
}
export type ContactInput={
    firstName:string;
    lastName:string;
    image?:string;
    phone:string;
    email:string;
    birthday?:Date;
    city?:string;
    street?:string;
    company?:string;
    position?:string;
    category:string;
    
}