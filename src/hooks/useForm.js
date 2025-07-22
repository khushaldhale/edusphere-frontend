import { act, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSocket from "./useSocket";


const useForm = (initialValues, thunk, validate, navigate_url, url, state_update) => {
	const [formData, setFormData] = useState(initialValues);
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const socketConection = useSocket()

	//  change handler to handle inputs.
	const changeHandler = (event) => {
		const { name, type, value, checked, files } = event.target;
		// proper datatype conversion.
		let actual_value;
		switch (type) {
			case 'number':
				actual_value = Number(value);
				break;
			case 'checkbox':
				actual_value = checked;
				break;
			case 'date':
				actual_value = new Date(value); // optional if you're using dates
				break;
			case 'file':
				actual_value = files[0]
				break;
			default:
				actual_value = value;
		}
		// actual value is provided mean proper converted datatype value.
		let error = validate(name, actual_value, formData);
		setErrors((prevData) => {
			return {
				...prevData,
				[name]: error
			}
		})

		// handling the enrollment data.
		let required_obj = {};
		if (url === "enrollment") {
			if (name === "course") {
				const selectedOption = event.target.selectedOptions[0];
				const courseData = JSON.parse(selectedOption.getAttribute("data-course"));
				required_obj = {
					[name]: courseData._id,
					course_obj: courseData
				}
			} else if (name === "payment_type") {
				if (value === "lumpsum") {
					required_obj = {
						is_lumpsum: true,
						amount_paid: formData.course_obj.total_fee,
						is_total_fee_paid: true
					}
				} else {
					//   have to create an installment info  here.
					const required_arr = formData.course_obj.installment_breakdown.map((installment, index) => {
						const required_date = new Date(Date.now() + (1000 * 60 * 60 * 24 * installment.due_in_days))
						return {
							installment_number: index + 1,
							amount: installment.amount,
							due_date: required_date,
							is_total_fee_paid: false

						}
					})

					required_obj = {
						is_lumpsum: false,
						amount_paid: formData.course_obj.installment_fee,
						installment_info: required_arr
					}
				}
			}
		}
		// form data updation.
		setFormData((prevData) => {
			return {
				...prevData,
				[name]: type === "checkbox" ? checked : actual_value,
				...required_obj
			}
		})
	}

	// submit handler for form
	const submitHandler = (event) => {
		event.preventDefault();
		// check for errors
		let action = Object.values(errors).every((error) => {
			console.log("error :", error)
			if (error === "") {
				return true;
			}
		})

		let custom_error;
		// Enrollment error check
		if (url === "enrollment") {
			if (formData.is_lumpsum === false && formData.installment_info.length > 0) {
				const installment_paid = formData.installment_info[0].is_paid === true && formData.installment_info[0].installment_number === 1
				if (!installment_paid) {
					custom_error = "First Installment must be paid."
				}
				action = false;
			} else if (formData.amount_paid < 100) {
				custom_error = "Amount Paid should be greater than 100."
				action = false;
			}
		}

		// course data validation on submission.
		if (url === "course") {
			if (formData.is_installments) {
				const totalFee = formData.installment_breakdown.reduce((acc, element) => {
					return acc + element.amount
				}, 0)

				if (formData.installment_numbers !== formData.installment_breakdown.length) {
					custom_error = "Installment numbers and breakdown doesnt match."
					action = false;
				}

				if (totalFee !== formData.installment_fee) {
					custom_error = "Installment Fee and installment breakdown total doesnt match."
					action = false;
				}
			}
		}
		//  call to backend.
		if (action) {
			dispatch(thunk(formData))
				.then((action) => {
					if (action.payload.success) {
						if (url === "login" && action.payload.data.accountType !== "receptionist") {
							const temporarySocket = socketConection();
							if (action.payload.data.accountType === "counsellor") {
								// This room for the all new enquiries created.
								temporarySocket.emit("join_room", "enquiry_room");
							}
						}
						toast.success(action.payload.message);
						if (url === "login" && action.payload.data.accountType === "receptionist") {
							navigate("/dashboard/create-enquiry")
						} else {
							navigate(navigate_url)
						}

						if (typeof state_update === "function") {
							state_update(false);
						}

					} else {
						toast.error(action.payload.message);
					}
				})

			setFormData(initialValues)
		} else {
			toast.error(custom_error || "Fix the errors first then submit the form.")
		}


	}
	return [formData, changeHandler, submitHandler, errors, setFormData];
}

export default useForm;


//  convert the data into the FormData object ,  new FormData() to deal with the files.



// const number_regex = /[+\-eE\.]/;
// //  check whether the number is starting with zero or not.
// if (value.length >= 2 && value.startsWith("0")) {
// 	setErrors((prevData) => {
// 		return {
// 			...prevData,
// 			[name]: "Value cannot start with Zero."
// 		}
// 	})
// 	// properr number or not
// } else if (number_regex.test(value)) {
// 	setErrors((prevData) => {
// 		return {
// 			...prevData,
// 			[name]: "Provide valid number."
// 		}
// 	})
// } else {
// 	//   here the conversion happens if  everything goes  right.
// }