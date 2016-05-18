import {Address} from './Address';

export class Registration {
  
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public password: string;
  public passwordConfirmation: string;
  public nationality: string;
  public gender: string;
  public address: Address;
  
  constructor() { }
}