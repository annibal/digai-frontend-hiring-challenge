//

export interface IInterviewVestibulumPage {
  stub?: string | null;
}

function InterviewVestibulumPage({ stub }: IInterviewVestibulumPage) {
  return (
    <div>
      <p>
        <strong>Interview Vestibulum</strong>
      </p>
      <p>{stub}</p>
    </div>
  );
}

export default InterviewVestibulumPage;
