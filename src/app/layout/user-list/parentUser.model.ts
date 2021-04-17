export class ParentAppUserModel {
    public _id: String;
    public mySqlUserId: Number;
    public name: {
        first_name: String,
        last_name: String
    };
    public email: String;
    public phone: {
        code: String,
        number: String
    };
    public status:String;
}