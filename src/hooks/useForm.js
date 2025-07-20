import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSocket from "./useSocket";
import { SocketContext } from "../SocketProvider";

const useForm = (initialValues, thunk, validate, navigate_url, url) => {
	const [formData, setFormData] = useState(initialValues);
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const socketConection = useSocket()

	//  change handler to handle inputs.
	const changeHandler = (event) => {
		const { name, type, value, checked } = event.target;

		// proper datatype conversion.
		let actual_value;
		switch (type) {
			case 'number':
				//  check whether the number is starting with zero or not.
				if (value.length >= 2 && value.startsWith("0")) {
					setErrors((prevData) => {
						return {
							...prevData,
							[name]: "Value cannot start with Zero."
						}
					})
				} else {
					//   here the conversion happens
					actual_value = Number(value);
				}
				break;
			case 'checkbox':
				actual_value = checked;
				break;
			case 'date':
				actual_value = new Date(value); // optional if you're using dates
				break;
			default:
				actual_value = value;
		}
		let error = validate(name, actual_value, formData);
		setErrors((prevData) => {
			return {
				...prevData,
				[name]: error
			}
		})

		// handle the data  submission for the enrollment
		if (url === "enrollment") {
			let required_obj = {};
			if (name === "course") {
				const selectedOption = event.target.selectedOptions[0];
				const courseData = JSON.parse(selectedOption.getAttribute("data-course"));
				required_obj = {
					[name]: courseData._id,
					course_obj: courseData
				}
			} else if (name === "is_lumpsum" && checked) {
				required_obj = {
					is_total_fee_paid: true,
					amount_paid: formData.course_obj.total_fee,
					[name]: checked
				}
			} else if (name === "is_installment" && checked) {
				required_obj = {
					is_total_fee_paid: false,
					amount_paid: formData.course_obj.installment_fee,
					[name]: checked
				}
			}

			setFormData((prevData) => {
				return {
					...prevData,
					[name]: type === "checkbox" ? checked : actual_value,
					...required_obj,

				}
			})
			return;
		}

		setFormData((prevData) => {
			return {
				...prevData,
				[name]: type === "checkbox" ? checked : actual_value
			}
		})
	}

	// submit handler for form
	const submitHandler = (event) => {
		event.preventDefault();
		let action = Object.values(errors).every((error) => {
			console.log("error :", error)
			if (error === "") {
				return true;
			}
		})

		console.log("form data : ", formData);
		console.log(" errors  : ", errors);

		// convert the form  data into  FormData object.
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

					} else {
						toast.error(action.payload.message);
					}
				})

			setFormData(initialValues)
		} else {
			toast.error("Fix the errors first then submit the form.")
		}
	}
	return [formData, changeHandler, submitHandler, errors, setFormData];
}

export default useForm; 