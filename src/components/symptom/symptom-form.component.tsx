import { useForm } from "react-hook-form";
import "./symptom.scss";

export const SymptomForm = ({ onSubmit }: any) => {
  const { register, handleSubmit } = useForm();

  return (
    <form className="symptom-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Patient Symptoms</h2>

      {/* <div className="form-group">
        <label>Age</label>
        <input type="number" {...register("age", { required: true })} />
      </div> */}

      {/* <div className="form-group">
        <label>Gender</label>
        <select {...register("gender")}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div> */}

      <div className="form-group">
        <label>Symptoms (comma-separated)</label>
        <input
          type="text"
          placeholder="Enter symptoms description"
          {...register("symptoms", { required: true })}
        />
      </div>

      <button className="submit-btn" type="submit">
        Run Diagnosis
      </button>
    </form>
  );
};
