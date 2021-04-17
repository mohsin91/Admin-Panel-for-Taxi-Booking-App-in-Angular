export class BookingsList {
    public Id : Number ;  
    public FromLocation : String ; 
    public ToLocation : String ; 
    public CurrencyType: String;
    public Estimation: String;
    public TotalAmount: Number;
    public Status: String;
    constructor(Id: Number,
        FromLocation: String ,
        ToLocation: String ,
        CurrencyType: String,
        Estimation: String,
        TotalAmount: Number,
        Status: String
    ) {
        this.Id = Id;
        this.FromLocation = FromLocation;
        this.ToLocation = ToLocation;
        this.CurrencyType = CurrencyType;
        this.Estimation = Estimation;
        this.TotalAmount = TotalAmount;
        this.Status = Status;
    }
    }