export class User{
    id:number;
    name:string;
    score:number;
    email:string;

    constructor(args:any){
        this.id=args.id;
        this.name=args.name;
        this.score=args.score;
        this.email=args.email;
    }
}