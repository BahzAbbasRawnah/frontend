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

  console.log('Service Request Submitted:', validationResult.data);
  const recipientEmail = process.env.SERVICE_REQUEST_EMAIL_RECIPIENT || "your-team@example.com";
  console.log(`Simulating sending email to: ${recipientEmail}`);
  // Add actual email sending logic here

  return {
    success: true,
    message: "Thank you for your request! We'll be in touch soon.",
  };
}


// Rating System
const ServiceRatingSchema = z.object({
  serviceId: z.string().min(1, { message: "Service ID is required."}),
  userId: z.string().min(1, { message: "User ID is required."}), // Assuming users must be logged in to rate
  rating: z.number().min(1, {message: "Rating must be at least 1."}).max(5, {message: "Rating must be at most 5."}),
  comment: z.string().max(500, { message: "Comment must be 500 characters or less."}).optional(),
});

export type ServiceRatingInput = z.infer<typeof ServiceRatingSchema>;

export async function submitServiceRating(data: ServiceRatingInput) {
  const validationResult = ServiceRatingSchema.safeParse(data);

  if (!validationResult.success) {
    console.error("Rating validation failed:", validationResult.error.flatten());
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
      message: "Validation failed. Please check your rating input.",
    };
  }

  // In a real application, you would save this rating to a database (e.g., Firestore)
  // and then update the average rating for the service.
  console.log('Service Rating Submitted:', validationResult.data);
  
  // Example: (Conceptual - requires DB interaction)
  // const { serviceId, userId, rating, comment } = validationResult.data;
  // await db.collection('serviceRatings').add({ serviceId, userId, rating, comment, createdAt: new Date() });
  // await updateServiceAverageRating(serviceId);


  // For now, we'll just simulate success.
  return {
    success: true,
    message: "Thank you for your rating! It has been submitted.",
  };
}
