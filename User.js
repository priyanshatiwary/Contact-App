const Contact = require("./Contact")
class User{
    static id=0
    static allUsers=[] //list of allUsers 
        
    constructor(name,age,gender,isAdmin)
    {
        this.name=name
        this.age= age
        this.gender=gender
        this.id=User.id++
        this.isAdmin = isAdmin
        this.contacts=[] //initially contacts list is empty
    }
    //create new admin
    static newAdmin(name,age,gender)
    {
        
        try {
            //validation
            if(typeof name != 'string')
            {
                throw new Error("Invalid value of Name parameter")
            }
            if(typeof age != 'number')
            {
                throw new Error("Invalid value of Age parameter")
            }
            if(gender != 'M' && gender != 'F' && gender != 'O')
            {
                throw new Error("Invalid value of Gender parameter")
            }
            // Create and return a new admin user object  
            console.log("New Admin Set are as follows...")
            return new User(name,age,gender,true) //isAdmin is set to true 
        } catch (error) {
            console.log(error.message)
        }
    }
  
    //Creating new user object 
    newUser(name,age,gender)
    {
        
        try {
            // Validation for name, age, and gender
            if(typeof name != 'string')
            {
                throw new Error("Invalid value of Name parameter")
            }
            if(typeof age != 'number')
            {
                throw new Error("Invalid value of Age parameter")
            }
            if(gender != 'M' && gender != 'F' && gender != 'O')
            {
                throw new Error("Invalid value of Gender parameter")
            }
            // Check if the caller is an admin
            if(!this.isAdmin)
            {
                throw new Error("Not an Admin")
            }
            // Create a new regular user object
            let newUser = new User(name,age,gender,false)
            User.allUsers.push(newUser) // Add user to the list
            console.log("New User Pushed in the list Successfully")
            console.log("New Users are listed below...")
            return newUser

        } catch (error) {
            console.log(error.message)
        }
    }

    //Returns the list of all user objects
    getAllUsers()
    {
        try {
            // Check if the caller is an admin
            if(!this.isAdmin)
            {
                throw new Error("Not an Admin") 
            }
            return User.allUsers // Return the list of all users
        } catch (error) {
            console.log(error.message)
        }
    }

    //for finding user by using user id
    static #findUser(userId)
    {
        //searches through the list of all user objects and returns the user object and its index if found.
        for (let index = 0; index < User.allUsers.length; index++) {
            if(userId == User.allUsers[index].id)
            {
                return [User.allUsers[index],index]
            }
            
        } 
        // If user not found, return [null, -1]
        return [null,-1]
    }
    //admin can update user name parameter
    #updateName(newValue)
    {
        try{
            // Validation for the new name value
            if(typeof newValue != 'string')
            {
                throw new Error("Invalid value of Name parameter")
            }
            return this.name=newValue // Update the name
        }
        catch(error)
        {
            console.log(error.message)
        }
    }
    //admin can update user age parameter
    #updateAge(newValue)
    {
        try{
            // Validation for the new age value
            if(typeof newValue != 'number')
            {
                throw new Error("Invalid value of Age parameter")
            }
            return this.age=newValue // Update the age
        }
        catch(error)
        {
            console.log(error.message)
        }
    }
    //admin can update user gender parameter 
    #updateGender(newValue)
    {
        try{
            // Validation for the new gender value
            if(typeof newValue != 'string')
            {
                throw new Error("Invalid value of Gender parameter")
            }
            return this.gender=newValue // Update the gender
        }
        catch(error)
        {
            console.log(error.message)
        }
    }
    //admin can update user name age gender
    updateUser(userId,parameter,newValue) //parameter : parameter to update & newValue : newValue to replace
    {
        try {
            // Check if the caller is an admin
            if(!this.isAdmin)
            {
                throw new Error("Not an Admin")
            }
            // Find the user to be updated and its index
            let [userToBeUpdated , indexOfUserToBeUpdated] = User.#findUser(userId)
            if (userToBeUpdated == null)  //if user notfound
            {
                throw new Error("User not found")    
            }
            // Update the specified parameter using private update methods
            switch (parameter) {
                case 'name':    console.log("Updating the name.....")
                //calling a private method named #updateName on the userToBeUpdated object.
                                userToBeUpdated.#updateName(newValue)  
                                console.log("Updated the name successfully")              
                    break;
                case 'age':     console.log("Updating the age.....")
                                userToBeUpdated.#updateAge(newValue) 
                                console.log("Updated the age successfully")                
                    break;
                case 'gender':  console.log("Updating the gender.....")
                                userToBeUpdated.#updateGender(newValue) 
                                console.log("Updated the age successfully")                
                    break;
            
                default: 
                    break;
            }
            console.log("Updating the User...")
            console.log("Updated the User Successfully")
            return User.allUsers // Return the updated list of all users
        } catch (error) {
            console.log(error.message)
        }

    }
    //admin can delete user
    deleteUser(userId)
    {
        try {
             // Check if the caller is an admin
            if(!this.isAdmin)
            {
                throw new Error("Not an Admin")
            }
            // Find the user to be deleted and its index
           
            let [userToBeDeleted , indexOfUserToBeDeleted] = User.#findUser(userId)
            if (userToBeDeleted == null) 
            {
                throw new Error("User not found")    
            }
            console.log("Deleting the User...")
            // Remove the user from the allUsers array
            User.allUsers.splice(indexOfUserToBeDeleted,1) //(start, no od elements to delete)
            console.log("Deleted the User Successfully")
        } catch (error) {
            console.log(error.message)
        }
    }
    // User can Create contact 
    createContact(name)
    {
        try {
            if(this.isAdmin)
            {
                throw new Error("Admin Cannot Create Contact")
            }
            console.log("Creating a new Contact.....")
            //creates a new contact using the newContact method from the Contact class. 
            let newContact = Contact.newContact(name)
            /*adds the newly created contact object (newContact) to the contacts array of the 
            current user object (this). This array holds all the contacts associated with the user. */
            this.contacts.push(newContact)
            console.log("Created a new Contact Successfully")
            return newContact //returns the newly created contact object. 
        } 
        catch (error) {
            console.log(error.message)
        }
    }
    //User can get access to its contact
    getAllUserContacts()
    {
        try {
            if(this.isAdmin)
            {
                throw new Error("Admin Cannot Read Contacts")
            }
            console.log("All User Contacts are listed below...")
            return this.contacts
        } catch (error) {
            console.log(error.message)
        }
    }
    //Find contact by contact id
    #findContact(contactID)
    {
        for (let index = 0; index < this.contacts.length; index++) {
            if(contactID == this.contacts[index].contactID)
            {
                //returns The contact object (this.contacts[index]) found with the matching contactID.
                //The index (index) at which the contact was found in the contacts array.
                return [this.contacts[index],index]
            }
        }
        return [null,-1]
    }
    //User can update its contact
    updateContact(contactID,parameter,newValue)
    {
        try {
            if(this.isAdmin)
            {
                throw new Error("Admin Cannot Update Contact")
            }
            //validation parameter
            if(contactID < 0 || typeof contactID != 'number')
            {
                throw new Error("Invalid Contact ID")
            }
            let [foundContact,indexOfContact] = this.#findContact(contactID)

            if(foundContact == null)
            {
                throw new Error("Contact Not Found")
            }
            console.log("Updating the Contact")
            foundContact.updateContact(parameter,newValue)
            console.log("Updated the Contact Successfully")
        } catch (error) {
            console.log(error.message)
        }
    }
    //User can delete its contact
    deleteContact(contactID)
    {
        try {
            // Check if the caller is an admin
            if(this.isAdmin)
            {
                throw new Error("Admin Cannot Delete Contact")
            }
            if(contactID < 0 || typeof contactID != 'number')
            {
                throw new Error("Invalid Contact ID")
            }
            // Find the contact to be deleted and its index
        
            let [contactToBeDeleted , indexOfContactToBeDeleted] = this.#findContact(contactID)
            
            if (contactToBeDeleted == null) 
            {
                throw new Error("User not found")    
            }
            console.log("Deleting the Contact.......")
            // Remove the contact from the contacts array
            this.contacts.splice(indexOfContactToBeDeleted,1) //(start, no od elements to delete)
            console.log("Deleted the Contact Successfully ")

        } catch (error) {
            console.log(error.message)
        }
    }

    //User can create contact info 
    createContactInfo(typeOfContact, valueOfContact,contactID)
    {//typeofContact : home,work ; valueOfContact: phone, email;
        try {
            if(this.isAdmin)
            {
                throw new Error("Admin Cannot Read ContactInfo")
            }
            let [foundContact,indexOfContact]=this.#findContact(contactID)
            if(foundContact == null)
            {
                throw new Error("Contact not found")
            }
            foundContact.createContactInfo(typeOfContact,valueOfContact)
            console.log("Created a new Contact Info Successfully")
        } catch (error) {
            console.log(error.message)
        }
    }
    //User can get access to its contacts info for that particular contact by contactID
    getAllContactInfos(contactID)
    {
        try {
            if(this.isAdmin)
            {
                throw new Error("Admin Cannot Read ContactInfo")
            }
            let [foundContact,indexOfContact]=this.#findContact(contactID)
            if(foundContact == null)
            {
                throw new Error("Contact not found")
            }
            console.log("All Contact Infos available are listed below...")
            return foundContact.getAllContactInfos()
        } catch (error) {
            console.log(error.message)
        }
    }
    //User can update contact info 
    updateContactInfo(contactID,parameter,newValue,ContactInfoID)
    {
        try {
            if(this.isAdmin)
            {
                throw new Error("Admin cannot update Contact Info")
            }
            if(contactID < 0 || typeof contactID != 'number')
            {
                throw new Error("Invalid Contact ID")
            }
            let [foundContact,indexOfContact] = this.#findContact(contactID)

            if(foundContact == null)
            {
                throw new Error("Contact Not Found")
            }
            console.log("Updating the Contact Info....")
            console.log("Updated the Contact Info Successfully")
            return foundContact.updateContactInfo(parameter,newValue,ContactInfoID)                     
        } catch (error) {
            console.log(error.message)
        }
    }
    //User can delete Contact info
    deleteContactInfo(contactID,contactInfoID)
    {
        try {
            if(this.isAdmin)
            {
                throw new Error("Admin Cannot Delete Contact Info")
            }
            if(contactID < 0 || typeof contactID != 'number')
            {
                throw new Error("Invalid Contact ID")
            }
            let [foundContact,indexOfContact] = this.#findContact(contactID)

            if(foundContact == null)
            {
                throw new Error("Contact Not Found")
            }
            console.log("Deleting the Contact Info....")
            foundContact.deleteContactInfo(contactInfoID)
            console.log("Deleted the Contact Info Successfully")
        } catch (error) {
            console.log(error.message)
        }
    }
}
module.exports=User