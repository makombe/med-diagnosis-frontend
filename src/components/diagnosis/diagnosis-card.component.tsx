import "./diagnosis.scss";

export const DiagnosisCard = ({ diagnosis, onValidate }: any) => {
  return (
    <div className="diagnosisContainer">
      <h3 className="diagnosisTitle">Diagnosis Result</h3>
      <h4>{diagnosis.issueName}</h4>

      <p>
        Accuracy:{" "}
        <span className="accuracy-highlight">{diagnosis.accuracy}%</span>
      </p>

      <div className="buttons">
        <button onClick={() => onValidate(diagnosis.id, true)}>Valid</button>
        <button onClick={() => onValidate(diagnosis.id, false)}>Invalid</button>
      </div>
    </div>
  );
};
