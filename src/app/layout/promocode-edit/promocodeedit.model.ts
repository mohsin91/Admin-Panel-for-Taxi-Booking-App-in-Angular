export class PromoCodeEditModel {
    public Id: Number;
    public Name: String;
    public Coupon: String;
    public Discount: Number;
    public Type: String;
    public Threshold: Number;
    public MinValueToRedeem: Number;
    public MaxValueToRedeem: Number;
    public ValidFrom: any;
    public ValidTo: any;
    public RedeemableType: String;
    public Status: String;
    public Description: String;

    constructor(Id: Number,
        Name: String,
        Coupon: String,
        Discount: Number,
        Type: String,
        Threshold: Number,
        MinValueToRedeem: Number,
        MaxValueToRedeem: Number,
        ValidFrom: any,
        ValidTo: any,
        RedeemableType: String,
        Status: String,
        Description: String
    ) {
        this.Id = Id;
        this.Name = Name;
        this.Coupon = Coupon;
        this.Discount = Discount;
        this.Type = Type;
        this.Threshold = Threshold;
        this.MinValueToRedeem = MinValueToRedeem;
        this.MaxValueToRedeem = MaxValueToRedeem;
        this.ValidFrom = ValidFrom;
        this.ValidTo = ValidTo;
        this.RedeemableType = RedeemableType;
        this.Status = Status;
        this.Description = Description;
    }
    
}
