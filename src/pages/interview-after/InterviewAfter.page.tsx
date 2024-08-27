//

export interface IInterviewAfterPage {
  stub?: string | null;
}

function InterviewAfterPage({ stub }: IInterviewAfterPage) {
  return (
    <div>
      <p>
        <strong>Interview After</strong>
      </p>
      <p>{stub}</p>
    </div>
  );
}

export default InterviewAfterPage;
