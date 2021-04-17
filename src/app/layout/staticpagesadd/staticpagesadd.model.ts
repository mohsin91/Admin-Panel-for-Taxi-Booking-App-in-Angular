export class StaticPagesAddModel {
    public PageName: String;
    public Url: String;
    public HtmlContent: String;
    constructor(PageName: String,
                Url: String,
                HtmlContent: String
                ) {
                    this.PageName = PageName;
                    this.Url = Url;
                    this.HtmlContent = HtmlContent;
    }
}
