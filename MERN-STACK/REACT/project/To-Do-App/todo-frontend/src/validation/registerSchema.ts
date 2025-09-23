import * as yup from "yup";

export const registerSchema = yup.object({
    userName: yup.string()
                .required("Username is required"),
    email: yup.string()
            .email("Invalid Email Format")
            .required("Email is required"),
    password: yup.string()
            .min(6, "Password must be at least 6 characters")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(/[@$!%*?&]/, "Password must contain at least one special character")
            .required("Password is required"),
    // confirmPassword: yup.string()
    //         .oneOf([yup.ref('password')], "Passwords must match")
    //         .required("Confirm Password is required")                            
});

export type RegisterSchemaType = yup.InferType<typeof registerSchema>;