export interface Course {
  id: string;

  name: string;

  startDate: string;

  endDate: string;

  workloadsHours: number;
}

export interface Participant {
  id: string;

  firstName: string;

  lastName: string;

  ci: string;

  course: Course;
}

export interface Certificate {
  id: string;

  participant: Participant;

  issueDate: string;

  verificationCode: string;
}