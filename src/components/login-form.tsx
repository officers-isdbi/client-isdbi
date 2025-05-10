import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Form, FormikContext, useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useSetUser } from '@/hooks/useUser';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/api/endpoints/auth';
import { toast } from 'sonner';
import { userLoginSchema } from '@common/validations/models/user';
import { Link } from 'react-router';
import { FormikInput } from './ui/formik-input';
export function LoginForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const { setUser } = useSetUser();
	const { mutateAsync: AuthMethod, isPending } = useMutation({
		mutationFn: loginUser,
		onSuccess: (response) => {
			if (!response.success) throw new Error(response.message);
			const auth = response.data;
			const { user } = auth;
			setUser(user);
			toast.success('welcome back.');
		},
		onError: (err) => {
			toast.error(err.message || 'An error occurred');
		},
	});
	const formik = useFormik<UserLogInI>({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: toFormikValidationSchema(userLoginSchema('en')),
		onSubmit: async (values) => {
			await AuthMethod(values);
		},
	});
	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<FormikContext value={formik}>
						<Form onSubmit={formik.handleSubmit}>
							<div className="flex flex-col gap-6">
								<div className="grid gap-3">
									<Label htmlFor="email">Email</Label>
									<FormikInput
										id="email"
										type="email"
										name="email"
										placeholder="m@example.com"
										required
									/>
								</div>
								<div className="grid gap-3">
									<div className="flex items-center">
										<Label htmlFor="password">
											Password
										</Label>
										<Link
											to="/forgot-password"
											className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
										>
											Forgot your password?
										</Link>
									</div>
									<FormikInput
										id="password"
										type="password"
										name="password"
										required
									/>
								</div>
								<div className="flex flex-col gap-3">
									<Button
										type="submit"
										className="w-full"
										disabled={
											isPending || formik.isSubmitting
										}
									>
										{isPending || formik.isSubmitting ? (
											<svg
												className="animate-spin h-5 w-5 mr-3 text-white"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<circle
													cx="12"
													cy="12"
													r="10"
												/>
												<path d="M4 12a8 8 0 1 1 16 0" />
											</svg>
										) : null}
										Login
									</Button>
								</div>
							</div>
							<div className="mt-4 text-center text-sm">
								Don&apos;t have an account?{' '}
								<Link
									to="/register"
									className="underline underline-offset-4"
								>
									Sign up
								</Link>
							</div>
						</Form>
					</FormikContext>
				</CardContent>
			</Card>
		</div>
	);
}
