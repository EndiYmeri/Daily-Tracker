import { DatePicker, LocalizationProvider } from "@mui/lab";
import { TextField } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterMoment';
import { useForm, SubmitHandler } from "react-hook-form"
import "./modal.css"
import { useReducer, useState } from "react";
import moment from "moment";
import { getMonthString, getDateString } from "../../helperFunc";
import { User } from "../../types";

type Inputs = {
    date: string,
    sleep: number,
    work: number,
    fun: number,
    train: number,
    brain: number,
    learn: number,
    relax: number,
}

type Props = {
    minDate: moment.Moment,
    setInputModal: Function
    user: User
    setUser: Function
}

export default function InputModal({ minDate, setInputModal, user, setUser }: Props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const [dateValue, setDateValue] = useState(moment())
    const [dateSelected, setDateSelected] = useState()
    let totalHours =
        Number(watch("sleep"))
        + Number(watch("work"))
        + Number(watch("brain"))
        + Number(watch("train"))
        + Number(watch("relax"))
        + Number(watch("fun"))
        + Number(watch("learn"))

    const onSubmit: SubmitHandler<Inputs> = data => {
        fetch(`http://localhost:5000/user/date-info`, {
            method: "POST",
            headers: {
                'Authorization': localStorage.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date: dateSelected,
                sleepTime: Number(data.sleep),
                workTime: Number(data.work),
                brainActivityTime: Number(data.brain),
                physicalActivityTime: Number(data.train),
                learningTime: Number(data.learn),
                relaxTime: Number(data.relax),
                funTime: Number(data.fun)
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (!data.error) {
                    const userUpdated = user
                    if(userUpdated){
                       userUpdated?.userDateInfo?.push(data)
                        setUser(userUpdated)
                    }
                }
            })

        setInputModal(false)
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="close-button" onClick={()=>{setInputModal(false)}}>❎</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Add new input to your daily tracker</h1>
                    {totalHours > 24 ? "Your activities cannot exceed 24 hours" : null}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Select Date"
                            value={dateValue}
                            minDate={minDate}
                            maxDate={moment(new Date())}
                            onChange={(newValue) => {
                                if (newValue) {
                                    setDateValue(newValue)
                                    setDateSelected(
                                        // @ts-ignore
                                        `${newValue.year()}-${getMonthString(newValue.month())}-${getDateString(newValue.date())}`
                                    )
                                }
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <label htmlFor="sleep">
                        Hours of sleep:
                        <input type="number" defaultValue={0} max={24} min={0} {...register("sleep")} name="sleep" id="sleep" />
                    </label>
                    <label htmlFor="work">
                        Hours of work:
                        <input type="number" defaultValue={0} max={24} min={0} {...register("work")} name="work" id="work" />
                    </label>
                    <label htmlFor="train">
                        Hours of training:
                        <input type="number" defaultValue={0} max={24} min={0} {...register("train")} name="train" id="train" />
                    </label>
                    <label htmlFor="brain">
                        Hours of getting smarter:
                        <input type="number" defaultValue={0} max={24} min={0} {...register("brain")} name="brain" id="brain" />
                    </label>
                    <label htmlFor="learn">
                        Hours of learning something new:
                        <input type="number" defaultValue={0} max={24} min={0} {...register("learn")} name="learn" id="learn" />
                    </label>
                    <label htmlFor="relax">
                        Hours of relaxing:
                        <input type="number" defaultValue={0} max={24} min={0} {...register("relax")} name="relax" id="relax" />
                    </label>
                    <label htmlFor="fun">
                        Hours of having fun:
                        <input type="number" defaultValue={0} max={24} min={0} {...register("fun")} name="fun" id="relax" />
                    </label>
                    <input type="submit" value={"Create input"} />

                </form>
            </div>
        </div>
    )
}