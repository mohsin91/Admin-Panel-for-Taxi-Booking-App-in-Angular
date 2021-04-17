export class VehicleBrandEditModel {
    public Id: Number;
    public BrandName: String;
    public CountryId: any;
    constructor( Id: Number, 
                BrandName: String,
                CountryId: any
                ) {
    this.Id = Id;
    this.BrandName = BrandName;
    this.CountryId = CountryId;
    }    
}
