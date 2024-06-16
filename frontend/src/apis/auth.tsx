import axios from "@src/axios";

interface SignUpProps {
  name: string;
  email: string;
  password?: string;
  dateOfBirth: Date;
}

const signUp = ({ name, email, password, dateOfBirth }: SignUpProps): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.post('/auth/sign-up', {
      name,
      email,
      password,
      dateOfBirth
    })
    .then(response => {
      resolve(response?.data);
    })
    .catch(error => {
      reject(error);
    });
  });
}

export {
  signUp
}
