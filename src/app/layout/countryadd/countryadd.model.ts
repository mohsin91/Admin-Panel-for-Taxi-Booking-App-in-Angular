export class CountryAddModel {
    public CountryName: String;
    public ShortCode: String;
    public CurrenyName: String;
    public CurrencyShortCode: String;
    public CurrencySymbol: String;
    public CurrenyValue: Number;
    public IsActive: String;

    constructor( CountryName: String,
                ShortCode: String,
                CurrenyName: String,
                CurrencyShortCode: String,
                CurrencySymbol: String,
                CurrenyValue: Number,
                IsActive: String ) {
    this.CountryName = CountryName;
    this.ShortCode = ShortCode;
    this.CurrenyName = CurrenyName;
    this.CurrencyShortCode = CurrencyShortCode;
    this.CurrencySymbol = CurrencySymbol;
    this.CurrenyValue = CurrenyValue;
    this.IsActive = IsActive;
    }
}
