"use client"

import { useForm } from "react-hook-form"
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "../file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-model-store";
import { useEffect } from "react";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required"
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required"
    })
})




const EditServerModal = () => {
    const router = useRouter();
    const { isOpen, onClose, type, data } = useModal();
    const { server } = data;


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    });


    useEffect(() => {
    if (server) {
        form.setValue("name", server.name)
        form.setValue("imageUrl", server.imageUrl)
    }
    }, [server])

    const isLoading = form.formState.isSubmitting;

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/servers/${server?.id}`, values);
            form.reset();
            router.refresh();
            close();
        } catch (error) {
            console.log(error)
        }
    }

    const isModalOpen = isOpen && type === "editServer";


    const close = () => {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={close}>
            <DialogContent>
                <DialogHeader className="p-6">
                    <DialogTitle className="text-center text-2xl">
                        Customize your server
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-8"
                    >
                        <div className="px-4 space-y-8">
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload
                                                endpoint="serverImage"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="capitalize">
                                            * server name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                placeholder="Enter server name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className="w-full">
                                <Button type="submit">
                                    Update
                                </Button>
                            </DialogFooter>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}

export default EditServerModal;