export class CityEditModel {
    public Id: Number
    public CountryId: Number;
    public StateId: Number;
    public CityName: String;
    public IsActive: any;

    constructor( Id: Number,
                CountryId: Number,
                StateId: Number,
                CityName: String,
                IsActive: any 
                ) {
    this.Id = Id;
    this.CountryId = CountryId;
    this.StateId = StateId;
    this.CityName = CityName;
    this.IsActive = IsActive;
    }
}
