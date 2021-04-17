export class RidetypeVehicleAddModel {
    public RideTypeId: Number;
    public  Name: String;
    public IconPassive: String;
    public IconActive: String;
    public CountryId: any;
    public StateIds: any;
    public CityIds: Number;
    public BaseCharge: Number;
    public MinCharge: Number;
    public CurrencyType: String;
    public CommissionPercentage;
    public WaitingCharge: Number;
    public Capacity: Number;
    public ShortDesc: String;
    public LongDesc: String;
    public IsActive: String;

        constructor( RideTypeId: Number,
                    Name: String,                                                                              
                    IconPassive: String,           
                    IconActive: String,            
                    CountryId: Number,           
                    StateIds: any,              
                    CityIds: any,               
                    BaseCharge: Number,            
                    MinCharge: Number,             
                    CurrencyType: String,          
                    CommissionPercentage,
                    WaitingCharge: Number,         
                    Capacity: Number,                          
                    ShortDesc: String,           
                    LongDesc: String,
                    IsActive: String
                ) {
                    this.RideTypeId = RideTypeId;
                    this.Name = Name;
                    this.IconPassive = IconPassive;
                    this.IconActive = IconActive;
                    this.CountryId = CountryId;
                    this.StateIds = StateIds;
                    this.CityIds = CityIds;
                    this.BaseCharge = BaseCharge;
                    this.MinCharge = MinCharge;
                    this.CurrencyType = CurrencyType;
                    this.CommissionPercentage = CommissionPercentage;
                    this.WaitingCharge = WaitingCharge;
                    this.Capacity = Capacity;
                    this.ShortDesc = ShortDesc;
                    this.LongDesc = LongDesc;
                    this.IsActive = IsActive
    }
}
