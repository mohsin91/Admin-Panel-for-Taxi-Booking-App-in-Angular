export class DoctypeEditModel {
    public Id: Number;
    public Name: String;
    public Type: String;
    public FieldName: String;
    public ApplicableTo: String;
    public DocType: String;
    public IsRequired: any;
    constructor( Id: Number,
                Name: String,
                Type: String,
                FieldName: String,
                ApplicableTo: String,
                DocType: String,
                IsRequired: any
                ) {
    this.Id = Id;
    this.Name = Name;
    this.Type = Type;
    this.FieldName = FieldName;
    this.ApplicableTo = ApplicableTo;
    this.DocType = DocType;
    this.IsRequired = IsRequired;
    }    
}
