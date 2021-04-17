export class RidetypeVehicleList {
    public Id : Number ; 
    public CountryId : Number;
    public Name : String ; 
    public CountryName : String;
    public IconPassive : String ; 
    public IconActive : String ; 
    public BaseCharge : any ; 
    public MinCharge : any ;
    public CurrencyType : String ;
    public CommissionPercentage : any ;
    public WaitingCharge : any ;
    public Capacity : Number ;
    public ShortDesc : String ;
    public LongDesc : String ;
    public StateName : any ;
    public CityName : any ;

    constructor( 
             Id : Number, 
             CountryId : Number,
             Name : String, 
             CountryName : String,
             IconPassive : String , 
             IconActive : String , 
             BaseCharge : any , 
             MinCharge : any ,
             CurrencyType : String ,
             CommissionPercentage : any ,
             WaitingCharge : any ,
             Capacity : Number ,
             ShortDesc : String ,
             LongDesc : String ,
             StateName : any ,
             CityName : any 
    ) {
        this.Id = Id ; 
        this.CountryId = CountryId;
        this.Name = Name ; 
        this.CountryName = CountryName ;
        this.IconPassive = IconPassive ; 
        this.IconActive = IconActive ; 
        this.BaseCharge = BaseCharge ; 
        this.MinCharge = MinCharge ;
        this.CurrencyType = CurrencyType ;
        this.CommissionPercentage = CommissionPercentage ;
        this.WaitingCharge = WaitingCharge ;
        this.Capacity = Capacity ;
        this.ShortDesc = ShortDesc ;
        this.LongDesc = LongDesc ;
        this.StateName = StateName ;
        this.CityName = CityName ;
    }

    }