import {Address} from './Address';

export class Registration {
  
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public phone: string = '';
  public dobMonth: number;
  public dobDay: number;
  public dobYear: number;
  public countryCode: string = '';
  public password: string = '';
  public passwordConfirmation: string = '';
  public nationality: string = '';
  public gender: string = '';
  public address: Address = new Address();
  
  constructor() { }
}