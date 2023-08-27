class ContactInfo{
    static ContactInfoID = 0
    constructor(typeOfContact , valueOfContact)
    {
        this.typeOfContact = typeOfContact
        this.valueOfContact = valueOfContact
        this.ContactInfoID = ContactInfo.ContactInfoID++
    }
    static newContactInfo(typeOfContact,valueOfContact)
    {   //validation
        try {
            if(typeof typeOfContact != 'string')
            {
                throw new Error("Invalid input of contact type")
            }
            if(typeof valueOfContact != 'string')
            {
                throw new Error("Invalid value of contact type")
            }
            //creates a new instance of ContactInfo with the validated parameters and returns it.
            return new ContactInfo(typeOfContact,valueOfContact)
        } catch (error) {
            console.log(error.message)
        }
    }
    #updateContactType(newValue)
    {//validation of newValue
        if(typeof newValue != 'string')
        {
            throw new Error("Invalid Value of Contact Info")
        }
        return this.typeOfContact = newValue //returns the updated value of typeOfContact.
    }
    #updateValueOfContactInfo(newValue)
    {//validation of newValue
        if(typeof newValue != 'string')
        {
            throw new Error("Invalid Value of Contact Info")
        }
        return this.valueOfContact=newValue //returns the updated value of valueOfContact.
    }
    updateContactInfo(parameter,newValue)
    {//validation of parameter
        if(typeof parameter != 'string')
        {
            throw new Error("Invalid Parameter")
        }
        switch (parameter) {

            case 'type':
                this.#updateContactType(newValue)
                break;
            case 'value' :
                this.#updateValueOfContactInfo(newValue)
                break;
            default:
                throw new Error('Parameter does not exist')
        }
    }
}
module.exports = ContactInfo