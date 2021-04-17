export class VehicleBrandViewModel {
    public error: String;
    public msg: String;
    public data: any;
    constructor(error: String, msg: String, data: any) {
        this.error = error;
        this.msg = msg;
        this.data = data;
    }
}