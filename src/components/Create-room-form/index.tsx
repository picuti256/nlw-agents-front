import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateRoom } from '@/http/use-create-rooms';
import { Button } from '../ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const createRoomSchema = z.object({
	// biome-ignore lint/style/noMagicNumbers: <Zod configuration>
	name: z.string().min(4, { message: 'At least 4 characters' }),
	description: z.string(),
});

type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
	const { mutateAsync: createRoom } = useCreateRoom();

	const createRoomForm = useForm<CreateRoomFormData>({
		resolver: zodResolver(createRoomSchema),
		defaultValues: {
			name: '',
			description: '',
		},
	});

	async function handleCreateRoom({ name, description }: CreateRoomFormData) {
		await createRoom({ name, description });

		createRoomForm.reset();
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Create room</CardTitle>
				<CardDescription>
					Create a new room and start to ask and get answers
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...createRoomForm}>
					<form
						className="flex flex-col gap-4"
						onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
					>
						<FormField
							control={createRoomForm.control}
							name="name"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Class name</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Write the class name..."
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={createRoomForm.control}
							name="description"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Class description</FormLabel>
										<FormControl>
											<Textarea {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>

						<Button
							className="w-full cursor-pointer"
							type="submit"
						>
							Create room
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
