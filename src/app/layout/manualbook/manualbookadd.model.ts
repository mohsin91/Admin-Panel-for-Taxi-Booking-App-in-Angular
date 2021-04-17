export class ManualBookAddModel {
    public Name: String;
    public Type: String;
    public FieldName: String;
    public ApplicableTo: String;
    public DocType: String;
    public IsRequired: Number;

    constructor( Name: String,
                Type: String,
                FieldName: String,
                ApplicableTo: String,
                DocType: String,
                IsRequired: Number
                ) {
    this.Name = Name;
    this.Type = Type;
    this.FieldName = FieldName;
    this.ApplicableTo = ApplicableTo;
    this.DocType = DocType;
    this.IsRequired = IsRequired;
    }
}
