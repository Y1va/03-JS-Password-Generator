var specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


// Make a Function to gather the user options
function getPasswordOptions() {

  // Get password length
  var length = parseInt(prompt("How many characters do you want in your password?")
  );
  // Check to see if what they entered was a number
  if (Number.isNaN(length)) {
    alert("Password length must be provided as a number!");
    return null;
  }

  // Check if it is atleast 8 characters long
  if (length < 8) {
    alert("Password length must be at least 8 characters!");
    return null;
  }

  // Less than 128
  if (length > 128) {
    alert("Password length must be less than 128 characters!");
    return null;
  }
  // Ask user for their options
  var hasSpecialCharacters = confirm("Click OK to confirm including special characters"
  );

  var hasNumericCharacters = confirm("Click OK to confirm including number characters"
  );

  var hasLowerCaseCharacters = confirm("Click OK to confirm including lower case characters"
  );

  var hasUpperCaseCharacters = confirm("Click OK to confirm including upper case characters"
  );

  // Ensure they chose something
  if (hasSpecialCharacters === false && hasNumericCharacters === false && hasLowerCaseCharacters === false && hasUpperCaseCharacters === false) {
    alert("Please choose something!");
    return null;

  }

  // Store the user selections in an object + return it
  var passwordOptions = {
    length: length,
    hasSpecialCharacters: hasSpecialCharacters,
    hasNumericCharacters: hasNumericCharacters,
    hasLowerCaseCharacters: hasLowerCaseCharacters,
    hasUpperCaseCharacters: hasUpperCaseCharacters
  
  };
  return passwordOptions;
}

// Function for getting a random element from an array
function getRandom(arr) {
  var ranIndex = Math.floor(Math.random()* arr.length);
  var randElement = arr[ranIndex];

  return randElement;
}


// Function to generate the password
function generatePassword() {

  // Grab the user options
  var options = getPasswordOptions();

  // Create an array to store the result
  var result = [];

  // Create array to store possible characters
  var possibleCharacters = [];

  // Array to store guaranteed characters
  var guranteedCharacters = [];

  // Check if the options exist
  if (!options) return null;

  // Add selected characters to an array of possible characters
  if (options.hasSpecialCharacters) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guranteedCharacters.push(getRandom(specialCharacters));
  
  }

  if (options.hasNumericCharacters) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guranteedCharacters.push(getRandom(numericCharacters));
  }

  if (options.hasLowerCaseCharacters) {
    possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
    guranteedCharacters.push(getRandom(lowerCasedCharacters));
  }

  if (options.hasUpperCaseCharacters) {
    possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
    guranteedCharacters.push(getRandom(upperCasedCharacters));
  }

  // Loop over the passwords length, selecting random indicies from the possible chars and adding them to the result array
  for (var i = 0; i < options.length; i++) {
    var possibleCharacter = getRandom(possibleCharacters);
                
    result.push(possibleCharacter);
  } 

  // Mix in at least one of the guaranteed characters in the result
  for (var i = 0; i < guranteedCharacters.length; i++) {
    result[i] = guranteedCharacters[i];
  }

  // Transform the result into a string and pass it to  writePassword
  return result.join('');

}

// Assignment Code
var generateBtn = document.querySelector("#generate");


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

