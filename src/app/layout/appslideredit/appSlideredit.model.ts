export class AppSliderEditModel {
    public Id: Number;
    public Title: String;
    public Description: String;
    public Image: String;
    public Type: String;

        constructor( Id:Number,
                    Title: String,
                    Description: String,                                                                              
                    Image: String,           
                    Type: String,            
                ) {
                    this.Id = Id;
                    this.Title = Title;
                    this.Description = Description;
                    this.Image = Image;
                    this.Type = Type;
    }
}
