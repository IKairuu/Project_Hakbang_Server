export const errorCodes = {
  CLIENT: {
    CLIENT_01: { message: "Email already in use", status: 400 },
    CLIENT_02: { message: "Invalid email or password", status: 400 },
  },
  VERIFICATION: {
    VERI_01: { message: "Token Error: There is no token", status: 400 },
    VERI_02: { message: "Invalid Code", status: 400 },
  },
  SERVER: {
    SERVER_01: { message: "Server Error: Registration Failed", status: 500 },
    SERVER_02: {
      message: "Server Error: Email Verification failed",
      status: 500,
    },
    SERVER_03: { message: "Server Error: Change BIO failed", status: 500 },
    SERVER_04: { message: "Server Error: Post Activity Failed", status: 500 },
    SERVER_05: {
      message: "Server Error: Remove Activities failed",
      status: 500,
    },
    SERVER_06: { message: "Server Error: Save school failed", status: 500 },
    SERVER_07: {
      message: "Server Error: Remove saved school failed",
      status: 500,
    },
    SERVER_08: {
      message: "Server Error: Save scholarship failed",
      status: 500,
    },
    SERVER_09: {
      message: "Server Error: Remove saved scholarship failed",
      status: 500,
    },
    SERVER_10: {
      message: "Server Error: Schools not retrieved",
      status: 500,
    },
    SERVER_11: {
      message: "Server Error: Centers not retrieved",
      status: 500,
    },
    SERVER_12: {
      message: "Server Error: Scholarships not retrieved",
      status: 500,
    },
  },
};
