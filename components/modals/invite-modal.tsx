"use client"


import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useOrigin } from "@/hooks/use-origin";



const InviteModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const [isMounted, setIsMounted] = useState(false);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const orgin = useOrigin();
    const { server } = data;

    const inviteUrl = `${orgin}/invite/${server?.inviteCode}`;

    const copyUrl = () => {
        window.navigator.clipboard.writeText(inviteUrl);
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 3000);
    }

    useEffect(() => {
        setIsMounted(true)
    }, []);

    const isModalOpen = isOpen && type === "invite";

    if (!isMounted) {
        return null;
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="p-2">
                    <DialogTitle className="text-center text-2xl">
                        Invite People
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <Label>
                        Invite link
                    </Label>
                    <div className="flex items-center my-2 gap-x-2">
                        <Input
                            readOnly
                            value={inviteUrl}
                        />
                        <Button
                            onClick={copyUrl}
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default InviteModal;