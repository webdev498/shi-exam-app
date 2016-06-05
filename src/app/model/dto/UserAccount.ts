import {UserRegistration} from './UserRegistration';
var _ = require('lodash');

export class UserAccount extends UserRegistration{    
    public id: string;
    
    constructor() {
        super();
    }
    
    getPayload() {
        var payload = _.cloneDeep(this);
        
        if (payload.password == null || payload.password.length == 0) {
            delete payload.password;
            delete payload.passwordConfirmation;
        }
        
        if (payload.id == null || payload.id.length == 0)
            delete payload.id;
        
        return payload;
    }
}