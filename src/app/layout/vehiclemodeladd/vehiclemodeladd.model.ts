export class VehicleModelAddModel {
    public VehicleBrandId: Number;
    public ModelName: String;
    public VehicleType: String;
    public PowerBy: String;

    constructor( VehicleBrandId: Number,
                ModelName: String,
                VehicleType: String,
                PowerBy: String
                ) {
    this.VehicleBrandId = VehicleBrandId;
    this.ModelName = ModelName;
    this.VehicleType = VehicleType;
    this.PowerBy = PowerBy;
    }
}
