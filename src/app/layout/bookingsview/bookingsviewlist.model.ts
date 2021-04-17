export class BookingsViewListModel {
    public Id: Number;
    public UserId: Number;
    public UserDeviceId: Number;
    public ProviderId: Number;
    public RideTypeId: Number;
    public FromLocation: String;
    public ToLocation: String;
    public CancelledFor: String;
    public SourceLat: any;
    public SourceLong: any;
    public DestinyLat: any;
    public DestinyLong: any;
    public S2CellId: String;
    public Status: String;
    public Distance: Number;
    public Estimation: Number;
    public CurrencyType: String;
    public Tax: Number;
    public WaitingCharges: Number;
    public TotalAmount: Number;
    public Description: String;
    public ContactNo: String;
    public CountryName: String;
    public CancelledBy: String;
    public uFirstName: String;
    public uLastName: String;
    public uImage: String;
    public uEmail: String;
    public uMobile: String;
    public pFirstName: String;
    public pLastName: String;
    public pImage: String;
    public pEmail: String;
    public pMobile: String;
    public Name: String; 
    public Latitude: any;
    public Longitude: any; 
    public PaymentMode: any;

    constructor(Id: Number,
        UserId: Number,
        UserDeviceId: Number,
        ProviderId: Number,
        RideTypeId: Number,
        FromLocation: String,
        ToLocation: String,
        CancelledFor: String,
        SourceLat: any,
        SourceLong: any,
        DestinyLat: any,
        DestinyLong: any,
        S2CellId: String,
        Status: String,
        Distance: Number,
        Estimation: Number,
        CurrencyType: String,
        Tax: Number,
        WaitingCharges: Number,
        TotalAmount: Number,
        Description: String,
        ContactNo: String,
        CountryName: String,
        CancelledBy: String,
        uFirstName: String,
        uLastName: String,
        uImage: String,
        uEmail: String,
        uMobile: String,
        pFirstName: String,
        pLastName: String,
        pImage: String,
        pEmail: String,
        pMobile: String,
        Name: String,
        Latitude: any,
        Longitude: any,
        PaymentMode: any
                ) {
    this.Id = Id;
    this.UserId = UserId;
    this.UserDeviceId = UserDeviceId;
    this.ProviderId = ProviderId;
    this.RideTypeId = RideTypeId;
    this.FromLocation = FromLocation;
    this.ToLocation = ToLocation;
    this.CancelledFor = CancelledFor;
    this.SourceLat = SourceLat;
    this.SourceLong = SourceLong;
    this.DestinyLat = DestinyLat;
    this.DestinyLong = DestinyLong;
    this.S2CellId = S2CellId;
    this.Status = Status;
    this.Distance = Distance;
    this.Estimation = Estimation;
    this.CurrencyType = CurrencyType;
    this.Tax = Tax;
    this.WaitingCharges = WaitingCharges;
    this.TotalAmount = TotalAmount;
    this.Description = Description;
    this.ContactNo = ContactNo;
    this.CountryName = CountryName;
    this.CancelledBy = CancelledBy;
    this.uFirstName = uFirstName;
    this.uLastName = uLastName;
    this.uImage = uImage;
    this.uEmail = uEmail;
    this.uMobile = uMobile;
    this.pFirstName = pFirstName;
    this.pLastName = pLastName;
    this.pImage = pImage;
    this.pEmail = pEmail;
    this.pMobile = pMobile;
    this.Name = Name;
    this.Latitude = Latitude;
    this.Longitude = Longitude;
    this.PaymentMode = PaymentMode;
    }
}

  
