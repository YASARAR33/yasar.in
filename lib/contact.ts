export const CONTACT_RECAPTCHA_ACTION = "contact";

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export type ContactFormFields = {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  emergencyContact?: string;
};

export const isValidContactName = (name: string): boolean => {
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 200;
};

export const isValidContactEmail = (email: string): boolean => {
  const trimmed = email.trim();
  return trimmed.length <= 100 && Boolean(trimmed.toLowerCase().match(EMAIL_REGEX));
};

export const isValidContactPhone = (phone: string): boolean => {
  const trimmed = phone.trim();
  return trimmed.length >= 7 && trimmed.length <= 30;
};

export const isValidContactAddress = (address: string): boolean => {
  const trimmed = address.trim();
  return trimmed.length >= 3 && trimmed.length <= 500;
};

export const isValidContactMessage = (message: string): boolean => {
  const trimmed = message.trim();
  return trimmed.length >= 3 && trimmed.length <= 2000;
};

export const validateContactForm = ({
  name,
  email,
  phone,
  address,
  message,
}: ContactFormFields): string | null => {
  if (!isValidContactName(name)) {
    return "Please enter your name.";
  }

  if (!isValidContactEmail(email)) {
    return "Please enter a valid email address.";
  }

  if (!isValidContactPhone(phone)) {
    return "Please enter your phone number.";
  }

  if (!isValidContactAddress(address)) {
    return "Please enter your address.";
  }

  if (!isValidContactMessage(message)) {
    return "Please enter your message.";
  }

  return null;
};
