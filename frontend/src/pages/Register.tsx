import {useForm} from "react-hook-form"

type RegisterFormData = {
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string,
    email: string
}

const Register = () => {
    const {register, watch, handleSubmit, formState:{errors}} = useForm<RegisterFormData>();
    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <h2 className="text-3xl">Create an Account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold gap-1 grid flex-1" htmlFor="">
                    First Name
                    <input className="border rounded w-full p-2 font-normal" type="text" {...register("firstName", {required: "This field is required"})} />
                    <span className="text-red-500">{errors.firstName && errors.firstName.message}</span>
                </label>
                <label className="text-gray-700 text-sm font-bold gap-1 grid flex-1" htmlFor="">
                    Last Name
                    <input className="border rounded w-full p-2 font-normal" type="text"  {...register("lastName", {required: "This field is required"})} />
                    <span className="text-red-500">{errors.lastName && errors.lastName.message}</span>
                </label>
            </div>
            <label className="text-gray-700 text-sm font-bold gap-1 grid flex-1" htmlFor="">
                Email
                <input className="border rounded w-full p-2 font-normal" type="email" {...register("email", {required: "This field is required"})} />
                <span className="text-red-500">{errors.email && errors.email.message}</span>
            </label>
            <label className="text-gray-700 text-sm font-bold gap-1 grid flex-1" htmlFor="">
                Password
                <input className="border rounded w-full p-2 font-normal" type="password" {...register("password", {required: "This field is required", minLength:{
                    value: 6,
                    message: "Password must be at least 6 characters"
                }})} />
                <span className="text-red-500">{errors.password && errors.password.message}</span>
            </label>
            <label className="text-gray-700 text-sm gap-1 grid font-bold flex-1" htmlFor="">
                Confirm Password
                <input className="border rounded w-full p-2 font-normal" type="password" {...register("confirmPassword", {required: "This field is required", validate:(val) => {
                    if(!val){
                        return "This field is required";
                    }else if(watch("password") !== val){
                        return "Passwords do not match"
                    }
                }})} />
                <span className="text-red-500">{errors.confirmPassword && errors.confirmPassword.message}</span>

            </label>
            <span>
                <button type="submit" className="p-2 bg-blue-700 text-white font-bold">
                    Create Account
                </button>
            </span>
        </form>
    )
}

export default Register;