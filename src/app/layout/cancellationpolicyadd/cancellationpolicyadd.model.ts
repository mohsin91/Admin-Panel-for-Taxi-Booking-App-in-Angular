export class CancellationPolicyAddModel {
    public Description: String;
    public UserType: String;

    constructor(Description: String,
                UserType: String 
                ) {
    this.Description = Description;
    this.UserType = UserType;
    }
}
