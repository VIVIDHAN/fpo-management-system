// validators.js - Based on SRS Appendix C: Validation Rules Summary

export const validateName = (name) => {
  if (!name || name.trim() === '') return "Name is required";
  // Alphabetic characters and spaces only, 2-100 characters
  if (!/^[a-zA-Z\s]{2,100}$/.test(name)) {
    return "Name must not contain numbers or special characters and must be 2-100 chars long";
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') return "Phone Number is required";
  // exactly 10 consecutive numeric digits
  if (!/^\d{10}$/.test(phone)) {
    return "Phone Number must be exactly 10 digits long";
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email || email.trim() === '') return "Email is required";
  // basic email regex
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  // Minimum 8 characters with uppercase, lowercase, digit, and special character
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!regex.test(password)) {
    return "Password must meet security requirements (min 8 chars, uppercase, lowercase, digit, special char)";
  }
  return null;
};

export const validateLandHolding = (acres) => {
  if (acres === undefined || acres === null || acres === '') return "Land holding is required";
  const num = parseFloat(acres);
  if (isNaN(num) || num <= 0) {
    return "Land holding must be a positive number";
  }
  return null;
};

export const validateQuantity = (quantity) => {
  if (quantity === undefined || quantity === null || quantity === '') return "Quantity is required";
  const num = parseFloat(quantity);
  if (isNaN(num) || num <= 0) {
    return "Quantity must be a positive number";
  }
  return null;
};
