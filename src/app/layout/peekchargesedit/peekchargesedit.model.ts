export class PeekChargesEditModel {
    public Id: Number;
    public name: String;    
    public type: String;
    public weekdata: any;
    public  daydata: any;
    public starttime: any;
    public endtime: any;
    public fare: any;
    public minamount: any;
    public maxamount: any;

        constructor( Id: Number,name: String,type: String,
            weekdata: any,
             daydata: any,
            starttime: any,
            endtime: any,
            fare: any,
            minamount: any,
            maxamount: any
                ) {
                    this.Id = Id;
                    this.name = name;
                    this.type = type;
                    this.weekdata = weekdata;
                    this.daydata = daydata;
                    this.starttime = starttime;
                    this.endtime = endtime;
                    this.fare = fare;
                    this.minamount = minamount;
                    this.maxamount = maxamount;
    }
}
