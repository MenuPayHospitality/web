import { z } from "zod";

export const createAccountSchema = z.object({
    restaurantName: z.string().min(1, "Restaurant name is required"),
    email: z.string().email("Invalid email address"),
    location: z.string().min(1, "Location is required"),
    description: z.string().optional(),
});

export type CreateAccountFormData = z.infer<typeof createAccountSchema>;

export const passwordSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type PasswordFormData = z.infer<typeof passwordSchema>