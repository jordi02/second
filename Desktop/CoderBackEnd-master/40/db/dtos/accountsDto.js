/* no entiendo para que necesito un dto si todos los campos
de mis esquemas son requeridos, pero bueno */

class Account {
    constructor(username, email, password, name,
                address, age, phone_number, photo_url)
                {
                    this.username = username;
                    this.email = email;
                    this.password = password;
                    this.name = name;
                    this.address = address;
                    this.age = age;
                    this.phone_number = phone_number;
                    this.photo_url = photo_url;
                }
    
}

module.exports = Account;