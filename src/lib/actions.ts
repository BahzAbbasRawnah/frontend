'use server';

import { z } from 'zod';

const ServiceRequestSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  company: z.string().optional(),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export type ServiceRequestInput = z.infer<typeof ServiceRequestSchema>;

export async function submitServiceRequest(data: ServiceRequestInput) {
  const validationResult = ServiceRequestSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input.",
    };
  }

  // In a real application, you would send an email, save to a database, etc.
  // For this example, we'll just log it and return a success message.
  console.log('Service Request Submitted:', validationResult.data);

  // Simulate sending to a specified email address (as per user request)
  const recipientEmail = process.env.SERVICE_REQUEST_EMAIL_RECIPIENT || "your-team@example.com";
  console.log(`Simulating sending email to: ${recipientEmail}`);
  // Add actual email sending logic here using a library like Nodemailer or an email service.

  return {
    success: true,
    message: "Thank you for your request! We'll be in touch soon.",
  };
}
