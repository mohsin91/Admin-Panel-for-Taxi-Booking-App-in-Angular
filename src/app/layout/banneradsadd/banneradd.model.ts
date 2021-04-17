export class BannerAdsAddModel {
    public Title: String;
    public Description: String;
    public Image_path: String;
    public Url: String;
    public Status: String;    

        constructor( Title: String,
                    Description: String,                                                                              
                    Image_path: String,           
                    Url: String,     
                    Status: String
                ) {
                    this.Title = Title;
                    this.Description = Description;
                    this.Image_path = Image_path;
                    this.Url = Url;
                    this.Status = Status;
    }
}
