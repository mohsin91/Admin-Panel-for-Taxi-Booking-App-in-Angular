export class StaticPagesEditModel {
    public Id: Number
    public PageName: String;
    public Url: String;
    public HtmlContent: String;
    constructor( 
                Id: Number,
                PageName: String,
                Url: String,
                HtmlContent: any
                ) {
                    this.Id = Id;
                    this.PageName = PageName;
                    this.Url = Url;
                    this.HtmlContent = HtmlContent;
    }
}
