export class CountryEditModel {
    public Id: Number;
    public CountryName: String;
    public ShortCode: String;
    public CurrenyName: String;
    public CurrencyShortCode: String;
    public CurrencySymbol: String;
    public CurrenyValue: Number;
    public IsActive: any;

    constructor( Id: Number,
                CountryName: String,
                ShortCode: String,
                CurrenyName: String,
                CurrencyShortCode: String,
                CurrencySymbol: String,
                CurrenyValue: Number,
                IsActive: any ) {
    this.Id = Id;
    this.CountryName = CountryName;
    this.ShortCode = ShortCode;
    this.CurrenyName = CurrenyName;
    this.CurrencyShortCode = CurrencyShortCode;
    this.CurrencySymbol = CurrencySymbol;
    this.CurrenyValue = CurrenyValue;
    this.IsActive = IsActive;
    }
}
