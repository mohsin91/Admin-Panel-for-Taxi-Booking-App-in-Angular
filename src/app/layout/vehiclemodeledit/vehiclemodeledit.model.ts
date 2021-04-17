export class VehicleModelEditModel {
    public Id: Number;
    public VehicleBrandId: Number;
    public ModelName: String;
    public VehicleType: String;
    public PowerBy: String;
    constructor( Id: Number, 
                VehicleBrandId: Number, 
                ModelName: String,
                VehicleType: String,
                PowerBy: String
                ) {
    this.Id = Id;
    this.VehicleBrandId = VehicleBrandId;
    this.ModelName = ModelName;
    this.VehicleType = VehicleType;
    this.PowerBy = PowerBy;
    }    
}
