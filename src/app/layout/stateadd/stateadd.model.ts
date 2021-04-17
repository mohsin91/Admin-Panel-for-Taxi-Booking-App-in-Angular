export class StateAddModel {
    public CountryId: Number;
    public ShortCode: String;
    public StateName: String;
    public IsActive: String;
    constructor( CountryId: Number,
                ShortCode: String,
                StateName: String,
                IsActive: String
                ) {
                    this.CountryId = CountryId;
                    this.ShortCode = ShortCode;
                    this.StateName = StateName;
                    this.IsActive = IsActive;
    }
}
