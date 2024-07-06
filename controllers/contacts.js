const contactsModel = require("../models/contacts");
const registerValidator = require("../Validators/register");
const { isValidObjectId } = require("mongoose");

exports.register = async (req, res) => {
  const validationResult = registerValidator(req.body);

  if (validationResult !== true) {
    return res.status(422).json(validationResult);
  }

  let { fullName, username, email, gender, city, phoneNumber, address, age } =
    req.body;

  const result = await contactsModel.create({
    fullName,
    username,
    email,
    gender,
    city,
    phoneNumber,
    address,
    age,
  });

  res.status(201).json({
    message: "New Contact create successfully",
    data: result,
  });
};

exports.edit = async (req, res) => {
  const { id } = req.params;

  let contact = null;
  if (isValidObjectId(id)) {
    contact = await contactsModel.findOne({ _id: id });

    if (!contact) {
      return res.status(404).json({
        message: "Contact Not Found!",
      });
    }
  } else {
    return res.status(422).json({
      message: "ContactID is not valid!",
    });
  }

  let { fullName, username, email, gender, city, phoneNumber, address, age } =
    req.body;

  const result = await contactsModel.updateOne(
    { _id: id },
    {
      $set: {
        fullName: fullName,
        username: username,
        email: email,
        gender: gender,
        city: city,
        phoneNumber: phoneNumber,
        address: address,
        age: age,
      },
    }
  );

  res.status(200).json({
    message: `Contact ${id} updated successfully`,
    data: result,
  });

};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (isValidObjectId(id)) {
    const deletedContact = await contactsModel.findByIdAndDelete({ _id: id });

    if (!deletedContact) {
      return res.status(404).json({
        message: "Contact Not Found!",
      });
    }
  } else {
    return res.status(422).json({
      message: "ContactID is not valid!",
    });
  }

  res.status(200).json({
    message: "Contact Deleted Successfully",
  });
};

exports.getAll = async (req, res) => {
  const contacts = await contactsModel.find({}).lean();
  res.json(contacts);
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  let contact = null;
  if (isValidObjectId(id)) {
    contact = await contactsModel.findOne({ _id: id });

    if (!contact) {
      return res.status(404).json({
        message: "Contact Not Found!",
      });
    }
  } else {
    return res.status(422).json({
      message: "ContactID is not valid!",
    });
  }

  res.json(contact);
};

exports.find = async (req, res) => {
  console.log(req.body);

  let { fullName, username, email, gender, city, phoneNumber, address, age } =
    req.body;

  let contacts = null;

  if (fullName != null && fullName.length > 0) {
    contacts = await findContacts(contacts, "fullName", fullName);
  }

  if (username != null && username.length > 0) {
    contacts = await findContacts(contacts, "username", username);
  }

  if (email != null && email.length > 0) {
    contacts = await findContacts(contacts, "email", email);
  }

  if (gender != null && gender.length > 0) {
    contacts = await findContacts(contacts, "gender", gender);
  }

  if (city != null && city.length > 0) {
    contacts = await findContacts(contacts, "city", city);
  }

  if (phoneNumber != null && phoneNumber.length > 0) {
    contacts = await findContacts(contacts, "phoneNumber", phoneNumber);
  }

  if (address != null && address.length > 0) {
    contacts = await findContacts(contacts, "address", address);
  }

  if (age != null && age > 0) {
    contacts = await findContacts(contacts, "age", age);
  }

  if (!contacts || contacts.length < 1) {
    return res.status(404).json({
      data: contacts,
      message: "Contacts Not Found!",
    });
  }

  res.json({ data: contacts });
};

function isNullOrEmpty(collection) {
  if (collection === null) {
    return true;
  }

  if (!collection.length) {
    return true;
  }

  return false;
}

async function findContacts(defaultArray, key, value) {
  let contacts = defaultArray;

  switch (key) {
    case "fullName":
      if (isNullOrEmpty(contacts)) {
        contacts = await contactsModel.find({
          fullName: { $regex: value, $options: "i" },
        });
        console.log(contacts);
      } else {
        contacts = contacts.filter((x) => x.fullName.includes(value));
      }
      break;

    case "username":
      if (isNullOrEmpty(contacts)) {
        contacts = await contactsModel.find({
          username: { $regex: value, $options: "i" },
        });
      } else {
        contacts = contacts.filter((x) => x.username.includes(value));
      }
      break;

    case "email":
      if (isNullOrEmpty(contacts)) {
        contacts = await contactsModel.find({
          email: { $regex: value, $options: "i" },
        });
      } else {
        contacts = contacts.filter((x) => x.email.includes(value));
      }
      break;

    case "gender":
      if (isNullOrEmpty(contacts)) {
        contacts = await contactsModel.find({
          gender: { $regex: value, $options: "i" },
        });
      } else {
        contacts = contacts.filter((x) => x.gender.includes(value));
      }
      break;

    case "city":
      if (isNullOrEmpty(contacts)) {
        contacts = await contactsModel.find({
          city: { $regex: value, $options: "i" },
        });
      } else {
        contacts = contacts.filter((x) => x.city.includes(value));
      }
      break;

    case "phoneNumber":
      if (isNullOrEmpty(contacts)) {
        contacts = await contactsModel.find({
          phoneNumber: { $regex: value, $options: "i" },
        });
      } else {
        contacts = contacts.filter((x) => x.phoneNumber.includes(value));
      }
      break;

    case "address":
      if (isNullOrEmpty(contacts)) {
        contacts = await contactsModel.find({
          address: { $regex: value, $options: "i" },
        });
      } else {
        contacts = contacts.filter((x) => x.address.includes(value));
      }
      break;

    case "age":
      if (isNullOrEmpty(contacts)) {
        contacts = await contactsModel.find({
          age: { $regex: value, $options: "i" },
        });
      } else {
        contacts = contacts.filter((x) => x.age === Number(value));
      }
      break;

    default:
      contacts = [];
  }

  return isNullOrEmpty(contacts) ? [] : contacts;
}
