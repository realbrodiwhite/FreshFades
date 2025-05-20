
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { toast } from "@/hooks/use-toast";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });

      const user = userCredential.user;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.role === "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push("/client/dashboard");
          }
        } else {
          // Fallback if user document doesn't exist (e.g., user created before role system)
          console.warn("User document not found in Firestore for UID:", user.uid, "Defaulting to client dashboard.");
          // Create a user document with default 'client' role if it's missing
          try {
            await setDoc(doc(db, "users", user.uid), {
              email: user.email,
              role: "client", 
              createdAt: new Date(),
            });
          } catch (dbError) {
             console.error("Error creating user document in Firestore:", dbError);
          }
          router.push("/client/dashboard");
        }
      } else {
        // Should not happen if signInWithEmailAndPassword was successful, but as a fallback
        router.push("/client/dashboard");
      }
    } catch (error: any) {
      let errorMessage = "Invalid email or password. Please try again.";
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed login attempts. Please try again later or reset your password.";
      }
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background antialiased items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Access your client or admin dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="m@example.com" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline hover:text-primary">
              Sign up
            </Link>
          </div>
           <div className="mt-2 text-center text-sm">
            <Link href="/forgot-password" className="underline hover:text-primary">
              Forgot password?
            </Link>
          </div>
          <div className="mt-6 text-center border-t pt-4">
             <Link href="/" passHref>
                <Button variant="outline" disabled={isLoading}>Back to Home</Button>
              </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
