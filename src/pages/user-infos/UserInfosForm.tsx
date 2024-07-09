import { TitleCard } from "@/components/common/titleCard/TitleCard";
import { Card, CardHeader } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserType } from "@/types/User";
import { Textarea } from "@/components/ui/textarea";


type Props = {
    onSubmit(values: z.infer<typeof formSchema>): void;
    userData: UserType;
};

const formSchema = z.object({
    displayName: z.string(),
    email: z.string(),
    description: z.string(),
});

const UserInfosForm = ({ onSubmit, userData }: Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: `${userData?.displayName}`,
            email: `${userData?.email}`,
            description: `${userData?.description}`,
        },
    });

    return (
        <div className="mx-auto mt-8 max-w-80">
            <Card>
                <CardHeader>
                    <TitleCard>Mon compte</TitleCard>
                </CardHeader>
                {userData && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="displayName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Login</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Login"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Entrez un e-mail valide."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Entrez une description de vous"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">Modifier</Button>
                        </form>
                    </Form>
                )}
            </Card>
        </div>
    );
};

export default UserInfosForm;
