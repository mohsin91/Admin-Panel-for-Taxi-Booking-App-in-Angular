export class EmailTemplateAddModel {
    public KeyWord: String;
    public Type: String;
    public Template: String;
    constructor(KeyWord: String,
                Type: String,
                Template: String
                ) {
                    this.KeyWord = KeyWord;
                    this.Type = Type;
                    this.Template = Template;
    }
}
