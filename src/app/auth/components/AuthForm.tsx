"use client";

import { initialValuesAuth } from "@/app/formiks/auth/initialValue";
import { authSchema } from "@/app/formiks/auth/schema";
import Button from "@/components/buttons/Button";
import Input from "@/components/inputs/Input";
import { Form, Formik } from "formik";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

interface AuthFormProps {
  variantAuth: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ variantAuth }) => {
  return (
    <Formik
      initialValues={initialValuesAuth}
      validationSchema={authSchema}
      onSubmit={(values, action) => {
        alert(values);
        action.resetForm();
      }}
    >
      {({ errors }) => (
        <Form className="flex flex-col gap-3">
          <Input
            // disabled
            id="email"
            name="email"
            type="email"
            error={!!errors.email}
            label="Email"
            placeholder="Masukkan email anda"
          />
          <Input
            // disabled
            id="email"
            name="password"
            type="password"
            label="Password"
            error={!!errors.password}
            placeholder="Masukkan password anda"
          />
          <Button
            // disabled={loadingRegister || isLoading}
            className="mt-5 px-4 py-3 text-sm"
            type="submit"
            secondary
          >
            {variantAuth === "LOGIN" ? "Lets Go'!" : "Join Now!"}
          </Button>
          <div className="flex w-full items-center gap-x-3 text-neutral-400">
            <div className="h-[2px] w-full border-t border-t-neutral-400" />
            <p className="text-muted-foreground text-xs text-nowrap">
              Atau lanjutkan dengan
            </p>
            <div className="h-[2px] w-full border-t border-t-neutral-400" />
          </div>

          <div className="flex gap-3">
            <Button
              className="gap-2 text-sm"
              type="button"
              fullWidth
              outline
              autoPadding
              //   disabled={loadingRegister || isLoading}
              //   onClick={() => handleLoginSocialAuth("google")}
            >
              <FcGoogle size={23} />
              Google
            </Button>
            <Button
              className="gap-2 text-sm"
              type="button"
              fullWidth
              outline
              autoPadding
              //   disabled={loadingRegister || isLoading}
              //   onClick={() => handleLoginSocialAuth("github")}
            >
              <FaGithub size={23} />
              Github
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
