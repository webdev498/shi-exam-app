import {Address} from './Address';

export class Registration {
  
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public phone: string = '';
  public dobMonth: string = '';
  public dobDay: string = '';
  public dobYear: string = '';
  public countryCode: string = '';
  public password: string = '';
  public passwordConfirmation: string = '';
  public nationality: string = '';
  public gender: string = '';
  public address: Address = new Address();
  
  constructor() { }
}