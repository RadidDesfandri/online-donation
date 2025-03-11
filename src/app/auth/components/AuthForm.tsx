"use client";

import Button from "@/components/buttons/Button";
import Input from "@/components/inputs/Input";
import { initialValuesAuth } from "@/formiks/auth/initialValue";
import { authSchema } from "@/formiks/auth/schema";
import { useLogin } from "@/hooks/auth/useLogin";
import { PayloadAuth, useRegister } from "@/hooks/auth/useRegister";
import { useSocialLogin } from "@/hooks/auth/useSocialLogin";
import { Form, Formik, FormikHelpers } from "formik";
import { FcGoogle } from "react-icons/fc";

interface AuthFormProps {
  variantAuth: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ variantAuth }) => {
  const { mutateAsync: register, isPending: isLoadingRegister } = useRegister();
  const { mutateAsync: login, isPending: isLoadingLogin } = useLogin();
  const { handleLogin } = useSocialLogin();

  const handleSubmit = async (
    payload: PayloadAuth,
    action: FormikHelpers<PayloadAuth>,
  ) => {
    if (variantAuth === "LOGIN") {
      await login(payload);
      action.resetForm();
    }

    if (variantAuth === "REGISTER") {
      await register(payload);
      action.resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValuesAuth}
      validationSchema={authSchema}
      onSubmit={(values, action) => {
        handleSubmit(values, action);
      }}
    >
      {({ errors }) => (
        <Form className="flex flex-col gap-3">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            error={!!errors.email}
            disabled={isLoadingRegister || isLoadingLogin}
            placeholder="Masukkan email anda"
          />
          <Input
            id="email"
            name="password"
            type="password"
            label="Password"
            error={!!errors.password}
            disabled={isLoadingRegister || isLoadingLogin}
            placeholder="Masukkan password anda"
          />
          <Button
            secondary
            type="submit"
            className="mt-5 px-4 py-3 text-sm"
            disabled={isLoadingRegister || isLoadingLogin}
          >
            {variantAuth === "LOGIN" ? "Lets Go'!" : "Join Now!"}
          </Button>
          <div className="flex w-full items-center gap-x-3 text-neutral-400">
            <div className="h-[2px] w-full border-t border-t-neutral-400" />
            <p className="text-muted-foreground font-montserrat text-xs text-nowrap">
              Atau lanjutkan dengan
            </p>
            <div className="h-[2px] w-full border-t border-t-neutral-400" />
          </div>

          <Button
            className="gap-2 py-3 text-sm"
            type="button"
            fullWidth
            outline
            disabled={isLoadingRegister || isLoadingLogin}
            onClick={handleLogin}
          >
            <FcGoogle size={23} />
            Google
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
