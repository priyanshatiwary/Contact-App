const User = require("./User");

//Creating an Admin and Users
console.log("=============ADMINS===================")
let a1= User.newAdmin("Priyansha",22,'F') //admin created
console.log(a1)

//Getting All Users
console.log("=============USERS=======================")
let user1 = a1.newUser("Nicky",20,'F') 
console.log(a1.getAllUsers())

//Creating Contacts
console.log("===============USERS CAN CREATE CONTACT==========================")
user1.createContact("Prerana")
user1.createContact("Priyank")
console.log(user1.getAllUserContacts())

//Creating Contact Info
console.log("========USER CAN CREATE CONTACT INFO OF PARTICULAR CONTACT by contactID=========")
user1.createContactInfo("Work","9987653523",1)
user1.createContactInfo("Email","user@gmail.com",1)

//Getting All Contact Info for a Contact
console.log("============USER CAN GET ALL CONTACT INFO BY CONTACT ID=====================")
console.log(user1.getAllContactInfos(1))

//Updating Contact Info
console.log("================USER CAN UPDATE CONTACT INFO BY CONTACTINFO ID==============")
user1.updateContactInfo(1,'type',"home",0) //work updated to home
user1.updateContactInfo(1,"value","8763926255",0)
console.log(user1.getAllContactInfos(1))

//Deleting Contact Info
console.log("==========USER CAN DELETE CONTACT INFO BY CONTACT ID=========")
user1.deleteContactInfo(1,0) //deleted home
console.log(user1.getAllContactInfos(1))

//Updating a Contact
console.log("===================User can Update Contact==============")
user1.updateContact(1,'name',"Ranjna") //Priyank got updated to Ranjna
console.log(user1.getAllUserContacts())

//Deleting a Contact
console.log("==================USER CAN DELETE CONTACT================")
user1.deleteContact(0) // Prerana deleted
console.log(user1.getAllUserContacts()) //only Ranjna left

//Creating New Users
console.log("==================NEW USERS ==============================")
console.log(a1.newUser("Alan",23,'M'))//2
console.log(a1.newUser("Nora",20,'F'))//3
console.log(a1.newUser("Helen",22,'F'))//4

//Error Handling - Creating User by Non-Admin
console.log("====================USER CANNOT CREATE USER=============================")
let user2 = new User("Harry",8,'M')
console.log(user2.newUser('Shreya',7,'F'))//not an admin

//Updating Users by Admin:
console.log("============ADMIN CAN UPDATE USER NAME/AGE/GENDER====================")
a1.updateUser(2,'name','Priyansha Tiwary') //updated Alan
a1.updateUser(2,'age',22)
a1.updateUser(2,'gender','F')
console.log(a1.getAllUsers())

// Deleting Users by Admin:
console.log("================ADMIN CAN DELETE USER=========================")
a1.deleteUser(3) //deleted nora
console.log(a1.getAllUsers())