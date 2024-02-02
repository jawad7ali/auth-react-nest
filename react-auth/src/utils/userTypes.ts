export type SignUpFormData = {
    name: string;
    email: string;
    password: string;
    cPassword?: string;
  };
  
export type SignInFormData = {
  email: string;
  password: string;
};

export type AlertMessage = {
  message: string;
  type: 'danger' | 'success';
};