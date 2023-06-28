import { AddressModel } from "./AddressModel";

export class SessionUserModel {
  _id: string = null;
  fullName: string = null;
  email: string = null;
  mobileNo: number = null;
  addresses: AddressModel[] = [];
}
