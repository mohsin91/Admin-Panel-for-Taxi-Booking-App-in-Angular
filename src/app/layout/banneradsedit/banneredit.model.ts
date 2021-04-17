export class BannerAdsEditModel {
    public Id: Number;
    public Title: String;
    public Description: String;
    public Image_path: String;
    public Url: String;
    public Status: String;    

        constructor(Id: Number, 
                    Title: String,
                    Description: String,                                                                              
                    Image_path: String,           
                    Url: String,     
                    Status: String
                ) {
                    this.Id = Id;
                    this.Title = Title;
                    this.Description = Description;
                    this.Image_path = Image_path;
                    this.Url = Url;
                    this.Status = Status;
    }
}
