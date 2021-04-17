export class PeekChargesList {
    public Id : Number; 
    public Type : String; 
    public Week : String;
    public Day : String; 
    public StartTime : any; 
    public EndTime : any; 
    public Fare : any;
    public Status : String;

    constructor( 
             Id : Number, 
             Type : String,
             Week : String,
             Day : String, 
             StartTime : any, 
             EndTime : any, 
             Fare : any,
             Status : String
         
    ) {
        this.Id = Id ; 
        this.Type = Type; 
        this.Week = Week;
        this.Day = Day; 
        this.StartTime = StartTime; 
        this.EndTime = EndTime; 
        this.Fare = Fare;
        this.Status = Status;
    }

    }