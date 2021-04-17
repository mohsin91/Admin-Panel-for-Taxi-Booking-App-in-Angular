export class AppSliderAddModel {
    public Title: String;
    public Description: String;
    public Image: String;
    public Type: String;

        constructor( Title: String,
                    Description: String,                                                                              
                    Image: String,           
                    Type: String,            
                ) {
                    this.Title = Title;
                    this.Description = Description;
                    this.Image = Image;
                    this.Type = Type;
    }
}
