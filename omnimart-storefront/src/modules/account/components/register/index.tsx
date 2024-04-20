"use client"

import { useFormState } from "react-dom"

import { useState } from "react";

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { signUp } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(signUp, null)
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // This is a simple regex for international phone numbers. Adjust it according to your needs.
    return phoneRegex.test(phone);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    if (!validatePassword(password)) {
      setPasswordError("Password must be more than 8 characters long, contain at least 1 special character & 1 number.");
    } else {
      setPasswordError(null);
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phone = event.target.value;
    if (!validatePhone(phone)) {
      setPhoneError("Please enter a valid phone number.");
    } else {
      setPhoneError(null);
    }
  };

  return (
    <div className="max-w-sm flex flex-col items-center">
      <h1 className="text-large-semi uppercase mb-6">
        Become a OmnimartStore Member
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        Create your Omnimart Store Member profile, and get better
        shopping experience.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
          />
          <Input
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            onChange={handlePhoneChange}
          />
          {phoneError && <ErrorMessage error={phoneError} />}
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            onChange={handlePasswordChange}
          />
          {passwordError && <ErrorMessage error={passwordError} />}
        </div>
        <ErrorMessage error={message} />
        {/* <span className="text-center text-ui-fg-base text-small-regular mt-6">
          By creating an account, you agree to Medusa Store&apos;s{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span> */}
        <SubmitButton className="w-full mt-6">Join</SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
        .
      </span>
    </div>
  )
}

export default Register