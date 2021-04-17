export class StateEditModel {
    public Id: Number
    public CountryId: Number;
    public ShortCode: String;
    public StateName: String;
    public IsActive: any;
    constructor( 
                Id: Number,
                CountryId: Number,
                ShortCode: String,
                StateName: String,
                IsActive: any
                ) {
                    this.Id = Id;
                    this.CountryId = CountryId;
                    this.ShortCode = ShortCode;
                    this.StateName = StateName;
                    this.IsActive = IsActive;
    }
}
