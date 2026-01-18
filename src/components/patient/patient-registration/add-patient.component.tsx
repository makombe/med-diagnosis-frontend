import { useForm, SubmitHandler } from "react-hook-form";
import "./add-patient.scss";

// Define the form data type (matches your PatientDto)
interface PatientFormData {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
}

interface AddPatientFormProps {
  onSubmit: SubmitHandler<PatientFormData>;
  isLoading?: boolean; // optional: show loading state
  onClose?: () => void; // optional: close modal button
}

const AddPatientForm = ({
  onSubmit,
  isLoading = false,
  onClose,
}: AddPatientFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormData>({
    defaultValues: {
      gender: "",
      dateOfBirth: "",
    },
  });

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h2>Patient Registration</h2>
        {onClose && (
          <button className="close-btn" type="button" onClick={onClose}>
            ×
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="patient-form">
        {/* First Name */}
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            id="firstName"
            type="text"
            placeholder="Enter first name"
            {...register("firstName", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className={errors.firstName ? "input-error" : ""}
          />
          {errors.firstName && (
            <span className="error-message">{errors.firstName.message}</span>
          )}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            id="lastName"
            type="text"
            placeholder="Enter last name"
            {...register("lastName", {
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className={errors.lastName ? "input-error" : ""}
          />
          {errors.lastName && (
            <span className="error-message">{errors.lastName.message}</span>
          )}
        </div>

        {/* Gender */}
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            {...register("gender", {
              required: "Please select gender",
            })}
            className={errors.gender ? "input-error" : ""}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            {/* You can add "other" if needed */}
          </select>
          {errors.gender && (
            <span className="error-message">{errors.gender.message}</span>
          )}
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth *</label>
          <input
            id="dateOfBirth"
            type="date"
            {...register("dateOfBirth", {
              required: "Date of birth is required",
              validate: (value) => {
                const today = new Date();
                const birthDate = new Date(value);
                return birthDate < today || "Date cannot be in the future";
              },
            })}
            className={errors.dateOfBirth ? "input-error" : ""}
          />
          {errors.dateOfBirth && (
            <span className="error-message">{errors.dateOfBirth.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register Patient"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatientForm;
