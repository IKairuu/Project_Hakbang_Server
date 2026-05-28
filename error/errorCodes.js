export const errorCodes = {
  CLIENT: {
    CLIENT_01: "Email already in use",
    CLIENT_02: "Invalid email or password",
  },
  VERIFICATION: {
    VERI_01: "Token Error: There is no token",
    VERI_02: "Invalid Code",
  },
  SERVER: {
    SERVER_01: "Server Error: Registration Failed",
    SERVER_02: "Server Error: Email Verification failed",
    SERVER_03: "Server Error: Change BIO failed",
    SERVER_04: "Server Error: Post Activity Failed",
    SERVER_05: "Server Error: Remove Activities failed",
    SERVER_06: "Server Error: Save school failed",
    SERVER_07: "Server Error: Remove saved school failed",
    SERVER_08: "Server Error: Save scholarship failed",
  },
  DATABASE: "Database Error: ",
};
