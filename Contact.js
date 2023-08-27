const ContactInfo = require("./ContactInfo")

class Contact{
    static contactID = 0
    constructor(name)
    {
        this.name = name
        this.contactInfos = []
        this.contactID = Contact.contactID++ 
    }
     //creates a new Contact object using the name parameter and returns it.
    static newContact(name)
    {
        try {
            if(typeof name != 'string')
            {
                throw new Error("Inavlid Name ")
            }
            return new Contact(name)
        } catch (error) {
            console.log(error.message)
        }
    }

    updateContact(parameter,newValue)
    {
        if(typeof parameter != 'string')
        {
            throw new Error("Invalid parameter")
        }
        switch (parameter) {
            case 'name':
                this.#updateName(newValue)
                break;
        
            default:
                throw new Error("Parameter Does Not Exist")
                
        }
    }
    #updateName(newValue)
    {
        try {
            // Validation for the new name value
            if(typeof newValue != 'string')
        {
            throw new Error("Invalid name")
        }
        return this.name = newValue // Update the name
        } catch (error) {
            console.log(error.message)
        }
        
    }
    
    //create contact info to that contact id under contact list
    createContactInfo(typeOfContact, valueOfContact)
    {
        let newContactInfo = ContactInfo.newContactInfo(typeOfContact, valueOfContact)
        this.contactInfos.push(newContactInfo)
        return newContactInfo
    }
    getAllContactInfos()
    {
        return this.contactInfos // returns the entire contactInfos array of the current Contact object. 
    }
    #findContactInfo(contactInfoID)
    {
        for (let index = 0; index < this.contactInfos.length; index++) {
            //checks if the contactInfoID provided as an argument matches the ContactInfoID of the 
            //current ContactInfo object in the loop.
            if(contactInfoID == this.contactInfos[index].ContactInfoID)
            {
                return [this.contactInfos[index], index]
                
            }
        }
        return [null,-1]
    }
    updateContactInfo(parameter,newValue,contactInfoID)
    {
        let [foundContactInfo,indexOfContactInfo] = this.#findContactInfo(contactInfoID)

        if(foundContactInfo == null)
        {
            throw new Error("Contact Info Not Found")
        }

        return foundContactInfo.updateContactInfo(parameter,newValue)
    }
    deleteContactInfo(contactInfoID)
    {
        let [foundContactInfo,indexOfContactInfo] = this.#findContactInfo(contactInfoID)

        if(foundContactInfo == null)
        {
            throw new Error("Contact Info Not Found")
        }
        this.contactInfos.splice(indexOfContactInfo,1)
    }
}
module.exports=Contact