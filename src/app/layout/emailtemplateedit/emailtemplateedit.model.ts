export class EmailTemplateEditModel {
    public Id: Number
    public KeyWord: String;
    public Type: String;
    public Template: any;
    public Variables: any;
    constructor( 
                Id: Number,
                KeyWord: String,
                Type: String,
                Template: any,
                Variables: any
                ) {
                    this.Id = Id;
                    this.KeyWord = KeyWord;
                    this.Type = Type;
                    this.Template = Template;
                    this.Variables = Variables;
    }
}
