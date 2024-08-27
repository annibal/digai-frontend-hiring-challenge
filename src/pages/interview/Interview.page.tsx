//

export interface IInterviewPage {
  stub?: string | null;
}

function InterviewPage({ stub }: IInterviewPage) {
  return (
    <div>
      <p>
        <strong>Interview</strong>
      </p>
      <p>{stub}</p>
    </div>
  );
}

export default InterviewPage;
