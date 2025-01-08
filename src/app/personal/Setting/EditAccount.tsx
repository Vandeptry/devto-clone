//src/app/Setting/EditAccount.tsx
"use client";
import React from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  Button,
} from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
const credentialsSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function EditAccount() {
  const methods = useForm<z.infer<typeof credentialsSchema>>({
    defaultValues: {
      password: "",
    },
  });
  return (
    <div>
      <div className="flex w-full flex-col rounded-lg bg-slate-100 p-8">
        <span className="text-3xl font-semibold">Set new password</span>
        <div className="my-4 leading-relaxed tracking-wide text-slate-700">
          If your account was created using social account authentication, you
          may prefer to add an email log in. If you signed up with a social
          media account,
          <a href="" className="mx-1 text-blue-500">
            please reset the password
          </a>
          for your primary email address (tung081204@gmail.com) in order to
          enable this. Please note that email login is in addition to social
          login rather than a replacement for it, so your authenticated social
          account will continue to be linked to your account.
        </div>
        <div>
          <Form {...methods}>
            <form className="space-y-6">
              {" "}
              <FormItem>
                <FormLabel htmlFor="passCurrent">Current password</FormLabel>
                <FormField
                  name="passCurrent"
                  render={({ field }) => (
                    <FormControl type="password" id="passCurrent" {...field} />
                  )}
                />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="passNew">New password</FormLabel>
                <FormField
                  name="NewPassword"
                  render={({ field }) => (
                    <FormControl type="password" id="passNew" {...field} />
                  )}
                />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="ReWritePass">
                  Confirm new password
                </FormLabel>
                <FormField
                  name="ConfirmPassword"
                  render={({ field }) => (
                    <FormControl type="password" id="ReWritePass" {...field} />
                  )}
                />
              </FormItem>
              <Button type="submit">Change password</Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="flex flex-col gap-8 rounded-lg bg-slate-100 p-8">
        <span className="text-3xl font-semibold">Accout emails</span>
        <span className="text-slate-700">
          Primary email:{" "}
          <span className="text-blue-500">tung081204@gmail.com</span>
        </span>
      </div>
      <div className="flex flex-col rounded-lg bg-slate-100 p-8">
        <span className="mb-8 text-3xl font-semibold text-red-600">
          Danger Zone
        </span>
        <span className="mb-4 text-xl font-semibold"> Delete account</span>
        <p className="mb-4">Deleting your account will:</p>
        <p>
          Delete your profile, along with your authentication associations. This
          does not include applications permissions. You will have to remove
          them yourself:
        </p>
        <p>
          Delete any and all content you have, such as articles, comments, or
          your reading list. Allow your username to become available to anyone.
        </p>
        <button className="my-4 w-1/5 rounded-lg bg-red-600 p-2 text-white transition-colors ease-linear hover:bg-red-700">
          Delete Accout
        </button>

        <p>
          <span className="text-blue-500">Contact us </span>
          if you have any questions.
        </p>
      </div>
    </div>
  );
}
