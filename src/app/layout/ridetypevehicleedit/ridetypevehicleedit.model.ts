export class RidetypeVehicleEditModel {
    public Id: Number;
    public RideTypeId: Number;
    public Name: String;
    public IconPassive: String;
    public IconActive: String;
    public CountryId: Number;
    public StateIds: any;
    public CityIds: any;
    public BaseCharge: Number;
    public MinCharge: Number;
    public CurrencyType: String;
    public CommissionPercentage;
    public WaitingCharge: Number;
    public Capacity: Number;
    public ShortDesc: String;
    public LongDesc: String;
    public IsActive: String;

        constructor(Id: Number, 
                    RideTypeId: Number,
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
                    this.Id = Id;
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
