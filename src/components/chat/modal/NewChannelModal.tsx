import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type NewChannelModalProps = {
    open: boolean,
    setOpen: (val: boolean) => void
}

const NewChannelModal = ({ open, setOpen }: NewChannelModalProps) => {
    return <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        New Channel
                    </DialogTitle>
                    <DialogDescription>
                        Create new channel
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium">
                            Message
                        </label>
                        dafssd
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:ring-primary"
                            placeholder="Type your message here…"
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Create
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    </>
}

export default NewChannelModal;