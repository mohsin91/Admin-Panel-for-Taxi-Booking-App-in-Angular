export class AppConfigAddModel {
    public fieldname: String;
    public value: String;
    public who: String;
        
    constructor(fieldname: String, 
                value: String,
                who: String
                ) {
    this.fieldname = fieldname;                    
    this.value = value;
    this.who = who;
    }
}
