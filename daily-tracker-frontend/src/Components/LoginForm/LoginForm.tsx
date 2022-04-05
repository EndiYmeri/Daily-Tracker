import { useForm, SubmitHandler } from "react-hook-form"; 
import { Link } from "react-router-dom";
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
    submitFunc: Function
    title: "Log in" | "Sign up"
}

export default function LoginForm({ submitFunc, title }: Props) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const isTitleLogin = title === "Log in"

    const onSubmit: SubmitHandler<Inputs> = data =>{
        if(isTitleLogin){
            submitFunc(data);
        }
        else{
            data.dateOfBirth += "T00:00:00.000Z"
            submitFunc(data);
        }
    } 
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{title}</h1>
            <p>Login to track your activities and see how everybody is doing</p>
            <input type={"email"} placeholder="Email..." {...register("email", { required: true })} />
            <input type={"password"} placeholder="Password..." {...register("password", { required: true })} />
            {errors.email && errors.password && <span>This field is required</span>}
            {
                isTitleLogin ? null :
                (
                    <>
                        <input type={"text"} placeholder="First name..." {...register("firstName", { required: true })} />
                        <input type={"text"} placeholder="Last name..." {...register("lastName", { required: true })} />
                        <input type={"text"} placeholder="Username..." {...register("username", { required: true })} />
                        <input type={"url"} placeholder="Avatar img url..." {...register("avatarImg", { required: true })} />
                        <input type={"date"} placeholder="Date of birth..." {...register("dateOfBirth", { required: true})} />
                        <div className="radio">
                            Gender:
                                <label htmlFor="genderM">
                                    <input type="radio"  {...register('gender')} name="gender" id="genderM" value={"Male"} /> Male
                                </label>
                                <label htmlFor="genderF">
                                    <input type="radio"  {...register('gender')} name="gender" id="genderF" value={"Female"}  /> Female
                                </label>
                        </div>
                    </>
                )
            }
            <input type="submit" value={title} />
            <p>
                {(isTitleLogin ? "Don't " : "Already ") + "have an account? " }
                <Link 
                    to={ isTitleLogin ? "/sign-up " : "/login" } >
                        {isTitleLogin ? "Sign up" : "Log in"  }
                </Link>
            </p>
        </form>
    )
}

