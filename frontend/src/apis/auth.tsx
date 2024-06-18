import axios from "@src/axios";

interface SignUpProps {
  name: string;
  email: string;
  password?: string;
  dateOfBirth: Date;
}

const signUp = ({
  name,
  email,
  password,
  dateOfBirth,
}: SignUpProps): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios
      .post("/auth/sign-up", {
        name,
        email,
        password,
        dateOfBirth,
      })
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

interface SignInProps {
  email: string;
  password: string;
}

const signIn = ({ email, password }: SignInProps): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios
      .post("/auth/sign-in", {
        email,
        password,
      })
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

interface ForgotPasswordStates {
  email: string;
}

const sentForgotPasswordMailtoUser = ({
  email,
}: ForgotPasswordStates): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios
      .post("/auth/forgot-password", {
        email,
      })
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

interface verifyOtpProps {
  otp: number | string;
  email: string | null;
}

const verifyOtp = ({ otp, email }: verifyOtpProps): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios
      .post("/auth/verify-otp", {
        email,
        otp,
      })
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { signUp, signIn, sentForgotPasswordMailtoUser, verifyOtp };
