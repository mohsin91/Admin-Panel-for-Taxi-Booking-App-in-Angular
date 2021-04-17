export class VehicleBrandAddModel {
    public BrandName: String;
    public CountryId: any;

    constructor( BrandName: String,
                CountryId: any,
                ) {
    this.BrandName = BrandName;
    this.CountryId = CountryId;
    }
}
