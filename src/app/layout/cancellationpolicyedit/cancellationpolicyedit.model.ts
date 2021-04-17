export class CancellationPolicyEditModel {
    public Id: Number;
    public UserType: String;
    public Description: String;

    constructor(Id: Number,
                UserType: String,
                Description: String
                ) {
    this.Id = Id;                
    this.UserType = UserType;
    this.Description = Description;
    }
}
