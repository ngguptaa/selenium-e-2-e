function generateTestUser(baseEmail = "nikhil@gmail.com") {
  const uniqueId = `test-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const testUser = {
    firstName: `Nikhil-${uniqueId}`,
    lastName: `Gupta-${uniqueId}`,
    email: insertEmailTag(baseEmail, uniqueId),
    phone: generateRandomPhone(),
  };

  return testUser;
}
function insertEmailTag(email, tag) {
  const [localPart, domain] = email.split("@");
  return `${localPart}+${tag}@${domain}`;
}
function generateRandomPhone() {
  const prefix = Math.floor(Math.random() * 900) + 100;
  const rest = Math.floor(Math.random() * 9000000) + 1000000;
  return `${prefix}${rest}`;
}

module.exports = generateTestUser;

