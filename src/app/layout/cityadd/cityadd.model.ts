export class CityAddModel {
    public CountryId: Number;
    public StateId: Number;
    public CityName: String;
    public IsActive: String;

    constructor( CountryId: Number,
                StateId: Number,
                CityName: String,
                IsActive: String 
                ) {
    this.CountryId = CountryId;
    this.StateId = StateId;
    this.CityName = CityName;
    this.IsActive = IsActive;
    }
}
