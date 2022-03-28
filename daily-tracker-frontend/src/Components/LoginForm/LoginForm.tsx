import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSpring, animated } from 'react-spring'
import "./loginForm.css"
type Inputs = {
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    username?: string,
    dateOfBirth?: string
    gender?: string,
    avatarImg: string
};

type Props = {
    login: Function
    signUp?: Function
    title: "Log in" | "Sign up"
}

export default function LoginForm({ login, title }: Props) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => login(data);

    const titleLogin = title === "Log in"

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{title}</h1>
            <p>Login to track your activities and see how everybody is doing</p>

            <input type={"email"} placeholder="Email..." {...register("email", { required: true })} />
            <input type={"password"} placeholder="Password..." {...register("password", { required: true })} />
            {errors.email && errors.password && <span>This field is required</span>}
            {
                titleLogin ? null :
                (
                    <>
                        <input type={"text"} placeholder="First name..." {...register("firstName", { required: true })} />
                        <input type={"text"} placeholder="Last name..." {...register("lastName", { required: true })} />
                        <input type={"text"} placeholder="Username..." {...register("username", { required: true })} />
                        <input type={"date"} placeholder="Date of birth..." {...register("dateOfBirth", { required: true })} />
                    </>
                    
                )

            }
            <input type="submit" value={"Log in"} />
            <p>
                {(titleLogin ? "Don't " : "Already ") + "have an account? " }
                <Link 
                    to={ titleLogin ? "/sign-up " : "/login" } >
                        {titleLogin ? "Sign up" : "Log in"  }
                </Link>
            </p>
        </form>
    )
}